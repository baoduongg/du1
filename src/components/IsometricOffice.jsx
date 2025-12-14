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
      <group position={[0, 1.027, -5.859]} rotation={[-Math.PI / 2, 0, 3.142]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group
            position={[82.725, 0.146, -0.005]}
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            scale={100}>
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
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            scale={100}>
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
        position={[0.409, 1.625, -42.748]}
        scale={[19.301, 0.618, 0.281]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube006.geometry}
        material={nodes.Cube006.material}
        position={[19.772, 1.466, -24.752]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[18.267, 0.585, 0.281]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube007.geometry}
        material={nodes.Cube007.material}
        position={[4.233, 3.41, -37.752]}
        scale={[0.217, 2.442, 4.323]}
      />
      <group
        position={[12.648, 2.108, -37.825]}
        rotation={[Math.PI, -0.028, Math.PI]}
        scale={[1.156, 1.155, 1.156]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube018_1.geometry}
          material={materials['Material.002']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube018_2.geometry}
          material={materials['Chair 1.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube018_3.geometry}
          material={nodes.Cube018_3.material}
        />
      </group>
      <group
        position={[10.809, 2.021, -38.047]}
        rotation={[0, -1.571, 0]}
        scale={[-0.464, -0.074, -0.913]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube021_1.geometry}
          material={materials['Material.003']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube021_2.geometry}
          material={nodes.Cube021_2.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube021_3.geometry}
          material={materials['Chair 1.002']}
        />
      </group>
      <group
        position={[8.288, 1.47, -38.349]}
        rotation={[0, 1.571, 0]}
        scale={[0.059, 0.489, 0.059]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder014.geometry}
          material={nodes.Cylinder014.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder014_1.geometry}
          material={materials['Material.005']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder014_2.geometry}
          material={materials['Chair 1.003']}
        />
      </group>
      <group
        position={[7.178, 2.021, -38.047]}
        rotation={[0, -1.571, 0]}
        scale={[-0.464, -0.074, -0.913]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube027_1.geometry}
          material={materials['Material.005']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube027_2.geometry}
          material={nodes.Cube027_2.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube027_3.geometry}
          material={materials['Chair 1.003']}
        />
      </group>
      <group
        position={[5.359, 2.021, -38.047]}
        rotation={[0, -1.571, 0]}
        scale={[-0.464, -0.074, -0.913]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube030.geometry}
          material={materials['Material.005']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube030_1.geometry}
          material={nodes.Cube030_1.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube030_2.geometry}
          material={materials['Chair 1.003']}
        />
      </group>
      <group
        position={[8.998, 2.108, -37.344]}
        rotation={[0, 0.029, 0]}
        scale={[1.156, 1.155, 1.156]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube034.geometry}
          material={nodes.Cube034.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube034_1.geometry}
          material={materials['Material.006']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube034_2.geometry}
          material={materials['Chair 1.004']}
        />
      </group>
      <group
        position={[12.639, 2.021, -37.123]}
        rotation={[0, 1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube038.geometry}
          material={materials['Material.006']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube038_1.geometry}
          material={nodes.Cube038_1.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube038_2.geometry}
          material={materials['Chair 1.004']}
        />
      </group>
      <group
        position={[10.819, 2.021, -37.123]}
        rotation={[0, 1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube040.geometry}
          material={materials['Material.006']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube040_1.geometry}
          material={nodes.Cube040_1.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube040_2.geometry}
          material={materials['Chair 1.004']}
        />
      </group>
      <group
        position={[7.188, 2.021, -37.122]}
        rotation={[0, 1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube043.geometry}
          material={materials['Material.007']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube043_1.geometry}
          material={nodes.Cube043_1.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube043_2.geometry}
          material={materials['Chair 1.005']}
        />
      </group>
      <group
        position={[5.35, 2.021, -37.121]}
        rotation={[0, 1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube046.geometry}
          material={materials['Material.008']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube046_1.geometry}
          material={nodes.Cube046_1.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube046_2.geometry}
          material={materials['Chair 1.006']}
        />
      </group>
      <group
        position={[8.998, 2.108, -42.247]}
        rotation={[0, 0.029, 0]}
        scale={[1.156, 1.155, 1.156]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={nodes.Cube003_1.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials['Material.021']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_3.geometry}
          material={materials['Chair 1.019']}
        />
      </group>
      <group
        position={[5.35, 2.021, -42.024]}
        rotation={[0, 1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube006_1.geometry}
          material={materials['Material.022']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube006_2.geometry}
          material={nodes.Cube006_2.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube006_3.geometry}
          material={materials['Chair 1.020']}
        />
      </group>
      <group
        position={[7.188, 2.021, -42.024]}
        rotation={[0, 1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube007_1.geometry}
          material={materials['Material.023']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube007_2.geometry}
          material={nodes.Cube007_2.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube007_3.geometry}
          material={materials['Chair 1.021']}
        />
      </group>
      <group
        position={[10.819, 2.021, -42.025]}
        rotation={[0, 1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube008_1.geometry}
          material={materials['Material.021']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube008_2.geometry}
          material={nodes.Cube008_2.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube008_3.geometry}
          material={materials['Chair 1.019']}
        />
      </group>
      <group
        position={[12.639, 2.021, -42.026]}
        rotation={[0, 1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube011_1.geometry}
          material={materials['Material.021']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube011_2.geometry}
          material={nodes.Cube011_2.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube011_3.geometry}
          material={materials['Chair 1.019']}
        />
      </group>
      <group
        position={[8.999, 2.108, -32.788]}
        rotation={[Math.PI, -0.029, Math.PI]}
        scale={[1.156, 1.155, 1.156]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube013_1.geometry}
          material={nodes.Cube013_1.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube013_2.geometry}
          material={materials['Material.024']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube013_3.geometry}
          material={materials['Chair 1.022']}
        />
      </group>
      <group
        position={[12.648, 2.021, -33.011]}
        rotation={[0, -1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube014_1.geometry}
          material={materials['Material.025']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube014_2.geometry}
          material={nodes.Cube014_2.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube014_3.geometry}
          material={materials['Chair 1.023']}
        />
      </group>
      <group
        position={[10.809, 2.021, -33.011]}
        rotation={[0, -1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_1.geometry}
          material={materials['Material.026']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_2.geometry}
          material={nodes.Cube015_2.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_3.geometry}
          material={materials['Chair 1.024']}
        />
      </group>
      <group
        position={[7.178, 2.021, -33.01]}
        rotation={[0, -1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_1.geometry}
          material={materials['Material.024']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_2.geometry}
          material={nodes.Cube017_2.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_3.geometry}
          material={materials['Chair 1.022']}
        />
      </group>
      <group
        position={[5.358, 2.021, -33.009]}
        rotation={[0, -1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube022_1.geometry}
          material={materials['Material.024']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube022_2.geometry}
          material={nodes.Cube022_2.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube022_3.geometry}
          material={materials['Chair 1.022']}
        />
      </group>
      <group
        position={[8.999, 2.108, -26.579]}
        rotation={[Math.PI, -0.029, Math.PI]}
        scale={[1.156, 1.155, 1.156]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube092.geometry}
          material={nodes.Cube092.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube092_1.geometry}
          material={materials['Material.027']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube092_2.geometry}
          material={materials['Chair 1.025']}
        />
      </group>
      <group
        position={[5.358, 2.021, -26.801]}
        rotation={[0, -1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube097.geometry}
          material={materials['Material.027']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube097_1.geometry}
          material={nodes.Cube097_1.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube097_2.geometry}
          material={materials['Chair 1.025']}
        />
      </group>
      <group
        position={[7.178, 2.021, -26.801]}
        rotation={[0, -1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube098.geometry}
          material={materials['Material.027']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube098_1.geometry}
          material={nodes.Cube098_1.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube098_2.geometry}
          material={materials['Chair 1.025']}
        />
      </group>
      <group
        position={[10.809, 2.021, -26.802]}
        rotation={[0, -1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube107.geometry}
          material={materials['Material.028']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube107_1.geometry}
          material={nodes.Cube107_1.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube107_2.geometry}
          material={materials['Chair 1.026']}
        />
      </group>
      <group
        position={[12.648, 2.021, -26.803]}
        rotation={[0, -1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube108.geometry}
          material={materials['Material.029']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube108_1.geometry}
          material={nodes.Cube108_1.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube108_2.geometry}
          material={materials['Chair 1.027']}
        />
      </group>
      <group
        position={[16.755, 2.021, -30.632]}
        rotation={[0, 1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube110.geometry}
          material={materials['Material.031']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube110_1.geometry}
          material={nodes.Cube110_1.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube110_2.geometry}
          material={materials['Chair 1.029']}
        />
      </group>
      <group
        position={[18.593, 2.021, -30.632]}
        rotation={[0, 1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube111.geometry}
          material={materials['Material.032']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube111_1.geometry}
          material={nodes.Cube111_1.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube111_2.geometry}
          material={materials['Chair 1.030']}
        />
      </group>
      <group
        position={[18.585, 2.021, -26.801]}
        rotation={[0, -1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube112.geometry}
          material={materials['Material.030']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube112_1.geometry}
          material={nodes.Cube112_1.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube112_2.geometry}
          material={materials['Chair 1.028']}
        />
      </group>
      <group
        position={[16.765, 2.021, -26.801]}
        rotation={[0, -1.57, 0]}
        scale={[-0.464, -0.074, -0.913]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube113.geometry}
          material={materials['Material.030']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube113_1.geometry}
          material={nodes.Cube113_1.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube113_2.geometry}
          material={materials['Chair 1.028']}
        />
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
  )
}


useGLTF.preload(path);
