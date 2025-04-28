import { useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { MathJax } from 'better-react-mathjax';

export function TeslaElectricitySimulation() {
  const [frequency, setFrequency] = useState(1.0);
  const [potential, setPotential] = useState(1.0);
  const [julianaParameter, setJulianaParameter] = useState(0.5);
  const chartRef = useRef<any>(null);

  const generateTeslaField = () => {
    const points = 200;
    const standardField = [];
    const julianaField = [];
    const labels = [];
    
    for (let i = 0; i < points; i++) {
      const x = (i / points) * 10 - 5;
      labels.push(x.toFixed(1));
      
      // Tesla's non-Hertzian waves (longitudinal waves)
      const teslaWave = Math.exp(-Math.abs(x) * 0.3) * 
                       Math.cos(2 * Math.PI * frequency * x) * potential;
      standardField.push(teslaWave);
      
      // Juliana-modified Tesla field
      const julianaFactor = Math.tanh(julianaParameter * x);
      const nonlinearTerm = Math.sin(julianaParameter * Math.PI * x) * 
                           Math.exp(-Math.abs(x) * 0.5);
      const modifiedWave = teslaWave * julianaFactor + 
                          (1 - julianaFactor) * nonlinearTerm;
      julianaField.push(modifiedWave);
    }
    
    return { labels, standardField, julianaField };
  };

  const { labels, standardField, julianaField } = generateTeslaField();

  const data = {
    labels,
    datasets: [
      {
        label: 'Campo de Tesla Padrão',
        data: standardField,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4
      },
      {
        label: 'Campo de Tesla-Juliana',
        data: julianaField,
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
        text: 'Análise do Campo Elétrico de Tesla com Equação Juliana',
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
          text: 'Amplitude do Campo',
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
            Frequência (f)
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">f = {frequency.toFixed(1)} Hz</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Potencial (V)
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={potential}
            onChange={(e) => setPotential(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">V = {potential.toFixed(1)} kV</div>
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
      </div>

      <div className="bg-black/30 rounded-lg p-6">
        <Line data={data} options={options} ref={chartRef} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Equação Tesla-Juliana</h3>
          <MathJax className="text-gray-300">
            {"$\\Phi_T(x,\\eta) = \\tanh(\\eta x)E_T(x) + (1-\\tanh(\\eta x))\\sin(\\eta\\pi x)e^{-\\alpha|x|}$"}
          </MathJax>
          <p className="mt-2 text-sm text-gray-300">
            A equação Juliana modifica o campo elétrico de Tesla através do parâmetro η, 
            permitindo uma transição entre ondas longitudinais e transversais
          </p>
        </div>
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Densidade de Energia</h3>
          <MathJax className="text-gray-300">
            {"$\\rho_E = \\frac{1}{2}\\epsilon_0|\\Phi_T|^2 + \\frac{\\eta}{4\\pi}(\\nabla\\times\\Phi_T)^2$"}
          </MathJax>
          <p className="mt-2 text-sm text-gray-300">
            A densidade de energia combina componentes escalares e vetoriais do campo
          </p>
        </div>
      </div>

      <div className="bg-black/30 p-4 rounded">
        <h3 className="font-semibold mb-2">Interpretação Física</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
          <div>
            <h4 className="font-medium mb-2">Ondas de Tesla</h4>
            <ul className="space-y-1">
              <li>• Propagação longitudinal</li>
              <li>• Alta penetração</li>
              <li>• Baixa dissipação</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Modificação Juliana</h4>
            <ul className="space-y-1">
              <li>• Controle de modo</li>
              <li>• Transição suave</li>
              <li>• Acoplamento não-linear</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Aplicações</h4>
            <ul className="space-y-1">
              <li>• Transmissão de energia</li>
              <li>• Comunicação quântica</li>
              <li>• Controle de plasma</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}