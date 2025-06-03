import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ThermodynamicsSection } from '../components/ThermodynamicsSection';
import { RelativityVisualization } from '../components/RelativityVisualization';
import { QuantumSimulation } from '../components/QuantumSimulation';
import { FieldTheorySimulation } from '../components/FieldTheorySimulation';
import { ElectromagneticSimulation } from '../components/ElectromagneticSimulation';
import { StatisticalSimulation } from '../components/StatisticalSimulation';
import { ModeloPadraoSimulation } from '../components/ModeloPadraoSimulation';
import { CordaSimulation } from '../components/CordaSimulation';
import { QuantumDoorsSimulation } from '../components/QuantumDoorsSimulation';
import { GravitationalSimulation } from '../components/GravitationalSimulation';
import { InconsistenciesVisualization } from '../components/InconsistenciesVisualization';
import { GapsVisualization } from '../components/GapsVisualization';
import { JulianaSimulation } from '../components/JulianaSimulation';
import { EntropicFieldSimulation } from '../components/EntropicFieldSimulation';
import { SchrodingerJulianaSimulation } from '../components/SchrodingerJulianaSimulation';
import { ParticleJulianaSimulation } from '../components/ParticleJulianaSimulation';
import { QuantumTunnelingSimulation } from '../components/QuantumTunnelingSimulation';
import { HolographicFieldSimulation } from '../components/HolographicFieldSimulation';
import { StringTheoryJulianaSimulation } from '../components/StringTheoryJulianaSimulation';
import { GeneralRelativityJulianaSimulation } from '../components/GeneralRelativityJulianaSimulation';
import { TeslaElectricitySimulation } from '../components/TeslaElectricitySimulation';
import { EdisonLightSimulation } from '../components/EdisonLightSimulation';
import { QuantumFlightGame } from '../components/QuantumFlightGame';

