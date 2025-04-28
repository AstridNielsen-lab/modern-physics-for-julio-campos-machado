import { useRef, useEffect, useState } from 'react';
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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function QuantumDoorsSimulation() {
  const [dopingLevel, setDopingLevel] = useState(0.5);
  const [laserPower, setLaserPower] = useState(1.0);
  const [magneticField, setMagneticField] = useState(0.5);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const calculateQuantumInteraction = () => {
    const points = 100;
    const positions = Array.from({ length: points }, (_, i) => i * (10 / points));
    const electronDensity = positions.map(x => 
      Math.exp(-((x - 5) ** 2) / (2 * dopingLevel)) * laserPower
    );
    const potentialEnergy = positions.map(x => 
      (magneticField * x * Math.sin(x * laserPower) + 
       dopingLevel * Math.cos(x * 2)) / 2
    );
    
    return { positions, electronDensity, potentialEnergy };
  };

  const { positions, electronDensity, potentialEnergy } = calculateQuantumInteraction();

  const data = {
    labels: positions,
    datasets: [
      {
        label: 'Densidade Eletrônica',
        data: electronDensity,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4
      },
      {
        label: 'Energia Potencial',
        data: potentialEnergy,
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
        text: 'Simulação de Quantum Doors',
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
          text: 'Posição (nm)',
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
            Nível de Dopagem
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={dopingLevel}
            onChange={(e) => setDopingLevel(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">
            {dopingLevel.toFixed(1)} x 10¹⁸ cm⁻³
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Potência do Laser
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={laserPower}
            onChange={(e) => setLaserPower(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">
            {laserPower.toFixed(1)} kW
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Campo Magnético
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={magneticField}
            onChange={(e) => setMagneticField(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">
            {magneticField.toFixed(1)} T
          </div>
        </div>
      </div>

      <div className="bg-black/30 rounded-lg p-6">
        <Line data={data} options={options} ref={chartRef} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Hamiltoniano do Sistema</h3>
          <MathJax className="text-gray-300">
            {"$H = H_{\\text{material}} + H_{\\text{campo}} + H_{\\text{interacao}}$"}
          </MathJax>
        </div>
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Equação de Poisson-Boltzmann</h3>
          <MathJax className="text-gray-300">
            {"$\\nabla^2\\phi = -\\frac{\\rho}{\\epsilon_0} - \\sum_i z_i e n_i^0 \\exp\\left(-\\frac{z_i e\\phi}{k_B T}\\right)$"}
          </MathJax>
        </div>
      </div>

      <div className="bg-black/30 p-4 rounded">
        <h3 className="font-semibold mb-2">Parâmetros do Sistema</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
          <div>
            <h4 className="font-medium mb-2">Dopagem</h4>
            <ul className="space-y-1">
              <li>• Boro (B⁺)</li>
              <li>• Nitrogênio (N)</li>
              <li>• Flúor (F⁻)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Laser</h4>
            <ul className="space-y-1">
              <li>• λ = 532 nm</li>
              <li>• Pulso = 100 fs</li>
              <li>• Rep = 1 kHz</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Campo B</h4>
            <ul className="space-y-1">
              <li>• B = 0.1-1.0 T</li>
              <li>• ∇B ≈ 100 T/m</li>
              <li>• f = 1-10 kHz</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}