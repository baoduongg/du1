import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import { DeskInstances } from './DeskInstances.jsx';
const path = '/src/assets/models/isometric_office/test.glb';

const SEAT_DATA = {
  phongdbt: { name: 'Phong', role: 'Dev', status: 'Online', section_id: 3 },
  ylpb: { name: 'Bảo Ý', role: 'Dev', status: 'Online', section_id: 3 },
  nhulpb: { name: 'Bảo Như', role: 'Dev', status: 'Online', section_id: 3 },
  duongnb: { name: 'Dương', role: 'Dev', status: 'Online', section_id: 3 },
  quinn: {
    name: 'Quinn',
    role: 'Team Leader',
    status: 'Online',
    section_id: 3,
  },
  tuanvm: {
    name: 'Tuấn',
    role: 'Flutter Leader',
    status: 'Online',
    section_id: 3,
  },
  tamtm: { name: 'Tâm', role: 'Dev', status: 'Online', section_id: 3 },
  duyqk: { name: 'Duy', role: 'Dev', status: 'Online', section_id: 3 },
  luanpvd: { name: 'Luân', role: 'Dev', status: 'Online', section_id: 3 },
  trind: { name: 'Trí', role: 'Dev', status: 'Online', section_id: 3 },
  banglt: { name: 'Bằng', role: 'PM', status: 'Online', section_id: 3 },
  hieucg: { name: 'Hiếu', role: 'Dev', status: 'Online', section_id: 3 },
  hautc: { name: 'Hậu', role: 'Dev', status: 'Online', section_id: 3 },
  minhpvl: { name: 'Minh', role: 'Dev', status: 'Online', section_id: 3 },
  hungnd: { name: 'Hùng', role: 'Dev', status: 'Online', section_id: 3 },
};

// Component hiển thị icon phía trên ghế
function SeatIcon({ visible, data, position, seatId, activeSeat, onToggle }) {
  const showInfo = activeSeat === seatId;
  const isOnline = data?.status === 'Online';

  return (
    <Html
      position={position}
      center
      distanceFactor={10}
      className={visible ? 'block' : 'hidden'}
    >
      <div className="flex flex-col items-center -translate-y-20 relative">
        {/* Avatar Badge */}
        <div
          className={`
            w-12 h-12 rounded-full border-3 border-white
            flex items-center justify-center
            text-lg font-bold text-white
            shadow-lg relative cursor-pointer
            transition-all duration-200 hover:scale-110 hover:shadow-xl
            ${
              isOnline
                ? 'bg-linear-to-br from-emerald-400 to-emerald-600'
                : 'bg-linear-to-br from-gray-400 to-gray-600'
            }
          `}
          onClick={() => onToggle(seatId)}
        >
          {data?.name.charAt(0).toUpperCase()}

          {/* Online indicator */}
          {isOnline && (
            <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
          )}
        </div>

        {/* Name Tag */}
        <div className="mt-2 px-3 py-1.5 bg-gray-900/90 backdrop-blur-sm rounded-lg text-xs text-white whitespace-nowrap shadow-md">
          {data?.name}
        </div>

        {/* Detailed Info Card */}
        {showInfo && (
          <div
            className="absolute top-full mt-3 bg-white rounded-xl p-4 shadow-2xl min-w-[240px] z-50 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Avatar Section */}
            <div className="mb-4 text-center">
              <div
                className={`
                  w-16 h-16 rounded-full border-4 border-gray-100
                  inline-flex items-center justify-center
                  text-2xl font-bold text-white relative
                  ${
                    isOnline
                      ? 'bg-linear-to-br from-emerald-400 to-emerald-600 shadow-emerald-200'
                      : 'bg-linear-to-br from-gray-400 to-gray-600'
                  }
                  shadow-lg
                `}
              >
                {data?.name.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* User Info */}
            <div className="border-b border-gray-200 pb-3 mb-3">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {data?.name}
              </h3>
              <p className="text-sm text-gray-600">{data?.role}</p>
            </div>

            {/* Status Badge */}
            <div className="mb-4">
              <label className="text-xs text-gray-500 uppercase tracking-wide mb-2 block">
                Trạng thái
              </label>
              <span
                className={`
                  inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold
                  ${
                    isOnline
                      ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20'
                      : 'bg-gray-100 text-gray-700 ring-1 ring-gray-600/20'
                  }
                `}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-gray-500'
                  }`}
                />
                {data?.status}
              </span>
            </div>

            {/* Close Button */}
            <button
              className="w-full py-2.5 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
              onClick={() => onToggle(null)}
            >
              Đóng
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease;
        }
      `}</style>
    </Html>
  );
}

