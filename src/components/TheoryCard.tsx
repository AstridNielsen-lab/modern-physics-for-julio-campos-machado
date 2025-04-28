import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Theory } from '../types';

interface TheoryCardProps {
  theory: Theory;
}

export function TheoryCard({ theory }: TheoryCardProps) {
  return (
    <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm hover:bg-white/15 transition-colors">
      <h3 className="text-xl font-semibold mb-4">{theory.title}</h3>
      <div className="bg-black/30 p-4 rounded mb-4 font-mono text-sm overflow-x-auto">
        {theory.equation}
      </div>
      <p className="text-gray-300 mb-6">{theory.shortDescription}</p>
      <Link 
        to={`/teoria/${theory.id}`}
        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group"
      >
        Explorar teoria
        <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}