import { useState } from 'react';
import { ThermodynamicsVisualization } from './ThermodynamicsVisualization';

export function ThermodynamicsSection() {
  const [hotTemp, setHotTemp] = useState(600);
  const [coldTemp, setColdTemp] = useState(300);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Temperatura da Fonte Quente (K)
          </label>
          <input
            type="range"
            min="400"
            max="1000"
            value={hotTemp}
            onChange={(e) => setHotTemp(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">{hotTemp} K</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Temperatura da Fonte Fria (K)
          </label>
          <input
            type="range"
            min="200"
            max={hotTemp - 100}
            value={coldTemp}
            onChange={(e) => setColdTemp(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-gray-300">{coldTemp} K</div>
        </div>
      </div>
      
      <ThermodynamicsVisualization
        hotTemp={hotTemp}
        coldTemp={coldTemp}
      />
    </div>
  );
}