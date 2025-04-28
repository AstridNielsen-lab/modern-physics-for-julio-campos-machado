import { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { MathJax } from 'better-react-mathjax';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
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
  LogarithmicScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function ModeloPadraoSimulation() {
  const chartRef = useRef<any>(null);

  // Cleanup chart instance on unmount
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const particleData = {
    labels: ['Quarks', 'Léptons', 'Bósons de Gauge', 'Higgs'],
    datasets: [
      {
        label: 'Massa (GeV/c²)',
        data: [175, 1.777, 91.2, 125],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Espectro de Massas das Partículas Fundamentais',
        color: 'white',
        font: { size: 16 }
      },
      legend: {
        labels: { color: 'white' }
      }
    },
    scales: {
      y: {
        type: 'logarithmic' as const,
        title: {
          display: true,
          text: 'Massa (GeV/c²)',
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: { color: 'white' }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: { color: 'white' }
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-black/30 rounded-lg p-6">
        <Line data={particleData} options={options} ref={chartRef} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Lagrangiana do Modelo Padrão</h3>
          <MathJax className="text-gray-300">
            {"$\\mathcal{L} = -\\frac{1}{4}F^{\\mu\\nu}F_{\\mu\\nu} + i\\bar{\\psi}\\gamma^\\mu D_\\mu\\psi + |D_\\mu\\phi|^2 - V(\\phi)$"}
          </MathJax>
        </div>
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Interações Fundamentais</h3>
          <ul className="space-y-2 text-gray-300">
            <li>• Forte (gluons)</li>
            <li>• Eletromagnética (fótons)</li>
            <li>• Fraca (W±, Z)</li>
          </ul>
        </div>
      </div>

      <div className="bg-black/30 p-4 rounded">
        <h3 className="font-semibold mb-2">Estrutura de Partículas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
          <div>
            <h4 className="font-medium mb-2">Quarks</h4>
            <ul className="space-y-1">
              <li>up, down</li>
              <li>charm, strange</li>
              <li>top, bottom</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Léptons</h4>
            <ul className="space-y-1">
              <li>elétron, neutrino-e</li>
              <li>múon, neutrino-μ</li>
              <li>tau, neutrino-τ</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Bósons</h4>
            <ul className="space-y-1">
              <li>fóton (γ)</li>
              <li>W±, Z</li>
              <li>gluons (g)</li>
              <li>Higgs (H)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}