import { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { MathJax } from 'better-react-mathjax';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WaveFunction {
  psi: number[];
  probability: number[];
}

export function QuantumSimulation() {
  const [n, setN] = useState(1); // Quantum number
  const [L, setL] = useState(1); // Box length
  const chartRef = useRef<any>(null);

  const calculateWaveFunction = (n: number, L: number, x: number): number => {
    return Math.sqrt(2/L) * Math.sin(n * Math.PI * x / L);
  };

  const generateData = (): WaveFunction => {
    const points = 200;
    const dx = L / points;
    const psi: number[] = [];
    const probability: number[] = [];
    
    for (let i = 0; i <= points; i++) {
      const x = i * dx;
      const waveFn = calculateWaveFunction(n, L, x);
      psi.push(waveFn);
      probability.push(waveFn * waveFn);
    }

    return { psi, probability };
  };

  const data = {
    labels: Array.from({ length: 201 }, (_, i) => (i * L / 200).toFixed(2)),
    datasets: [
      {
        label: 'Função de Onda (ψ)',
        data: generateData().psi,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
        fill: false
      },
      {
        label: 'Densidade de Probabilidade (|ψ|²)',
        data: generateData().probability,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.4,
        fill: false
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Partícula em uma Caixa Unidimensional',
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
          text: 'Posição (x/L)',
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
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Número Quântico (n)
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">n = {n}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Comprimento da Caixa (L)
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={L}
            onChange={(e) => setL(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">L = {L} nm</div>
        </div>
      </div>
      
      <div className="bg-black/30 rounded-lg p-6">
        <Line data={data} options={options} ref={chartRef} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Energia do Estado</h3>
          <MathJax className="text-gray-300">
            {"$E_n = \\frac{n^2\\pi^2\\hbar^2}{2mL^2} = " + ((n * n * Math.PI * Math.PI) / (2 * L * L)).toFixed(2) + "$ eV"}
          </MathJax>
        </div>
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Função de Onda</h3>
          <MathJax className="text-gray-300">
            {"$\\psi_n(x) = \\sqrt{\\frac{2}{L}}\\sin\\left(\\frac{n\\pi x}{L}\\right)$"}
          </MathJax>
        </div>
      </div>

      <div className="bg-black/30 p-4 rounded">
        <h3 className="font-semibold mb-2">Interpretação</h3>
        <p className="text-gray-300">
          A função de onda mostra os estados permitidos de uma partícula confinada, 
          enquanto sua amplitude ao quadrado <MathJax inline>{"$|\\psi(x)|^2$"}</MathJax> representa 
          a densidade de probabilidade de encontrar a partícula em cada posição.
        </p>
      </div>
    </div>
  );
}