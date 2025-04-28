import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Info, FlaskRound as Flask, Book, Lightbulb } from 'lucide-react';
import { Line, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { theories } from '../data/theories';
import { RelativityVisualization } from '../components/RelativityVisualization';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function Theory() {
  const { id } = useParams();
  const theory = theories.find(t => t.id === id);

  // Destroy chart instance when component unmounts or theory changes
  React.useEffect(() => {
    return () => {
      const chartInstance = ChartJS.getChart("theory-chart");
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [id]);

  if (!theory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-4">Teoria não encontrada</h1>
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft size={20} /> Voltar para página inicial
          </Link>
        </div>
      </div>
    );
  }

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
          <div className="flex gap-4">
            <button className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
              <Download size={20} /> Exportar PDF
            </button>
            <button className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
              <Share2 size={20} /> Compartilhar
            </button>
          </div>
        </div>

        <div className="bg-black/30 rounded-lg p-8 mb-8">
          <h1 className="text-4xl font-bold mb-4">{theory.title}</h1>
          <p className="text-xl text-gray-300">{theory.shortDescription}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Book size={24} className="text-blue-400" />
              Equação Fundamental
            </h2>
            <div className="bg-black/30 p-6 rounded mb-4 font-mono text-xl overflow-x-auto">
              {theory.equation}
            </div>
            <div className="flex items-start gap-2 text-gray-300">
              <Info size={20} className="mt-1 flex-shrink-0" />
              <p className="text-sm">
                Esta equação representa a formulação matemática central da teoria, capturando suas principais características e previsões.
              </p>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Lightbulb size={24} className="text-blue-400" />
              Descrição
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">{theory.description}</p>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Flask size={24} className="text-blue-400" />
            Visualização
          </h2>
          {theory.id === 'relatividade' ? (
            <RelativityVisualization />
          ) : (
            <div className="h-[400px]">
              {theory.visualization.type === 'line' ? (
                <Line 
                  id="theory-chart"
                  data={theory.visualization.data} 
                  options={theory.visualization.options} 
                />
              ) : (
                <Radar 
                  id="theory-chart"
                  data={theory.visualization.data} 
                  options={theory.visualization.options} 
                />
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4">Limitações</h2>
            <div className="space-y-4">
              {theory.limitations.map((limitation, index) => (
                <div key={index} className="bg-black/30 p-4 rounded">
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-gray-300">{limitation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-6">Aplicações e Implicações</h2>
            <div className="space-y-6">
              <div className="bg-black/30 p-6 rounded">
                <h3 className="text-xl font-semibold mb-3">Tecnologia</h3>
                <p className="text-gray-300">{theory.applications.technology}</p>
              </div>
              <div className="bg-black/30 p-6 rounded">
                <h3 className="text-xl font-semibold mb-3">Pesquisa</h3>
                <p className="text-gray-300">{theory.applications.research}</p>
              </div>
              <div className="bg-black/30 p-6 rounded">
                <h3 className="text-xl font-semibold mb-3">Impacto</h3>
                <p className="text-gray-300">{theory.applications.impact}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}