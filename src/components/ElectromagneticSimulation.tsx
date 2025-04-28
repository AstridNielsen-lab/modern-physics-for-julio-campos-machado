import { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { MathJax } from 'better-react-mathjax';

interface EMField {
  E: number[];
  B: number[];
  time: number;
}

export function ElectromagneticSimulation() {
  const [frequency, setFrequency] = useState(1);
  const [amplitude, setAmplitude] = useState(1);
  const [phase, setPhase] = useState(0);
  const chartRef = useRef<any>(null);

  const generateEMWave = () => {
    const points = 100;
    const E: number[] = [];
    const B: number[] = [];
    
    for (let i = 0; i < points; i++) {
      const x = (i / points) * 4 * Math.PI;
      E.push(amplitude * Math.sin(frequency * x + phase));
      B.push(amplitude * Math.sin(frequency * x + phase + Math.PI/2));
    }
    
    return { E, B };
  };

  const { E, B } = generateEMWave();

  const data = {
    labels: Array.from({ length: 100 }, (_, i) => i),
    datasets: [
      {
        label: 'Campo Elétrico (E)',
        data: E,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4
      },
      {
        label: 'Campo Magnético (B)',
        data: B,
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
        text: 'Onda Eletromagnética',
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
          text: 'Posição (x/λ)',
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
            Frequência (ω)
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">ω = {frequency} rad/s</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Amplitude (A)
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={amplitude}
            onChange={(e) => setAmplitude(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">A = {amplitude}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Fase (φ)
          </label>
          <input
            type="range"
            min="0"
            max={2 * Math.PI}
            step={Math.PI / 8}
            value={phase}
            onChange={(e) => setPhase(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">φ = {(phase / Math.PI).toFixed(2)}π</div>
        </div>
      </div>

      <div className="bg-black/30 rounded-lg p-6">
        <Line data={data} options={options} ref={chartRef} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Equações de Maxwell</h3>
          <div className="space-y-2">
            <MathJax className="text-gray-300">
              {"$\\nabla \\cdot \\mathbf{E} = \\frac{\\rho}{\\epsilon_0}$"}
            </MathJax>
            <MathJax className="text-gray-300">
              {"$\\nabla \\cdot \\mathbf{B} = 0$"}
            </MathJax>
            <MathJax className="text-gray-300">
              {"$\\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t}$"}
            </MathJax>
            <MathJax className="text-gray-300">
              {"$\\nabla \\times \\mathbf{B} = \\mu_0\\mathbf{J} + \\mu_0\\epsilon_0\\frac{\\partial \\mathbf{E}}{\\partial t}$"}
            </MathJax>
          </div>
        </div>
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Equação de Onda</h3>
          <MathJax className="text-gray-300">
            {"$\\frac{\\partial^2\\mathbf{E}}{\\partial t^2} = c^2\\nabla^2\\mathbf{E}$"}
          </MathJax>
          <p className="mt-2 text-gray-300">
            Velocidade da luz: <MathJax inline>{"$c = \\frac{1}{\\sqrt{\\mu_0\\epsilon_0}}$"}</MathJax>
          </p>
        </div>
      </div>
    </div>
  );
}