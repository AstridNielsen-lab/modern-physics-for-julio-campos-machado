import { useState, useRef, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { MathJax } from 'better-react-mathjax';

// Sound System
function useSound() {
  const [sounds, setSounds] = useState({
    explosion: null,
    smallExplosion: null
  });
  
  useEffect(() => {
    // Create audio listener and load sounds
    const listener = new THREE.AudioListener();
    const audioLoader = new THREE.AudioLoader();
    
    // Create explosion sound
    const explosionSound = new THREE.Audio(listener);
    audioLoader.load('/sounds/explosion.mp3', (buffer) => {
      explosionSound.setBuffer(buffer);
      explosionSound.setVolume(0.7);
      explosionSound.setLoop(false);
    }, undefined, (error) => {
      console.error('Error loading explosion sound:', error);
    });
    
    // Create small explosion/hit sound
    const smallExplosionSound = new THREE.Audio(listener);
    audioLoader.load('/sounds/hit.mp3', (buffer) => {
      smallExplosionSound.setBuffer(buffer);
      smallExplosionSound.setVolume(0.5);
      smallExplosionSound.setLoop(false);
    }, undefined, (error) => {
      console.error('Error loading hit sound:', error);
    });
    
    setSounds({
      explosion: explosionSound,
      smallExplosion: smallExplosionSound
    });
    
    return () => {
      // Clean up
      if (explosionSound) explosionSound.disconnect();
      if (smallExplosionSound) smallExplosionSound.disconnect();
    };
  }, []);
  
  const playSound = useCallback((soundType) => {
    const sound = sounds[soundType];
    if (sound && sound.isPlaying) {
      sound.stop();
    }
    if (sound) {
      sound.play();
    }
  }, [sounds]);
  
  return { playSound };
}

// Spaceship component
function Spaceship({ position, rotation, color }) {
  const shipRef = useRef<THREE.Group>();
  
  useFrame(() => {
    if (shipRef.current) {
      shipRef.current.rotation.z = rotation;
    }
  });

  return (
    <group ref={shipRef} position={[position.x, position.y, 0]}>
      <mesh>
        <coneGeometry args={[0.5, 1.5, 4]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, -0.8, 0]}>
        <boxGeometry args={[1, 0.2, 0.2]} />
        <meshStandardMaterial color="#3498db" />
      </mesh>
      <pointLight position={[0, -0.8, 0]} intensity={1} color="#3498db" distance={2} />
    </group>
  );
}

// Damaged Asteroid Particles component
function DamagedAsteroidParticles({ position, size }) {
  const particlesRef = useRef<THREE.Group>();
  const particles = useRef<THREE.Mesh[]>([]);
  
  useEffect(() => {
    // Create a small number of particles that emit from the damaged asteroid
    particles.current = Array(5).fill(null).map(() => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.05 * Math.random() + 0.02, 8, 8),
        new THREE.MeshStandardMaterial({ 
          color: new THREE.Color('#ff6600'),
          emissive: '#ff4400',
          emissiveIntensity: 2
        })
      );
      
      // Random velocity - small emission
      mesh.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05
        )
      };
      
      if (particlesRef.current) {
        particlesRef.current.add(mesh);
      }
      return mesh;
    });
    
    return () => {
      particles.current = [];
    };
  }, []);
  
  useFrame(() => {
    particles.current.forEach(particle => {
      if (particle) {
        particle.position.add(particle.userData.velocity);
        particle.scale.multiplyScalar(0.97); // Slowly fade away
      }
    });
  });
  
  return (
    <group ref={particlesRef} position={[position.x, position.y, 0]}>
      <pointLight color="#ff6600" intensity={1} distance={1} decay={2} />
    </group>
  );
}

