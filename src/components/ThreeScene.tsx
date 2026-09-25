import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Rotate3d, Sparkles, Move3d } from 'lucide-react';

export const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 35, 20);
    blueLight.position.set(5, 5, 5);
    scene.add(blueLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 30, 20);
    purpleLight.position.set(-5, -3, 4);
    scene.add(purpleLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 25, 20);
    cyanLight.position.set(0, -5, 3);
    scene.add(cyanLight);

    // 3. Central 3D Device (Smartphone/App Canvas)
    const phoneGroup = new THREE.Group();
    scene.add(phoneGroup);

    // Phone body
    const bodyGeometry = new THREE.BoxGeometry(3.2, 5.6, 0.28);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.85,
      roughness: 0.2,
    });
    const phoneBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
    phoneGroup.add(phoneBody);

    // Phone Screen Glass (Glowing interactive screen)
    const screenGeometry = new THREE.PlaneGeometry(2.95, 5.2);
    const screenMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      emissive: 0x0f274a,
      roughness: 0.1,
      metalness: 0.5,
    });
    const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
    screenMesh.position.z = 0.15;
    phoneGroup.add(screenMesh);

    // Inside screen decorative elements (App UI in 3D)
    // Header bar
    const barGeo = new THREE.PlaneGeometry(2.5, 0.45);
    const barMat = new THREE.MeshBasicMaterial({ color: 0x2563eb });
    const headerBar = new THREE.Mesh(barGeo, barMat);
    headerBar.position.set(0, 2.1, 0.16);
    phoneGroup.add(headerBar);

    // App cards inside screen
    const colors = [0x38bdf8, 0x818cf8, 0xec4899, 0x10b981];
    for (let i = 0; i < 4; i++) {
      const cardGeo = new THREE.PlaneGeometry(2.5, 0.7);
      const cardMat = new THREE.MeshBasicMaterial({
        color: colors[i],
        transparent: true,
        opacity: 0.85,
      });
      const cardMesh = new THREE.Mesh(cardGeo, cardMat);
      cardMesh.position.set(0, 1.3 - i * 0.95, 0.16);
      phoneGroup.add(cardMesh);
    }

    // Outer subtle glowing edge frame
    const edges = new THREE.EdgesGeometry(bodyGeometry);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x60a5fa, linewidth: 2 });
    const wireframe = new THREE.LineSegments(edges, lineMat);
    phoneGroup.add(wireframe);

    // 4. Orbiting 3D AI Blocks (representing AI agent, games, apps, workflows)
    const orbitingGroup = new THREE.Group();
    scene.add(orbitingGroup);

    const orbitItems: { mesh: THREE.Mesh; speed: number; radius: number; angle: number; yOffset: number }[] = [];

    const cubeGeo = new THREE.BoxGeometry(0.55, 0.55, 0.55);
    const orbColors = [0x3b82f6, 0x10b981, 0xf43f5e, 0xf59e0b, 0x8b5cf6];

    for (let i = 0; i < 5; i++) {
      const cubeMat = new THREE.MeshStandardMaterial({
        color: orbColors[i],
        metalness: 0.6,
        roughness: 0.2,
        emissive: orbColors[i],
        emissiveIntensity: 0.35,
      });
      const cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);
      
      const item = {
        mesh: cubeMesh,
        speed: 0.015 + i * 0.005,
        radius: 3.4 + (i % 2) * 0.6,
        angle: (i / 5) * Math.PI * 2,
        yOffset: ((i - 2) * 0.9),
      };
      orbitItems.push(item);
      orbitingGroup.add(cubeMesh);
    }

    // 5. 3D Floating Particle Cloud
    const particleCount = 220;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 14;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 8;

      const shade = Math.random();
      if (shade < 0.4) {
        particleColors[i] = 0.23; // Blue
        particleColors[i + 1] = 0.51;
        particleColors[i + 2] = 0.96;
      } else if (shade < 0.7) {
        particleColors[i] = 0.65; // Purple
        particleColors[i + 1] = 0.33;
        particleColors[i + 2] = 0.97;
      } else {
        particleColors[i] = 0.06; // Cyan
        particleColors[i + 1] = 0.71;
        particleColors[i + 2] = 0.83;
      }
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 6. Interactive Mouse Tracking
    let targetRotationX = 0.15;
    let targetRotationY = -0.25;
    let mouseX = 0;
    let mouseY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = normX;
      mouseY = normY;

      if (!isDragging) {
        targetRotationY = normX * 0.85;
        targetRotationX = -normY * 0.65;
      } else {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        phoneGroup.rotation.y += deltaX * 0.01;
        phoneGroup.rotation.x += deltaY * 0.01;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Floating gentle hover for the device
      if (!isDragging) {
        phoneGroup.rotation.y += (targetRotationY - phoneGroup.rotation.y) * 0.05;
        phoneGroup.rotation.x += (targetRotationX - phoneGroup.rotation.x) * 0.05;
        phoneGroup.position.y = Math.sin(elapsed * 1.5) * 0.18;
      }

      // Orbiting AI blocks animation
      orbitItems.forEach((item, index) => {
        item.angle += item.speed;
        item.mesh.position.x = Math.cos(item.angle) * item.radius;
        item.mesh.position.z = Math.sin(item.angle) * (item.radius * 0.6);
        item.mesh.position.y = item.yOffset + Math.sin(elapsed * 2 + index) * 0.2;
        item.mesh.rotation.x += 0.02;
        item.mesh.rotation.y += 0.03;
      });

      // Rotating particle starfield
      particles.rotation.y = elapsed * 0.04;
      particles.rotation.x = Math.sin(elapsed * 0.02) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || 450;
      const newHeight = container.clientHeight || 450;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      bodyGeometry.dispose();
      bodyMaterial.dispose();
      screenGeometry.dispose();
      screenMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      cubeGeo.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] sm:h-[460px] lg:h-[500px] flex items-center justify-center select-none group">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing rounded-2xl overflow-hidden"
      />

      {/* Interactive 3D Badge Indicator */}
      <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80 text-[11px] font-mono text-slate-300 flex items-center gap-2 pointer-events-none">
        <Rotate3d className="w-3.5 h-3.5 text-blue-400 animate-spin" style={{ animationDuration: '6s' }} />
        <span>Live 3D App Canvas (Click & Drag to Rotate)</span>
      </div>

      {/* Floating 3D Chips Overlay */}
      <div className="absolute top-4 right-3 flex flex-col gap-2 pointer-events-none">
        <div className="bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-blue-500/40 text-[10px] font-semibold text-blue-300 flex items-center gap-1.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
          <span>Custom Apps</span>
        </div>
        <div className="bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-purple-500/40 text-[10px] font-semibold text-purple-300 flex items-center gap-1.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-purple-400" />
          <span>AI Agents</span>
        </div>
        <div className="bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-rose-500/40 text-[10px] font-semibold text-rose-300 flex items-center gap-1.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-rose-400" />
          <span>Games Coming Soon</span>
        </div>
      </div>
    </div>
  );
};
