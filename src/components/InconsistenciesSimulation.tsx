import { useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { MathJax } from 'better-react-mathjax';

export function InconsistenciesSimulation() {
  const [quantumScale, setQuantumScale] = useState(1);
  const [gravityStrength, setGravityStrength] = useState(1);
  const chartRef = useRef<any>(null);

  const generateData = () => {
    const points = 100;
    const quantumEffects = [];
    const classicalGravity = [];
    const labels = [];

    for (let i = 0; i < points; i++) {
      const x = (i / points) * 10;
      labels.push(x.toFixed(1));
      
      // Quantum effects increase at small scales
      const quantum = Math.exp(-x * quantumScale) * Math.sin(x * 10) * 0.5;
      
      // Classical gravity smoothly increases
      const gravity = (1 - Math.exp(-x * gravityStrength)) * 0.5;
      
      quantumEffects.push(quantum);
      classicalGravity.push(gravity);
    }

    return { labels, quantumEffects, classicalGravity };
  };

  const { labels, quantumEffects, classicalGravity } = generateData();

  const data = {
    labels,
    datasets: [
      {
        label: 'Efeitos Quânticos',
        data: quantumEffects,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4
      },
      {
        label: 'Gravidade Clássica',
        data: classicalGravity,
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
        text: 'Incompatibilidade Quântico-Gravitacional',
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
          text: 'Escala de Distância (log)',
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
          text: 'Intensidade do Efeito',
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
      <div className="grid grid-cols-2 gap-4">
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
          <div className="text-center text-gray-300">λ = {quantumScale.toFixed(1)} ℓₚ</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Intensidade Gravitacional
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={gravityStrength}
            onChange={(e) => setGravityStrength(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">G = {gravityStrength.toFixed(1)} G₀</div>
        </div>
      </div>

      <div className="bg-black/30 rounded-lg p-6">
        <Line data={data} options={options} ref={chartRef} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Equação de Wheeler-DeWitt</h3>
          <MathJax className="text-gray-300">
            {"$\\hat{H}\\Psi[g_{\\mu\\nu}] = 0$"}
          </MathJax>
          <p className="mt-2 text-sm text-gray-300">
            Tentativa de quantizar a gravidade levando a paradoxos conceituais
          </p>
        </div>
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Problema do Tempo</h3>
          <p className="text-sm text-gray-300">
            A invariância de difeomorfismo da relatividade geral entra em conflito com a evolução temporal quântica
          </p>
        </div>
      </div>
    </div>
  );
}