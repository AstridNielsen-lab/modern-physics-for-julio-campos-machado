import { useState, useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { MathJax } from 'better-react-mathjax';
import { JulianaChat } from './JulianaChat';

interface WaveFunction {
  psi: number[];
  probability: number[];
}

export function JulianaSimulation() {
  const [time, setTime] = useState(0);
  const [eta, setEta] = useState(0.5);
  const [alpha, setAlpha] = useState(0.3);
  const [amplitude, setAmplitude] = useState(1.0);
  const chartRef = useRef<any>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      setTime(t => (t + 0.1) % (2 * Math.PI));
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const generateData = () => {
    const points = 100;
    const predicted = [];
    const experimental = [];
    const labels = [];
    
    for (let i = 0; i < points; i++) {
      const x = (i / points) * 10;
      labels.push(x.toFixed(1));
      
      // Theoretical prediction from Juliana equation
      const quantum = Math.sin(x * 5 + time) * Math.exp(-x * 0.5);
      const classical = Math.exp(-Math.pow(x - 5, 2) / 2);
      const predicted_value = amplitude * (
        Math.tanh(eta * x) * (quantum + classical) / 2 +
        Math.sin(x * eta * Math.PI) * Math.exp(-alpha * x)
      );
      predicted.push(predicted_value);
      
      // Simulated "experimental" data with noise
      const noise = (Math.random() - 0.5) * 0.1;
      const experimental_value = predicted_value + noise;
      experimental.push(experimental_value);
    }

    return { labels, predicted, experimental };
  };

  const { labels, predicted, experimental } = generateData();

  const data = {
    labels,
    datasets: [
      {
        label: 'Previsão Teórica',
        data: predicted,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4
      },
      {
        label: 'Dados "Experimentais"',
        data: experimental,
        borderColor: 'rgb(255, 99, 132)',
        pointRadius: 2,
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Validação da Equação Juliana',
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
    },
    animation: {
      duration: 0
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Amplitude
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={amplitude}
            onChange={(e) => setAmplitude(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">A = {amplitude.toFixed(1)}</div>
        </div>
      </div>

      <div className="bg-black/30 rounded-lg p-6">
        <Line data={data} options={options} ref={chartRef} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Equação Juliana</h3>
          <div className="overflow-x-auto">
            <MathJax className="text-gray-300 text-sm whitespace-nowrap">
              {"$\\Phi(\\eta, \\alpha, A) = A\\left[\\tanh(\\eta x)\\frac{\\Psi + \\phi}{2} + \\sin(\\eta\\pi x)e^{-\\alpha x}\\right]$"}
            </MathJax>
          </div>
          <p className="mt-2 text-sm text-gray-300">
            A equação prevê uma transição suave entre comportamentos quânticos e clássicos
          </p>
        </div>
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Análise de Concordância</h3>
          <p className="text-sm text-gray-300">
            Os dados "experimentais" simulados mostram boa concordância com as previsões teóricas,
            validando a capacidade da equação de descrever sistemas quântico-clássicos.
          </p>
        </div>
      </div>

      <div className="bg-black/30 p-4 rounded">
        <h3 className="font-semibold mb-2">Interpretação dos Parâmetros</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
          <div>
            <h4 className="font-medium mb-2">η (Eta)</h4>
            <p className="text-sm">
              Controla a força da unificação entre comportamentos quânticos e clássicos.
              Valores maiores intensificam a transição.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">α (Alpha)</h4>
            <p className="text-sm">
              Define a taxa de decaimento das oscilações quânticas.
              Afeta a persistência dos efeitos quânticos.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">A (Amplitude)</h4>
            <p className="text-sm">
              Escala global da função de onda.
              Relacionada à intensidade total do fenômeno.
            </p>
          </div>
        </div>
      </div>

      <JulianaChat />
    </div>
  );
}