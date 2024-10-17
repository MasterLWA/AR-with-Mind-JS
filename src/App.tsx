import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import * as AR from 'ar.js';
import Webcam from 'webcamjs';

const App = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sceneRef = useRef<THREE.Scene>(null);
  const rendererRef = useRef<HTMLCanvasElement>(null);
  const [arContext, setARContext] = useState<AR.ARContext | undefined>(undefined);

  useEffect(() => {
    // Initialize Three.js scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Initialize AR.js context
    if (videoRef.current) {
      const arContext = new AR.ARContext(renderer.domElement, { sourceTexture: videoRef.current });
      setARContext(arContext);
    }
    setARContext(arContext);

    // Start the video
    Webcam.set({
      width: window.innerWidth,
      height: window.innerHeight,
      image_format: 'jpeg',
      jpeg_quality: 90
    }, () => {
      if (videoRef.current) {
        Webcam.attach(videoRef.current);
      }
    });

    // Start rendering the AR experience
    const animate = () => {
      requestAnimationFrame(animate);
      arContext?.process();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      arContext?.destroy();
      Webcam.reset();
    };
  }, [arContext]);

  useEffect(() => {
    if (arContext) {
      // Add 3D objects to the scene here
      const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
      const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.z = -5;
      sceneRef.current?.add(cube);
    }
  }, [arContext]);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />
      <canvas ref={rendererRef} />
    </div>
  );
};

export default App;