export function Simulations() {
  const [activeSimulation, setActiveSimulation] = useState<string>('quantum-flight');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft size={20} /> Voltar para página inicial
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-8">Simulações Interativas</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1 space-y-4">
            <button
              onClick={() => setActiveSimulation('quantum-flight')}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                activeSimulation === 'quantum-flight' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <h3 className="font-semibold">Quantum Flight Game</h3>
              <p className="text-sm text-gray-300">Simulador de Voo com Asteróides</p>
            </button>

            <button
              onClick={() => setActiveSimulation('edison-light')}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                activeSimulation === 'edison-light' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <h3 className="font-semibold">Lâmpada de Edison</h3>
              <p className="text-sm text-gray-300">Análise com Equação Juliana</p>
            </button>

            <button
              onClick={() => setActiveSimulation('tesla-electricity')}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                activeSimulation === 'tesla-electricity' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <h3 className="font-semibold">Eletricidade de Tesla</h3>
              <p className="text-sm text-gray-300">Análise com Equação Juliana</p>
            </button>

            <button
              onClick={() => setActiveSimulation('general-relativity-juliana')}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                activeSimulation === 'general-relativity-juliana' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <h3 className="font-semibold">Relatividade Geral Juliana</h3>
              <p className="text-sm text-gray-300">Análise gravitacional modificada</p>
            </button>

            <button
              onClick={() => setActiveSimulation('string-theory-juliana')}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                activeSimulation === 'string-theory-juliana' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <h3 className="font-semibold">Teoria das Cordas Juliana</h3>
              <p className="text-sm text-gray-300">Análise em dimensões extras</p>
            </button>

            <button
              onClick={() => setActiveSimulation('holographic-field')}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                activeSimulation === 'holographic-field' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <h3 className="font-semibold">Campo Holográfico</h3>
              <p className="text-sm text-gray-300">Análise da Equação Juliana</p>
            </button>

            <button
              onClick={() => setActiveSimulation('quantum-tunneling')}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                activeSimulation === 'quantum-tunneling' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <h3 className="font-semibold">Tunelamento Quântico</h3>
              <p className="text-sm text-gray-300">Análise da Equação Juliana</p>
            </button>

            <button
              onClick={() => setActiveSimulation('particle-juliana')}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                activeSimulation === 'particle-juliana' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <h3 className="font-semibold">Partículas Juliana</h3>
              <p className="text-sm text-gray-300">Análise do espectro de massa</p>
            </button>

            <button
              onClick={() => setActiveSimulation('schrodinger-juliana')}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                activeSimulation === 'schrodinger-juliana' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <h3 className="font-semibold">Schrödinger-Juliana</h3>
              <p className="text-sm text-gray-300">Análise quântica unificada</p>
            </button>

            <button
              onClick={() => setActiveSimulation('gravitacao')}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                activeSimulation === 'gravitacao' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <h3 className="font-semibold">Gravitação Universal</h3>
              <p className="text-sm text-gray-300">Campo e potencial gravitacional</p>
            </button>

            <button
              onClick={() => setActiveSimulation('inconsistencias')}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                activeSimulation === 'inconsistencias' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <h3 className="font-semibold">Inconsistências</h3>
              <p className="text-sm text-gray-300">Visualize conflitos teóricos</p>
            </button>

            <button
              onClick={() => setActiveSimulation('juliana')}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                activeSimulation === 'juliana' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <h3 className="font-semibold">Equação Juliana</h3>
              <p className="text-sm text-gray-300">Validação experimental</p>
            </button>

            <button
              onClick={() => setActiveSimulation('campo-entropico')}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                activeSimulation === 'campo-entropico' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <h3 className="font-semibold">Campo Entrópico</h3>
              <p className="text-sm text-gray-300">Análise entrópica da Equação Juliana</p>
            </button>

            <button
              onClick={() => setActiveSimulation('lacunas')}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                activeSimulation === 'lacunas' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <h3 className="font-semibold">Lacunas Teóricas</h3>
              <p className="text-sm text-gray-300">Explore problemas em aberto</p>
            </button>

            <button
              onClick={() => setActiveSimulation('relatividade')}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                activeSimulation === 'relatividade' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <h3 className="font-semibold">Relatividade Geral</h3>
              <p className="text-sm text-gray-300">Visualize a curvatura do espaço-tempo</p>
            </button>

            <button
              onClick={() => setActiveSimulation('termodinamica')}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                activeSimulation === 'termodinamica' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <h3 className="font-semibold">Termodinâmica</h3>
              <p className="text-sm text-gray-300">Explore o ciclo de Carnot</p>
            </button>

            <button
              onClick={() => setActiveSimulation('quantica')}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                activeSimulation === 'quantica' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <h3 className="font-semibold">Mecânica Quântica</h3>
              <p className="text-sm text-gray-300">Visualize funções de onda</p>
            </button>

            <button
              onClick={() => setActiveSimulation('campos')}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                activeSimulation === 'campos' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <h3 className="font-semibold">Teoria de Campos</h3>
              <p className="text-sm text-gray-300">Interação entre campos</p>
            </button>

            <button
              onClick={() => setActiveSimulation('eletromagnetismo')}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                activeSimulation === 'eletromagnetismo' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <h3 className="font-semibold">Eletromagnetismo</h3>
              <p className="text-sm text-gray-300">Campos elétricos e magnéticos</p>
            </button>

            <button
              onClick={() => setActiveSimulation('estatistica')}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                activeSimulation === 'estatistica' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <h3 className="font-semibold">Mecânica Estatística</h3>
              <p className="text-sm text-gray-300">Distribuições e entropia</p>
            </button>

            <button
              onClick={() => setActiveSimulation('modelo-padrao')}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                activeSimulation === 'modelo-padrao' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <h3 className="font-semibold">Modelo Padrão</h3>
              <p className="text-sm text-gray-300">Partículas fundamentais</p>
            </button>

            <button
              onClick={() => setActiveSimulation('cordas')}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                activeSimulation === 'cordas' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <h3 className="font-semibold">Teoria das Cordas</h3>
              <p className="text-sm text-gray-300">Dimensões extras</p>
            </button>

            <button
              onClick={() => setActiveSimulation('portas-quanticas')}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                activeSimulation === 'portas-quanticas' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <h3 className="font-semibold">Portas Quânticas</h3>
              <p className="text-sm text-gray-300">Computação quântica</p>
            </button>
          </div>

          <div className="lg:col-span-3">
            {activeSimulation === 'quantum-flight' && <QuantumFlightGame />}
            {activeSimulation === 'edison-light' && <EdisonLightSimulation />}
            {activeSimulation === 'tesla-electricity' && <TeslaElectricitySimulation />}
            {activeSimulation === 'general-relativity-juliana' && <GeneralRelativityJulianaSimulation />}
            {activeSimulation === 'string-theory-juliana' && <StringTheoryJulianaSimulation />}
            {activeSimulation === 'holographic-field' && <HolographicFieldSimulation />}
            {activeSimulation === 'quantum-tunneling' && <QuantumTunnelingSimulation />}
            {activeSimulation === 'particle-juliana' && <ParticleJulianaSimulation />}
            {activeSimulation === 'schrodinger-juliana' && <SchrodingerJulianaSimulation />}
            {activeSimulation === 'gravitacao' && <GravitationalSimulation />}
            {activeSimulation === 'inconsistencias' && <InconsistenciesVisualization />}
            {activeSimulation === 'juliana' && <JulianaSimulation />}
            {activeSimulation === 'campo-entropico' && <EntropicFieldSimulation />}
            {activeSimulation === 'lacunas' && <GapsVisualization />}
            {activeSimulation === 'relatividade' && <RelativityVisualization />}
            {activeSimulation === 'termodinamica' && <ThermodynamicsSection />}
            {activeSimulation === 'quantica' && <QuantumSimulation />}
            {activeSimulation === 'campos' && <FieldTheorySimulation />}
            {activeSimulation === 'eletromagnetismo' && <ElectromagneticSimulation />}
            {activeSimulation === 'estatistica' && <StatisticalSimulation />}
            {activeSimulation === 'modelo-padrao' && <ModeloPadraoSimulation />}
            {activeSimulation === 'cordas' && <CordaSimulation />}
            {activeSimulation === 'portas-quanticas' && <QuantumDoorsSimulation />}
          </div>
        </div>
      </div>
    </div>
  );
}