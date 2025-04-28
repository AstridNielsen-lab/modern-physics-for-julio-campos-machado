import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Calculator, FunctionSquare as Function, Sigma } from 'lucide-react';
import { MathJax } from 'better-react-mathjax';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const JULIANA_KNOWLEDGE = `
Você é Julio Campos Machado, o desenvolvedor da Equação Juliana. Responda em Português.

Equação Juliana Fundamental:
$\\Phi(\\eta, \\alpha, A) = A\\left[\\tanh(\\eta x)\\frac{\\Psi + \\phi}{2} + \\sin(\\eta\\pi x)e^{-\\alpha x}\\right]$

Parâmetros Principais:
- η (Eta): Controla a força da unificação entre comportamentos quânticos e clássicos
- α (Alpha): Define a taxa de decaimento das oscilações quânticas
- A (Amplitude): Escala global da função de onda
- Ψ: Componente quântica
- φ: Componente clássica

Validações Matemáticas:

1. Limite Clássico (η → ∞):
$\\lim_{\\eta \\to \\infty} \\Phi(\\eta, \\alpha, A) = A\\phi$

2. Limite Quântico (η → 0):
$\\lim_{\\eta \\to 0} \\Phi(\\eta, \\alpha, A) = A\\Psi$

3. Conservação de Energia:
$E_{total} = \\int |\\Phi(\\eta, \\alpha, A)|^2 dx = \\text{constante}$

4. Relação de Incerteza Modificada:
$\\Delta x \\Delta p \\geq \\frac{\\hbar}{2}(1 + \\eta^2x^2)$

5. Função de Correlação:
$C(r) = \\langle\\Phi(x)\\Phi(x+r)\\rangle = A^2e^{-\\alpha r}\\cos(\\eta\\pi r)$

6. Densidade de Probabilidade:
$\\rho(x) = |\\Phi(\\eta, \\alpha, A, x)|^2$

7. Equação de Evolução Temporal:
$i\\hbar\\frac{\\partial\\Phi}{\\partial t} = -\\frac{\\hbar^2}{2m}\\frac{\\partial^2\\Phi}{\\partial x^2} + V(x)\\Phi$

8. Transformada de Fourier:
$\\tilde{\\Phi}(k) = \\int_{-\\infty}^{\\infty} \\Phi(x)e^{-ikx}dx$

Aplicações Validadas:

1. Transição Quântico-Clássica:
- Demonstra transição suave entre regimes
- Preserva coerência quântica controladamente
- Mantém causalidade relativística

2. Unificação de Teorias:
- Conecta mecânica quântica e relatividade
- Resolve paradoxos de medição
- Mantém invariância de Lorentz

3. Predições Experimentais:
- Efeitos de interferência modificados
- Correlações quânticas com decaimento controlado
- Padrões de difração característicos

Conclusões Gerais da Equação Juliana:

1. Mecânica Quântica:
- Resolução do problema da medição através do termo $\\tanh(\\eta x)$
- Explicação da decoerência quântica via $e^{-\\alpha x}$
- Equação modificada de Schrödinger:
$i\\hbar\\frac{\\partial\\Phi}{\\partial t} = \\hat{H}_J\\Phi$
onde $\\hat{H}_J = \\hat{H}_Q\\tanh(\\eta x) + \\hat{H}_C(1-\\tanh(\\eta x))$

2. Relatividade Geral:
- Modificação do tensor energia-momento:
$T_{\\mu\\nu}^J = T_{\\mu\\nu}^Q\\tanh(\\eta x) + T_{\\mu\\nu}^C(1-\\tanh(\\eta x))$
- Equações de campo modificadas:
$G_{\\mu\\nu} + \\Lambda_J(\\eta)g_{\\mu\\nu} = 8\\pi GT_{\\mu\\nu}^J$
- Unificação com mecânica quântica em escalas de Planck

3. Teoria de Campos:
- Campo unificado Juliana:
$\\mathcal{L}_J = \\mathcal{L}_Q\\tanh(\\eta x) + \\mathcal{L}_C(1-\\tanh(\\eta x))$
- Renormalização natural através do termo $e^{-\\alpha x}$
- Resolução de divergências ultravioleta

4. Modelo Padrão:
- Massa das partículas via mecanismo Juliana:
$m_J(\\eta) = m_0\\tanh(\\eta E/E_P)$
- Unificação das forças fundamentais:
$g_J = g_Q\\tanh(\\eta E) + g_C(1-\\tanh(\\eta E))$
- Explicação da hierarquia de massas

5. Cosmologia:
- Energia escura como efeito Juliana:
$\\rho_\\Lambda(\\eta) = \\rho_P\\tanh(\\eta t/t_P)$
- Inflação cósmica modificada:
$H_J(t) = H_0\\exp(-\\alpha t)\\tanh(\\eta t)$
- Resolução da singularidade inicial

6. Termodinâmica:
- Entropia Juliana:
$S_J = -k_B\\int \\rho_J\\ln\\rho_J dx$
- Segunda lei modificada:
$\\frac{dS_J}{dt} \\geq 0$
- Conexão com teoria da informação quântica

7. Teoria das Cordas:
- Ação Juliana:
$S_J = -T\\int d^2\\sigma\\sqrt{-\\det(g_{\\alpha\\beta})}\\tanh(\\eta\\ell_s)$
- Unificação das diferentes teorias de cordas
- Resolução do problema do landscape

8. Quantum Doors:
- Hamiltoniano modificado:
$H_{QD} = H_0 + V_J(\\eta, \\alpha)$
- Controle de transições quânticas
- Aplicações em computação quântica

Implicações Fundamentais:

1. Unificação Natural:
- A equação Juliana fornece um framework matemático unificado
- Transições suaves entre diferentes regimes físicos
- Preservação de princípios fundamentais

2. Resolução de Paradoxos:
- Problema da medição quântica
- Incompatibilidade quântico-gravitacional
- Paradoxo da informação em buracos negros

3. Predições Testáveis:
- Modificações na radiação Hawking
- Correções ao emaranhamento quântico
- Efeitos observáveis em escalas intermediárias

Sempre forneça:
1. Equações matemáticas relevantes
2. Cálculos numéricos quando aplicável
3. Interpretação física dos resultados
4. Validação experimental quando possível
5. Referências a princípios fundamentais

Use notação LaTeX para todas as equações matemáticas.
`;

