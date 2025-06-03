import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// TypeScript interfaces
interface Element {
  name: string;
  symbol: string;
  atomicNumber: number;
  atomicMass: number;
  electronConfig: string;
  density: string;
  meltingPoint: string;
  neutrons: number;
  category: string;
  electronArrangement: number[];
}

interface Elements {
  [key: string]: Element;
}

interface ParticleProps {
  x: number;
  y: number;
  radius: number;
  color: string;
  speed?: number;
  angle?: number;
  orbitRadius?: number;
  type?: string;
}

class Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  speed: number;
  angle: number;
  orbitRadius: number;
  type: string;
  mass: number;
  charge: number;
  vx: number;
  vy: number;
  cloudPosition: { x: number; y: number };
  cloudOpacity: number;

  constructor({ 
    x, 
    y, 
    radius, 
    color, 
    speed = 0, 
    angle = 0, 
    orbitRadius = 0, 
    type = "electron" 
  }: ParticleProps) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    this.angle = angle;
    this.orbitRadius = orbitRadius;
    this.type = type; // "proton", "neutron", or "electron"
    
    // Physical properties
    this.mass = type === "electron" ? 1 : (type === "proton" ? 1836 : 1839); // Mass relative to electron
    this.charge = type === "proton" ? 1 : (type === "electron" ? -1 : 0);
    
    // Velocity components for nucleus particles
    this.vx = 0;
    this.vy = 0;
    
    // For electron cloud visualization
    this.cloudPosition = {
      x: 0,
      y: 0
    };
    this.cloudOpacity = 0.6;
  }

  draw(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, visualMode: string, temperature: number) {
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    if (visualMode === "bohr" || this.orbitRadius === 0) {
      // Standard particle visualization
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    } else if (visualMode === "cloud" && this.type === "electron") {
      // Electron cloud visualization
      // Draw main electron
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 0.7, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
      
      // Draw cloud effect
      // Draw multiple semi-transparent circles to create cloud effect
      for (let i = 0; i < 8; i++) {
        const cloudX = centerX + Math.cos(this.angle + (i * Math.PI / 4)) * this.orbitRadius * (0.9 + Math.random() * 0.2);
        const cloudY = centerY + Math.sin(this.angle + (i * Math.PI / 4)) * this.orbitRadius * (0.9 + Math.random() * 0.2);
        
        ctx.beginPath();
        ctx.arc(cloudX, cloudY, this.radius * (0.8 + Math.random() * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(52, 152, 219, ${0.1 + Math.random() * 0.2})`;
        ctx.fill();
        ctx.closePath();
      }
    }
  }

  // Check for collisions with other particles
  checkCollisions(particles: Particle[]) {
    if (this.orbitRadius > 0) return; // Only check for nucleus particles
    
    for (let i = 0; i < particles.length; i++) {
      const other = particles[i];
      if (other === this) continue;
      
      const dx = this.x - other.x;
      const dy = this.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < this.radius + other.radius) {
        // Calculate collision response
        const angle = Math.atan2(dy, dx);
        const totalMass = this.mass + other.mass;
        
        // Conservation of momentum equations
        const v1x = ((this.mass - other.mass) * this.vx + 2 * other.mass * other.vx) / totalMass;
        const v1y = ((this.mass - other.mass) * this.vy + 2 * other.mass * other.vy) / totalMass;
        
        // Update velocities
        this.vx = v1x * 0.98; // Slight energy loss
        this.vy = v1y * 0.98;
        
        // Move particles apart to prevent sticking
        const overlap = (this.radius + other.radius - distance) / 2;
        this.x += Math.cos(angle) * overlap;
        this.y += Math.sin(angle) * overlap;
      }
    }
  }

  update(
    canvasWidth: number, 
    canvasHeight: number, 
    visualMode: string, 
    temperature: number, 
    protons: number, 
    neutrons: number
  ) {
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    
    if (this.orbitRadius > 0) {
      if (visualMode === "bohr") {
        // Bohr model - electrons orbit in fixed shells
        this.angle += this.speed * (1 + (temperature - 300) * 0.001); // Temperature affects speed
        this.x = centerX + Math.cos(this.angle) * this.orbitRadius;
        this.y = centerY + Math.sin(this.angle) * this.orbitRadius;
      } else {
        // Cloud model - electrons move in probability cloud
        this.angle += this.speed * (1 + (temperature - 300) * 0.001);
        
        // Base position on orbit
        const baseX = centerX + Math.cos(this.angle) * this.orbitRadius;
        const baseY = centerY + Math.sin(this.angle) * this.orbitRadius;
        
        // Add random variation based on temperature
        const variation = (temperature / 100) * (this.orbitRadius * 0.1);
        this.x = baseX + (Math.random() - 0.5) * variation;
        this.y = baseY + (Math.random() - 0.5) * variation;
      }
    } else {
      // Nucleus particles with realistic Brownian motion
      
      // Scale velocity based on temperature
      const tempFactor = Math.sqrt(temperature / 300);
      
      // Random thermal "kicks" - Brownian motion
      this.vx += (Math.random() - 0.5) * 0.05 * tempFactor;
      this.vy += (Math.random() - 0.5) * 0.05 * tempFactor;
      
      // Update position
      this.x += this.vx;
      this.y += this.vy;
      
      // Nuclear force - keep particles in nucleus
      const dx = centerX - this.x;
      const dy = centerY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Simulate nuclear force
      const nucleusRadius = 30 + (protons + neutrons) * 0.5;
      if (distance > nucleusRadius) {
        // Strong force pulling back
        const forceMagnitude = 0.01 * (distance - nucleusRadius);
        this.vx += (dx / distance) * forceMagnitude;
        this.vy += (dy / distance) * forceMagnitude;
      }
      
      // Damping to prevent excessive energy
      this.vx *= 0.98;
      this.vy *= 0.98;
      
      // Limit maximum velocity
      const maxVel = 2 * tempFactor;
      const currentVel = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (currentVel > maxVel) {
        this.vx = (this.vx / currentVel) * maxVel;
        this.vy = (this.vy / currentVel) * maxVel;
      }
    }
  }
}

export function AtomSimulation() {
  // Canvas and context
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Simulation parameters
  const [protons, setProtons] = useState<number>(5);
  const [neutrons, setNeutrons] = useState<number>(5);
  const [electrons, setElectrons] = useState<number>(5);
  const [temperature, setTemperature] = useState<number>(300);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [visualMode, setVisualMode] = useState<string>("bohr");
  const [selectedElement, setSelectedElement] = useState<string>("custom");
  
  // Animation reference
  const animationIdRef = useRef<number | null>(null);
  
  // Particle arrays
  const [protonParticles, setProtonParticles] = useState<Particle[]>([]);
  const [neutronParticles, setNeutronParticles] = useState<Particle[]>([]);
  const [electronParticles, setElectronParticles] = useState<Particle[]>([]);
  
  // Temperature effect text
  const [temperatureEffect, setTemperatureEffect] = useState<string>(
    "À temperatura ambiente, as partículas apresentam movimento térmico moderado."
  );

  // Element database
  const elements: Elements = {
    "H": {
      name: "Hidrogênio",
      symbol: "H",
      atomicNumber: 1,
      atomicMass: 1.008,
      electronConfig: "1s¹",
      density: "0.00009 g/cm³ (gás)",
      meltingPoint: "-259.16°C",
      neutrons: 0,
      category: "Não-metal",
      electronArrangement: [1]
    },
    "He": {
      name: "Hélio",
      symbol: "He",
      atomicNumber: 2,
      atomicMass: 4.0026,
      electronConfig: "1s²",
      density: "0.0001785 g/cm³ (gás)",
      meltingPoint: "-272.2°C (a alta pressão)",
      neutrons: 2,
      category: "Gás Nobre",
      electronArrangement: [2]
    },
    "Li": {
      name: "Lítio",
      symbol: "Li",
      atomicNumber: 3,
      atomicMass: 6.94,
      electronConfig: "1s² 2s¹",
      density: "0.534 g/cm³",
      meltingPoint: "180.5°C",
      neutrons: 4,
      category: "Metal Alcalino",
      electronArrangement: [2, 1]
    },
    "Be": {
      name: "Berílio",
      symbol: "Be",
      atomicNumber: 4,
      atomicMass: 9.0122,
      electronConfig: "1s² 2s²",
      density: "1.85 g/cm³",
      meltingPoint: "1287°C",
      neutrons: 5,
      category: "Metal Alcalino-terroso",
      electronArrangement: [2, 2]
    },
    "B": {
      name: "Boro",
      symbol: "B",
      atomicNumber: 5,
      atomicMass: 10.81,
      electronConfig: "1s² 2s² 2p¹",
      density: "2.34 g/cm³",
      meltingPoint: "2075°C",
      neutrons: 6,
      category: "Semimetal",
      electronArrangement: [2, 3]
    },
    "C": {
      name: "Carbono",
      symbol: "C",
      atomicNumber: 6,
      atomicMass: 12.011,
      electronConfig: "1s² 2s² 2p²",
      density: "2.267 g/cm³ (grafite)",
      meltingPoint: "3550°C (grafite)",
      neutrons: 6,
      category: "Não-metal",
      electronArrangement: [2, 4]
    },
    "N": {
      name: "Nitrogênio",
      symbol: "N",
      atomicNumber: 7,
      atomicMass: 14.007,
      electronConfig: "1s² 2s² 2p³",
      density: "0.001251 g/cm³ (gás)",
      meltingPoint: "-210.1°C",
      neutrons: 7,
      category: "Não-metal",
      electronArrangement: [2, 5]
    },
    "O": {
      name: "Oxigênio",
      symbol: "O",
      atomicNumber: 8,
      atomicMass: 15.999,
      electronConfig: "1s² 2s² 2p⁴",
      density: "0.001429 g/cm³ (gás)",
      meltingPoint: "-218.79°C",
      neutrons: 8,
      category: "Não-metal",
      electronArrangement: [2, 6]
    },
    "F": {
      name: "Flúor",
      symbol: "F",
      atomicNumber: 9,
      atomicMass: 18.998,
      electronConfig: "1s² 2s² 2p⁵",
      density: "0.001696 g/cm³ (gás)",
      meltingPoint: "-219.67°C",
      neutrons: 10,
      category: "Halogênio",
      electronArrangement: [2, 7]
    },
    "Ne": {
      name: "Neônio",
      symbol: "Ne",
      atomicNumber: 10,
      atomicMass: 20.180,
      electronConfig: "1s² 2s² 2p⁶",
      density: "0.0008999 g/cm³ (gás)",
      meltingPoint: "-248.59°C",
      neutrons: 10,
      category: "Gás Nobre",
      electronArrangement: [2, 8]
    },
    "Na": {
      name: "Sódio",
      symbol: "Na",
      atomicNumber: 11,
      atomicMass: 22.990,
      electronConfig: "1s² 2s² 2p⁶ 3s¹",
      density: "0.968 g/cm³",
      meltingPoint: "97.79°C",
      neutrons: 12,
      category: "Metal Alcalino",
      electronArrangement: [2, 8, 1]
    },
    "Mg": {
      name: "Magnésio",
      symbol: "Mg",
      atomicNumber: 12,
      atomicMass: 24.305,
      electronConfig: "1s² 2s² 2p⁶ 3s²",
      density: "1.738 g/cm³",
      meltingPoint: "650°C",
      neutrons: 12,
      category: "Metal Alcalino-terroso",
      electronArrangement: [2, 8, 2]
    },
    "Al": {
      name: "Alumínio",
      symbol: "Al",
      atomicNumber: 13,
      atomicMass: 26.982,
      electronConfig: "1s² 2s² 2p⁶ 3s² 3p¹",
      density: "2.7 g/cm³",
      meltingPoint: "660.32°C",
      neutrons: 14,
      category: "Metal",
      electronArrangement: [2, 8, 3]
    },
    "Si": {
      name: "Silício",
      symbol: "Si",
      atomicNumber: 14,
      atomicMass: 28.085,
      electronConfig: "1s² 2s² 2p⁶ 3s² 3p²",
      density: "2.3296 g/cm³",
      meltingPoint: "1414°C",
      neutrons: 14,
      category: "Semimetal",
      electronArrangement: [2, 8, 4]
    },
    "P": {
      name: "Fósforo",
      symbol: "P",
      atomicNumber: 15,
      atomicMass: 30.974,
      electronConfig: "1s² 2s² 2p⁶ 3s² 3p³",
      density: "1.82 g/cm³ (branco)",
      meltingPoint: "44.15°C (branco)",
      neutrons: 16,
      category: "Não-metal",
      electronArrangement: [2, 8, 5]
    },
    "S": {
      name: "Enxofre",
      symbol: "S",
      atomicNumber: 16,
      atomicMass: 32.06,
      electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁴",
      density: "2.07 g/cm³",
      meltingPoint: "115.21°C",
      neutrons: 16,
      category: "Não-metal",
      electronArrangement: [2, 8, 6]
    },
    "Cl": {
      name: "Cloro",
      symbol: "Cl",
      atomicNumber: 17,
      atomicMass: 35.45,
      electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁵",
      density: "0.003214 g/cm³ (gás)",
      meltingPoint: "-101.5°C",
      neutrons: 18,
      category: "Halogênio",
      electronArrangement: [2, 8, 7]
    },
    "Ar": {
      name: "Argônio",
      symbol: "Ar",
      atomicNumber: 18,
      atomicMass: 39.948,
      electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁶",
      density: "0.0017837 g/cm³ (gás)",
      meltingPoint: "-189.34°C",
      neutrons: 22,
      category: "Gás Nobre",
      electronArrangement: [2, 8, 8]
    },
    "K": {
      name: "Potássio",
      symbol: "K",
      atomicNumber: 19,
      atomicMass: 39.098,
      electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹",
      density: "0.862 g/cm³",
      meltingPoint: "63.38°C",
      neutrons: 20,
      category: "Metal Alcalino",
      electronArrangement: [2, 8, 8, 1]
    },
    "Ca": {
      name: "Cálcio",
      symbol: "Ca",
      atomicNumber: 20,
      atomicMass: 40.078,
      electronConfig: "1s² 2s² 2p⁶ 3s² 3p⁶ 4s²",
      density: "1.54 g/cm³",
      meltingPoint: "842°C",
      neutrons: 20,
      category: "Metal Alcalino-terroso",
      electronArrangement: [2, 8, 8, 2]
    }
  };
  
  // Element info state
  const [elementInfo, setElementInfo] = useState({
    name: "Personalizado",
    symbol: "-",
    atomicNumber: protons,
    atomicMass: `~${(protons + neutrons).toFixed(2)}`,
    category: "-",
    electronConfig: "Personalizado",
    density: "-",
    meltingPoint: "-"
  });

  // Function to update temperature effects
  const updateTemperatureEffects = () => {
    let effect: string;
    
    if (temperature < 200) {
      effect = "Em baixas temperaturas, o movimento das partículas é reduzido. Em materiais sólidos, as partículas vibram no lugar, com amplitude proporcional à temperatura.";
    } else if (temperature < 500) {
      effect = "À temperatura ambiente, as partículas apresentam movimento térmico moderado. Gases apresentam movimento aleatório contínuo.";
    } else if (temperature < 800) {
      effect = "Em temperaturas elevadas, o movimento térmico das partículas aumenta significativamente. Muitos materiais sólidos fundem-se, transformando-se em líquidos.";
    } else {
      effect = "Em temperaturas muito altas, as partículas movem-se com grande energia cinética. Muitos materiais encontram-se no estado gasoso ou plasma.";
    }
    
    setTemperatureEffect(effect);
  };

  // Function to update element info display
  const updateElementInfo = (elementSymbol: string) => {
    if (elementSymbol === "custom") {
      setElementInfo({
        name: "Personalizado",
        symbol: "-",
        atomicNumber: protons,
        atomicMass: `~${(protons + neutrons).toFixed(2)}`,
        category: "-",
        electronConfig: "Personalizado",
        density: "-",
        meltingPoint: "-"
      });
    } else {
      const element = elements[elementSymbol];
      setElementInfo({
        name: element.name,
        symbol: element.symbol,
        atomicNumber: element.atomicNumber,
        atomicMass: element.atomicMass.toString(),
        category: element.category,
        electronConfig: element.electronConfig,
        density: element.density,
        meltingPoint: element.meltingPoint
      });
    }
  };

  // Initialize particles based on element configuration
  const initializeParticles = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Temp arrays for new particles
    const newProtonParticles: Particle[] = [];
    const newNeutronParticles: Particle[] = [];
    const newElectronParticles: Particle[] = [];
    
    // Calculate nucleus radius based on number of particles
    const nucleusRadius = 20 + Math.sqrt(protons + neutrons) * 2;
    
    // Create protons
    for (let i = 0; i < protons; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * nucleusRadius;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      
      // Initialize velocity based on temperature
      const newProton = new Particle({
        x, y, radius: 10, color: '#e74c3c', type: "proton"
      });
      
      const velocityMagnitude = Math.sqrt(0.1 * temperature / newProton.mass);
      const velAngle = Math.random() * Math.PI * 2;
      newProton.vx = Math.cos(velAngle) * velocityMagnitude;
      newProton.vy = Math.sin(velAngle) * velocityMagnitude;
      
      newProtonParticles.push(newProton);
    }
    
    // Create neutrons
    for (let i = 0; i < neutrons; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * nucleusRadius;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      
      // Initialize velocity based on temperature
      const newNeutron = new Particle({
        x, y, radius: 10, color: '#34495e', type: "neutron"
      });
      
      const velocityMagnitude = Math.sqrt(0.1 * temperature / newNeutron.mass);
      const velAngle = Math.random() * Math.PI * 2;
      newNeutron.vx = Math.cos(velAngle) * velocityMagnitude;
      newNeutron.vy = Math.sin(velAngle) * velocityMagnitude;
      
      newNeutronParticles.push(newNeutron);
    }
    
    // Get electron configuration
    let electronArrangement: number[] = [];
    
    if (selectedElement !== "custom" && elements[selectedElement]) {
      electronArrangement = elements[selectedElement].electronArrangement;
    } else {
      // Default arrangement based on basic rules
      let remaining = electrons;
      const maxPerShell = [2, 8, 18, 32, 50];
      
      for (let i = 0; i < maxPerShell.length && remaining > 0; i++) {
        const shellCount = Math.min(remaining, maxPerShell[i]);
        electronArrangement.push(shellCount);
        remaining -= shellCount;
      }
      
      // If there are still electrons, add them to the last shell
      if (remaining > 0 && electronArrangement.length > 0) {
        electronArrangement[electronArrangement.length - 1] += remaining;
      }
    }
    
    // Create electrons in shells according to arrangement
    let electronIndex = 0;
    for (let shell = 0; shell < electronArrangement.length; shell++) {
      const electronsInShell = electronArrangement[shell];
      const orbitRadius = 80 + shell * 40;
      
      for (let i = 0; i < electronsInShell; i++) {
        const angle = (i * (Math.PI * 2 / electronsInShell)) + (shell * 0.2); // Offset each shell
        const speed = 0.02 / (shell + 1); // Outer shells move slower
        
        // Color electrons based on shell (energy level)
        let electronColor;
        switch (shell) {
          case 0: electronColor = '#3498db'; break; // K shell - blue
          case 1: electronColor = '#27ae60'; break; // L shell - green
          case 2: electronColor = '#f39c12'; break; // M shell - orange
          case 3: electronColor = '#9b59b6'; break; // N shell - purple
          default: electronColor = '#e74c3c'; break; // Higher shells - red
        }
        
        newElectronParticles.push(new Particle({
          x: 0, y: 0, radius: 5, color: electronColor, 
          speed, angle, orbitRadius, type: "electron"
        }));
        electronIndex++;
      }
    }
    
    // Update state
    setProtonParticles(newProtonParticles);
    setNeutronParticles(newNeutronParticles);
    setElectronParticles(newElectronParticles);
  };

  // Draw static atom
  const drawAtom = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Get electron configuration
    let electronArrangement: number[] = [];
    
    if (selectedElement !== "custom" && elements[selectedElement]) {
      electronArrangement = elements[selectedElement].electronArrangement;
    } else {
      // Default arrangement based on basic rules
      let remaining = electrons;
      const maxPerShell = [2, 8, 18, 32, 50];
      
      for (let i = 0; i < maxPerShell.length && remaining > 0; i++) {
        const shellCount = Math.min(remaining, maxPerShell[i]);
        electronArrangement.push(shellCount);
        remaining -= shellCount;
      }
    }
    
    if (visualMode === "bohr") {
      // Draw orbit paths for Bohr model
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      for (let i = 0; i < electronArrangement.length; i++) {
        const radius = 80 + i * 40;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    } else {
      // Draw electron cloud probability zones
      for (let i = 0; i < electronArrangement.length; i++) {
        const shellRadius = 80 + i * 40;
        const cloudThickness = 25 + (temperature / 50);
        
        // Draw shell probability region
        const gradient = ctx.createRadialGradient(
          centerX, centerY, shellRadius - cloudThickness/2,
          centerX, centerY, shellRadius + cloudThickness/2
        );
        
        let color;
        switch (i) {
          case 0: color = 'rgba(52, 152, 219, 0.2)'; break; // K shell - blue
          case 1: color = 'rgba(39, 174, 96, 0.2)'; break;  // L shell - green
          case 2: color = 'rgba(243, 156, 18, 0.2)'; break; // M shell - orange
          case 3: color = 'rgba(155, 89, 182, 0.2)'; break; // N shell - purple
          default: color = 'rgba(231, 76, 60, 0.2)'; break; // Higher shells - red
        }
        
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(0.5, color);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, shellRadius + cloudThickness/2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Draw nucleus glow effect based on temperature
    const nucleusRadius = 30 + (protons + neutrons) * 0.5;
    const glowSize = nucleusRadius * (1 + temperature / 2000);
    
    const nucleusGlow = ctx.createRadialGradient(
      centerX, centerY, nucleusRadius * 0.8,
      centerX, centerY, glowSize
    );
    
    // Temperature-based color
    let glowColor;
    if (temperature < 200) {
      glowColor = 'rgba(52, 152, 219, 0.3)'; // Cool blue
    } else if (temperature < 500) {
      glowColor = 'rgba(241, 196, 15, 0.3)'; // Yellow
    } else if (temperature < 800) {
      glowColor = 'rgba(230, 126, 34, 0.3)'; // Orange
    } else {
      glowColor = 'rgba(231, 76, 60, 0.3)'; // Red hot
    }
    
    nucleusGlow.addColorStop(0, glowColor);
    nucleusGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = nucleusGlow;
    ctx.beginPath();
    ctx.arc(centerX, centerY, glowSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw all particles
    protonParticles.forEach(particle => particle.draw(ctx, canvas.width, canvas.height, visualMode, temperature));
    neutronParticles.forEach(particle => particle.draw(ctx, canvas.width, canvas.height, visualMode, temperature));
    electronParticles.forEach(particle => particle.draw(ctx, canvas.width, canvas.height, visualMode, temperature));
  };

  // Animation loop
  const animate = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Get electron configuration
    let electronArrangement: number[] = [];
    
    if (selectedElement !== "custom" && elements[selectedElement]) {
      electronArrangement = elements[selectedElement].electronArrangement;
    } else {
      // Default arrangement based on basic rules
      let remaining = electrons;
      const maxPerShell = [2, 8, 18, 32, 50];
      
      for (let i = 0; i < maxPerShell.length && remaining > 0; i++) {
        const shellCount = Math.min(remaining, maxPerShell[i]);
        electronArrangement.push(shellCount);
        remaining -= shellCount;
      }
    }
    
    if (visualMode === "bohr") {
      // Draw orbit paths for Bohr model
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      for (let i = 0; i < electronArrangement.length; i++) {
        const radius = 80 + i * 40;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    } else {
      // Draw electron cloud probability zones
      for (let i = 0; i < electronArrangement.length; i++) {
        const shellRadius = 80 + i * 40;
        const cloudThickness = 25 + (temperature / 50);
        
        // Draw shell probability region
        const gradient = ctx.createRadialGradient(
          centerX, centerY, shellRadius - cloudThickness/2,
          centerX, centerY, shellRadius + cloudThickness/2
        );
        
        let color;
        switch (i) {
          case 0: color = 'rgba(52, 152, 219, 0.2)'; break; // K shell - blue
          case 1: color = 'rgba(39, 174, 96, 0.2)'; break;  // L shell - green
          case 2: color = 'rgba(243, 156, 18, 0.2)'; break; // M shell - orange
          case 3: color = 'rgba(155, 89, 182, 0.2)'; break; // N shell - purple
          default: color = 'rgba(231, 76, 60, 0.2)'; break; // Higher shells - red
        }
        
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(0.5, color);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, shellRadius + cloudThickness/2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Draw nucleus glow effect based on temperature
    const nucleusRadius = 30 + (protons + neutrons) * 0.5;
    const glowSize = nucleusRadius * (1 + temperature / 2000);
    
    const nucleusGlow = ctx.createRadialGradient(
      centerX, centerY, nucleusRadius * 0.8,
      centerX, centerY, glowSize
    );
    
    // Temperature-based color
    let glowColor;
    if (temperature < 200) {
      glowColor = 'rgba(52, 152, 219, 0.3)'; // Cool blue
    } else if (temperature < 500) {
      glowColor = 'rgba(241, 196, 15, 0.3)'; // Yellow
    } else if (temperature < 800) {
      glowColor = 'rgba(230, 126, 34, 0.3)'; // Orange
    } else {
      glowColor = 'rgba(231, 76, 60, 0.3)'; // Red hot
    }
    
    nucleusGlow.addColorStop(0, glowColor);
    nucleusGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = nucleusGlow;
    ctx.beginPath();
    ctx.arc(centerX, centerY, glowSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Check for collisions between nucleus particles
    for (let i = 0; i < protonParticles.length; i++) {
      protonParticles[i].checkCollisions([...protonParticles, ...neutronParticles]);
    }
    
    for (let i = 0; i < neutronParticles.length; i++) {
      neutronParticles[i].checkCollisions([...protonParticles, ...neutronParticles]);
    }
    
    // Update and draw all particles
    protonParticles.forEach(particle => {
      particle.update(canvas.width, canvas.height, visualMode, temperature, protons, neutrons);
      particle.draw(ctx, canvas.width, canvas.height, visualMode, temperature);
    });
    
    neutronParticles.forEach(particle => {
      particle.update(canvas.width, canvas.height, visualMode, temperature, protons, neutrons);
      particle.draw(ctx, canvas.width, canvas.height, visualMode, temperature);
    });
    
    electronParticles.forEach(particle => {
      particle.update(canvas.width, canvas.height, visualMode, temperature, protons, neutrons);
      particle.draw(ctx, canvas.width, canvas.height, visualMode, temperature);
    });
    
    animationIdRef.current = requestAnimationFrame(animate);
  };

  // Start simulation
  const startSimulation = () => {
    if (!isRunning) {
      setIsRunning(true);
      animate();
    }
  };

  // Stop simulation
  const stopSimulation = () => {
    if (isRunning && animationIdRef.current !== null) {
      cancelAnimationFrame(animationIdRef.current);
      setIsRunning(false);
    }
  };

  // Reset simulation
  const resetSimulation = () => {
    // Re-initialize particles
    initializeParticles();
  };

  // Element selector handler
  const handleElementChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newElement = e.target.value;
    setSelectedElement(newElement);
    
    if (newElement === "custom") {
      // No changes to current values
      updateElementInfo("custom");
    } else {
      // Set values based on selected element
      const element = elements[newElement];
      setProtons(element.atomicNumber);
      setNeutrons(element.neutrons);
      setElectrons(element.atomicNumber); // For neutral atoms
      
      // Update element info display
      updateElementInfo(newElement);
      
      // Reset and redraw
      if (!isRunning) {
        resetSimulation();
      }
    }
  };

  // Visual mode handler
  const handleVisualModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisualMode(e.target.value);
  };

  // Temperature handler
  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemperature(parseInt(e.target.value));
    updateTemperatureEffects();
  };

  // Proton handler
  const handleProtonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProtons(parseInt(e.target.value));
    setSelectedElement("custom");
    updateElementInfo("custom");
    
    if (!isRunning) {
      resetSimulation();
    }
  };

  // Neutron handler
  const handleNeutronChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNeutrons(parseInt(e.target.value));
    setSelectedElement("custom");
    updateElementInfo("custom");
    
    if (!isRunning) {
      resetSimulation();
    }
  };

  // Electron handler
  const handleElectronChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setElectrons(parseInt(e.target.value));
    setSelectedElement("custom");
    updateElementInfo("custom");
    
    if (!isRunning) {
      resetSimulation();
    }
  };

  // Initialize when component mounts
  useEffect(() => {
    updateTemperatureEffects();
    initializeParticles();
    
    if (canvasRef.current) {
      drawAtom();
    }
    
    // Cleanup animation on unmount
    return () => {
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);
  
  // Update drawing when parameters change
  useEffect(() => {
    if (!isRunning && canvasRef.current) {
      drawAtom();
    }
  }, [protons, neutrons, electrons, visualMode, temperature, selectedElement]);
  
  return (
    <div className="flex flex-col items-center space-y-6 animate-fade-in">
      <div className="w-full bg-black/30 rounded-lg p-6 backdrop-blur-sm">
        <div className="control-group mb-5 bg-black/20 p-5 rounded-lg">
          <div className="flex flex-wrap justify-between gap-4 mb-4">
            <div>
              <label htmlFor="elementSelector" className="block text-white mb-2">Elemento:</label>
              <select 
                id="elementSelector" 
                className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 w-48"
                value={selectedElement}
                onChange={handleElementChange}
              >
                <option value="custom">Personalizado</option>
                <option value="H">Hidrogênio (H)</option>
                <option value="He">Hélio (He)</option>
                <option value="Li">Lítio (Li)</option>
                <option value="Be">Berílio (Be)</option>
                <option value="B">Boro (B)</option>
                <option value="C">Carbono (C)</option>
                <option value="N">Nitrogênio (N)</option>
                <option value="O">Oxigênio (O)</option>
                <option value="F">Flúor (F)</option>
                <option value="Ne">Neônio (Ne)</option>
                <option value="Na">Sódio (Na)</option>
                <option value="Mg">Magnésio (Mg)</option>
                <option value="Al">Alumínio (Al)</option>
                <option value="Si">Silício (Si)</option>
                <option value="P">Fósforo (P)</option>
                <option value="S">Enxofre (S)</option>
                <option value="Cl">Cloro (Cl)</option>
                <option value="Ar">Argônio (Ar)</option>
                <option value="K">Potássio (K)</option>
                <option value="Ca">Cálcio (Ca)</option>
              </select>
            </div>
            
            <div className="visualization-mode flex items-center">
              <label className="flex items-center cursor-pointer mr-4">
                <input 
                  type="radio" 
                  name="visualMode" 
                  value="bohr" 
                  checked={visualMode === "bohr"} 
                  onChange={handleVisualModeChange}
                  className="mr-2"
                /> 
                <span className="text-white">Modelo de Bohr</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input 
                  type="radio" 
                  name="visualMode" 
                  value="cloud" 
                  checked={visualMode === "cloud"} 
                  onChange={handleVisualModeChange}
                  className="mr-2"
                /> 
                <span className="text-white">Nuvem Eletrônica</span>
              </label>
            </div>
          </div>
          
          <div className="slider-container flex items-center mb-3">
            <label htmlFor="temperatureSlider" className="text-white w-48">Temperatura (K):</label>
            <input 
              type="range" 
              id="temperatureSlider" 
              min="100" 
              max="1000" 
              value={temperature} 
              onChange={handleTemperatureChange}
              className="flex-grow mx-4 accent-blue-500"
            />
            <span className="text-white w-10">{temperature}</span>
          </div>
        </div>
        
        <div className="flex justify-center mb-6">
          <canvas 
            ref={canvasRef} 
            width={600} 
            height={400} 
            className="bg-black/40 border border-gray-700 rounded-lg"
          />
        </div>
        
        <motion.div 
          className="element-info grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/30 p-6 rounded-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="col-span-full">
            <h3 className="text-xl font-semibold mb-2 text-blue-400 border-b border-gray-700 pb-2">
              Informações do Elemento: <span>{elementInfo.name}</span>
            </h3>
          </div>
          
          <div>
            <div className="mb-2">
              <strong className="text-blue-400">Símbolo:</strong> <span className="text-white">{elementInfo.symbol}</span>
            </div>
            <div className="mb-2">
              <strong className="text-blue-400">Número Atômico:</strong> <span className="text-white">{elementInfo.atomicNumber}</span>
            </div>
            <div className="mb-2">
              <strong className="text-blue-400">Massa Atômica:</strong> <span className="text-white">{elementInfo.atomicMass} u</span>
            </div>
            <div className="mb-2">
              <strong className="text-blue-400">Categoria:</strong> <span className="text-white">{elementInfo.category}</span>
            </div>
          </div>
          
          <div>
            <div className="mb-2">
              <strong className="text-blue-400">Config. Eletrônica:</strong>
              <div className="bg-black/30 px-3 py-1 rounded mt-1 font-mono text-green-400 inline-block border-l-2 border-blue-500">
                {elementInfo.electronConfig}
              </div>
            </div>
            <div className="mb-2">
              <strong className="text-blue-400">Densidade:</strong> <span className="text-white">{elementInfo.density}</span>
            </div>
            <div className="mb-2">
              <strong className="text-blue-400">Ponto de Fusão:</strong> <span className="text-white">{elementInfo.meltingPoint}</span>
            </div>
            <div className="bg-yellow-900/20 p-3 rounded mt-2 text-yellow-200 text-sm border-l-2 border-yellow-600">
              {temperatureEffect}
            </div>
          </div>
        </motion.div>
        
        {selectedElement === "custom" && (
          <div className="controls grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="slider-container flex flex-col">
              <label htmlFor="protonSlider" className="text-white mb-2">Prótons:</label>
              <div className="flex items-center">
                <input 
                  type="range" 
                  id="protonSlider" 
                  min="1" 
                  max="20" 
                  value={protons} 
                  onChange={handleProtonChange}
                  className="flex-grow mr-4 accent-red-500"
                />
                <span className="text-white w-8">{protons}</span>
              </div>
            </div>
            
            <div className="slider-container flex flex-col">
              <label htmlFor="neutronSlider" className="text-white mb-2">Nêutrons:</label>
              <div className="flex items-center">
                <input 
                  type="range" 
                  id="neutronSlider" 
                  min="0" 
                  max="30" 
                  value={neutrons} 
                  onChange={handleNeutronChange}
                  className="flex-grow mr-4 accent-gray-500"
                />
                <span className="text-white w-8">{neutrons}</span>
              </div>
            </div>
            
            <div className="slider-container flex flex-col">
              <label htmlFor="electronSlider" className="text-white mb-2">Elétrons:</label>
              <div className="flex items-center">
                <input 
                  type="range" 
                  id="electronSlider" 
                  min="1" 
                  max="20" 
                  value={electrons} 
                  onChange={handleElectronChange}
                  className="flex-grow mr-4 accent-blue-500"
                />
                <span className="text-white w-8">{electrons}</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-center gap-4">
          <button 
            onClick={startSimulation}
            disabled={isRunning}
            className={`px-5 py-2 rounded-lg transition-colors font-medium ${
              isRunning 
                ? 'bg-blue-900/50 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Iniciar
          </button>
          
          <button 
            onClick={stopSimulation}
            disabled={!isRunning}
            className={`px-5 py-2 rounded-lg transition-colors font-medium ${
              !isRunning 
                ? 'bg-red-900/50 text-gray-400 cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            Parar
          </button>
          
          <button 
            onClick={() => {
              stopSimulation();
              resetSimulation();
            }}
            className="px-5 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
          >
            Reiniciar
          </button>
        </div>
      </div>
      
      <div className="w-full">
        <div className="bg-black/30 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white">Sobre a Estrutura Atômica</h2>
          <p className="text-gray-300 mb-4">
            Um átomo é a unidade básica de matéria que forma tudo o que existe no universo. Cada átomo é composto por três tipos principais de partículas subatômicas:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-black/20 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-red-500 mr-3"></div>
                <h3 className="text-lg font-semibold text-red-400">Prótons</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Partículas com carga positiva que se encontram no núcleo do átomo. O número de prótons determina qual elemento químico o átomo representa.
              </p>
            </div>
            
            <div className="bg-black/20 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-700 mr-3"></div>
                <h3 className="text-lg font-semibold text-gray-400">Nêutrons</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Partículas sem carga elétrica que também se encontram no núcleo, junto com os prótons. Eles ajudam a estabilizar o núcleo.
              </p>
            </div>
            
            <div className="bg-black/20 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 mr-3"></div>
                <h3 className="text-lg font-semibold text-blue-400">Elétrons</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Partículas com carga negativa que orbitam o núcleo em camadas eletrônicas. Eles são responsáveis pelas propriedades químicas dos elementos e pela formação de ligações.
              </p>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mb-3 text-white">Modelo do Átomo</h2>
          <p className="text-gray-300 mb-4">
            Esta simulação representa o modelo de Bohr do átomo, onde os elétrons orbitam o núcleo em camadas específicas. 
            Na realidade, o modelo atual da mecânica quântica descreve os elétrons como nuvens de probabilidade em vez de 
            partículas com trajetórias definidas.
          </p>
          
          <h2 className="text-2xl font-semibold mb-3 text-white">Importância na Física Moderna</h2>
          <p className="text-gray-300">
            A compreensão da estrutura atômica foi um dos grandes avanços da física moderna no início do século XX. 
            Esse conhecimento levou a desenvolvimentos importantes em diversas áreas, incluindo medicina, energia, 
            materiais e tecnologia.
          </p>
        </div>
      </div>
    </div>
  );
}

