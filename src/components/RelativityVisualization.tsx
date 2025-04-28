import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { MathJax } from 'better-react-mathjax';

function SpacetimeMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const geometry = useMemo(() => {
    const size = 20;
    const segments = 50;
    const geometry = new THREE.PlaneGeometry(size, size, segments, segments);
    const positions = geometry.attributes.position;

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const distance = Math.sqrt(x * x + y * y);
      
      // Schwarzschild-like warping
      const warpFactor = 2;
      const z = -warpFactor / (distance + 1);
      
      positions.setZ(i, z);
    }

    geometry.computeVertexNormals();
    return geometry;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.001;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshPhongMaterial 
        color="#4a90e2"
        wireframe
        side={THREE.DoubleSide}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

function BlackHole() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={sphereRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhongMaterial color="#000000" />
    </mesh>
  );
}

function AccretionDisk() {
  const diskRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geometry = new THREE.TorusGeometry(2, 0.2, 16, 100);
    return geometry;
  }, []);

  useFrame((state) => {
    if (diskRef.current) {
      diskRef.current.rotation.z += 0.005;
    }
  });

  return (
    <mesh ref={diskRef} geometry={geometry} rotation={[Math.PI / 2, 0, 0]}>
      <meshPhongMaterial 
        color="#ff4444"
        emissive="#ff0000"
        emissiveIntensity={0.5}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

export function RelativityVisualization() {
  return (
    <div className="space-y-6">
      <div className="w-full h-[600px] bg-black/30 rounded-lg overflow-hidden">
        <Canvas camera={{ position: [10, 10, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <SpacetimeMesh />
          <BlackHole />
          <AccretionDisk />
          <OrbitControls enablePan={false} />
        </Canvas>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/30 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Equações de Einstein</h3>
          <MathJax className="text-gray-300 mb-4">
            {"$G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\frac{8\\pi G}{c^4}T_{\\mu\\nu}$"}
          </MathJax>
          <p className="text-gray-300">
            As equações de Einstein descrevem como a distribuição de matéria e energia curva o espaço-tempo, 
            e como essa curvatura influencia o movimento dos objetos. Esta é a essência da Relatividade Geral.
          </p>
        </div>

        <div className="bg-black/30 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Métrica de Schwarzschild</h3>
          <MathJax className="text-gray-300 mb-4">
            {"$ds^2 = -\\left(1-\\frac{2GM}{rc^2}\\right)c^2dt^2 + \\left(1-\\frac{2GM}{rc^2}\\right)^{-1}dr^2 + r^2d\\Omega^2$"}
          </MathJax>
          <p className="text-gray-300">
            A métrica de Schwarzschild descreve a geometria do espaço-tempo ao redor de um objeto massivo esfericamente simétrico, 
            como um buraco negro.
          </p>
        </div>
      </div>

      <div className="bg-black/30 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Interpretação Física</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
          <div>
            <h4 className="font-medium mb-2">Curvatura do Espaço-tempo</h4>
            <ul className="space-y-2">
              <li>• A matéria deforma o tecido do espaço-tempo</li>
              <li>• Objetos seguem geodésicas neste espaço curvo</li>
              <li>• A gravidade emerge como efeito geométrico</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Efeitos Relativísticos</h4>
            <ul className="space-y-2">
              <li>• Dilatação temporal gravitacional</li>
              <li>• Desvio da luz por campos gravitacionais</li>
              <li>• Precessão do periélio de Mercúrio</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Fenômenos Extremos</h4>
            <ul className="space-y-2">
              <li>• Formação de buracos negros</li>
              <li>• Ondas gravitacionais</li>
              <li>• Singularidades espaciotemporais</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-black/30 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Visualização Interativa</h3>
        <p className="text-gray-300 leading-relaxed">
          Esta visualização demonstra como um objeto massivo, como um buraco negro, deforma o tecido do espaço-tempo ao seu redor. 
          A malha azul representa o espaço-tempo quadridimensional projetado em três dimensões, onde podemos observar o 
          característico "poço gravitacional" formado pela massa central. O disco vermelho representa o disco de acreção, 
          uma estrutura comum ao redor de buracos negros formada por matéria em órbita antes de cruzar o horizonte de eventos.
        </p>
        <p className="text-gray-300 mt-4 leading-relaxed">
          A visualização é interativa: você pode rotacionar e fazer zoom para explorar diferentes aspectos da geometria. 
          Observe como a curvatura se torna mais pronunciada próximo ao centro, ilustrando o intenso campo gravitacional 
          nessa região.
        </p>
      </div>
    </div>
  );
}