// Asteroid component
function Asteroid({ position, size, rotation, speed, hits = 0 }) {
  const asteroidRef = useRef<THREE.Group>();
  const meshRef = useRef<THREE.Mesh>();
  const [asteroidGeometry] = useState(() => {
    const geometry = new THREE.IcosahedronGeometry(size, 0);
    // Add some random deformation to make asteroids look unique
    const positions = geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);
      const deform = 0.2 * (Math.random() - 0.5);
      positions.setX(i, x * (1 + deform));
      positions.setY(i, y * (1 + deform));
      positions.setZ(i, z * (1 + deform));
    }
    return geometry;
  });
  
  useFrame(() => {
    if (asteroidRef.current) {
      asteroidRef.current.rotation.x += rotation.x;
      asteroidRef.current.rotation.y += rotation.y;
      asteroidRef.current.rotation.z += rotation.z;
      asteroidRef.current.position.y -= speed;
    }
  });

  // Determine asteroid color based on hits
  const color = hits === 0 ? "#a0a0a0" : "#ff4400";
  const emissive = hits === 0 ? "#000000" : "#ff2200";
  const emissiveIntensity = hits === 0 ? 0 : 0.5;
  
  return (
    <group ref={asteroidRef} position={[position.x, position.y, 0]}>
      <mesh ref={meshRef} geometry={asteroidGeometry}>
        <meshStandardMaterial 
          color={color} 
          roughness={0.8} 
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      {hits > 0 && <DamagedAsteroidParticles position={{x: 0, y: 0}} size={size} />}
    </group>
  );
}

// Laser beam component
function LaserBeam({ position, direction }) {
  const laserRef = useRef<THREE.Mesh>();
  
  useFrame(() => {
    if (laserRef.current) {
      laserRef.current.position.y += direction.y * 0.5;
      // Remove laser when it goes out of screen
      if (laserRef.current.position.y > 10) {
        laserRef.current.visible = false;
      }
    }
  });

  return (
    <group ref={laserRef} position={[position.x, position.y, 0]}>
      <mesh>
        <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
        <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={2} />
      </mesh>
      <pointLight color="#ffff00" intensity={1} distance={3} />
    </group>
  );
}

// Particle effect for explosion
function Explosion({ position, onComplete, isSmall = false }) {
  const explosionRef = useRef<THREE.Group>();
  const particles = useRef<THREE.Mesh[]>([]);
  const timer = useRef(0);
  const shockwaveRef = useRef<THREE.Mesh>();
  
  useEffect(() => {
    // Initialize particles - more particles for bigger explosions
    const particleCount = isSmall ? 15 : 40;
    const particleSize = isSmall ? 0.08 : 0.15;
    const velocityFactor = isSmall ? 0.15 : 0.3;
    
    particles.current = Array(particleCount).fill(null).map(() => {
      // Create more varied particle colors based on temperature (yellow to red)
      const heatLevel = Math.random();
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(particleSize * Math.random() + 0.03, 8, 8),
        new THREE.MeshStandardMaterial({ 
          color: new THREE.Color(
            Math.min(1, 0.8 + heatLevel * 0.2), 
            Math.min(1, heatLevel * 0.7), 
            0
          ),
          emissive: heatLevel > 0.7 ? '#ffaa00' : '#ff3300',
          emissiveIntensity: 1 + heatLevel
        })
      );
      
      // More dynamic random velocity
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * velocityFactor + 0.05;
      mesh.userData = {
        velocity: new THREE.Vector3(
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          (Math.random() - 0.5) * velocityFactor * 0.5
        ),
        rotationSpeed: new THREE.Vector3(
          Math.random() * 0.2 - 0.1,
          Math.random() * 0.2 - 0.1,
          Math.random() * 0.2 - 0.1
        )
      };
      
      if (explosionRef.current) {
        explosionRef.current.add(mesh);
      }
      return mesh;
    });
    
    // Create shockwave effect
    if (!isSmall && explosionRef.current) {
      const shockwave = new THREE.Mesh(
        new THREE.RingGeometry(0.1, 0.2, 16),
        new THREE.MeshBasicMaterial({ 
          color: '#ffaa00',
          transparent: true,
          opacity: 0.9,
          side: THREE.DoubleSide
        })
      );
      shockwave.rotation.x = Math.PI / 2; // Make it flat/horizontal
      explosionRef.current.add(shockwave);
      shockwaveRef.current = shockwave;
    }
    
    return () => {
      particles.current = [];
    };
  }, [isSmall]);
  
  useFrame((_, delta) => {
    timer.current += delta;
    
    const duration = isSmall ? 0.8 : 1.5;
    if (timer.current > duration) {
      onComplete();
      return;
    }
    
    // Update particles
    particles.current.forEach(particle => {
      if (particle) {
        particle.position.add(particle.userData.velocity);
        // Add rotation to particles for more dynamic effect
        particle.rotation.x += particle.userData.rotationSpeed.x;
        particle.rotation.y += particle.userData.rotationSpeed.y;
        particle.rotation.z += particle.userData.rotationSpeed.z;
        
        // Slow down velocity over time
        particle.userData.velocity.multiplyScalar(0.98);
        
        // Shrink particles over time
        particle.scale.multiplyScalar(isSmall ? 0.94 : 0.96);
      }
    });
    
    // Update shockwave
    if (shockwaveRef.current) {
      const progress = timer.current / duration;
      const maxSize = 2.5;
      const size = maxSize * Math.min(1, progress * 1.5);
      
      shockwaveRef.current.scale.set(size, size, 1);
      shockwaveRef.current.material.opacity = Math.max(0, 0.9 - progress * 1.5);
    }
  });
  
  // Light colors and intensity vary by explosion size
  const lightColor = isSmall ? "#ff6600" : "#ffaa00";
  const lightIntensity = isSmall ? 2 : 3;
  const lightDistance = isSmall ? 2 : 4;
  
  return (
    <group ref={explosionRef} position={[position.x, position.y, 0]}>
      <pointLight color={lightColor} intensity={lightIntensity} distance={lightDistance} decay={1.5} />
    </group>
  );
}

