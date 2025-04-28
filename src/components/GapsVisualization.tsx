import { useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { MathJax } from 'better-react-mathjax';

export function GapsVisualization() {
  const [darkMatterRatio, setDarkMatterRatio] = useState(0.5);
  const [vacuumEnergy, setVacuumEnergy] = useState(1);
  const [eta, setEta] = useState(0.5);
  const chartRef = useRef<any>(null);

  const generateData = () => {
    const points = 100;
    const standardModel = [];
    const julianaModel = [];
    const labels = [];
    
    for (let i = 0; i < points; i++) {
      const x = (i / points) * 10;
      labels.push(x.toFixed(1));
      
      // Standard model prediction
      const standard = Math.exp(-x * darkMatterRatio) * Math.cos(x * 5);
      standardModel.push(standard);
      
      // Juliana equation modification
      const juliana = Math.tanh(eta * x) * standard + 
                     (1 - Math.tanh(eta * x)) * Math.exp(-vacuumEnergy * x) * 
                     Math.cos(x * eta * Math.PI);
      julianaModel.push(juliana);
    }

    return { labels, standardModel, julianaModel };
  };

  const { labels, standardModel, julianaModel } = generateData();

  const data = {
    labels,
    datasets: [
      {
        label: 'Modelo Padrão',
        data: standardModel,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4
      },
      {
        label: 'Equação Juliana',
        data: julianaModel,
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
        text: 'Resolução de Lacunas Teóricas',
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
          text: 'Escala de Energia (E/E_P)',
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
            Razão de Matéria Escura
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={darkMatterRatio}
            onChange={(e) => setDarkMatterRatio(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">ρ_DM/ρ_M = {darkMatterRatio.toFixed(1)}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Energia do Vácuo
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={vacuumEnergy}
            onChange={(e) => setVacuumEnergy(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">Λ = {vacuumEnergy.toFixed(1)} Λ_P</div>
        </div>
      </div>

      <div className="bg-black/30 rounded-lg p-6">
        <Line data={data} options={options} ref={chartRef} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Equação Juliana Unificadora</h3>
          <MathJax className="text-gray-300">
            {"$\\Phi_J(\\eta) = \\tanh(\\eta x)\\Phi_{SM} + (1-\\tanh(\\eta x))\\Phi_G + \\sin(\\eta\\pi x)e^{-\\alpha x}$"}
          </MathJax>
          <p className="mt-2 text-sm text-gray-300">
            A equação Juliana unifica o Modelo Padrão (Φ_SM) com a gravidade (Φ_G) através do parâmetro η
          </p>
        </div>
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Resolução de Lacunas</h3>
          <MathJax className="text-gray-300">
            {"$\\rho_J = \\rho_0\\tanh(\\eta r)e^{-\\alpha r}$"}
          </MathJax>
          <p className="mt-2 text-sm text-gray-300">
            O termo Juliana modifica a densidade de energia do vácuo, resolvendo o problema da constante cosmológica
          </p>
        </div>
      </div>

      <div className="bg-black/30 p-4 rounded">
        <h3 className="font-semibold mb-2">Análise das Lacunas Teóricas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
          <div>
            <h4 className="font-medium mb-2">Matéria Escura</h4>
            <ul className="space-y-1">
              <li>• Modificação do potencial gravitacional</li>
              <li>• Curvas de rotação galáctica</li>
              <li>• Distribuição de massa em aglomerados</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Energia Escura</h4>
            <ul className="space-y-1">
              <li>• Energia do vácuo modificada</li>
              <li>• Expansão acelerada natural</li>
              <li>• Resolução da constante cosmológica</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Unificação</h4>
            <ul className="space-y-1">
              <li>• Transição quântico-gravitacional</li>
              <li>• Preservação de simetrias</li>
              <li>• Consistência matemática</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}