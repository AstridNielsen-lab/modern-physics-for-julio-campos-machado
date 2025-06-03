import { BookOpen, Atom, Lightbulb, LineChart, Brain, FlaskRound as Flask, AlertTriangle, PlayCircle, Github, Linkedin, Twitter, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TheoryCard } from '../components/TheoryCard';
import { InconsistenciesSection } from '../components/InconsistenciesSection';
import { theories } from '../data/theories';
import { discoveries } from '../data/discoveries';
import { methodology } from '../data/methodology';
import { inconsistencies } from '../data/inconsistencies';


export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <header className="py-16 px-4 text-center bg-black/30">
        <h1 className="text-5xl font-bold mb-6">Revisão Moderna das Teorias Matemáticas da Física</h1>
        <p className="text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
          Uma abordagem computacional e analítica para compreender os fundamentos do universo
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/simulacoes"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors text-lg"
          >
            <PlayCircle size={24} />
            Explorar Simulações Interativas
          </Link>
          <Link
            to="/atom-simulator"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors text-lg"
          >
            <Sparkles size={24} />
            Simulador de Átomos
          </Link>
          <a
            href="https://quantum-physics-for-julio-campos-machado.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors text-lg"
          >
            <Atom size={24} />
            Quantum Doors e Cristais Isocovalentes
          </a>
        </div>
        <p className="text-sm text-gray-400 mt-4">
          Explorando os limites da física quântica para revolucionar a propulsão intergaláctica e o controle de campos magnéticos
        </p>
      </header>

      <nav className="bg-black/20 py-4 sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <ul className="flex justify-center space-x-8">
            <li><a href="#metodologia" className="flex items-center gap-2 hover:text-blue-400 transition-colors"><Flask size={20} /> Metodologia</a></li>
            <li><a href="#teorias" className="flex items-center gap-2 hover:text-blue-400 transition-colors"><Atom size={20} /> Teorias</a></li>
            <li><a href="#descobertas" className="flex items-center gap-2 hover:text-blue-400 transition-colors"><Lightbulb size={20} /> Descobertas</a></li>
            <li><a href="#inconsistencies" className="flex items-center gap-2 hover:text-blue-400 transition-colors"><AlertTriangle size={20} /> Inconsistências</a></li>
            <li><a href="#conclusoes" className="flex items-center gap-2 hover:text-blue-400 transition-colors"><Brain size={20} /> Conclusões</a></li>
          </ul>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        <section id="metodologia" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Flask size={28} className="text-blue-400" />
            Metodologia
          </h2>
          <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm">
            <p className="text-xl text-gray-300 mb-8">{methodology.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {methodology.steps.map((step, index) => (
                <div key={index} className="bg-black/30 p-6 rounded">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="teorias" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Atom size={28} className="text-blue-400" />
            Teorias Fundamentais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {theories.map((theory) => (
              <TheoryCard key={theory.id} theory={theory} />
            ))}
          </div>
        </section>

        <section id="descobertas" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Lightbulb size={28} className="text-blue-400" />
            Novas Descobertas e Insights
          </h2>
          <div className="grid grid-cols-1 gap-8">
            {discoveries.map((discovery, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-semibold mb-4">{discovery.title}</h3>
                <p className="text-gray-300 mb-6">{discovery.description}</p>
                <div className="space-y-4">
                  {discovery.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="bg-black/30 p-4 rounded">
                      <p className="text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <InconsistenciesSection data={inconsistencies} />

        <section id="conclusoes" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Brain size={28} className="text-blue-400" />
            Conclusões
          </h2>
          <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Unidade Subjacente</h3>
                <p className="text-gray-300 mb-6">
                  Apesar da aparente diversidade de formalismos, identificamos estruturas matemáticas comuns que permeiam diferentes teorias físicas, sugerindo uma unidade subjacente na descrição da natureza.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Fronteiras do Conhecimento</h3>
                <p className="text-gray-300 mb-6">
                  As inconsistências e lacunas identificadas definem claramente as fronteiras atuais do conhecimento físico, apontando direções específicas para pesquisas futuras.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-black/30 p-6 rounded">
                <h3 className="text-2xl font-semibold mb-4">Equação Juliana como Framework Unificador</h3>
                <p className="text-gray-300 mb-4">
                  A Equação Juliana emerge como um framework matemático unificador, proporcionando uma transição suave entre os regimes quântico e clássico, enquanto preserva os princípios fundamentais de cada teoria.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
                  <div>
                    <h4 className="font-medium mb-2">Unificação Teórica</h4>
                    <ul className="space-y-1">
                      <li>• Conexão quântico-clássica</li>
                      <li>• Preservação de simetrias</li>
                      <li>• Consistência matemática</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Resolução de Paradoxos</h4>
                    <ul className="space-y-1">
                      <li>• Problema da medição</li>
                      <li>• Incompatibilidade gravitacional</li>
                      <li>• Causalidade relativística</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Predições Experimentais</h4>
                    <ul className="space-y-1">
                      <li>• Efeitos intermediários</li>
                      <li>• Correções quânticas</li>
                      <li>• Fenômenos emergentes</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-black/30 p-6 rounded">
                <h3 className="text-2xl font-semibold mb-4">Implicações para o Futuro da Física</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xl font-semibold mb-3">Novas Direções de Pesquisa</h4>
                    <p className="text-gray-300">
                      A equação abre caminhos para investigações em áreas como computação quântica, materiais topológicos e fenômenos emergentes, sugerindo experimentos específicos para validação.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-3">Tecnologias Emergentes</h4>
                    <p className="text-gray-300">
                      As aplicações práticas da teoria se estendem desde o desenvolvimento de quantum doors até novos paradigmas em computação e comunicação quântica.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-black/30 p-6 rounded">
                <h3 className="text-2xl font-semibold mb-4">Perspectivas Futuras</h3>
                <p className="text-gray-300">
                  O framework da Equação Juliana não apenas unifica teorias existentes, mas também sugere novas direções para a física fundamental, prometendo uma compreensão mais profunda da natureza da realidade e abrindo possibilidades tecnológicas revolucionárias.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black/40 py-16 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">Sobre o Desenvolvedor</h3>
              <p className="text-gray-300 mb-4">
                Desenvolvido por Julio Campos Machado, um Desenvolvedor Full Stack apaixonado por física teórica e computação quântica. Especializado em criar soluções tecnológicas inovadoras que combinam ciência e engenharia.
              </p>
              <div className="flex gap-4">
                <a href="https://github.com/juliocamposmachado" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  <Github size={24} />
                </a>
                <a href="https://linkedin.com/in/juliocamposmachado" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href="https://twitter.com/juliocmachado" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  <Twitter size={24} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Tecnologias Utilizadas</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• React + TypeScript</li>
                <li>• Three.js para visualizações 3D</li>
                <li>• Chart.js para gráficos interativos</li>
                <li>• MathJax para equações matemáticas</li>
                <li>• Tailwind CSS para estilização</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Créditos</h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  Desenvolvido com assistência da IA Bolt da StackBlitz, uma ferramenta avançada de desenvolvimento que combina inteligência artificial com expertise em programação.
                </p>
                <p>
                  © 2025 Like Look Solutions<br />
                  Todos os direitos reservados
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
            <p>
              Este projeto é uma demonstração da convergência entre física teórica, computação avançada e inteligência artificial.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}