export function IsometricOffice(props) {
  const { nodes, materials } = useGLTF(path);

  const [durationDoor, setDurationDoor] = useState();
  const [activeSeat, setActiveSeat] = useState(null);
  const deskInstanceRef = useRef();
  const deskPositions = useMemo(
    () => [
      // Hàng 1 - Facing back (-38.047)
      {
        seatId: 'quinn',
        position: [12.652, 2.021, -38.047],
        rotation: [0, -1.571, 0],
        scale: [-0.464, -0.074, -0.913],
      },
      {
        seatId: 'nhulpb',
        position: [8.935, 2.021, -38.047],
        rotation: [0, -1.571, 0],
        scale: [-0.464, -0.074, -0.913],
      },
      {
        seatId: 'duongnb',
        position: [10.809, 2.021, -38.047],
        rotation: [0, -1.571, 0],
        scale: [-0.464, -0.074, -0.913],
      },
      {
        seatId: 'ylpb',
        position: [7.178, 2.021, -38.047],
        rotation: [0, -1.571, 0],
        scale: [-0.464, -0.074, -0.913],
      },
      {
        seatId: 'phongdbt',
        position: [5.359, 2.021, -38.047],
        rotation: [0, -1.571, 0],
        scale: [-0.464, -0.074, -0.913],
      },
      // Hàng 2 - Facing front (-37.123/-37.122/-37.121)
      {
        seatId: 'tuanvm',
        position: [12.639, 2.021, -37.123],
        rotation: [0, 1.57, 0],
        scale: [-0.464, -0.074, -0.913],
      },
      {
        seatId: 'tamtm',
        position: [10.819, 2.021, -37.123],
        rotation: [0, 1.57, 0],
        scale: [-0.464, -0.074, -0.913],
      },
      {
        seatId: 'duyqk',
        position: [8.945, 2.021, -37.123],
        rotation: [0, 1.57, 0],
        scale: [-0.464, -0.074, -0.913],
      },
      {
        seatId: 'luanpvd',
        position: [7.188, 2.021, -37.122],
        rotation: [0, 1.57, 0],
        scale: [-0.464, -0.074, -0.913],
      },
      {
        seatId: 'trind',
        position: [5.35, 2.021, -37.121],
        rotation: [0, 1.57, 0],
        scale: [-0.464, -0.074, -0.913],
      },
      // Hàng 3 - Facing back (-33.011/-33.01/-33.009)
      {
        seatId: 'banglt',
        position: [12.648, 2.021, -33.011],
        rotation: [0, -1.57, 0],
        scale: [-0.464, -0.074, -0.913],
      },
      {
        seatId: 'hieucg',
        position: [10.809, 2.021, -33.011],
        rotation: [0, -1.57, 0],
        scale: [-0.464, -0.074, -0.913],
      },
      {
        seatId: 'hautc',
        position: [8.995, 2.021, -33.011],
        rotation: [0, -1.57, 0],
        scale: [-0.464, -0.074, -0.913],
      },
      {
        seatId: 'minhpvl',
        position: [7.178, 2.021, -33.01],
        rotation: [0, -1.57, 0],
        scale: [-0.464, -0.074, -0.913],
      },
      {
        seatId: 'hungnd',
        position: [5.358, 2.021, -33.009],
        rotation: [0, -1.57, 0],
        scale: [-0.464, -0.074, -0.913],
      },
    ],
    []
  );

  const handleSeatToggle = (seatId) => {
    setActiveSeat(activeSeat === seatId ? null : seatId);
    props.onFocusMember &&
      props.onFocusMember(
        seatId ? deskPositions.find((d) => d.seatId === seatId).position : null
      );
  };

  useEffect(() => {
    setDurationDoor(props.openDuration * Math.PI);
  }, [props.openDuration]);

  //
  return (
    <group {...props} dispose={null}>
      {/* Render SeatIcons */}
      {deskPositions.map((desk) => (
        <SeatIcon
          key={desk.seatId}
          visible={props.sectionId === SEAT_DATA[desk.seatId].section_id}
          data={SEAT_DATA[desk.seatId]}
          position={desk.position}
          seatId={desk.seatId}
          activeSeat={activeSeat}
          onToggle={handleSeatToggle}
        />
      ))}

      {/* Render desk instances */}
      <DeskInstances
        deskPositions={deskPositions}
        nodes={nodes}
        materials={materials}
      />

      <group
        name="Sketchfab_model"
        position={[0, 1.027, -5.859]}
        rotation={[-Math.PI / 2, 0, 3.142]}
      >
        <group
          name="adeb93b16b1343ce9259f3bc30ece086fbx"
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        >
          <group
            name="door-left"
            position={[82.725, 0.146, -0.005]}
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            scale={100}
          >
            <mesh
              name="Glass_Door023_Glass_0"
              castShadow
              receiveShadow
              geometry={nodes.Glass_Door023_Glass_0.geometry}
              material={materials['Glass.001']}
            />
            <mesh
              name="Glass_Door023_Metal_0"
              castShadow
              receiveShadow
              geometry={nodes.Glass_Door023_Metal_0.geometry}
              material={materials['Metal.001']}
            />
          </group>
          <group
            name="door-right"
            position={[-82.813, 0.146, -0.005]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            scale={100}
          >
            <mesh
              name="Glass_Door007_Glass_0"
              castShadow
              receiveShadow
              geometry={nodes.Glass_Door007_Glass_0.geometry}
              material={materials['Glass.001']}
            />
            <mesh
              name="Glass_Door007_Metal_0"
              castShadow
              receiveShadow
              geometry={nodes.Glass_Door007_Metal_0.geometry}
              material={materials['Metal.001']}
            />
          </group>
          <mesh
            name="Glass_Door020_Metal_0"
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
        name="Cube001"
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={nodes.Cube001.material}
        position={[-0.028, 3.653, -14.009]}
        scale={[1.78, 2.715, 0.22]}
      />
      <mesh
        name="Cube002"
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={nodes.Cube002.material}
        position={[9.565, 1.98, -13.502]}
        scale={[4.639, 1, 7.45]}
      />
      <mesh
        name="Cube003"
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={nodes.Cube003.material}
        position={[0, 1.741, -12.368]}
      />
      <mesh
        name="Cube004"
        castShadow
        receiveShadow
        geometry={nodes.Cube004.geometry}
        material={nodes.Cube004.material}
        position={[0.409, 1.625, -42.748]}
        scale={[19.301, 0.618, 0.281]}
      />
      <mesh
        name="Cube006"
        castShadow
        receiveShadow
        geometry={nodes.Cube006.geometry}
        material={nodes.Cube006.material}
        position={[19.772, 1.466, -24.752]}
        rotation={[0, 1.571, 0]}
        scale={[18.267, 0.585, 0.281]}
      />
      <mesh
        name="Cube007"
        castShadow
        receiveShadow
        geometry={nodes.Cube007.geometry}
        material={nodes.Cube007.material}
        position={[4.233, 3.41, -37.752]}
        scale={[0.217, 2.442, 4.323]}
      />

      <group
        name="Cube008"
        position={[5.35, 2.021, -42.024]}
        rotation={[0, 1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}
      >
        <mesh
          name="Cube006_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube006_1.geometry}
          material={materials['Material.022']}
        />
        <mesh
          name="Cube006_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube006_2.geometry}
          material={nodes.Cube006_2.material}
        />
        <mesh
          name="Cube006_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube006_3.geometry}
          material={materials['Chair 1.020']}
        />
      </group>
      <group
        name="Cube009"
        position={[7.188, 2.021, -42.024]}
        rotation={[0, 1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}
      >
        <mesh
          name="Cube007_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube007_1.geometry}
          material={materials['Material.023']}
        />
        <mesh
          name="Cube007_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube007_2.geometry}
          material={nodes.Cube007_2.material}
        />
        <mesh
          name="Cube007_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube007_3.geometry}
          material={materials['Chair 1.021']}
        />
      </group>
      <group
        name="Cube010"
        position={[10.819, 2.021, -42.025]}
        rotation={[0, 1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}
      >
        <mesh
          name="Cube008_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube008_1.geometry}
          material={materials['Material.021']}
        />
        <mesh
          name="Cube008_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube008_2.geometry}
          material={nodes.Cube008_2.material}
        />
        <mesh
          name="Cube008_3"
          castShadow
          receiveShadow
          geometry={nodes.Cube008_3.geometry}
          material={materials['Chair 1.019']}
        />
      </group>
      <group
        name="Cube012"
        position={[12.639, 2.021, -42.026]}
        rotation={[0, 1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}
      >
        <mesh
          name="Cube011"
          castShadow
          receiveShadow
          geometry={nodes.Cube011.geometry}
          material={materials['Material.021']}
        />
        <mesh
          name="Cube011_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube011_1.geometry}
          material={nodes.Cube011_1.material}
        />
        <mesh
          name="Cube011_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube011_2.geometry}
          material={materials['Chair 1.019']}
        />
      </group>

      <group
        name="Cube018"
        position={[5.358, 2.021, -26.801]}
        rotation={[0, -1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}
      >
        <mesh
          name="Cube097"
          castShadow
          receiveShadow
          geometry={nodes.Cube097.geometry}
          material={materials['Material.027']}
        />
        <mesh
          name="Cube097_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube097_1.geometry}
          material={nodes.Cube097_1.material}
        />
        <mesh
          name="Cube097_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube097_2.geometry}
          material={materials['Chair 1.025']}
        />
      </group>
      <group
        name="Cube020"
        position={[7.178, 2.021, -26.801]}
        rotation={[0, -1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}
      >
        <mesh
          name="Cube098"
          castShadow
          receiveShadow
          geometry={nodes.Cube098.geometry}
          material={materials['Material.027']}
        />
        <mesh
          name="Cube098_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube098_1.geometry}
          material={nodes.Cube098_1.material}
        />
        <mesh
          name="Cube098_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube098_2.geometry}
          material={materials['Chair 1.025']}
        />
      </group>
      <group
        name="Cube022"
        position={[10.809, 2.021, -26.802]}
        rotation={[0, -1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}
      >
        <mesh
          name="Cube107"
          castShadow
          receiveShadow
          geometry={nodes.Cube107.geometry}
          material={materials['Material.028']}
        />
        <mesh
          name="Cube107_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube107_1.geometry}
          material={nodes.Cube107_1.material}
        />
        <mesh
          name="Cube107_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube107_2.geometry}
          material={materials['Chair 1.026']}
        />
      </group>
      <group
        name="Cube023"
        position={[12.648, 2.021, -26.803]}
        rotation={[0, -1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}
      >
        <mesh
          name="Cube108"
          castShadow
          receiveShadow
          geometry={nodes.Cube108.geometry}
          material={materials['Material.029']}
        />
        <mesh
          name="Cube108_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube108_1.geometry}
          material={nodes.Cube108_1.material}
        />
        <mesh
          name="Cube108_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube108_2.geometry}
          material={materials['Chair 1.027']}
        />
      </group>
      <group
        name="Cube025"
        position={[16.755, 2.021, -30.632]}
        rotation={[0, 1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}
      >
        <mesh
          name="Cube110"
          castShadow
          receiveShadow
          geometry={nodes.Cube110.geometry}
          material={materials['Material.031']}
        />
        <mesh
          name="Cube110_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube110_1.geometry}
          material={nodes.Cube110_1.material}
        />
        <mesh
          name="Cube110_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube110_2.geometry}
          material={materials['Chair 1.029']}
        />
      </group>
      <group
        name="Cube026"
        position={[18.593, 2.021, -30.632]}
        rotation={[0, 1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}
      >
        <mesh
          name="Cube111"
          castShadow
          receiveShadow
          geometry={nodes.Cube111.geometry}
          material={materials['Material.032']}
        />
        <mesh
          name="Cube111_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube111_1.geometry}
          material={nodes.Cube111_1.material}
        />
        <mesh
          name="Cube111_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube111_2.geometry}
          material={materials['Chair 1.030']}
        />
      </group>
      <group
        name="Cube028"
        position={[18.585, 2.021, -26.801]}
        rotation={[0, -1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}
      >
        <mesh
          name="Cube112"
          castShadow
          receiveShadow
          geometry={nodes.Cube112.geometry}
          material={materials['Material.030']}
        />
        <mesh
          name="Cube112_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube112_1.geometry}
          material={nodes.Cube112_1.material}
        />
        <mesh
          name="Cube112_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube112_2.geometry}
          material={materials['Chair 1.028']}
        />
      </group>
      <group
        name="Cube029"
        position={[16.765, 2.021, -26.801]}
        rotation={[0, -1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}
      >
        <mesh
          name="Cube113"
          castShadow
          receiveShadow
          geometry={nodes.Cube113.geometry}
          material={materials['Material.030']}
        />
        <mesh
          name="Cube113_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube113_1.geometry}
          material={nodes.Cube113_1.material}
        />
        <mesh
          name="Cube113_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube113_2.geometry}
          material={materials['Chair 1.028']}
        />
      </group>
      <mesh
        name="Cube030"
        castShadow
        receiveShadow
        geometry={nodes.Cube030.geometry}
        material={materials['Material.001']}
        position={[0, 0, -23.336]}
        rotation={[0, 0, -Math.PI]}
        scale={[-20.153, -1, -19.865]}
      />

      <group
        name="Cube035"
        position={[9.018, 2.021, -42.025]}
        rotation={[0, 1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}
      >
        <mesh
          name="Cube024"
          castShadow
          receiveShadow
          geometry={nodes.Cube024.geometry}
          material={materials['Material.012']}
        />
        <mesh
          name="Cube024_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube024_1.geometry}
          material={nodes.Cube024_1.material}
        />
        <mesh
          name="Cube024_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube024_2.geometry}
          material={materials['Chair 1.011']}
        />
      </group>

      <group
        name="Cube031"
        position={[8.99, 2.021, -26.802]}
        rotation={[0, -1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}
      >
        <mesh
          name="Cube016"
          castShadow
          receiveShadow
          geometry={nodes.Cube016.geometry}
          material={materials['Material.004']}
        />
        <mesh
          name="Cube016_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube016_1.geometry}
          material={nodes.Cube016_1.material}
        />
        <mesh
          name="Cube016_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube016_2.geometry}
          material={materials['Chair 1.007']}
        />
      </group>
    </group>
  );
}

useGLTF.preload(path);
