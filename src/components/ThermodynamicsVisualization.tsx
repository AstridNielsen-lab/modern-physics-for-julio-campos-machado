import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';

// Physical constants
const kB = 1.380649e-23;  // Boltzmann constant in J/K
const R = 8.31446;        // Universal gas constant in J/(mol·K)
const NA = 6.02214076e23; // Avogadro's number in mol^-1
const h = 6.62607015e-34; // Planck constant in J·s
const sigma = 5.670374419e-8; // Stefan-Boltzmann constant in W/(m²·K⁴)

interface ThermodynamicState {
  temperature: number;
  pressure: number;
  volume: number;
}

class ThermodynamicsCalculator {
  static idealGasInternalEnergy(n: number, T: number, cv: number = 3 * R / 2): number {
    return n * cv * T;
  }

  static idealGasEnthalpy(n: number, T: number, cp: number = 5 * R / 2): number {
    return n * cp * T;
  }

  static idealGasEntropy(n: number, T: number, P: number, V0: number = 1, T0: number = 273.15, P0: number = 1e5): number {
    return n * R * (Math.log(T/T0) + Math.log(P0/P));
  }

  static carnotEfficiency(Th: number, Tc: number): number {
    return 1 - Tc / Th;
  }

  static isothermicWork(n: number, T: number, V1: number, V2: number): number {
    return n * R * T * Math.log(V2 / V1);
  }

  static adiabaticWork(n: number, T1: number, T2: number, gamma: number = 5/3): number {
    const cv = R / (gamma - 1);
    return n * cv * (T1 - T2);
  }
}

interface CarnotCyclePoint {
  volume: number;
  pressure: number;
}

function calculateCarnotCycle(
  Th: number,
  Tc: number,
  n: number = 1.0,
  V1: number = 1.0
): CarnotCyclePoint[] {
  const gamma = 5/3; // For monatomic ideal gas
  
  // Point 1: Initial state
  const P1 = n * R * Th / V1;
  
  // Point 2: After isothermal expansion
  const V2 = 2.0 * V1;
  const P2 = n * R * Th / V2;
  
  // Point 3: After adiabatic expansion
  const V3 = V2 * Math.pow(Th / Tc, 1/(gamma-1));
  const P3 = n * R * Tc / V3;
  
  // Point 4: After isothermal compression
  const V4 = V3 / 2;
  const P4 = n * R * Tc / V4;
  
  return [
    { volume: V1, pressure: P1 },
    { volume: V2, pressure: P2 },
    { volume: V3, pressure: P3 },
    { volume: V4, pressure: P4 }
  ];
}

interface ThermodynamicsVisualizationProps {
  hotTemp: number;  // Hot reservoir temperature in K
  coldTemp: number; // Cold reservoir temperature in K
}

export function ThermodynamicsVisualization({ hotTemp, coldTemp }: ThermodynamicsVisualizationProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Clean up previous chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const cyclePoints = calculateCarnotCycle(hotTemp, coldTemp);
    const efficiency = ThermodynamicsCalculator.carnotEfficiency(hotTemp, coldTemp);

    // Generate points for smooth curves
    const points = 100;
    const V1 = cyclePoints[0].volume;
    const V2 = cyclePoints[1].volume;
    const V3 = cyclePoints[2].volume;
    const V4 = cyclePoints[3].volume;

    // Isothermal expansion (1 -> 2)
    const isothermHotVolumes = Array.from({ length: points }, (_, i) => 
      V1 + (V2 - V1) * i / (points - 1));
    const isothermHotPressures = isothermHotVolumes.map(v => 
      cyclePoints[0].pressure * V1 / v);

    // Adiabatic expansion (2 -> 3)
    const adiabaticExpVolumes = Array.from({ length: points }, (_, i) => 
      V2 + (V3 - V2) * i / (points - 1));
    const adiabaticExpPressures = adiabaticExpVolumes.map(v => 
      cyclePoints[1].pressure * Math.pow(V2 / v, 5/3));

    // Isothermal compression (3 -> 4)
    const isothermColdVolumes = Array.from({ length: points }, (_, i) => 
      V3 - (V3 - V4) * i / (points - 1));
    const isothermColdPressures = isothermColdVolumes.map(v => 
      cyclePoints[2].pressure * V3 / v);

    // Adiabatic compression (4 -> 1)
    const adiabaticCompVolumes = Array.from({ length: points }, (_, i) => 
      V4 - (V4 - V1) * i / (points - 1));
    const adiabaticCompPressures = adiabaticCompVolumes.map(v => 
      cyclePoints[3].pressure * Math.pow(V4 / v, 5/3));

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Expansão Isotérmica (T_h)',
            data: isothermHotVolumes.map((v, i) => ({ x: v, y: isothermHotPressures[i] })),
            borderColor: 'rgb(255, 99, 132)',
            fill: false,
            tension: 0.4
          },
          {
            label: 'Expansão Adiabática',
            data: adiabaticExpVolumes.map((v, i) => ({ x: v, y: adiabaticExpPressures[i] })),
            borderColor: 'rgb(54, 162, 235)',
            fill: false,
            tension: 0.4
          },
          {
            label: 'Compressão Isotérmica (T_c)',
            data: isothermColdVolumes.map((v, i) => ({ x: v, y: isothermColdPressures[i] })),
            borderColor: 'rgb(75, 192, 192)',
            fill: false,
            tension: 0.4
          },
          {
            label: 'Compressão Adiabática',
            data: adiabaticCompVolumes.map((v, i) => ({ x: v, y: adiabaticCompPressures[i] })),
            borderColor: 'rgb(153, 102, 255)',
            fill: false,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Ciclo de Carnot',
            color: 'white',
            font: {
              size: 16
            }
          },
          subtitle: {
            display: true,
            text: `Eficiência: ${(efficiency * 100).toFixed(1)}%`,
            color: 'white',
            font: {
              size: 14
            }
          },
          legend: {
            labels: {
              color: 'white'
            }
          }
        },
        scales: {
          x: {
            type: 'linear',
            title: {
              display: true,
              text: 'Volume (m³)',
              color: 'white'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: 'white'
            }
          },
          y: {
            type: 'linear',
            title: {
              display: true,
              text: 'Pressão (Pa)',
              color: 'white'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: 'white'
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [hotTemp, coldTemp]);

  return (
    <div className="w-full h-[600px] bg-black/30 rounded-lg p-6">
      <canvas ref={chartRef} />
      <div className="mt-4 text-gray-300">
        <p className="mb-2">
          O ciclo de Carnot é um ciclo termodinâmico ideal que consiste em quatro processos reversíveis:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Expansão isotérmica à temperatura T_h</li>
          <li>Expansão adiabática até temperatura T_c</li>
          <li>Compressão isotérmica à temperatura T_c</li>
          <li>Compressão adiabática até temperatura T_h</li>
        </ul>
      </div>
    </div>
  );
}