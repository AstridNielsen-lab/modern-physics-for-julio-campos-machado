import { useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { MathJax } from 'better-react-mathjax';

export function HolographicFieldSimulation() {
  const [phaseModulation, setPhaseModulation] = useState(1.0);
  const [fieldStrength, setFieldStrength] = useState(1.0);
  const [eta, setEta] = useState(0.5);
  const chartRef = useRef<any>(null);

  const generateHolographicField = () => {
    const points = 200;
    const xMin = -5;
    const xMax = 5;
    const dx = (xMax - xMin) / points;
    
    const referenceWave = [];
    const objectWave = [];
    const julianaField = [];
    const labels = [];
    
    for (let i = 0; i < points; i++) {
      const x = xMin + i * dx;
      labels.push(x.toFixed(1));
      
      // Reference wave (plane wave)
      const refWave = Math.cos(2 * Math.PI * x * phaseModulation);
      referenceWave.push(refWave);
      
      // Object wave (modulated wave)
      const objWave = fieldStrength * Math.cos(2 * Math.PI * x * phaseModulation + 
                     Math.sin(x * phaseModulation));
      objectWave.push(objWave);
      
      // Juliana-modified holographic field
      const julianaFactor = Math.tanh(eta * x);
      const nonlinearPhase = Math.sin(eta * Math.PI * x) * Math.exp(-Math.abs(x) * 0.3);
      const julianaWave = julianaFactor * objWave + (1 - julianaFactor) * refWave + nonlinearPhase;
      julianaField.push(julianaWave);
    }
    
    return { labels, referenceWave, objectWave, julianaField };
  };

  const { labels, referenceWave, objectWave, julianaField } = generateHolographicField();

  const data = {
    labels,
    datasets: [
      {
        label: 'Onda de Referência',
        data: referenceWave,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4
      },
      {
        label: 'Onda do Objeto',
        data: objectWave,
        borderColor: 'rgb(255, 159, 64)',
        tension: 0.4
      },
      {
        label: 'Campo Holográfico Juliana',
        data: julianaField,
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
        text: 'Campo Holográfico com Equação Juliana',
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
            Modulação de Fase (φ)
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={phaseModulation}
            onChange={(e) => setPhaseModulation(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">φ = {phaseModulation.toFixed(1)} rad</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Intensidade do Campo (E₀)
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={fieldStrength}
            onChange={(e) => setFieldStrength(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">E₀ = {fieldStrength.toFixed(1)} u.a.</div>
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
          <h3 className="font-semibold mb-2">Equação Juliana Holográfica</h3>
          <MathJax className="text-gray-300">
            {"$\\Phi_J(x) = \\tanh(\\eta x)\\Phi_{obj} + (1-\\tanh(\\eta x))\\Phi_{ref} + \\sin(\\eta\\pi x)e^{-\\alpha|x|}$"}
          </MathJax>
          <p className="mt-2 text-sm text-gray-300">
            A equação Juliana modifica o campo holográfico através do parâmetro η, 
            permitindo controle sobre a interferência e coerência
          </p>
        </div>
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Padrão de Interferência</h3>
          <MathJax className="text-gray-300">
            {"$I_J(x) = |\\Phi_J(x)|^2 = |\\Phi_{obj}|^2 + |\\Phi_{ref}|^2 + 2|\\Phi_{obj}\\Phi_{ref}|\\cos(\\Delta\\phi_J)$"}
          </MathJax>
          <p className="mt-2 text-sm text-gray-300">
            O padrão de interferência Juliana combina efeitos quânticos e clássicos na formação holográfica
          </p>
        </div>
      </div>

      <div className="bg-black/30 p-4 rounded">
        <h3 className="font-semibold mb-2">Interpretação Física</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
          <div>
            <h4 className="font-medium mb-2">Campo Quântico</h4>
            <ul className="space-y-1">
              <li>• Coerência quântica</li>
              <li>• Estados de fótons</li>
              <li>• Emaranhamento</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Transição</h4>
            <ul className="space-y-1">
              <li>• Controle de fase</li>
              <li>• Modulação espacial</li>
              <li>• Interferência controlada</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Campo Clássico</h4>
            <ul className="space-y-1">
              <li>• Padrão de difração</li>
              <li>• Intensidade óptica</li>
              <li>• Frentes de onda</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}