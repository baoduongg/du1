import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

const path = '/src/assets/models/isometric_office/test.glb';
export function IsometricOffice(props) {
  const { nodes, materials } = useGLTF(path);
  return (
    <group {...props} dispose={null}>
      <group position={[0, 1.027, -5.859]} rotation={[-Math.PI / 2, 0, 3.142]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group
            position={[82.725, 0.146, -0.005]}
            rotation={[-Math.PI / 2, 0, props.openDuration * Math.PI]}
            scale={100}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Glass_Door023_Glass_0.geometry}
              material={materials['Glass.001']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Glass_Door023_Metal_0.geometry}
              material={materials['Metal.001']}
            />
          </group>
          <group
            position={[-82.813, 0.146, -0.005]}
            rotation={[-Math.PI / 2, 0, -props.openDuration * Math.PI]}
            scale={100}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Glass_Door007_Glass_0.geometry}
              material={materials['Glass.001']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Glass_Door007_Metal_0.geometry}
              material={materials['Metal.001']}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Glass_Door020_Metal_0.geometry}
            material={materials['Metal.001']}
            position={[0.088, -0.293, 0.011]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
        </group>
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.Material}
        position={[0, 0, -23.336]}
        rotation={[0, 0, -Math.PI]}
        scale={[-20.153, -1, -19.865]}
      />
    </group>
  );
}

useGLTF.preload(path);
