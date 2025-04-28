import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MathJaxContext } from 'better-react-mathjax';
import { Home } from './pages/Home';
import { Theory } from './pages/Theory';
import { Simulations } from './pages/Simulations';
import { SplashScreen } from './components/SplashScreen';

const mathJaxConfig = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [["$", "$"]],
    displayMath: [["$$", "$$"]]
  }
};

function App() {
  return (
    <MathJaxContext config={mathJaxConfig}>
      <SplashScreen />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teoria" element={<Theory />} />
          <Route path="/simulacoes" element={<Simulations />} />
        </Routes>
      </Router>
    </MathJaxContext>
  );
}

export default App;