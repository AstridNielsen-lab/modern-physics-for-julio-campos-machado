import { useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { MathJax } from 'better-react-mathjax';

export function EdisonLightSimulation() {
  const [temperature, setTemperature] = useState(2700);
  const [current, setCurrent] = useState(0.3);
  const [julianaParameter, setJulianaParameter] = useState(0.5);
  const chartRef = useRef<any>(null);

  const generateFilamentData = () => {
    const points = 200;
    const standardEmission = [];
    const julianaEmission = [];
    const labels = [];
    
    for (let i = 0; i < points; i++) {
      const wavelength = 380 + (i / points) * (780 - 380); // Visible spectrum (380-780nm)
      labels.push(wavelength.toFixed(0));
      
      // Planck's black body radiation (simplified)
      const h = 6.626e-34; // Planck constant
      const c = 3e8; // Speed of light
      const k = 1.380e-23; // Boltzmann constant
      const T = temperature;
      
      // Standard black body emission
      const emission = (2 * h * c * c) / 
                      (Math.pow(wavelength * 1e-9, 5) * 
                      (Math.exp((h * c) / (wavelength * 1e-9 * k * T)) - 1));
      const normalizedEmission = emission / 1e13;
      standardEmission.push(normalizedEmission);
      
      // Juliana-modified emission with current effects
      const julianaFactor = Math.tanh(julianaParameter * current);
      const nonlinearTerm = Math.sin(julianaParameter * Math.PI * wavelength/780) * 
                           Math.exp(-wavelength/780);
      const modifiedEmission = normalizedEmission * julianaFactor + 
                              (1 - julianaFactor) * nonlinearTerm;
      julianaEmission.push(modifiedEmission);
    }
    
    return { labels, standardEmission, julianaEmission };
  };

  const { labels, standardEmission, julianaEmission } = generateFilamentData();

  const data = {
    labels,
    datasets: [
      {
        label: 'Emissão Padrão',
        data: standardEmission,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4
      },
      {
        label: 'Emissão Juliana',
        data: julianaEmission,
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
        text: 'Análise da Lâmpada de Edison com Equação Juliana',
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
          text: 'Comprimento de Onda (nm)',
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
          text: 'Intensidade Relativa',
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Temperatura (K)
          </label>
          <input
            type="range"
            min="2000"
            max="3500"
            step="100"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">T = {temperature} K</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Corrente (A)
          </label>
          <input
            type="range"
            min="0.1"
            max="0.5"
            step="0.05"
            value={current}
            onChange={(e) => setCurrent(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">I = {current.toFixed(2)} A</div>
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

      <div className="space-y-6">
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Equação Edison-Juliana</h3>
          <div 
            className="resize overflow-auto min-h-[100px] min-w-[200px] max-h-[500px] max-w-[800px] bg-black/20 p-4 rounded cursor-move"
            style={{ resize: 'both' }}
          >
            <MathJax className="text-gray-300 text-sm">
              {"$\\Phi_E(\\lambda,\\eta) = \\tanh(\\eta I)\\frac{2hc^2}{\\lambda^5(e^{hc/\\lambda k_BT}-1)} + (1-\\tanh(\\eta I))\\sin(\\eta\\pi\\lambda/\\lambda_0)e^{-\\lambda/\\lambda_0}$"}
            </MathJax>
          </div>
          <p className="mt-2 text-sm text-gray-300">
            A equação Juliana modifica a radiação de corpo negro do filamento através do parâmetro η, 
            permitindo uma transição entre regimes quântico e clássico
          </p>
        </div>

        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Potência Radiativa</h3>
          <div 
            className="resize overflow-auto min-h-[100px] min-w-[200px] max-h-[500px] max-w-[800px] bg-black/20 p-4 rounded cursor-move"
            style={{ resize: 'both' }}
          >
            <MathJax className="text-gray-300 text-sm">
              {"$P_J = \\sigma T^4A\\tanh(\\eta I) + \\frac{\\eta I^2R}{4\\pi}(1-\\tanh(\\eta I))$"}
            </MathJax>
          </div>
          <p className="mt-2 text-sm text-gray-300">
            A potência total combina radiação térmica e efeitos de corrente modificados
          </p>
        </div>
      </div>

      <div className="bg-black/30 p-4 rounded">
        <h3 className="font-semibold mb-2">Interpretação Física</h3>
        <div className="space-y-4 text-gray-300">
          <div>
            <h4 className="font-medium mb-2">Emissão Térmica</h4>
            <ul className="space-y-1">
              <li>• Radiação de corpo negro</li>
              <li>• Espectro contínuo</li>
              <li>• Dependência de temperatura</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Modificação Juliana</h4>
            <ul className="space-y-1">
              <li>• Controle de espectro</li>
              <li>• Eficiência aumentada</li>
              <li>• Transição quântica</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Aplicações</h4>
            <ul className="space-y-1">
              <li>• Iluminação eficiente</li>
              <li>• Controle espectral</li>
              <li>• Fontes de luz quântica</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}