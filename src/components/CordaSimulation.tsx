import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { MathJax } from 'better-react-mathjax';

function StringMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const points = useRef<THREE.Vector3[]>([]);
  const time = useRef(0);

  useEffect(() => {
    // Initialize string points
    const numPoints = 50;
    for (let i = 0; i < numPoints; i++) {
      const t = (i / (numPoints - 1)) * Math.PI * 2;
      points.current.push(new THREE.Vector3(
        Math.cos(t),
        Math.sin(t),
        0
      ));
    }
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    time.current += 0.01;
    
    // Update string points for vibration
    points.current.forEach((point, i) => {
      const t = (i / (points.current.length - 1)) * Math.PI * 2;
      point.x = Math.cos(t + time.current);
      point.y = Math.sin(t + time.current);
      point.z = Math.sin(t * 2 + time.current) * 0.5;
    });

    // Update geometry
    if (meshRef.current.geometry instanceof THREE.BufferGeometry) {
      const positions = new Float32Array(points.current.length * 3);
      points.current.forEach((point, i) => {
        positions[i * 3] = point.x;
        positions[i * 3 + 1] = point.y;
        positions[i * 3 + 2] = point.z;
      });
      meshRef.current.geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      );
    }
  });

  return (
    <line ref={meshRef}>
      <bufferGeometry />
      <lineBasicMaterial color="#4a90e2" linewidth={2} />
    </line>
  );
}

export function CordaSimulation() {
  return (
    <div className="space-y-6">
      <div className="h-[400px] bg-black/30 rounded-lg overflow-hidden">
        <Canvas camera={{ position: [3, 3, 3], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <StringMesh />
          <OrbitControls enablePan={false} />
        </Canvas>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Ação de Nambu-Goto</h3>
          <MathJax className="text-gray-300">
            {"$S = -T\\int d^2\\sigma\\sqrt{-\\det(g_{\\alpha\\beta}\\partial_\\alpha X^\\mu\\partial_\\beta X_\\mu)}$"}
          </MathJax>
        </div>
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Dimensões Extras</h3>
          <p className="text-gray-300">
            A teoria requer 10 dimensões espaciotemporais (ou 11 para M-teoria) para consistência matemática.
          </p>
        </div>
      </div>

      <div className="bg-black/30 p-4 rounded">
        <h3 className="font-semibold mb-2">Modos de Vibração</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
          <div>
            <h4 className="font-medium mb-2">Bósons</h4>
            <ul className="space-y-1">
              <li>• Gráviton (spin-2)</li>
              <li>• Bósons de gauge (spin-1)</li>
              <li>• Campos escalares (spin-0)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Férmions</h4>
            <ul className="space-y-1">
              <li>• Quarks</li>
              <li>• Léptons</li>
              <li>• Superpartículas</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Dualidades</h4>
            <ul className="space-y-1">
              <li>• T-dualidade</li>
              <li>• S-dualidade</li>
              <li>• U-dualidade</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}