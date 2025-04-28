import { useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { MathJax } from 'better-react-mathjax';

export function EntropicFieldSimulation() {
  const [temperature, setTemperature] = useState(300);
  const [eta, setEta] = useState(0.5);
  const [alpha, setAlpha] = useState(0.3);
  const chartRef = useRef<any>(null);

  const generateEntropicField = () => {
    const points = 100;
    const entropy = [];
    const information = [];
    const juliana = [];
    const labels = [];
    
    for (let i = 0; i < points; i++) {
      const x = (i / points) * 10;
      labels.push(x.toFixed(1));
      
      // Entropic contribution
      const S = -Math.log(1 - Math.exp(-x * temperature / 300));
      entropy.push(S);
      
      // Information content
      const I = Math.exp(-x * alpha) * Math.cos(x * 5);
      information.push(I);
      
      // Juliana field with entropic correction
      const J = Math.tanh(eta * x) * (S + I) / 2 + 
               Math.sin(eta * Math.PI * x) * Math.exp(-alpha * x);
      juliana.push(J);
    }
    
    return { labels, entropy, information, juliana };
  };

  const { labels, entropy, information, juliana } = generateEntropicField();

  const data = {
    labels,
    datasets: [
      {
        label: 'Campo Entrópico',
        data: entropy,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4
      },
      {
        label: 'Conteúdo de Informação',
        data: information,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.4
      },
      {
        label: 'Campo Juliana',
        data: juliana,
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Campo Entrópico na Equação Juliana',
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
            Temperatura (K)
          </label>
          <input
            type="range"
            min="100"
            max="1000"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">T = {temperature} K</div>
        </div>
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
            Taxa de Decaimento (α)
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={alpha}
            onChange={(e) => setAlpha(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">α = {alpha.toFixed(1)}</div>
        </div>
      </div>

      <div className="bg-black/30 rounded-lg p-6">
        <Line data={data} options={options} ref={chartRef} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Entropia Juliana</h3>
          <MathJax className="text-gray-300">
            {"$S_J = -k_B\\int \\rho_J\\ln\\rho_J dx$"}
          </MathJax>
          <p className="mt-2 text-sm text-gray-300">
            A entropia Juliana combina aspectos quânticos e clássicos através do campo entrópico
          </p>
        </div>
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Campo Entrópico</h3>
          <MathJax className="text-gray-300">
            {"$\\Phi_S = \\tanh(\\eta x)\\frac{S + I}{2} + \\sin(\\eta\\pi x)e^{-\\alpha x}$"}
          </MathJax>
          <p className="mt-2 text-sm text-gray-300">
            O campo entrópico modifica a equação Juliana incorporando efeitos termodinâmicos
          </p>
        </div>
      </div>

      <div className="bg-black/30 p-4 rounded">
        <h3 className="font-semibold mb-2">Interpretação Física</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
          <div>
            <h4 className="font-medium mb-2">Entropia</h4>
            <ul className="space-y-1">
              <li>• Medida de desordem</li>
              <li>• Irreversibilidade</li>
              <li>• Termalização</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Informação</h4>
            <ul className="space-y-1">
              <li>• Coerência quântica</li>
              <li>• Correlações</li>
              <li>• Emaranhamento</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Campo Unificado</h4>
            <ul className="space-y-1">
              <li>• Transição de fase</li>
              <li>• Decoerência</li>
              <li>• Emergência clássica</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}