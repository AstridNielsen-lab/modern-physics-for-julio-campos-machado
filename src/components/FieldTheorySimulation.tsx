import { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { MathJax } from 'better-react-mathjax';

interface FieldState {
  phi: number[];
  pi: number[];
  time: number;
}

export function FieldTheorySimulation() {
  const [fieldState, setFieldState] = useState<FieldState>({
    phi: Array(100).fill(0),
    pi: Array(100).fill(0),
    time: 0
  });

  const animationRef = useRef<number>();
  const chartRef = useRef<any>(null);

  const initializeField = () => {
    const N = 100;
    const phi = Array(N).fill(0);
    const pi = Array(N).fill(0);
    
    // Initial Gaussian wave packet
    for (let i = 0; i < N; i++) {
      const x = (i - N/2) / 10;
      phi[i] = Math.exp(-x*x);
      pi[i] = 0;
    }
    
    return { phi, pi, time: 0 };
  };

  const evolveField = (state: FieldState): FieldState => {
    const dt = 0.1;
    const dx = 0.1;
    const N = state.phi.length;
    
    const newPhi = [...state.phi];
    const newPi = [...state.pi];
    
    // Klein-Gordon equation evolution
    for (let i = 1; i < N-1; i++) {
      const d2phi = (state.phi[i+1] - 2*state.phi[i] + state.phi[i-1]) / (dx*dx);
      newPi[i] = state.pi[i] + dt * (d2phi - state.phi[i]);
    }
    
    for (let i = 1; i < N-1; i++) {
      newPhi[i] = state.phi[i] + dt * newPi[i];
    }
    
    return {
      phi: newPhi,
      pi: newPi,
      time: state.time + dt
    };
  };

  useEffect(() => {
    setFieldState(initializeField());
    
    const animate = () => {
      setFieldState(prevState => evolveField(prevState));
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const data = {
    labels: Array.from({ length: 100 }, (_, i) => i),
    datasets: [
      {
        label: 'Campo Escalar (φ)',
        data: fieldState.phi,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
        fill: false
      },
      {
        label: 'Momento Conjugado (π)',
        data: fieldState.pi,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.4,
        fill: false
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Evolução do Campo Escalar',
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
      <div className="bg-black/30 rounded-lg p-6">
        <Line data={data} options={options} ref={chartRef} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Equação de Klein-Gordon</h3>
          <MathJax className="text-gray-300">
            {"$\\frac{\\partial^2\\phi}{\\partial t^2} - \\nabla^2\\phi + m^2\\phi = 0$"}
          </MathJax>
        </div>
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Hamiltoniana do Campo</h3>
          <MathJax className="text-gray-300">
            {"$H = \\int d^3x \\left[\\frac{1}{2}\\pi^2 + \\frac{1}{2}(\\nabla\\phi)^2 + \\frac{1}{2}m^2\\phi^2\\right]$"}
          </MathJax>
        </div>
      </div>

      <div className="bg-black/30 p-4 rounded">
        <h3 className="font-semibold mb-2">Interpretação</h3>
        <p className="text-gray-300">
          A simulação mostra a evolução de um campo escalar quântico <MathJax inline>{"$\\phi(x,t)$"}</MathJax> e 
          seu momento conjugado <MathJax inline>{"$\\pi(x,t)$"}</MathJax>, demonstrando a propagação de ondas 
          e a conservação de energia no sistema.
        </p>
      </div>
    </div>
  );
}