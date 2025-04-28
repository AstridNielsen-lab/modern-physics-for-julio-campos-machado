import { useState, useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { MathJax } from 'better-react-mathjax';

export function QuantumTunnelingSimulation() {
  const [barrierHeight, setBarrierHeight] = useState(1.0);
  const [barrierWidth, setBarrierWidth] = useState(1.0);
  const [eta, setEta] = useState(0.5);
  const chartRef = useRef<any>(null);

  const generateWaveFunction = () => {
    const points = 200;
    const xMin = -5;
    const xMax = 5;
    const dx = (xMax - xMin) / points;
    
    const psi = [];
    const potential = [];
    const julianaModified = [];
    const labels = [];
    
    for (let i = 0; i < points; i++) {
      const x = xMin + i * dx;
      labels.push(x.toFixed(1));
      
      // Potential barrier
      const V = (Math.abs(x) < barrierWidth) ? barrierHeight : 0;
      potential.push(V);
      
      // Standard quantum wave function
      const k = 2.0;
      const incident = Math.exp(-Math.pow(x + 2, 2));
      const transmitted = Math.exp(-Math.pow(x - 2, 2)) * Math.exp(-barrierHeight * barrierWidth);
      const psiValue = (x < -barrierWidth) ? incident : 
                      (x > barrierWidth) ? transmitted : 
                      Math.exp(-barrierHeight * Math.abs(x));
      psi.push(psiValue);
      
      // Juliana-modified wave function
      const julianaFactor = Math.tanh(eta * x) * 0.5 + 0.5;
      const julianaTunneling = psiValue * (1 - julianaFactor) + 
                              Math.exp(-barrierHeight * Math.abs(x) * julianaFactor);
      julianaModified.push(julianaTunneling);
    }
    
    return { labels, psi, potential, julianaModified };
  };

  const { labels, psi, potential, julianaModified } = generateWaveFunction();

  const data = {
    labels,
    datasets: [
      {
        label: 'Função de Onda Padrão',
        data: psi,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4
      },
      {
        label: 'Barreira de Potencial',
        data: potential,
        borderColor: 'rgb(128, 128, 128)',
        borderDash: [5, 5],
        tension: 0
      },
      {
        label: 'Função de Onda Juliana',
        data: julianaModified,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Tunelamento Quântico com Equação Juliana',
        color: 'white',
        font: { size: 16 }
      },
      legend: {
        labels: { color: 'white' }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Posição (x)',
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: { color: 'white' }
      },
      y: {
        title: {
          display: true,
          text: 'Amplitude',
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: { color: 'white' }
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Altura da Barreira (V₀)
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={barrierHeight}
            onChange={(e) => setBarrierHeight(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">V₀ = {barrierHeight.toFixed(1)} eV</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Largura da Barreira (a)
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={barrierWidth}
            onChange={(e) => setBarrierWidth(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">a = {barrierWidth.toFixed(1)} nm</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Parâmetro Juliana (η)
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={eta}
            onChange={(e) => setEta(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">η = {eta.toFixed(1)}</div>
        </div>
      </div>

      <div className="bg-black/30 rounded-lg p-6">
        <Line data={data} options={options} ref={chartRef} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Equação Juliana de Tunelamento</h3>
          <MathJax className="text-gray-300">
            {"$\\Psi_J(x) = \\Psi_0(x)\\cdot(1-\\tanh(\\eta x)) + e^{-V_0|x|}\\cdot\\tanh(\\eta x)$"}
          </MathJax>
          <p className="mt-2 text-sm text-gray-300">
            A equação Juliana modifica o comportamento de tunelamento através do parâmetro η, 
            permitindo uma transição suave entre regimes quântico e clássico
          </p>
        </div>
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Coeficiente de Transmissão</h3>
          <MathJax className="text-gray-300">
            {"$T_J(E) = T_0\\cdot(1-\\tanh(\\eta E/V_0)) + e^{-2\\kappa a}\\cdot\\tanh(\\eta E/V_0)$"}
          </MathJax>
          <p className="mt-2 text-sm text-gray-300">
            O coeficiente de transmissão Juliana combina o tunelamento quântico com comportamento clássico
          </p>
        </div>
      </div>

      <div className="bg-black/30 p-4 rounded">
        <h3 className="font-semibold mb-2">Interpretação Física</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
          <div>
            <h4 className="font-medium mb-2">Regime Quântico</h4>
            <ul className="space-y-1">
              <li>• Tunelamento através da barreira</li>
              <li>• Superposição de estados</li>
              <li>• Interferência quântica</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Transição</h4>
            <ul className="space-y-1">
              <li>• Modulação pelo parâmetro η</li>
              <li>• Decoerência controlada</li>
              <li>• Localização gradual</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Regime Clássico</h4>
            <ul className="space-y-1">
              <li>• Reflexão total</li>
              <li>• Comportamento determinístico</li>
              <li>• Conservação de energia</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}