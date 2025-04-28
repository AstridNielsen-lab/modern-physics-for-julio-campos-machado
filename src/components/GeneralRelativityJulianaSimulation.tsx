import { useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { MathJax } from 'better-react-mathjax';

export function GeneralRelativityJulianaSimulation() {
  const [massParameter, setMassParameter] = useState(1.0);
  const [julianaParameter, setJulianaParameter] = useState(0.5);
  const [cosmologicalConstant, setCosmologicalConstant] = useState(0.1);
  const chartRef = useRef<any>(null);

  const generateSpacetimeData = () => {
    const points = 100;
    const standardMetric = [];
    const julianaMetric = [];
    const labels = [];
    
    for (let i = 0; i < points; i++) {
      const r = 0.1 + (i / points) * 10;
      labels.push(r.toFixed(1));
      
      // Standard Schwarzschild metric component
      const standardGtt = 1 - (2 * massParameter) / r;
      standardMetric.push(standardGtt);
      
      // Juliana-modified metric with cosmological term
      const julianaGtt = standardGtt * Math.tanh(julianaParameter * r) + 
                        (1 - Math.tanh(julianaParameter * r)) * 
                        Math.exp(-cosmologicalConstant * r * r) * 
                        Math.cos(julianaParameter * Math.PI * r);
      julianaMetric.push(julianaGtt);
    }
    
    return { labels, standardMetric, julianaMetric };
  };

  const { labels, standardMetric, julianaMetric } = generateSpacetimeData();

  const data = {
    labels,
    datasets: [
      {
        label: 'Métrica de Schwarzschild',
        data: standardMetric,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4
      },
      {
        label: 'Métrica Juliana',
        data: julianaMetric,
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
        text: 'Análise da Equação Juliana na Relatividade Geral',
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
          text: 'Coordenada Radial (r/r_s)',
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
          text: 'Componente g₀₀ da Métrica',
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
            Massa (M/M☉)
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={massParameter}
            onChange={(e) => setMassParameter(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">M = {massParameter.toFixed(1)} M☉</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Parâmetro Juliana (η)
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={julianaParameter}
            onChange={(e) => setJulianaParameter(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">η = {julianaParameter.toFixed(1)}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Constante Cosmológica (Λ)
          </label>
          <input
            type="range"
            min="0"
            max="0.5"
            step="0.01"
            value={cosmologicalConstant}
            onChange={(e) => setCosmologicalConstant(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">Λ = {cosmologicalConstant.toFixed(2)} Λ₀</div>
        </div>
      </div>

      <div className="bg-black/30 rounded-lg p-6">
        <Line data={data} options={options} ref={chartRef} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Equação de Einstein-Juliana</h3>
          <MathJax className="text-gray-300">
            {"$G_{\\mu\\nu} + \\Lambda_J(\\eta)g_{\\mu\\nu} = \\frac{8\\pi G}{c^4}T_{\\mu\\nu}^J$"}
          </MathJax>
          <p className="mt-2 text-sm text-gray-300">
            A equação Juliana modifica as equações de Einstein através de uma constante cosmológica 
            dinâmica e um tensor energia-momento modificado
          </p>
        </div>
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Métrica Juliana</h3>
          <MathJax className="text-gray-300">
            {"$ds_J^2 = -\\left(1-\\frac{2GM}{rc^2}\\right)\\tanh(\\eta r)dt^2 + \\frac{dr^2}{\\left(1-\\frac{2GM}{rc^2}\\right)\\tanh(\\eta r)} + r^2d\\Omega^2$"}
          </MathJax>
          <p className="mt-2 text-sm text-gray-300">
            A métrica Juliana introduz uma transição suave entre diferentes regimes gravitacionais
          </p>
        </div>
      </div>

      <div className="bg-black/30 p-4 rounded">
        <h3 className="font-semibold mb-2">Interpretação Física</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
          <div>
            <h4 className="font-medium mb-2">Regime Clássico</h4>
            <ul className="space-y-1">
              <li>• Limite newtoniano</li>
              <li>• Campos fracos</li>
              <li>• Geodésicas clássicas</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Transição</h4>
            <ul className="space-y-1">
              <li>• Modificação da curvatura</li>
              <li>• Energia escura dinâmica</li>
              <li>• Horizontes modificados</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Regime Quântico</h4>
            <ul className="space-y-1">
              <li>• Flutuações quânticas</li>
              <li>• Gravidade semiclássica</li>
              <li>• Efeitos não-locais</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}