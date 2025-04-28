import { useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { MathJax } from 'better-react-mathjax';

export function GravitationalSimulation() {
  const [mass, setMass] = useState(1);
  const [distance, setDistance] = useState(1);
  const chartRef = useRef<any>(null);

  const generateGravitationalField = () => {
    const points = 100;
    const field = [];
    const potential = [];
    const labels = [];
    
    for (let i = 0; i < points; i++) {
      const r = 0.1 + (i / points) * 10;
      labels.push(r.toFixed(1));
      
      // Gravitational field strength (g = GM/r²)
      const fieldStrength = mass / (r * r);
      field.push(fieldStrength);
      
      // Gravitational potential (Φ = -GM/r)
      const potentialValue = -mass / r;
      potential.push(potentialValue);
    }

    return { labels, field, potential };
  };

  const { labels, field, potential } = generateGravitationalField();

  const data = {
    labels,
    datasets: [
      {
        label: 'Campo Gravitacional',
        data: field,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4
      },
      {
        label: 'Potencial Gravitacional',
        data: potential,
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
        text: 'Campo e Potencial Gravitacional',
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
          text: 'Distância (r)',
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
          text: 'Intensidade',
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
            Massa do Objeto (M☉)
          </label>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={mass}
            onChange={(e) => setMass(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">M = {mass} M☉</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Distância de Referência (UA)
          </label>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">r = {distance} UA</div>
        </div>
      </div>

      <div className="bg-black/30 rounded-lg p-6">
        <Line data={data} options={options} ref={chartRef} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Lei da Gravitação Universal</h3>
          <MathJax className="text-gray-300">
            {"$F = G\\frac{m_1m_2}{r^2}$"}
          </MathJax>
          <p className="mt-2 text-sm text-gray-300">
            A força gravitacional diminui com o quadrado da distância
          </p>
        </div>
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Potencial Gravitacional</h3>
          <MathJax className="text-gray-300">
            {"$\\Phi = -\\frac{GM}{r}$"}
          </MathJax>
          <p className="mt-2 text-sm text-gray-300">
            O potencial representa a energia por unidade de massa no campo gravitacional
          </p>
        </div>
      </div>

      <div className="bg-black/30 p-4 rounded">
        <h3 className="font-semibold mb-2">Aplicações</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
          <div>
            <h4 className="font-medium mb-2">Sistema Solar</h4>
            <ul className="space-y-1">
              <li>• Órbitas planetárias</li>
              <li>• Marés</li>
              <li>• Satélites</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Galáxias</h4>
            <ul className="space-y-1">
              <li>• Rotação galáctica</li>
              <li>• Matéria escura</li>
              <li>• Lentes gravitacionais</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Cosmologia</h4>
            <ul className="space-y-1">
              <li>• Expansão do universo</li>
              <li>• Formação de estruturas</li>
              <li>• Energia escura</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}