// Main game component
function GameScene({ 
  onScoreUpdate, 
  onHealthUpdate, 
  onLaserEnergyUpdate,
  gameOver,
  restartGame
}) {
  const [shipPosition, setShipPosition] = useState({ x: 0, y: -4 });
  const [shipRotation, setShipRotation] = useState(0);
  const [asteroids, setAsteroids] = useState([]);
  const [lasers, setLasers] = useState([]);
  const [explosions, setExplosions] = useState([]);
  const [health, setHealth] = useState(100);
  const [laserEnergy, setLaserEnergy] = useState(100);
  const [score, setScore] = useState(0);
  const keysPressed = useRef({});
  const lastShot = useRef(0);
  const gameTime = useRef(0);
  const asteroidSpawnRate = useRef(3); // Time in seconds between asteroid spawns
  const lastAsteroidSpawn = useRef(0);
  
  // Initialize sound system
  const { playSound } = useSound();
  
  // Set up key listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      keysPressed.current[e.key] = true;
    };
    
    const handleKeyUp = (e) => {
      keysPressed.current[e.key] = false;
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  
  // Game loop
  useFrame((_, delta) => {
    if (gameOver) return;
    
    gameTime.current += delta;
    
    // Ship movement
    const moveSpeed = 0.1;
    if (keysPressed.current['ArrowLeft'] || keysPressed.current['a']) {
      setShipPosition(prev => ({ ...prev, x: Math.max(-8, prev.x - moveSpeed) }));
      setShipRotation(0.3); // Tilt ship when turning
    } else if (keysPressed.current['ArrowRight'] || keysPressed.current['d']) {
      setShipPosition(prev => ({ ...prev, x: Math.min(8, prev.x + moveSpeed) }));
      setShipRotation(-0.3); // Tilt ship when turning
    } else {
      setShipRotation(0); // Reset tilt
    }
    
    // Fire laser
    if ((keysPressed.current[' '] || keysPressed.current['f']) && 
        gameTime.current - lastShot.current > 0.3 && // Cooldown
        laserEnergy >= 5) { // Energy check
      
      lastShot.current = gameTime.current;
      setLaserEnergy(prev => Math.max(0, prev - 5)); // Decrease energy on shot
      
      setLasers(prev => [...prev, {
        id: `laser-${Date.now()}-${Math.random()}`,
        position: { ...shipPosition, y: shipPosition.y + 1 },
        direction: { x: 0, y: 1 }
      }]);
    }
    
    // Recharge laser energy
    setLaserEnergy(prev => Math.min(100, prev + 0.2));
    
    // Spawn asteroids
    if (gameTime.current - lastAsteroidSpawn.current > asteroidSpawnRate.current) {
      lastAsteroidSpawn.current = gameTime.current;
      // Gradually increase spawn rate (make game harder)
      asteroidSpawnRate.current = Math.max(0.8, asteroidSpawnRate.current - 0.05);
      
      const size = Math.random() * 0.5 + 0.3; // Random size
      const speed = Math.random() * 0.05 + 0.03; // Random speed
      
      setAsteroids(prev => [...prev, {
        id: `asteroid-${Date.now()}-${Math.random()}`,
        position: { 
          x: Math.random() * 16 - 8, // Random x position
          y: 10 // Start from top
        },
        size,
        rotation: {
          x: Math.random() * 0.02 - 0.01,
          y: Math.random() * 0.02 - 0.01,
          z: Math.random() * 0.02 - 0.01
        },
        speed,
        hits: 0 // Track hits for 2-hit destruction
      }]);
    }
    
    // Collision detection and cleanup
    const newAsteroids = [...asteroids];
    const newLasers = [...lasers];
    const newExplosions = [...explosions];
    let collisionOccurred = false;
    
    // Check laser-asteroid collisions
    for (let i = newLasers.length - 1; i >= 0; i--) {
      const laser = newLasers[i];
      
      // Remove lasers that are off-screen
      if (laser.position.y > 10) {
        newLasers.splice(i, 1);
        continue;
      }
      
      for (let j = newAsteroids.length - 1; j >= 0; j--) {
        const asteroid = newAsteroids[j];
        
        // Calculate distance between laser and asteroid
        const distance = Math.sqrt(
          Math.pow(laser.position.x - asteroid.position.x, 2) +
          Math.pow(laser.position.y - asteroid.position.y, 2)
        );
        
        // If collision detected
        if (distance < asteroid.size + 0.2) {
          // Remove laser
          newLasers.splice(i, 1);
          
          // Increment hit counter and check if asteroid should be destroyed
          if (asteroid.hits === 0) {
            // First hit - damage the asteroid
            asteroid.hits = 1;
            
            // Add small explosion effect
            newExplosions.push({
              id: `hit-${Date.now()}-${Math.random()}`,
              position: { ...asteroid.position },
              isSmall: true
            });
            
            // Play hit sound
            playSound('smallExplosion');
            
            // Small score for first hit
            setScore(prev => prev + 5);
          } else {
            // Second hit - destroy the asteroid
            // Add explosion
            newExplosions.push({
              id: `explosion-${Date.now()}-${Math.random()}`,
              position: { ...asteroid.position },
              isSmall: false
            });
            
            // Remove asteroid
            newAsteroids.splice(j, 1);
            
            // Play explosion sound
            playSound('explosion');
            
            // Increase score - more points for destroying
            setScore(prev => prev + 15);
          }
          
          collisionOccurred = true;
          break;
        }
      }
    }
    
    // Check ship-asteroid collisions
    for (let i = newAsteroids.length - 1; i >= 0; i--) {
      const asteroid = newAsteroids[i];
      
      // Remove asteroids that are off-screen
      if (asteroid.position.y < -10) {
        newAsteroids.splice(i, 1);
        continue;
      }
      
      // Calculate distance between ship and asteroid
      const distance = Math.sqrt(
        Math.pow(shipPosition.x - asteroid.position.x, 2) +
        Math.pow(shipPosition.y - asteroid.position.y, 2)
      );
      
      // If collision detected
      if (distance < asteroid.size + 0.5) {
        // Add explosion
        newExplosions.push({
          id: `explosion-${Date.now()}-${Math.random()}`,
          position: { ...asteroid.position }
        });
        
        // Remove asteroid
        newAsteroids.splice(i, 1);
        
        // Decrease health
        const damage = Math.round(asteroid.size * 40);
        setHealth(prev => Math.max(0, prev - damage));
        collisionOccurred = true;
      }
    }
    
    // Remove completed explosions
    for (let i = newExplosions.length - 1; i >= 0; i--) {
      if (newExplosions[i].completed) {
        newExplosions.splice(i, 1);
      }
    }
    
    // Update state if changes occurred
    if (newAsteroids.length !== asteroids.length || collisionOccurred) {
      setAsteroids(newAsteroids);
    }
    
    if (newLasers.length !== lasers.length) {
      setLasers(newLasers);
    }
    
    if (newExplosions.length !== explosions.length) {
      setExplosions(newExplosions);
    }
    
    // Update HUD
    onScoreUpdate(score);
    onHealthUpdate(health);
    onLaserEnergyUpdate(laserEnergy);
    
    // Check for game over
    if (health <= 0) {
      onHealthUpdate(0);
    }
  });
  
  // Handle explosion completion
  const handleExplosionComplete = (id) => {
    setExplosions(prev => 
      prev.map(exp => 
        exp.id === id ? { ...exp, completed: true } : exp
      )
    );
  };
  
  return (
    <>
      {/* Background starfield */}
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 5]} intensity={0.5} />
      
      {/* Ship */}
      <Spaceship 
        position={shipPosition} 
        rotation={shipRotation} 
        color={health > 30 ? "#ffffff" : "#ff3333"} 
      />
      
      {/* Asteroids */}
      {asteroids.map(asteroid => (
        <Asteroid
          key={asteroid.id}
          position={asteroid.position}
          size={asteroid.size}
          rotation={asteroid.rotation}
          speed={asteroid.speed}
          hits={asteroid.hits}
        />
      ))}
      
      {/* Lasers */}
      {lasers.map(laser => (
        <LaserBeam
          key={laser.id}
          position={laser.position}
          direction={laser.direction}
        />
      ))}
      
      {/* Explosions */}
      {explosions.map(explosion => (
        <Explosion
          key={explosion.id}
          position={explosion.position}
          onComplete={() => handleExplosionComplete(explosion.id)}
          isSmall={explosion.isSmall}
        />
      ))}
      
      {/* Game over message */}
      {gameOver && (
        <Text
          position={[0, 0, 0]}
          fontSize={1}
          color="#ff3333"
          anchorX="center"
          anchorY="middle"
        >
          GAME OVER
        </Text>
      )}
      
      {/* Restart message */}
      {gameOver && (
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          onClick={restartGame}
        >
          CLICK TO RESTART
        </Text>
      )}
    </>
  );
}

