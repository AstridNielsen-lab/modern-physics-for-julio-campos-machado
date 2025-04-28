import { Theory } from '../types';

export const theories: Theory[] = [
  {
    id: 'quantum-doors',
    title: 'Quantum Doors e Cristais Isocovalentes',
    equation: 'H = H_material + H_campo + H_interacao',
    shortDescription: 'Uma teoria inovadora na fronteira da física de materiais e eletrodinâmica quântica, propondo mecanismos para manipulação da matéria e energia em escala subatômica.',
    description: 'A teoria dos Quantum Doors e Cristais Isocovalentes representa uma abordagem revolucionária na física moderna, combinando princípios de física de materiais, eletrodinâmica quântica (QED) e ciência computacional. O conceito central envolve materiais isocovalentes, projetados em nível atômico para exibir ligações covalentes de alta estabilidade e simetria, resultando em distribuições de carga elétrica e estados quânticos eletrônicos excepcionalmente controláveis. Através da manipulação precisa de dopagem iônica, interações laser-cristal e campos magnéticos dinâmicos, a teoria propõe mecanismos para canalização quântica e manipulação do vácuo quântico.',
    limitations: [
      'Desafios na fabricação de cristais isocovalentes com pureza e estrutura necessárias',
      'Complexidade no controle simultâneo de múltiplos campos e interações quânticas',
      'Limitações tecnológicas na precisão de dopagem e manipulação em escala atômica',
      'Dificuldades na medição e verificação experimental dos efeitos quânticos propostos',
      'Necessidade de poder computacional significativo para simulações precisas'
    ],
    applications: {
      technology: 'A teoria tem potenciais aplicações revolucionárias em propulsão quântica, computação quântica avançada e desenvolvimento de novos materiais. As técnicas de manipulação quântica propostas poderiam levar a avanços significativos em armazenamento de energia, telecomunicações quânticas e tecnologias de transporte.',
      research: 'Abre novos caminhos para pesquisa em física de materiais, eletrodinâmica quântica e ciência computacional. A teoria fornece um framework para investigar interações fundamentais entre matéria e campos quânticos, com implicações para nossa compreensão do vácuo quântico e forças fundamentais.',
      impact: 'O impacto potencial abrange desde avanços em tecnologia espacial até revolucionar nossa compreensão das interações fundamentais da natureza. As aplicações em propulsão quântica poderiam transformar a exploração espacial, enquanto as técnicas de manipulação de materiais poderiam levar a novas tecnologias de energia e computação.'
    },
    visualization: {
      type: 'line',
      data: {
        labels: ['0', '1', '2', '3', '4', '5'],
        datasets: [
          {
            label: 'Energia de Interação',
            data: [0, 0.2, 0.5, 1.2, 2.1, 3.5],
            borderColor: 'rgb(255, 159, 64)',
            tension: 0.4
          },
          {
            label: 'Densidade Eletrônica',
            data: [3.5, 2.8, 2.1, 1.5, 0.8, 0.2],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Interação Quântica vs. Densidade Eletrônica',
            color: 'white'
          },
          legend: {
            labels: {
              color: 'white'
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Distância (nm)',
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
            title: {
              display: true,
              text: 'Energia/Densidade',
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
    }
  },
  {
    id: 'gravitacao',
    title: 'Gravitação Universal',
    equation: 'Φ(r) = -G ∫ ρ(r\')/|r - r\'| d³r\'',
    shortDescription: 'A teoria da gravitação universal descreve a força que atua entre todos os corpos massivos do universo, estabelecendo os fundamentos para nossa compreensão da dinâmica celeste.',
    description: 'A teoria da gravitação universal representa um marco na história da física, unificando pela primeira vez os fenômenos celestes e terrestres sob um mesmo princípio físico. Esta reformulação moderna em termos de campos e potenciais não apenas estabelece uma ponte conceitual com a Relatividade Geral, mas também revela aspectos profundos sobre a natureza do espaço, tempo e matéria. A teoria incorpora conceitos de geometria diferencial e análise tensorial, permitindo uma descrição mais rigorosa e matematicamente sofisticada dos fenômenos gravitacionais. Através desta formulação, podemos compreender desde o movimento de planetas e galáxias até a formação de estruturas cósmicas em larga escala.',
    limitations: [
      'Incompatibilidade fundamental com a invariância de Lorentz, violando princípios básicos da relatividade especial',
      'Incapacidade de explicar com precisão a precessão do periélio de Mercúrio, revelando limitações na descrição de campos gravitacionais intensos',
      'Ausência de um mecanismo físico para a transmissão instantânea da força gravitacional, contradizendo o princípio de localidade',
      'Falha em descrever fenômenos gravitacionais extremos como buracos negros e ondas gravitacionais',
      'Incompatibilidade com princípios quânticos fundamentais, impossibilitando uma descrição unificada da gravidade'
    ],
    applications: {
      technology: 'A teoria é fundamental para o desenvolvimento de tecnologias espaciais modernas, incluindo sistemas de navegação por satélite (GPS), cálculos precisos de trajetórias para missões espaciais, e o design de sistemas de propulsão. Sua aplicação se estende à geofísica, permitindo estudos detalhados da estrutura interna da Terra e outros corpos celestes.',
      research: 'Continua sendo a base para pesquisas em astrofísica, cosmologia e exploração espacial. É essencial para estudos de formação e evolução de galáxias, dinâmica de sistemas planetários, e desenvolvimento de modelos cosmológicos. A teoria também serve como ponto de partida para investigações em gravidade quântica e teorias de unificação.',
      impact: 'Além de revolucionar nossa compreensão do universo, a teoria impulsionou avanços tecnológicos significativos em navegação, comunicação espacial e exploração planetária. Seu impacto se estende à geologia, climatologia e até mesmo ao desenvolvimento de tecnologias de precisão em diversos campos.'
    },
    visualization: {
      type: 'line',
      data: {
        labels: ['0', '1', '2', '3', '4', '5'],
        datasets: [
          {
            label: 'Potencial Gravitacional',
            data: [100, 25, 11.11, 6.25, 4, 2.77],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Potencial Gravitacional vs. Distância',
            color: 'white'
          },
          legend: {
            labels: {
              color: 'white'
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Distância (r)',
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
            title: {
              display: true,
              text: 'Potencial (V)',
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
    }
  },
  {
    id: 'quantica',
    title: 'Teoria Quântica',
    equation: '[x̂ᵢ, p̂ⱼ] = iℏδᵢⱼ',
    shortDescription: 'A teoria quântica revolucionou nossa compreensão do mundo microscópico, revelando uma realidade fundamentalmente probabilística e interconectada.',
    description: 'A teoria quântica representa uma das maiores revoluções conceituais na história da física. Esta reformulação moderna enfatiza sua estrutura algébrica profunda e sua formulação em termos de espaços de Hilbert e teoria de representação. O formalismo matemático, baseado em operadores em espaços complexos e princípios de superposição, revela uma realidade fundamentalmente diferente de nossa intuição clássica. A teoria incorpora conceitos como emaranhamento quântico, dualidade onda-partícula e princípio da incerteza, que desafiam nossas noções básicas de realidade e causalidade. Através desta formulação, podemos compreender fenômenos como tunelamento quântico, interferência de partículas únicas e correlações não-locais.',
    limitations: [
      'O problema fundamental da medição e o colapso da função de onda permanecem questões filosóficas e físicas não resolvidas',
      'A tensão entre não-localidade quântica e causalidade relativística sugere limitações profundas em nossa compreensão do espaço-tempo',
      'Incompatibilidade com a Relatividade Geral impede uma descrição unificada da natureza',
      'Dificuldades na interpretação física do formalismo matemático e questões sobre a realidade objetiva',
      'Problemas na descrição de sistemas macroscópicos e na transição entre regimes quântico e clássico'
    ],
    applications: {
      technology: 'A teoria quântica é a base para tecnologias revolucionárias como computação quântica, criptografia quântica, e desenvolvimento de novos materiais. Suas aplicações incluem lasers, transistores, microscópios de tunelamento e sensores quânticos de alta precisão. A teoria também é fundamental para o desenvolvimento de tecnologias emergentes em comunicação e processamento de informação.',
      research: 'Fundamental para física de partículas, química quântica e ciência de materiais. A teoria permite o desenvolvimento de novos estados da matéria, como condensados de Bose-Einstein, e é essencial para compreender fenômenos como supercondutividade e superfluidos. Suas implicações se estendem à biologia quântica e estudos de consciência.',
      impact: 'Além de revolucionar nossa compreensão da natureza, a teoria quântica possibilitou o desenvolvimento de tecnologias que transformaram a sociedade moderna. Seu impacto se estende da eletrônica à medicina, com aplicações em imageamento médico, terapias baseadas em radiação e desenvolvimento de novos fármacos.'
    },
    visualization: {
      type: 'radar',
      data: {
        labels: ['Posição', 'Momento', 'Energia', 'Tempo', 'Spin', 'Probabilidade'],
        datasets: [
          {
            label: 'Incerteza Quântica',
            data: [0.8, 0.9, 0.7, 0.6, 0.95, 0.85],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgb(75, 192, 192)',
            pointBackgroundColor: 'rgb(75, 192, 192)'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Relações de Incerteza',
            color: 'white'
          },
          legend: {
            labels: {
              color: 'white'
            }
          }
        },
        scales: {
          r: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            pointLabels: {
              color: 'white'
            },
            ticks: {
              color: 'white'
            }
          }
        }
      }
    }
  },
  {
    id: 'relatividade',
    title: 'Relatividade Geral',
    equation: 'Rᵤᵥ - ½Rgᵤᵥ + Λgᵤᵥ = 8πG/c⁴ Tᵤᵥ',
    shortDescription: 'A teoria da relatividade geral redefine nossa compreensão da gravidade como uma manifestação da curvatura do espaço-tempo, unificando espaço, tempo e matéria.',
    description: 'A Relatividade Geral representa o ápice da física clássica, apresentando uma visão revolucionária da gravidade como geometria. Esta reformulação moderna enfatiza sua estrutura matemática profunda através da geometria diferencial e topologia, revelando como a matéria e energia curvam o tecido do espaço-tempo. A teoria incorpora princípios de covariância geral e equivalência, estabelecendo uma conexão fundamental entre geometria e física. Através deste formalismo, podemos compreender fenômenos como buracos negros, ondas gravitacionais e a expansão do universo. A teoria também prevê efeitos como dilatação temporal gravitacional e lentes gravitacionais, todos confirmados experimentalmente.',
    limitations: [
      'A presença inevitável de singularidades espaciotemporais indica limites fundamentais da teoria em condições extremas',
      'Incompatibilidade estrutural com a mecânica quântica impede uma teoria unificada da gravidade quântica',
      'O problema da energia do vácuo e sua relação com a constante cosmológica permanece sem solução',
      'Dificuldades na quantização da gravidade e na descrição de fenômenos em escala de Planck',
      'Questões sobre a natureza da energia escura e sua relação com a expansão acelerada do universo'
    ],
    applications: {
      technology: 'A teoria é essencial para sistemas GPS, que devem considerar efeitos relativísticos para manter precisão. Suas aplicações se estendem à navegação espacial, comunicação por satélite e desenvolvimento de tecnologias para detecção de ondas gravitacionais. A teoria também influencia o desenvolvimento de tecnologias de sincronização de alta precisão e sistemas de referência temporal.',
      research: 'Fundamental para cosmologia moderna, astrofísica e estudos de ondas gravitacionais. A teoria permite investigações sobre a origem e evolução do universo, natureza de buracos negros e estrutura em larga escala do cosmos. Suas implicações se estendem a estudos de energia escura, matéria escura e teorias de unificação.',
      impact: 'Além de revolucionar nossa compreensão do universo, a teoria possibilitou avanços tecnológicos significativos em navegação, comunicação e observação astronômica. Seu impacto se estende à filosofia da ciência e nossa compreensão fundamental de espaço, tempo e causalidade.'
    },
    visualization: {
      type: 'line',
      data: {
        labels: ['0', '0.2', '0.4', '0.6', '0.8', '1.0'],
        datasets: [
          {
            label: 'Curvatura do Espaço-tempo',
            data: [0, 0.2, 0.8, 1.8, 3.2, 5],
            borderColor: 'rgb(153, 102, 255)',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Curvatura vs. Massa',
            color: 'white'
          },
          legend: {
            labels: {
              color: 'white'
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Massa (M/M☉)',
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
            title: {
              display: true,
              text: 'Curvatura',
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
    }
  },
  {
    id: 'eletromagnetismo',
    title: 'Teoria Eletromagnética',
    equation: '∇ × E = -∂B/∂t, ∇ × B = μ₀J + μ₀ε₀∂E/∂t',
    shortDescription: 'A teoria eletromagnética unifica eletricidade e magnetismo, revelando a natureza fundamental das interações eletromagnéticas e da luz.',
    description: 'A teoria eletromagnética de Maxwell representa uma das primeiras grandes unificações da física, demonstrando que eletricidade e magnetismo são manifestações diferentes de um mesmo fenômeno fundamental. O formalismo matemático, expresso através das equações de Maxwell, revela a natureza ondulatória da luz e estabelece a existência de ondas eletromagnéticas. A teoria introduz conceitos revolucionários como campos que se propagam no espaço, interação à distância através de campos, e a velocidade finita de propagação das interações eletromagnéticas. Esta formulação moderna incorpora aspectos de teoria de gauge e simetria, conectando o eletromagnetismo com teorias mais fundamentais da física de partículas.',
    limitations: [
      'Incompatibilidade com a mecânica quântica em escalas microscópicas, necessitando da eletrodinâmica quântica',
      'Divergências infinitas em cálculos de auto-energia e outros fenômenos que requerem renormalização',
      'Dificuldades na descrição de fenômenos em meios fortemente correlacionados e sistemas complexos',
      'Limitações na descrição de efeitos não-lineares extremos e fenômenos de alta energia',
      'Questões sobre a natureza do vácuo eletromagnético e suas flutuações quânticas'
    ],
    applications: {
      technology: 'A teoria é a base para praticamente toda a tecnologia moderna, desde telecomunicações até dispositivos eletrônicos. Suas aplicações incluem geração e transmissão de energia elétrica, tecnologias de comunicação sem fio, dispositivos optoeletrônicos, e desenvolvimento de novos materiais com propriedades eletromagnéticas específicas.',
      research: 'Fundamental para pesquisas em física do estado sólido, fotônica, plasmônica e desenvolvimento de metamateriais. A teoria continua sendo essencial para avanços em tecnologias quânticas, comunicação óptica e desenvolvimento de novos dispositivos eletrônicos e fotônicos.',
      impact: 'O impacto da teoria eletromagnética na sociedade é praticamente imensurável, tendo revolucionado completamente nossa forma de vida através da eletrificação, telecomunicações e tecnologia da informação. Continua sendo fundamental para inovações em energia renovável, tecnologias verdes e comunicação avançada.'
    },
    visualization: {
      type: 'line',
      data: {
        labels: ['0', '1', '2', '3', '4', '5'],
        datasets: [
          {
            label: 'Campo Eletromagnético',
            data: [0, 1, 0, -1, 0, 1],
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Onda Eletromagnética',
            color: 'white'
          },
          legend: {
            labels: {
              color: 'white'
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Distância (λ)',
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
            title: {
              display: true,
              text: 'Amplitude',
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
    }
  },
  {
    id: 'termodinamica',
    title: 'Termodinâmica Estatística',
    equation: 'dS = δQ/T, S = k_B ln(Ω)',
    shortDescription: 'A termodinâmica estatística conecta o comportamento microscópico da matéria com suas propriedades macroscópicas, fundamentando nossa compreensão de calor, energia e entropia.',
    description: 'A termodinâmica estatística representa uma ponte fundamental entre o mundo microscópico e macroscópico, estabelecendo como as propriedades coletivas emergem do comportamento de inúmeras partículas individuais. Esta formulação moderna unifica os princípios clássicos da termodinâmica com a mecânica estatística, proporcionando uma compreensão profunda de fenômenos como equilíbrio térmico, irreversibilidade e entropia. A teoria incorpora conceitos de teoria da informação e complexidade, revelando conexões surpreendentes entre ordem, desordem e informação. Através deste formalismo, podemos entender desde o comportamento de gases ideais até fenômenos críticos e transições de fase.',
    limitations: [
      'Dificuldades na descrição de sistemas fortemente fora do equilíbrio',
      'Limitações na aplicação a sistemas com interações de longo alcance',
      'Problemas na descrição de sistemas com número muito pequeno de partículas',
      'Questões fundamentais sobre a origem microscópica da irreversibilidade',
      'Desafios na descrição de sistemas biológicos e outros sistemas complexos auto-organizados'
    ],
    applications: {
      technology: 'A teoria é fundamental para o desenvolvimento de tecnologias de conversão de energia, refrigeração e processos industriais. Suas aplicações incluem otimização de motores térmicos, design de materiais termoelétricos, e desenvolvimento de tecnologias de armazenamento de energia. A teoria também é crucial para avanços em nanotecnologia e design de dispositivos moleculares.',
      research: 'Essencial para pesquisas em física da matéria condensada, química física e biofísica. A teoria permite investigações de fenômenos críticos, transições de fase, e processos irreversíveis. Suas implicações se estendem ao estudo de sistemas complexos, desde materiais até sistemas biológicos.',
      impact: 'O impacto da termodinâmica estatística é profundo, desde aplicações práticas em engenharia até implicações fundamentais para nossa compreensão da natureza da informação e da seta do tempo. A teoria continua sendo crucial para enfrentar desafios em energia sustentável e tecnologias verdes.'
    },
    visualization: {
      type: 'line',
      data: {
        labels: ['0', '1', '2', '3', '4', '5'],
        datasets: [
          {
            label: 'Entropia vs. Energia',
            data: [0, 0.5, 1.2, 2.1, 3.2, 4.5],
            borderColor: 'rgb(255, 159, 64)',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Relação Entropia-Energia',
            color: 'white'
          },
          legend: {
            labels: {
              color: 'white'
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Energia (E)',
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
            title: {
              display: true,
              text: 'Entropia (S)',
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
    }
  },
  {
    id: 'modelopadrao',
    title: 'Modelo Padrão',
    equation: 'ℒ = -¼FᵃᵘᵛFᵃᵘᵛ + iψ̄γᵘDᵘψ + |Dᵘφ|² - V(φ)',
    shortDescription: 'O Modelo Padrão unifica três das quatro forças fundamentais da natureza, descrevendo as partículas elementares e suas interações.',
    description: 'O Modelo Padrão representa o ápice atual da física de partículas, unificando as interações forte, fraca e eletromagnética em um framework matemático coerente baseado em teorias de gauge. A teoria descreve todas as partículas elementares conhecidas e suas interações através de campos quânticos e simetrias fundamentais. O formalismo incorpora conceitos como quebra espontânea de simetria, mecanismo de Higgs e renormalização, permitindo previsões extraordinariamente precisas que foram confirmadas experimentalmente. A descoberta do bóson de Higgs em 2012 completou o quadro teórico, embora questões fundamentais ainda permaneçam.',
    limitations: [
      'Não incorpora a gravidade, deixando incompleta a unificação das forças fundamentais',
      'Não explica a matéria escura ou a energia escura observadas no universo',
      'Contém muitos parâmetros livres que precisam ser determinados experimentalmente',
      'Não explica a assimetria matéria-antimatéria observada no universo',
      'Problemas com hierarquia de massa e naturalidade em diferentes escalas de energia'
    ],
    applications: {
      technology: 'As aplicações tecnológicas derivadas do Modelo Padrão incluem aceleradores de partículas, detectores avançados, tecnologias de imageamento médico como PET scans, e desenvolvimentos em computação quântica. A compreensão das interações fundamentais também contribui para avanços em materiais supercondutores e tecnologias de energia nuclear.',
      research: 'Base para pesquisas em física de altas energias, cosmologia primordial e física nuclear. O modelo guia investigações sobre a origem da massa, a natureza do vácuo quântico e a possível existência de novas partículas e simetrias além do Modelo Padrão.',
      impact: 'O desenvolvimento do Modelo Padrão revolucionou nossa compreensão da matéria e energia, levando a avanços tecnológicos significativos em medicina nuclear, computação e energia. Seu impacto se estende à nossa compreensão da evolução do universo primitivo e da origem dos elementos.'
    },
    visualization: {
      type: 'radar',
      data: {
        labels: ['Quarks', 'Léptons', 'Bósons de Gauge', 'Higgs', 'Interações', 'Simetrias'],
        datasets: [
          {
            label: 'Complexidade Teórica',
            data: [0.9, 0.8, 0.95, 0.7, 0.85, 0.75],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Aspectos do Modelo Padrão',
            color: 'white'
          },
          legend: {
            labels: {
              color: 'white'
            }
          }
        },
        scales: {
          r: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            pointLabels: {
              color: 'white'
            },
            ticks: {
              color: 'white'
            }
          }
        }
      }
    }
  },
  {
    id: 'cosmologia',
    title: 'Cosmologia Moderna',
    equation: 'Rᵤᵥ - ½Rgᵤᵥ = 8πG/c⁴ Tᵤᵥ + Λgᵤᵥ',
    shortDescription: 'A cosmologia moderna combina relatividade geral, física de partículas e observações astronômicas para descrever a origem, evolução e estrutura do universo.',
    description: 'A cosmologia moderna representa uma síntese extraordinária de física teórica e observacional, proporcionando uma descrição coerente da evolução do universo desde o Big Bang até o presente. O modelo ΛCDM (Lambda Cold Dark Matter) incorpora elementos da relatividade geral, física de partículas e termodinâmica para explicar fenômenos como a expansão acelerada do universo, a radiação cósmica de fundo, a formação de estruturas em larga escala e a nucleossíntese primordial. A teoria também aborda questões fundamentais sobre a natureza do espaço, tempo e matéria em escalas cosmológicas.',
    limitations: [
      'O problema da singularidade inicial do Big Bang permanece sem solução',
      'A natureza da matéria escura e energia escura continua desconhecida',
      'Dificuldades em explicar a homogeneidade e isotropia  do universo sem inflação',
      'Tensões entre diferentes medidas da constante de Hubble',
      'Questões sobre a origem da assimetria matéria-antimatéria'
    ],
    applications: {
      technology: 'A cosmologia moderna impulsiona o desenvolvimento de tecnologias observacionais avançadas, incluindo telescópios espaciais, detectores de ondas gravitacionais e instrumentos de alta precisão para medição da radiação cósmica de fundo. Estas tecnologias têm aplicações em áreas como imageamento, sensoriamento remoto e metrologia.',
      research: 'Fundamental para investigações sobre a origem e destino do universo, formação de galáxias e estruturas em larga escala, e a natureza do espaço-tempo. A teoria também guia pesquisas em física fundamental, incluindo teorias de unificação e gravidade quântica.',
      impact: 'A cosmologia moderna transformou nossa compreensão do universo e nosso lugar nele, influenciando profundamente a cultura e filosofia. Seus avanços tecnológicos têm aplicações práticas em navegação espacial, comunicação e desenvolvimento de novos materiais e sensores.'
    },
    visualization: {
      type: 'line',
      data: {
        labels: ['0', '5', '10', '15', '20', '25'],
        datasets: [
          {
            label: 'Expansão do Universo',
            data: [0, 0.5, 1.2, 2.1, 3.5, 5.2],
            borderColor: 'rgb(54, 162, 235)',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'História da Expansão Cósmica',
            color: 'white'
          },
          legend: {
            labels: {
              color: 'white'
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Tempo (bilhões de anos)',
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
            title: {
              display: true,
              text: 'Fator de Escala',
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
    }
  },
  {
    id: 'teoriacordas',
    title: 'Teoria das Cordas',
    equation: 'S = -T∫d²σ√-det(gᵅᵝ∂ᵅXᵘ∂ᵝXᵥGᵘᵥ)',
    shortDescription: 'A teoria das cordas propõe uma descrição unificada de todas as partículas e forças fundamentais, incluindo a gravidade, através de objetos unidimensionais vibrantes.',
    description: 'A teoria das cordas representa uma tentativa ambiciosa de unificar todas as forças fundamentais da natureza, incluindo a gravidade, em um framework matemático consistente. A teoria propõe que todas as partículas e forças são manifestações de diferentes modos de vibração de objetos fundamentais unidimensionais - as cordas. Esta formulação incorpora naturalmente a gravidade quântica e sugere a existência de dimensões extras compactificadas. O formalismo matemático da teoria é extremamente rico, envolvendo geometria diferencial, teoria de grupos, topologia algébrica e outras estruturas matemáticas avançadas.',
    limitations: [
      'Ausência de previsões experimentalmente testáveis devido às altíssimas energias necessárias',
      'Multiplicidade de soluções possíveis (o problema do landscape)',
      'Dificuldades na formulação não-perturbativa completa da teoria',
      'Questões sobre a relevância física das dimensões extras',
      'Problemas na conexão com física de baixas energias observável'
    ],
    applications: {
      technology: 'Embora a teoria das cordas seja primariamente teórica, seus desenvolvimentos matemáticos têm aplicações em física da matéria condensada, computação quântica e desenvolvimento de novos materiais. A teoria também inspira novas abordagens para problemas em outras áreas da física e matemática.',
      research: 'A teoria fornece insights importantes para gravidade quântica, cosmologia primordial e física de buracos negros. Seus métodos matemáticos encontram aplicações em teoria quântica de campos, física nuclear e física da matéria condensada.',
      impact: 'O impacto principal da teoria das cordas tem sido no desenvolvimento de novas ferramentas matemáticas e conceituais para a física teórica. Suas ideias influenciam áreas como holografia, dualidade gauge-gravidade e entendimento de sistemas fortemente acoplados.'
    },
    visualization: {
      type: 'radar',
      data: {
        labels: ['Unificação', 'Gravidade Quântica', 'Dimensões Extras', 'Simetrias', 'Dualidades', 'Topologia'],
        datasets: [
          {
            label: 'Aspectos Teóricos',
            data: [0.95, 0.9, 0.85, 0.8, 0.75, 0.7],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgb(153, 102, 255)',
            pointBackgroundColor: 'rgb(153, 102, 255)'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Características da Teoria das Cordas',
            color: 'white'
          },
          legend: {
            labels: {
              color: 'white'
            }
          }
        },
        scales: {
          r: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            pointLabels: {
              color: 'white'
            },
            ticks: {
              color: 'white'
            }
          }
        }
      }
    }
  }
];