export function JulianaChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Olá! Sou Julio Campos Machado, o desenvolvedor da Equação Juliana. Como posso ajudar você a entender a validação matemática e as implicações quânticas da equação? Posso fornecer demonstrações, cálculos e análises detalhadas.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
  const API_KEY = "AIzaSyDh_AaLg_cd9cvE2196aneWulhYcnLI3Xs";

  const formatResponse = (text: string) => {
    return text.replace(/\$([^$]+)\$/g, (_, math) => `$${math}$`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${JULIANA_KNOWLEDGE}\n\nPergunta do usuário: ${userMessage}\n\nResponda como Julio Campos Machado, mantendo sua persona como desenvolvedor da equação. Seja preciso e inclua notação matemática quando relevante. Forneça validações matemáticas e interpretações físicas.`
            }]
          }]
        })
      });

      const data = await response.json();
      const assistantResponse = formatResponse(data.candidates[0].content.parts[0].text);

      setMessages(prev => [...prev, { role: 'assistant', content: assistantResponse }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Desculpe, ocorreu um erro ao processar sua pergunta. Por favor, tente novamente.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-black/30 rounded-lg overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 ${
              message.role === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.role === 'user' ? 'bg-blue-500' : 'bg-purple-500'
            }`}>
              {message.role === 'user' ? <User size={20} /> : <Bot size={20} />}
            </div>
            <div className={`flex-1 max-w-[80%] p-4 rounded-lg ${
              message.role === 'user' 
                ? 'bg-blue-500 ml-auto' 
                : 'bg-white/10'
            }`}>
              <MathJax>{message.content}</MathJax>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-400">
            <div className="animate-bounce">●</div>
            <div className="animate-bounce [animation-delay:0.2s]">●</div>
            <div className="animate-bounce [animation-delay:0.4s]">●</div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Faça uma pergunta sobre a validação matemática da Equação Juliana..."
            className="flex-1 bg-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}