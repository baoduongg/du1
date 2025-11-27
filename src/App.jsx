import {
  OrbitControls,
  PerspectiveCamera,
  Text3D,
  Text,
  Center,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
// import { OfficeModel } from './assets/models/office.jsx';
import { IsometricOffice } from './components/IsometricOffice.jsx';
function App() {
  const renderRamdomDonut = () => {
    const donutArray = [];
    for (let i = 0; i < 100; i++) {
      const position = [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ];
      const rotation = [Math.random() * Math.PI, Math.random() * Math.PI];
      const scale = [Math.random(), Math.random(), Math.random()];
      donutArray.push({ position, rotation, scale });
    }
    return donutArray.map((donut, i) => {
      return (
        <mesh key={i} position={donut.position}>
          <torusGeometry args={[0.3, 0.2, 32, 64]} />
          <meshStandardMaterial color="green" />
        </mesh>
      );
    });
  };
  return (
    <div className="relative w-full h-screen bg-white flex items-center justify-center">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={100} />
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={1} />
          {/* {renderRamdomDonut()} */}
          {/* 3D Text với font có sẵn */}
          {/* <Center position={[0, -2, 0]}>
            <Text3D
              font="/src/static/fonts/helvetiker_regular.typeface.json"
              size={0.5}
              height={0.2}
              depth={0.2}
              curveSegments={12}
              bevelEnabled={true}
              bevelThickness={0.03}
              bevelSize={0.02}
              bevelOffset={0}
              bevelSegments={5}
            >
              Hello 3D!
              <meshStandardMaterial color="purple" />
            </Text3D>
          </Center> */}
          {/* <OfficeModel position={[0, 0, 0]} /> */}
          <IsometricOffice position={[0, -1, 0]} />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
        />
      </Canvas>
    </div>
  );
}

export default App;
