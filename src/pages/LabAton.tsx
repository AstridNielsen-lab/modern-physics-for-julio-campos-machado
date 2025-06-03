import { Link } from 'react-router-dom';
import { ArrowLeft, Info, Share2 } from 'lucide-react';
import { AtomSimulation } from '../components/AtomSimulation';
import { useState, useEffect } from 'react';

export function AtomSimulator() {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset error state when component mounts
    setHasError(false);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-4">
        <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm max-w-2xl text-center">
          <h1 className="text-3xl font-bold mb-4 text-red-400">Erro na Simulação</h1>
          <p className="text-gray-300 mb-6">
            Ocorreu um erro ao carregar os componentes da simulação.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors text-lg"
          >
            Voltar para página inicial
          </Link>
        </div>
      </div>
    );
  }

  try {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <header className="py-8 px-4 text-center bg-black/30">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Simulador de Átomos: Nova Física Unificada</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              Visualização interativa dos comportamentos físicos quânticos e clássicos através da Equação Juliana
            </p>
          </div>
        </header>

        <nav className="bg-black/20 py-4 sticky top-0 z-50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <Link 
                to="/"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ArrowLeft size={20} /> Voltar para página inicial
              </Link>
              <div className="flex gap-4">
                <button className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <Info size={20} /> Informações
                </button>
                <button className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <Share2 size={20} /> Compartilhar
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8">
          <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Parâmetros da Simulação</h2>
              <p className="text-gray-300 mb-4">
                Esta simulação demonstra a unificação de comportamentos quânticos e clássicos através 
                da equação Juliana. Ajuste os parâmetros para observar como a função de onda se comporta 
                sob diferentes condições.
              </p>
            </div>

            <AtomSimulation />
            
            <div className="mt-8 bg-black/30 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Significado Físico</h2>
              <p className="text-gray-300 mb-4">
                Os resultados desta simulação demonstram como a teoria unificada proposta pela Equação Juliana 
                permite uma transição suave entre os regimes quântico e clássico, resolvendo inconsistências 
                presentes nas teorias convencionais e oferecendo novas perspectivas para a compreensão dos 
                fenômenos físicos fundamentais.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="bg-black/20 p-4 rounded">
                  <h3 className="font-semibold mb-2">Implicações Quânticas</h3>
                  <p className="text-gray-300 text-sm">
                    No limite quântico, a simulação reproduz os comportamentos de onda e interferência 
                    característicos da mecânica quântica, preservando princípios como a superposição 
                    e a dualidade onda-partícula.
                  </p>
                </div>
                <div className="bg-black/20 p-4 rounded">
                  <h3 className="font-semibold mb-2">Transição para o Regime Clássico</h3>
                  <p className="text-gray-300 text-sm">
                    À medida que os parâmetros são ajustados, podemos observar a emergência gradual 
                    de comportamentos clássicos, demonstrando como a decoerência e a localização surgem 
                    naturalmente do formalismo unificado.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-black/40 py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400">
              © 2025 Like Look Solutions • Desenvolvido por Julio Campos Machado
            </p>
          </div>
        </footer>
      </div>
    );
  } catch (error) {
    console.error("Error in AtomSimulator:", error);
    setHasError(true);
    return null;
  }
}

