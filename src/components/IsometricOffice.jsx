import React, { useRef, useState, useEffect } from 'react';
import { useGLTF, Html } from '@react-three/drei';

const path = '/src/assets/models/isometric_office/test.glb';

const SEAT_DATA = {
  phong: {
    name: 'Phong',
    role: 'Back-end Dev',
    status: 'Online',
  },
  y: { name: 'Bảo Ý', role: 'Back-end Dev', status: 'Online' },
  nhu: { name: 'Bảo Như', role: 'Back-end Dev', status: 'Online' },
  duong: { name: 'Duong', role: 'Front-end Dev', status: 'Online' },
  quinn: { name: 'Quinn', role: 'Team Lead', status: 'Online' },
};

// Component hiển thị icon phía trên ghế
function SeatIcon({ visible, data, position, seatId, activeSeat, onToggle }) {
  const showInfo = activeSeat === seatId;
  const isOnline = data.status === 'Online';

  return (
    <Html
      position={position}
      center
      distanceFactor={10}
      style={{ display: visible ? 'block' : 'none' }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: 'translateY(-80px)',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: isOnline ? '#10b981' : '#6b7280',
            border: '3px solid white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            color: 'white',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            position: 'relative',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
          }}
          onClick={() => onToggle(seatId)}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {data.name.charAt(0).toUpperCase()}
          {isOnline && (
            <div
              style={{
                position: 'absolute',
                bottom: '2px',
                right: '2px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
                border: '2px solid white',
              }}
            />
          )}
        </div>
        <div
          style={{
            marginTop: '8px',
            padding: '4px 8px',
            backgroundColor: 'rgba(0,0,0,0.75)',
            borderRadius: '4px',
            fontSize: '12px',
            color: 'white',
            whiteSpace: 'nowrap',
          }}
        >
          {data.name}
        </div>

        {/* Thông tin chi tiết khi click */}
        {showInfo && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              marginTop: '12px',
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '16px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              minWidth: '200px',
              zIndex: 1000,
              animation: 'fadeIn 0.2s ease',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ marginBottom: '12px', textAlign: 'center' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: isOnline ? '#10b981' : '#6b7280',
                  border: '3px solid #e5e7eb',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: 'white',
                  position: 'relative',
                }}
              >
                {data.name.charAt(0).toUpperCase()}
                {isOnline && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '4px',
                      right: '4px',
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      backgroundColor: '#22c55e',
                      border: '3px solid white',
                    }}
                  />
                )}
              </div>
            </div>

            <div
              style={{
                borderBottom: '1px solid #e5e7eb',
                paddingBottom: '8px',
                marginBottom: '8px',
              }}
            >
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#111827',
                  marginBottom: '4px',
                }}
              >
                {data.name}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                {data.role}
              </div>
            </div>

            <div style={{ marginBottom: '8px' }}>
              <div
                style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  marginBottom: '4px',
                }}
              >
                Trạng thái
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  backgroundColor: isOnline ? '#d1fae5' : '#f3f4f6',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: isOnline ? '#065f46' : '#374151',
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: isOnline ? '#10b981' : '#6b7280',
                  }}
                />
                {data.status}
              </div>
            </div>

            <button
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '12px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onClick={() => onToggle(null)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = '#2563eb')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = '#3b82f6')
              }
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
      `}</style>
    </Html>
  );
}

export function IsometricOffice(props) {
  const { nodes, materials } = useGLTF(path);

  const [durationDoor, setDurationDoor] = useState();
  const [activeSeat, setActiveSeat] = useState(null);

  const handleSeatToggle = (seatId) => {
    setActiveSeat(activeSeat === seatId ? null : seatId);
  };

  useEffect(() => {
    setDurationDoor(props.openDuration * Math.PI);
  }, [props.openDuration]);

  return (
    <group {...props} dispose={null}>
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
            rotation={[-Math.PI / 2, 0, durationDoor]}
            scale={100}
          >
            <mesh
              name="Glass_Door023_Glass_0"
              geometry={nodes.Glass_Door023_Glass_0.geometry}
              material={materials['Glass.003']}
            />
            <mesh
              name="Glass_Door023_Metal_0"
              geometry={nodes.Glass_Door023_Metal_0.geometry}
              material={materials['Metal.003']}
            />
          </group>
          <group
            name="door-right"
            position={[-82.813, 0.146, -0.005]}
            rotation={[-Math.PI / 2, 0, -durationDoor]}
            scale={100}
          >
            <mesh
              name="Glass_Door007_Glass_0"
              geometry={nodes.Glass_Door007_Glass_0.geometry}
              material={materials['Glass.003']}
            />
            <mesh
              name="Glass_Door007_Metal_0"
              geometry={nodes.Glass_Door007_Metal_0.geometry}
              material={materials['Metal.003']}
            />
          </group>
          <mesh
            name="Glass_Door020_Metal_0"
            geometry={nodes.Glass_Door020_Metal_0.geometry}
            material={materials['Metal.003']}
            position={[0.088, -0.293, 0.011]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
        </group>
      </group>
      <mesh
        name="Cube001"
        geometry={nodes.Cube001.geometry}
        material={nodes.Cube001.material}
        position={[-0.028, 3.653, -14.009]}
        scale={[1.78, 2.715, 0.22]}
      />
      <mesh
        name="Cube002"
        geometry={nodes.Cube002.geometry}
        material={nodes.Cube002.material}
        position={[9.565, 1.98, -13.502]}
        scale={[4.639, 1, 7.45]}
      />
      <mesh
        name="Cube003"
        geometry={nodes.Cube003.geometry}
        material={nodes.Cube003.material}
        position={[0, 1.741, -12.368]}
      />
      <mesh
        name="Cube004"
        geometry={nodes.Cube004.geometry}
        material={nodes.Cube004.material}
        position={[0.409, 1.937, -42.748]}
        scale={[19.301, 1, 0.281]}
      />
      <mesh
        name="Cube005"
        geometry={nodes.Cube005.geometry}
        material={nodes.Cube005.material}
        position={[11.923, 2.098, -41.491]}
        scale={[7.596, 1, 1]}
      />
      <mesh
        name="Cube006"
        geometry={nodes.Cube006.geometry}
        material={nodes.Cube006.material}
        position={[19.772, 1.937, -24.752]}
        rotation={[0, 1.571, 0]}
        scale={[18.267, 1, 0.281]}
      />
      <mesh
        name="Cube007"
        geometry={nodes.Cube007.geometry}
        material={nodes.Cube007.material}
        position={[4.233, 5.654, -36.615]}
        scale={[0.217, 5.55, 5.861]}
      />
      <mesh
        name="Cube009"
        geometry={nodes.Cube009.geometry}
        material={nodes.Cube009.material}
        position={[9.177, 2.098, -32.063]}
        scale={[4.706, 1, 1]}
      />
      <mesh
        name="Cube010"
        geometry={nodes.Cube010.geometry}
        material={nodes.Cube010.material}
        position={[16.617, 1.958, -36.541]}
      />
      <mesh
        name="Cube011"
        geometry={nodes.Cube011.geometry}
        material={nodes.Cube011.material}
        position={[17.539, 1.958, -28.464]}
        scale={[2.004, 1, 1.937]}
      />
      <mesh
        name="Cube012"
        geometry={nodes.Cube012.geometry}
        material={nodes.Cube012.material}
        position={[9.177, 2.098, -25.472]}
        scale={[4.706, 1, 1]}
      />
      <mesh
        name="Cube"
        geometry={nodes.Cube.geometry}
        material={materials['Material.002']}
        position={[0, 0, -23.336]}
        rotation={[0, 0, -Math.PI]}
        scale={[-20.153, -1, -19.865]}
      />
      <mesh
        name="Cube013"
        geometry={nodes.Cube013.geometry}
        material={nodes.Cube013.material}
        position={[-2.789, 5.654, -30.866]}
        rotation={[0, 1.571, 0]}
        scale={[0.217, 5.55, 5.861]}
      />
      <mesh
        name="Cube014"
        geometry={nodes.Cube014.geometry}
        material={nodes.Cube014.material}
        position={[-8.917, 5.654, -36.615]}
        scale={[0.217, 5.55, 5.861]}
      />
      <mesh
        name="Cube015"
        geometry={nodes.Cube015.geometry}
        material={nodes.Cube015.material}
        position={[-16.291, 2.098, -32.063]}
        scale={[2.58, 1, 1]}
      />
      <mesh
        name="Cube016"
        geometry={nodes.Cube016.geometry}
        material={nodes.Cube016.material}
        position={[-27.238, 2.098, -32.063]}
        scale={[2.727, 1, 1]}
      />
      <mesh
        name="Cube017"
        geometry={nodes.Cube017.geometry}
        material={nodes.Cube017.material}
        position={[-13.851, 2.098, -20.907]}
        rotation={[0, 1.571, 0]}
        scale={[6.489, 1, 1]}
      />
      <mesh
        name="Cube018"
        geometry={nodes.Cube018.geometry}
        material={nodes.Cube018.material}
        position={[-18.162, 2.098, -20.907]}
        rotation={[0, 1.571, 0]}
        scale={[6.489, 1, 1]}
      />
      <mesh
        name="Cube019"
        geometry={nodes.Cube019.geometry}
        material={nodes.Cube019.material}
        position={[-21.84, 2.098, -20.907]}
        rotation={[0, 1.571, 0]}
        scale={[6.489, 1, 1]}
      />
      <mesh
        name="Cube020"
        geometry={nodes.Cube020.geometry}
        material={nodes.Cube020.material}
        position={[-23.828, 2.098, -20.907]}
        rotation={[0, 1.571, 0]}
        scale={[6.489, 1, 1]}
      />
      <mesh
        name="phong"
        geometry={nodes.phong.geometry}
        material={nodes.phong.material}
        position={[5.188, 2.576, -37.729]}
        scale={[1, 1, 0.762]}
      />
      <SeatIcon
        visible={props.sectionId === 3}
        seatId="phong"
        data={SEAT_DATA.phong}
        position={[5.188, 4, -37.729]}
        activeSeat={activeSeat}
        onToggle={handleSeatToggle}
      />

      <mesh
        name="y"
        geometry={nodes.y.geometry}
        material={nodes.y.material}
        position={[7.18, 2.576, -37.729]}
        scale={[1, 1, 0.762]}
      />
      <SeatIcon
        visible={props.sectionId === 3}
        seatId="y"
        data={SEAT_DATA.y}
        position={[7.18, 4, -37.729]}
        activeSeat={activeSeat}
        onToggle={handleSeatToggle}
      />

      <mesh
        name="nhu"
        geometry={nodes.nhu.geometry}
        material={nodes.nhu.material}
        position={[9.194, 2.576, -37.729]}
        scale={[1, 1, 0.762]}
      />
      <SeatIcon
        visible={props.sectionId === 3}
        seatId="nhu"
        data={SEAT_DATA.nhu}
        position={[9.194, 4, -37.729]}
        activeSeat={activeSeat}
        onToggle={handleSeatToggle}
      />

      <mesh
        name="duong"
        geometry={nodes.duong.geometry}
        material={nodes.duong.material}
        position={[11.212, 2.576, -37.729]}
        scale={[1, 1, 0.762]}
      />
      <SeatIcon
        visible={props.sectionId === 3}
        seatId="duong"
        data={SEAT_DATA.duong}
        position={[11.212, 4, -37.729]}
        activeSeat={activeSeat}
        onToggle={handleSeatToggle}
      />

      <mesh
        name="quinn"
        geometry={nodes.quinn.geometry}
        material={nodes.quinn.material}
        position={[13.21, 2.576, -37.729]}
        scale={[1, 1, 0.762]}
      />
      <SeatIcon
        visible={props.sectionId === 3}
        seatId="quinn"
        data={SEAT_DATA.quinn}
        position={[13.21, 4, -37.729]}
        activeSeat={activeSeat}
        onToggle={handleSeatToggle}
      />
    </group>
  );
}

useGLTF.preload(path);
