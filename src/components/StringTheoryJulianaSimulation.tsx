import { useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { MathJax } from 'better-react-mathjax';

export function StringTheoryJulianaSimulation() {
  const [dimensionCount, setDimensionCount] = useState(10);
  const [stringTension, setStringTension] = useState(1.0);
  const [julianaParameter, setJulianaParameter] = useState(0.5);
  const chartRef = useRef<any>(null);

  const generateStringData = () => {
    const points = 100;
    const standardString = [];
    const julianaString = [];
    const labels = [];
    
    for (let i = 0; i < points; i++) {
      const x = (i / points) * 10 - 5;
      labels.push(x.toFixed(1));
      
      // Standard string oscillation
      const standardOsc = Math.sin(x * stringTension) * Math.exp(-x * x / 4);
      standardString.push(standardOsc);
      
      // Juliana-modified string oscillation with dimensional effects
      const dimFactor = Math.tanh(dimensionCount / 11); // Normalization for extra dimensions
      const julianaOsc = standardOsc * Math.tanh(julianaParameter * x) + 
                        (1 - Math.tanh(julianaParameter * x)) * 
                        Math.sin(x * dimFactor * Math.PI) * 
                        Math.exp(-Math.abs(x) * 0.3);
      julianaString.push(julianaOsc);
    }
    
    return { labels, standardString, julianaString };
  };

  const { labels, standardString, julianaString } = generateStringData();

  const data = {
    labels,
    datasets: [
      {
        label: 'Corda Padrão',
        data: standardString,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4
      },
      {
        label: 'Corda Juliana',
        data: julianaString,
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
        text: 'Análise da Equação Juliana em Dimensões Extras',
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
          text: 'Posição na Worldsheet',
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
            Número de Dimensões
          </label>
          <input
            type="range"
            min="4"
            max="11"
            step="1"
            value={dimensionCount}
            onChange={(e) => setDimensionCount(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">D = {dimensionCount}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tensão da Corda (T)
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={stringTension}
            onChange={(e) => setStringTension(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">T = {stringTension.toFixed(1)} T₀</div>
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
            value={julianaParameter}
            onChange={(e) => setJulianaParameter(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">η = {julianaParameter.toFixed(1)}</div>
        </div>
      </div>

      <div className="bg-black/30 rounded-lg p-6">
        <Line data={data} options={options} ref={chartRef} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Equação Juliana de Cordas</h3>
          <MathJax className="text-gray-300">
            {"$S_J = -T\\int d^2\\sigma\\sqrt{-\\det(g_{\\alpha\\beta})}\\tanh(\\eta\\ell_s) + \\Phi_J(X^\\mu)$"}
          </MathJax>
          <p className="mt-2 text-sm text-gray-300">
            A equação Juliana modifica a ação de Nambu-Goto através do parâmetro η, 
            permitindo uma transição suave entre diferentes regimes dimensionais
          </p>
        </div>
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Campo de Fundo Juliana</h3>
          <MathJax className="text-gray-300">
            {"$\\Phi_J(X^\\mu) = \\sum_{n=1}^D \\tanh(\\eta X^n)\\phi_n + \\sin(\\eta\\pi X^\\mu)e^{-\\alpha|X|^2}$"}
          </MathJax>
          <p className="mt-2 text-sm text-gray-300">
            O campo de fundo Juliana acopla com as dimensões extras, modificando a dinâmica da corda
          </p>
        </div>
      </div>

      <div className="bg-black/30 p-4 rounded">
        <h3 className="font-semibold mb-2">Interpretação Física</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
          <div>
            <h4 className="font-medium mb-2">Dimensões Extras</h4>
            <ul className="space-y-1">
              <li>• Compactificação dinâmica</li>
              <li>• Hierarquia dimensional</li>
              <li>• Simetrias emergentes</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Transições</h4>
            <ul className="space-y-1">
              <li>• Mudança de topologia</li>
              <li>• Dualidades T e S</li>
              <li>• Transições de fase</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Unificação</h4>
            <ul className="space-y-1">
              <li>• Teoria M emergente</li>
              <li>• Correspondência AdS/CFT</li>
              <li>• Geometria quântica</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}