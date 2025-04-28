import { useState, useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { MathJax } from 'better-react-mathjax';

export function QuantumMeasurementSimulation() {
  const [measurementTime, setMeasurementTime] = useState(50);
  const [decoherenceRate, setDecoherenceRate] = useState(0.5);
  const chartRef = useRef<any>(null);
  const animationRef = useRef<number>();
  const [time, setTime] = useState(0);

  useEffect(() => {
    const animate = () => {
      setTime(t => (t + 1) % 100);
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
    const waveFunction = [];
    const classicalState = [];
    const labels = [];

    for (let i = 0; i < points; i++) {
      labels.push(i.toString());
      
      // Quantum superposition before measurement
      if (i < measurementTime) {
        const superposition = Math.sin(i * 0.2 + time * 0.1) * Math.exp(-i * decoherenceRate * 0.02);
        waveFunction.push(superposition);
        classicalState.push(0);
      } 
      // Classical state after measurement
      else {
        waveFunction.push(0);
        classicalState.push(Math.sign(Math.sin(measurementTime * 0.2 + time * 0.1)));
      }
    }

    return { labels, waveFunction, classicalState };
  };

  const { labels, waveFunction, classicalState } = generateWaveFunction();

  const data = {
    labels,
    datasets: [
      {
        label: 'Função de Onda',
        data: waveFunction,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4
      },
      {
        label: 'Estado Clássico',
        data: classicalState,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Colapso da Função de Onda',
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
            Momento da Medição
          </label>
          <input
            type="range"
            min="1"
            max="99"
            value={measurementTime}
            onChange={(e) => setMeasurementTime(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">t = {measurementTime} u.a.</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Taxa de Decoerência
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={decoherenceRate}
            onChange={(e) => setDecoherenceRate(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">γ = {decoherenceRate.toFixed(1)}</div>
        </div>
      </div>

      <div className="bg-black/30 rounded-lg p-6">
        <Line data={data} options={options} ref={chartRef} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Equação de Schrödinger</h3>
          <MathJax className="text-gray-300">
            {"$i\\hbar\\frac{\\partial}{\\partial t}|\\psi\\rangle = \\hat{H}|\\psi\\rangle$"}
          </MathJax>
          <p className="mt-2 text-sm text-gray-300">
            Evolução unitária vs. colapso não-unitário durante medição
          </p>
        </div>
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Problema da Medição</h3>
          <p className="text-sm text-gray-300">
            A transição abrupta entre superposição quântica e estado clássico definido não é explicada pela teoria
          </p>
        </div>
      </div>
    </div>
  );
}