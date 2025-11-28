import {
  OrbitControls,
  PerspectiveCamera,
  Text3D,
  Text,
  Center,
} from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { Suspense, useEffect, useState, useRef } from 'react';
import { useScroll } from 'framer-motion';
import GUI from 'lil-gui';
import * as THREE from 'three';
import { IsometricOffice } from './components/IsometricOffice.jsx';

function App() {
  const { scrollYProgress } = useScroll();
  const [pageScroll, setPageScroll] = useState(0);
  const [cameraPosition, setCameraPosition] = useState([0, 2, 0]);
  const [fov, setFov] = useState(100);
  const [ambientLightIntensity, setAmbientLightIntensity] = useState(0.5);
  const [directionalLightIntensity, setDirectionalLightIntensity] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [openDuration, setOpenDuration] = useState(0);
  useEffect(() => {
    scrollYProgress.on('change', (latest) => {
      setPageScroll(latest);
    });
  }, [scrollYProgress]);

  const CameraScroll = ({ isPlaying }) => {
    const { camera } = useThree();

    const start = useRef(new THREE.Vector3(0, 2, 0));
    const end = useRef(new THREE.Vector3(0, 2, -6));
    const hasCompleted = useRef(false);

    useEffect(() => {
      console.log('CameraScroll isPlaying', isPlaying, hasCompleted.current);
      // Chỉ reset về start khi chưa hoàn thành và isPlaying = true (bắt đầu mới)
      if (!isPlaying && !hasCompleted.current) {
        camera.position.copy(start.current);
      }
    }, [isPlaying]);

    useFrame((_, delta) => {
      if (!isPlaying) return;

      const speed = 1.5;
      const processMax05 = Math.min(
        1 -
          camera.position.distanceTo(end.current) /
            start.current.distanceTo(end.current),
        0.5
      );
      setOpenDuration(processMax05);
      // Lerp nhưng dựa trên delta để mượt
      camera.position.lerp(end.current, 1 - Math.exp(-speed * delta));

      if (camera.position.z <= -5.1) {
        hasCompleted.current = true; // Đánh dấu đã hoàn thành
        setIsPlaying(false);
        setOpenDuration(0.5); // Giữ giá trị cuối cùng
      }
    });

    return null;
  };

  return (
    <div className="fixed w-full h-screen bg-white flex items-center justify-center">
      <button
        onClick={() => setIsPlaying(true)}
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          zIndex: 10,
          padding: '10px 16px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Bắt đầu
      </button>
      <Canvas>
        <CameraScroll isPlaying={isPlaying} />
        <Suspense fallback={null}>
          <ambientLight intensity={ambientLightIntensity} />
          {/* hiển thị trục XYZ */}
          <axesHelper args={[5]} />

          <directionalLight
            position={[10, 10, 5]}
            intensity={directionalLightIntensity}
          />
          <directionalLight
            position={[-10, -10, -5]}
            intensity={directionalLightIntensity}
          />
          <IsometricOffice openDuration={openDuration} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
