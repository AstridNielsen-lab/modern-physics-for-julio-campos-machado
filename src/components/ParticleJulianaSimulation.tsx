import { useState, useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { MathJax } from 'better-react-mathjax';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
  LogarithmicScale
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
  LogarithmicScale
);

export function ParticleJulianaSimulation() {
  const [eta, setEta] = useState(0.5);
  const [coupling, setCoupling] = useState(0.5);
  const chartRef = useRef<ChartJS | null>(null);

  // Cleanup chart instance on unmount
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const generateParticleSpectrum = () => {
    // Particle masses in GeV
    const particleMasses = {
      quarks: [0.002, 0.005, 1.275, 0.095, 173.0, 4.18],
      leptons: [0.000511, 0, 0.106, 0, 1.777, 0],
      bosons: [0, 80.4, 91.2, 0, 125.1]
    };

    const modifiedMasses = {
      quarks: particleMasses.quarks.map(m => m * (1 + eta * Math.tanh(coupling * m/125))),
      leptons: particleMasses.leptons.map(m => m * (1 + eta * Math.tanh(coupling * m/125))),
      bosons: particleMasses.bosons.map(m => m * (1 + eta * Math.tanh(coupling * m/125)))
    };

    return { original: particleMasses, modified: modifiedMasses };
  };

  const { original, modified } = generateParticleSpectrum();

  const data = {
    labels: [
      'u', 'd', 'c', 's', 't', 'b',
      'e', 'νₑ', 'μ', 'νᵤ', 'τ', 'νᵩ',
      'γ', 'W', 'Z', 'g', 'H'
    ],
    datasets: [
      {
        label: 'Massas Padrão',
        data: [
          ...original.quarks,
          ...original.leptons,
          ...original.bosons
        ],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        type: 'bar'
      },
      {
        label: 'Massas Modificadas por Juliana',
        data: [
          ...modified.quarks,
          ...modified.leptons,
          ...modified.bosons
        ],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        type: 'bar'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Espectro de Massas das Partículas',
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
          text: 'Partículas',
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: { color: 'white' }
      },
      y: {
        type: 'logarithmic' as const,
        title: {
          display: true,
          text: 'Massa (GeV)',
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
            Parâmetro de Unificação (η)
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
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Acoplamento (g)
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={coupling}
            onChange={(e) => setCoupling(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">g = {coupling.toFixed(1)}</div>
        </div>
      </div>

      <div className="bg-black/30 rounded-lg p-6">
        <Line 
          data={data} 
          options={options} 
          ref={chartRef}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Equação de Massa Juliana</h3>
          <MathJax className="text-gray-300">
            {"$m_J(\\eta) = m_0\\left(1 + \\eta\\tanh\\left(\\frac{gm_0}{m_H}\\right)\\right)$"}
          </MathJax>
          <p className="mt-2 text-sm text-gray-300">
            A equação Juliana modifica o espectro de massa das partículas através do parâmetro η e acoplamento g
          </p>
        </div>
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Lagrangiana Modificada</h3>
          <MathJax className="text-gray-300">
            {"$\\mathcal{L}_J = \\mathcal{L}_{SM} + \\eta\\phi_J\\bar{\\psi}\\psi$"}
          </MathJax>
          <p className="mt-2 text-sm text-gray-300">
            A teoria introduz um campo Juliana φ_J que modifica as interações do Modelo Padrão
          </p>
        </div>
      </div>

      <div className="bg-black/30 p-4 rounded">
        <h3 className="font-semibold mb-2">Estrutura de Partículas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
          <div>
            <h4 className="font-medium mb-2">Quarks</h4>
            <ul className="space-y-1">
              <li>• up (u), down (d)</li>
              <li>• charm (c), strange (s)</li>
              <li>• top (t), bottom (b)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Léptons</h4>
            <ul className="space-y-1">
              <li>• elétron (e), neutrino-e (νₑ)</li>
              <li>• múon (μ), neutrino-μ (νᵤ)</li>
              <li>• tau (τ), neutrino-τ (νᵩ)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Bósons</h4>
            <ul className="space-y-1">
              <li>• fóton (γ)</li>
              <li>• W±, Z</li>
              <li>• gluons (g)</li>
              <li>• Higgs (H)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}