export function QuantumFlightGame() {
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [laserEnergy, setLaserEnergy] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [laserMode, setLaserMode] = useState("standard");
  
  // Watch for health to trigger game over
  useEffect(() => {
    if (health <= 0) {
      setGameOver(true);
    }
  }, [health]);
  
  const restartGame = () => {
    setScore(0);
    setHealth(100);
    setLaserEnergy(100);
    setGameOver(false);
  };
  
  const toggleLaserMode = () => {
    setLaserMode(prev => prev === "standard" ? "quantum" : "standard");
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-black/30 p-4 rounded flex items-center justify-between">
          <span className="font-semibold">Score:</span>
          <span className="text-xl font-bold">{score}</span>
        </div>
        
        <div className="bg-black/30 p-4 rounded">
          <div className="flex justify-between mb-1">
            <span className="font-semibold">Shield:</span>
            <span>{health}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${
                health > 60 ? 'bg-green-500' : 
                health > 30 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${health}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-black/30 p-4 rounded">
          <div className="flex justify-between mb-1">
            <span className="font-semibold">Laser Energy:</span>
            <span>{laserEnergy.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div 
              className="h-2.5 rounded-full bg-blue-500"
              style={{ width: `${laserEnergy}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-black/30 p-4 rounded">
          <button 
            onClick={toggleLaserMode}
            className={`w-full py-1 px-3 rounded-md ${
              laserMode === "quantum" 
                ? 'bg-yellow-500 hover:bg-yellow-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white font-semibold transition-colors`}
          >
            {laserMode === "quantum" ? "Quantum Helium Laser" : "Standard Laser"}
          </button>
        </div>
      </div>
      
      <div className="bg-black/30 rounded-lg overflow-hidden" style={{ height: '500px' }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <GameScene 
            onScoreUpdate={setScore}
            onHealthUpdate={setHealth}
            onLaserEnergyUpdate={setLaserEnergy}
            gameOver={gameOver}
            restartGame={restartGame}
          />
          <OrbitControls enabled={false} />
        </Canvas>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Quantum Helium Laser</h3>
          <p className="text-gray-300 mb-3">
            The quantum helium laser utilizes helium's atomic structure and quantum mechanics principles 
            to generate a highly coherent and powerful beam, similar to the fusion processes in the sun.
          </p>
          <MathJax className="text-gray-300 text-sm">
            {"$E = h\\nu + \\frac{1}{2}m_e v^2 - E_i$"}
          </MathJax>
          <p className="mt-2 text-sm text-gray-400">
            Helium fusion produces energies of ~26.7 MeV, creating laser light in the ultraviolet spectrum.
          </p>
        </div>
        
        <div className="bg-black/30 p-4 rounded">
          <h3 className="font-semibold mb-2">Game Controls</h3>
          <div className="grid grid-cols-2 gap-2 text-gray-300">
            <div>
              <span className="font-semibold">Movement:</span>
              <ul className="pl-4 mt-1 space-y-1">
                <li>• Left Arrow / A: Move left</li>
                <li>• Right Arrow / D: Move right</li>
              </ul>
            </div>
            <div>
              <span className="font-semibold">Actions:</span>
              <ul className="pl-4 mt-1 space-y-1">
                <li>• Space / F: Fire laser</li>
                <li>• Q: Toggle laser mode</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

