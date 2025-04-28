import { AlertTriangle, AlertCircle } from 'lucide-react';
import { TheoryInconsistencies } from '../types';
import { InconsistenciesSimulation } from './InconsistenciesSimulation';
import { QuantumMeasurementSimulation } from './QuantumMeasurementSimulation';
import { RelativisticCausalitySimulation } from './RelativisticCausalitySimulation';

interface InconsistenciesSectionProps {
  data: TheoryInconsistencies[];
}

export function InconsistenciesSection({ data }: InconsistenciesSectionProps) {
  return (
    <section id="inconsistencies" className="mb-16">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <AlertTriangle size={28} className="text-amber-400" />
        Inconsistências e Lacunas
      </h2>

      <div className="space-y-12 mb-12">
        <div>
          <h3 className="text-2xl font-semibold mb-6">Incompatibilidade Quântico-Gravitacional</h3>
          <InconsistenciesSimulation />
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-6">Problema da Medição Quântica</h3>
          <QuantumMeasurementSimulation />
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-6">Causalidade Relativística</h3>
          <RelativisticCausalitySimulation />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {data.map((item, index) => (
          <div key={index} className="bg-white/10 rounded-lg p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-6">{item.theory}</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle size={20} className="text-amber-400" />
                  Inconsistências
                </h4>
                <div className="space-y-4">
                  {item.inconsistencies.map((inconsistency, i) => (
                    <div key={i} className="bg-black/30 p-4 rounded">
                      <h5 className="font-semibold mb-2">{inconsistency.title}</h5>
                      <p className="text-gray-300">{inconsistency.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle size={20} className="text-blue-400" />
                  Lacunas
                </h4>
                <div className="space-y-4">
                  {item.gaps.map((gap, i) => (
                    <div key={i} className="bg-black/30 p-4 rounded">
                      <h5 className="font-semibold mb-2">{gap.title}</h5>
                      <p className="text-gray-300">{gap.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}