import { useState, useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { MathJax } from 'better-react-mathjax';

export function SchrodingerJulianaSimulation() {
  const [eta, setEta] = useState(0.5);
  const [time, setTime] = useState(0);
  const [potential, setPotential] = useState(1);
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

  const generateWaveFunction = () => {
    const points = 100;
    const psi = [];
    const julianaModified = [];
    const labels = [];
    
    for (let i = 0; i < points; i++) {
      const x = (i / points) * 10 - 5;
      labels.push(x.toFixed(1));
      
      // Standard Schrödinger wave packet
      const psiValue = Math.exp(-(x * x) / 2) * Math.cos(2 * x - time);
      psi.push(psiValue);
      
      // Juliana-modified wave function
      const julianaValue = Math.tanh(eta * x) * psiValue + 
                          (1 - Math.tanh(eta * x)) * Math.exp(-potential * x * x / 2) * 
                          Math.cos(x - time);
      julianaModified.push(julianaValue);
    }

    return { labels, psi, julianaModified };
  };

  const { labels, psi, julianaModified } = generateWaveFunction();

  const data = {
    labels,
    datasets: [
      {
        label: 'Função de Onda de Schrödinger',
        data: psi,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4
      },
      {
        label: 'Função de Onda Juliana',
        data: julianaModified,
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
        text: 'Análise de Schrödinger-Juliana',
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
      <div className="grid grid-cols-2 gap-4">
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
            Potencial (V₀)
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
          <div className="text-center text-gray-300">V₀ = {potential.toFixed(1)} eV</div>
        </div>
      </div>

      <div className="bg-black/30 rounded-lg p-6">
        <Line data={data} options={options} ref={chartRef} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Equação de Schrödinger-Juliana</h3>
          <MathJax className="text-gray-300">
            {"$i\\hbar\\frac{\\partial\\Psi_J}{\\partial t} = \\left[-\\frac{\\hbar^2}{2m}\\nabla^2 + V_J(\\eta,x)\\right]\\Psi_J$"}
          </MathJax>
          <p className="mt-2 text-sm text-gray-300">
            A equação Juliana modifica o hamiltoniano através do parâmetro η, permitindo uma transição suave entre regimes
          </p>
        </div>
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Potencial Juliana</h3>
          <MathJax className="text-gray-300">
            {"$V_J(\\eta,x) = V_0\\tanh(\\eta x) + V_q(1-\\tanh(\\eta x))$"}
          </MathJax>
          <p className="mt-2 text-sm text-gray-300">
            O potencial combina contribuições clássicas e quânticas através do parâmetro de unificação η
          </p>
        </div>
      </div>

      <div className="bg-black/30 p-4 rounded">
        <h3 className="font-semibold mb-2">Interpretação Física</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
          <div>
            <h4 className="font-medium mb-2">Regime Quântico</h4>
            <ul className="space-y-1">
              <li>• Superposição de estados</li>
              <li>• Interferência quântica</li>
              <li>• Tunelamento</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Transição</h4>
            <ul className="space-y-1">
              <li>• Decoerência controlada</li>
              <li>• Localização gradual</li>
              <li>• Emergência clássica</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Regime Clássico</h4>
            <ul className="space-y-1">
              <li>• Estados localizados</li>
              <li>• Trajetórias definidas</li>
              <li>• Causalidade local</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}