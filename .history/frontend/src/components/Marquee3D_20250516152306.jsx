import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Html, useTexture } from '@react-three/drei';

const ImageBox = ({ texturePath, position }) => {
  const texture = useTexture(texturePath);
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh position={position}>
        <boxBufferGeometry args={[2.5, 1.6, 0.1]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </Float>
  );
};

const Marquee3D = () => {
  const imagePaths = [
    '/images/image1.png',
    '/images/image2.png',
    '/images/image3.png',
    '/images/image4.png',
    '/images/image5.png',
    '/images/image6.png',
  ];

  return (
    <div style={{ width: '100%', height: '500px', marginBottom: '3rem' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} />
        <OrbitControls enableZoom={false} />
        {imagePaths.map((path, index) => (
          <ImageBox
            key={index}
            texturePath={path}
            position={[index * 3 - 7.5, 0, 0]} // horizontal layout
          />
        ))}
      </Canvas>
    </div>
  );
};

export default Marquee3D;
