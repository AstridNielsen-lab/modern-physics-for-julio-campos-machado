import { Component, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-4">
          <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm max-w-2xl text-center">
            <h1 className="text-3xl font-bold mb-4 text-red-400">Oops! Algo deu errado</h1>
            <p className="text-gray-300 mb-6">
              Desculpe pelo inconveniente. Ocorreu um erro ao tentar carregar esta página.
            </p>
            <div className="space-y-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors text-lg"
              >
                Voltar para página inicial
              </Link>
              <p className="text-gray-400 text-sm mt-4">
                Se o problema persistir, por favor entre em contato com o desenvolvedor.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

