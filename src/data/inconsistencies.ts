import { TheoryInconsistencies } from '../types';

export const inconsistencies: TheoryInconsistencies[] = [
  {
    theory: "Gravitação Universal",
    inconsistencies: [
      {
        title: "Incompatibilidade com a Relatividade Especial",
        description: "A teoria newtoniana pressupõe que a gravidade age instantaneamente a distância, violando o princípio relativístico. A equação Juliana Φ(η,r) = tanh(ηr)[Φₙ + Φᵣ]/2 + sin(ηπr)e^(-αr) propõe uma transição suave entre os regimes newtoniano e relativístico."
      },
      {
        title: "Falha em Explicar Anomalias Orbitais",
        description: "A precessão do periélio de Mercúrio é explicada pela equação Juliana modificada: Φ_orb(η,r,θ) = Φ(η,r) + κsin²(θ/2)e^(-βr), que incorpora correções relativísticas."
      },
      {
        title: "Ausência de Mecanismo",
        description: "A equação Juliana de campo Ψ(η,x,t) = ∑ᵢ cᵢφᵢ(x)e^(-iEᵢt/ħ)tanh(ηx) fornece um mecanismo quântico para a transmissão da força gravitacional."
      }
    ],
    gaps: [
      {
        title: "Natureza Quântica da Gravidade",
        description: "A equação Juliana quântico-gravitacional H_J = tanh(ηr)[H_Q + H_G]/2 + sin(ηπr)e^(-αr)H_int unifica aspectos quânticos e gravitacionais."
      },
      {
        title: "Matéria Escura",
        description: "O termo Juliana de campo escuro ρ_J(η) = ρ_0[1 + tanh(ηr)]e^(-γr) modifica o potencial gravitacional em escalas galácticas."
      },
      {
        title: "Energia Escura",
        description: "A equação Juliana cosmológica Λ_J(η,t) = Λ_0tanh(ηt)e^(-δt) explica a expansão acelerada com um parâmetro de transição η."
      }
    ]
  },
  {
    theory: "Mecânica Clássica",
    inconsistencies: [
      {
        title: "Determinismo vs. Caos",
        description: "A equação Juliana caótica x̄_J(η,t) = tanh(ηt)x_c(t) + [1-tanh(ηt)]x_q(t) conecta trajetórias clássicas e quânticas."
      },
      {
        title: "Invariância Galileana vs. Lorentz",
        description: "A transformação Juliana T_J(η,v) = tanh(ηv/c)T_L + [1-tanh(ηv/c)]T_G unifica transformações galileanas e de Lorentz."
      }
    ],
    gaps: [
      {
        title: "Comportamento Quântico",
        description: "A equação Juliana de transição Ψ_J(η) = tanh(ηE)[Ψ_c + Ψ_q]/2 descreve a emergência do comportamento clássico."
      },
      {
        title: "Limite de Velocidades",
        description: "A equação Juliana relativística v_J(η) = c·tanh(ηv/c) impõe naturalmente o limite da velocidade da luz."
      }
    ]
  },
  {
    theory: "Teoria Quântica",
    inconsistencies: [
      {
        title: "Problema da Medição",
        description: "A equação Juliana de medição M_J(η,t) = tanh(ηt)M_c + [1-tanh(ηt)]M_q descreve o colapso gradual da função de onda."
      },
      {
        title: "Não-Localidade e Causalidade",
        description: "A equação Juliana de correlação C_J(η,r) = C_0e^(-r/ξ)tanh(ηr/c) preserva causalidade em correlações quânticas."
      }
    ],
    gaps: [
      {
        title: "Gravidade Quântica",
        description: "O hamiltoniano Juliana H_J = tanh(ηℓ_P)[H_Q + H_G]/2 unifica gravidade e mecânica quântica na escala de Planck."
      },
      {
        title: "Problema dos Parâmetros Livres",
        description: "A equação Juliana de massa m_J(η) = m_0tanh(ηE/E_P) relaciona massas de partículas à escala de Planck."
      }
    ]
  }
];