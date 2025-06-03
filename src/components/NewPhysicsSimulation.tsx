import { useState, useRef } from 'react';
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

export function NewPhysicsSimulation() {
  const [parameter1, setParameter1] = useState(0.5);
  const [parameter2, setParameter2] = useState(1.0);
  const [parameter3, setParameter3] = useState(0.3);
  const chartRef = useRef<any>(null);

  const generateSimulationData = () => {
    const points = 100;
    const dataset1 = [];
    const dataset2 = [];
    const labels = [];
    
    for (let i = 0; i < points; i++) {
      const x = (i / points) * 10 - 5;
      labels.push(x.toFixed(1));
      
      // Generate data for first dataset
      const y1 = Math.exp(-Math.pow(x * parameter1, 2)) * 
                Math.cos(parameter2 * x);
      dataset1.push(y1);
      
      // Generate data for second dataset
      const y2 = parameter3 * Math.sin(parameter2 * Math.PI * x) * 
               Math.exp(-Math.abs(x) * parameter1);
      dataset2.push(y2);
    }
    
    return { labels, dataset1, dataset2 };
  };

  const { labels, dataset1, dataset2 } = generateSimulationData();

  const data = {
    labels,
    datasets: [
      {
        label: 'Função Principal',
        data: dataset1,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4
      },
      {
        label: 'Função Secundária',
        data: dataset2,
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
        text: 'Nova Simulação Física',
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
            Parâmetro Alpha (α)
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={parameter1}
            onChange={(e) => setParameter1(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">α = {parameter1.toFixed(1)}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Frequência (ω)
          </label>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={parameter2}
            onChange={(e) => setParameter2(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">ω = {parameter2.toFixed(1)} rad/s</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Amplitude (A)
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={parameter3}
            onChange={(e) => setParameter3(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">A = {parameter3.toFixed(1)}</div>
        </div>
      </div>

      <div className="bg-black/30 rounded-lg p-6">
        <Line data={data} options={options} ref={chartRef} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Equação Principal</h3>
          <MathJax className="text-gray-300">
            {"$f(x) = e^{-(\\alpha x)^2} \\cos(\\omega x)$"}
          </MathJax>
          <p className="mt-2 text-sm text-gray-300">
            Esta equação representa a distribuição principal com decaimento gaussiano e oscilação harmônica
          </p>
        </div>
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Equação Secundária</h3>
          <MathJax className="text-gray-300">
            {"$g(x) = A \\sin(\\omega \\pi x) e^{-\\alpha |x|}$"}
          </MathJax>
          <p className="mt-2 text-sm text-gray-300">
            Esta equação representa a componente secundária com decaimento exponencial
          </p>
        </div>
      </div>

      <div className="bg-black/30 p-4 rounded">
        <h3 className="font-semibold mb-2">Interpretação Física</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
          <div>
            <h4 className="font-medium mb-2">Parâmetro Alpha</h4>
            <ul className="space-y-1">
              <li>• Controla o decaimento</li>
              <li>• Afeta a localização</li>
              <li>• Determina amplitude efetiva</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Frequência</h4>
            <ul className="space-y-1">
              <li>• Define oscilações</li>
              <li>• Relacionada à energia</li>
              <li>• Afeta o comportamento de fase</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Amplitude</h4>
            <ul className="space-y-1">
              <li>• Escala a função secundária</li>
              <li>• Modifica intensidade relativa</li>
              <li>• Influencia na interferência</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

