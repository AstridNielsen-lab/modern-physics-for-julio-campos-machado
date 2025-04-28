import { useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { MathJax } from 'better-react-mathjax';

export function RelativisticCausalitySimulation() {
  const [lightSpeed, setLightSpeed] = useState(1);
  const [entanglementStrength, setEntanglementStrength] = useState(0.5);
  const chartRef = useRef<any>(null);

  const generateSpacetimeEvents = () => {
    const points = 100;
    const causalCone = [];
    const entangledEvents = [];
    const labels = [];
    
    for (let i = 0; i < points; i++) {
      const t = (i / points) * 10;
      labels.push(t.toFixed(1));
      
      // Light cone boundary
      const lightConeLimit = lightSpeed * t;
      causalCone.push(lightConeLimit);
      
      // Entangled correlations (potentially violating causality)
      const correlation = Math.exp(-t * (1 - entanglementStrength)) * Math.cos(t * 5);
      entangledEvents.push(correlation * lightConeLimit * 1.2);
    }

    return { labels, causalCone, entangledEvents };
  };

  const { labels, causalCone, entangledEvents } = generateSpacetimeEvents();

  const data = {
    labels,
    datasets: [
      {
        label: 'Cone de Luz',
        data: causalCone,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4
      },
      {
        label: 'Correlações Quânticas',
        data: entangledEvents,
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
        text: 'Causalidade vs. Emaranhamento',
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
          text: 'Tempo',
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
          text: 'Distância',
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
            Velocidade da Luz
          </label>
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.1"
            value={lightSpeed}
            onChange={(e) => setLightSpeed(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">c = {lightSpeed.toFixed(1)} c₀</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Força do Emaranhamento
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={entanglementStrength}
            onChange={(e) => setEntanglementStrength(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">α = {entanglementStrength.toFixed(1)}</div>
        </div>
      </div>

      <div className="bg-black/30 rounded-lg p-6">
        <Line data={data} options={options} ref={chartRef} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Intervalo Espaço-Temporal</h3>
          <MathJax className="text-gray-300">
            {"$ds^2 = c^2dt^2 - dx^2$"}
          </MathJax>
          <p className="mt-2 text-sm text-gray-300">
            Estrutura causal do espaço-tempo de Minkowski
          </p>
        </div>
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Paradoxo EPR</h3>
          <p className="text-sm text-gray-300">
            Correlações quânticas não-locais parecem permitir influência instantânea à distância
          </p>
        </div>
      </div>
    </div>
  );
}