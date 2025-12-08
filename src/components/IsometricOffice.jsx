import React, { useRef, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

const path = '/src/assets/models/isometric_office/test.glb';
export function IsometricOffice(props) {
  const { nodes, materials } = useGLTF(path);
  const [durationDoor, setDurationDoor] = useState();

  useEffect(() => {
    setDurationDoor(props.openDuration * Math.PI);
  }, [props.openDuration]);

  return (
    <group {...props} dispose={null}>
      <group position={[0, 1.027, -5.859]} rotation={[-Math.PI / 2, 0, 3.142]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group
            position={[82.725, 0.146, -0.005]}
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            scale={100}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Glass_Door023_Glass_0.geometry}
              material={materials['Glass.003']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Glass_Door023_Metal_0.geometry}
              material={materials['Metal.003']}
            />
          </group>
          <group
            position={[-82.813, 0.146, -0.005]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            scale={100}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Glass_Door007_Glass_0.geometry}
              material={materials['Glass.003']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Glass_Door007_Metal_0.geometry}
              material={materials['Metal.003']}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Glass_Door020_Metal_0.geometry}
            material={materials['Metal.003']}
            position={[0.088, -0.293, 0.011]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
        </group>
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={nodes.Cube001.material}
        position={[-0.028, 3.653, -14.009]}
        scale={[1.78, 2.715, 0.22]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={nodes.Cube002.material}
        position={[9.565, 1.98, -13.502]}
        scale={[4.639, 1, 7.45]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={nodes.Cube003.material}
        position={[0, 1.741, -12.368]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004.geometry}
        material={nodes.Cube004.material}
        position={[0.409, 1.937, -42.748]}
        scale={[19.301, 1, 0.281]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube005.geometry}
        material={nodes.Cube005.material}
        position={[11.923, 2.098, -41.491]}
        scale={[7.596, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube006.geometry}
        material={nodes.Cube006.material}
        position={[19.772, 1.937, -24.752]}
        rotation={[0, 1.571, 0]}
        scale={[18.267, 1, 0.281]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube007.geometry}
        material={nodes.Cube007.material}
        position={[4.233, 5.654, -36.615]}
        scale={[0.217, 5.55, 5.861]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube008.geometry}
        material={nodes.Cube008.material}
        position={[9.177, 2.098, -36.57]}
        scale={[4.706, 1, 1.601]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube009.geometry}
        material={nodes.Cube009.material}
        position={[9.177, 2.098, -32.063]}
        scale={[4.706, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube010.geometry}
        material={nodes.Cube010.material}
        position={[16.617, 1.958, -36.541]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube011.geometry}
        material={nodes.Cube011.material}
        position={[17.539, 1.958, -28.464]}
        scale={[2.004, 1, 1.937]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube012.geometry}
        material={nodes.Cube012.material}
        position={[9.177, 2.098, -25.472]}
        scale={[4.706, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials['Material.002']}
        position={[0, 0, -23.336]}
        rotation={[0, 0, -Math.PI]}
        scale={[-20.153, -1, -19.865]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube013.geometry}
        material={nodes.Cube013.material}
        position={[-2.789, 5.654, -30.866]}
        rotation={[0, 1.571, 0]}
        scale={[0.217, 5.55, 5.861]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube014.geometry}
        material={nodes.Cube014.material}
        position={[-8.917, 5.654, -36.615]}
        scale={[0.217, 5.55, 5.861]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube015.geometry}
        material={nodes.Cube015.material}
        position={[-16.291, 2.098, -32.063]}
        scale={[2.58, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube016.geometry}
        material={nodes.Cube016.material}
        position={[-27.238, 2.098, -32.063]}
        scale={[2.727, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube017.geometry}
        material={nodes.Cube017.material}
        position={[-13.851, 2.098, -20.907]}
        rotation={[0, 1.571, 0]}
        scale={[6.489, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube018.geometry}
        material={nodes.Cube018.material}
        position={[-18.162, 2.098, -20.907]}
        rotation={[0, 1.571, 0]}
        scale={[6.489, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube019.geometry}
        material={nodes.Cube019.material}
        position={[-21.84, 2.098, -20.907]}
        rotation={[0, 1.571, 0]}
        scale={[6.489, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube020.geometry}
        material={nodes.Cube020.material}
        position={[-23.828, 2.098, -20.907]}
        rotation={[0, 1.571, 0]}
        scale={[6.489, 1, 1]}
      />
    </group>
  );
}

useGLTF.preload(path);
