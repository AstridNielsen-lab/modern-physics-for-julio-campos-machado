import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MathJaxContext } from 'better-react-mathjax';
import { Home } from './pages/Home';
import { Theory } from './pages/Theory';
import { Simulations } from './pages/Simulations';
import { SimulationPage } from './pages/SimulationPage';
import { AtomSimulator } from './pages/LabAton';
import { SplashScreen } from './components/SplashScreen';
import { ErrorBoundary } from './components/ErrorBoundary';

const mathJaxConfig = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html", 'base', 'ams', 'noerrors', 'noundefined'] },
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]]
  },
  svg: {
    fontCache: 'global'
  }
};

function App() {
  return (
    <MathJaxContext config={mathJaxConfig}>
      <ErrorBoundary>
        <Router>
          <SplashScreen />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teoria" element={<Theory />} />
            <Route path="/simulacoes" element={<Simulations />} />
            <Route path="/atom-simulator" element={<AtomSimulator />} />
            <Route path="/LabAton" element={<AtomSimulator />} /> {/* Keep old route for backward compatibility */}
          </Routes>
        </Router>
      </ErrorBoundary>
    </MathJaxContext>
  );
}

export default App;