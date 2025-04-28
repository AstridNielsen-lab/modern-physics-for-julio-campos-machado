import { useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { MathJax } from 'better-react-mathjax';

export function StatisticalSimulation() {
  const [temperature, setTemperature] = useState(300);
  const [particles, setParticles] = useState(1000);
  const chartRef = useRef<any>(null);

  const generateMaxwellBoltzmann = () => {
    const kB = 1.380649e-23; // Boltzmann constant
    const m = 1.66053907e-27; // Mass of particle (e.g., hydrogen atom)
    
    const velocities: number[] = [];
    const distribution: number[] = [];
    const v_mp = Math.sqrt(2 * kB * temperature / m); // Most probable velocity
    
    for (let v = 0; v <= 3 * v_mp; v += v_mp / 50) {
      velocities.push(v);
      const f = 4 * Math.PI * Math.pow(m / (2 * Math.PI * kB * temperature), 1.5) *
                v * v * Math.exp(-m * v * v / (2 * kB * temperature));
      distribution.push(f * particles);
    }
    
    return { velocities, distribution };
  };

  const { velocities, distribution } = generateMaxwellBoltzmann();

  const data = {
    labels: velocities.map(v => v.toFixed(0)),
    datasets: [{
      label: 'Distribuição de Maxwell-Boltzmann',
      data: distribution,
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
      tension: 0.4
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Distribuição de Velocidades Moleculares',
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
          text: 'Velocidade (m/s)',
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
          text: 'Número de Partículas',
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
            Temperatura (K)
          </label>
          <input
            type="range"
            min="100"
            max="1000"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">T = {temperature} K</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Número de Partículas
          </label>
          <input
            type="range"
            min="100"
            max="10000"
            step="100"
            value={particles}
            onChange={(e) => setParticles(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">N = {particles}</div>
        </div>
      </div>

      <div className="bg-black/30 rounded-lg p-6">
        <Line data={data} options={options} ref={chartRef} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Distribuição de Maxwell-Boltzmann</h3>
          <MathJax className="text-gray-300">
            {"$f(v) = 4\\pi\\left(\\frac{m}{2\\pi k_BT}\\right)^{3/2}v^2e^{-mv^2/2k_BT}$"}
          </MathJax>
        </div>
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Valores Característicos</h3>
          <div className="space-y-2">
            <MathJax className="text-gray-300">
              {"$v_{mp} = \\sqrt{\\frac{2k_BT}{m}}$ (Velocidade mais provável)"}
            </MathJax>
            <MathJax className="text-gray-300">
              {"$\\langle v \\rangle = \\sqrt{\\frac{8k_BT}{\\pi m}}$ (Velocidade média)"}
            </MathJax>
            <MathJax className="text-gray-300">
              {"$v_{rms} = \\sqrt{\\frac{3k_BT}{m}}$ (Velocidade quadrática média)"}
            </MathJax>
          </div>
        </div>
      </div>
    </div>
  );
}