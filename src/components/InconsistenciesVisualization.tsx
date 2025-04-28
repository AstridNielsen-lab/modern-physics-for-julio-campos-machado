import { useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { MathJax } from 'better-react-mathjax';

export function InconsistenciesVisualization() {
  const [quantumScale, setQuantumScale] = useState(1);
  const [classicalScale, setClassicalScale] = useState(1);
  const [julianaParameter, setJulianaParameter] = useState(0.5);
  const chartRef = useRef<any>(null);

  const generateData = () => {
    const points = 100;
    const quantum = [];
    const classical = [];
    const juliana = [];
    const labels = [];
    
    for (let i = 0; i < points; i++) {
      const x = (i / points) * 10;
      labels.push(x.toFixed(1));
      
      // Quantum behavior (wave-like)
      const quantumValue = Math.sin(x * 5 * quantumScale) * Math.exp(-x * 0.5);
      quantum.push(quantumValue);
      
      // Classical behavior (particle-like)
      const classicalValue = Math.exp(-Math.pow(x - 5 * classicalScale, 2) / 2);
      classical.push(classicalValue);

      // Juliana equation (unifying behavior)
      const julianaValue = (quantumValue + classicalValue) * 
        Math.tanh(julianaParameter * x) / 2 +
        Math.sin(x * julianaParameter * Math.PI) * Math.exp(-x * 0.3);
      juliana.push(julianaValue);
    }

    return { labels, quantum, classical, juliana };
  };

  const { labels, quantum, classical, juliana } = generateData();

  const data = {
    labels,
    datasets: [
      {
        label: 'Comportamento Quântico',
        data: quantum,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4
      },
      {
        label: 'Comportamento Clássico',
        data: classical,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.4
      },
      {
        label: 'Equação Juliana',
        data: juliana,
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.4,
        borderWidth: 2,
        borderDash: [5, 5]
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Unificação Quântico-Clássica',
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
          text: 'Posição',
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
            Escala Quântica
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={quantumScale}
            onChange={(e) => setQuantumScale(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">λ = {quantumScale.toFixed(1)} ℏ</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Escala Clássica
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={classicalScale}
            onChange={(e) => setClassicalScale(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">x = {classicalScale.toFixed(1)} x₀</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Parâmetro de Unificação (η)
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Equação de Schrödinger</h3>
          <MathJax className="text-gray-300">
            {"$i\\hbar\\frac{\\partial}{\\partial t}\\Psi = \\hat{H}\\Psi$"}
          </MathJax>
          <p className="mt-2 text-sm text-gray-300">
            Descreve a evolução temporal de estados quânticos
          </p>
        </div>
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Equações de Newton</h3>
          <MathJax className="text-gray-300">
            {"$F = m\\frac{d^2x}{dt^2}$"}
          </MathJax>
          <p className="mt-2 text-sm text-gray-300">
            Governa o movimento de objetos clássicos
          </p>
        </div>
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Equação Juliana</h3>
          <MathJax className="text-gray-300">
            {"$\\Phi(\\eta) = \\tanh(\\eta x)\\frac{\\Psi + \\phi}{2} + \\sin(\\eta\\pi x)e^{-\\alpha x}$"}
          </MathJax>
          <p className="mt-2 text-sm text-gray-300">
            Unifica comportamentos quântico (Ψ) e clássico (φ) através do parâmetro η
          </p>
        </div>
      </div>

      <div className="bg-black/30 p-4 rounded">
        <h3 className="font-semibold mb-2">Características da Equação Juliana</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
          <div>
            <h4 className="font-medium mb-2">Unificação</h4>
            <ul className="space-y-1">
              <li>• Transição suave quântico-clássica</li>
              <li>• Preservação de coerência</li>
              <li>• Localidade controlada</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Parâmetros</h4>
            <ul className="space-y-1">
              <li>• η: força da unificação</li>
              <li>• α: taxa de decaimento</li>
              <li>• x: coordenada espacial</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Aplicações</h4>
            <ul className="space-y-1">
              <li>• Medição quântica</li>
              <li>• Decoerência</li>
              <li>• Sistemas mesoscópicos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}