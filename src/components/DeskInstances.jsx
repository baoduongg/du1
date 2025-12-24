import { Instances, Instance } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

export function DeskInstances({
  workstations,
  nodes,
  materials,
  onDeskClick,
}) {
  /**
   * Shared click handler
   */
  const handleClick = (e) => {
    e.stopPropagation();
    // We can use the name or a custom property if needed
    const seatId = e.object.userData.seatId;
    if (seatId) {
      onDeskClick?.(seatId);
    }
  };

  return (
    <>
      {/* ===== Wood Part ===== */}
      <Instances
        geometry={nodes.Cube1033.geometry}
        material={materials.Wood}
        castShadow
        receiveShadow
      >
        {workstations.map((desk, i) => (
          <Instance
            key={`desk-wood-${i}`}
            position={desk.position}
            rotation={desk.rotation || [0, 0, 0]}
            scale={desk.scale ?? 1}
            userData={{ seatId: desk.seatId }}
            onClick={handleClick}
          />
        ))}
      </Instances>

      {/* ===== Metal Part ===== */}
      <Instances
        geometry={nodes.Cube1033_1.geometry}
        material={materials.DarkMetal}
        castShadow
        receiveShadow
      >
        {workstations.map((desk, i) => (
          <Instance
            key={`desk-metal-${i}`}
            position={desk.position}
            rotation={desk.rotation || [0, 0, 0]}
            scale={desk.scale ?? 1}
          />
        ))}
      </Instances>

      {/* ===== Screen Part ===== */}
      <Instances
        geometry={nodes.Cube1033_2.geometry}
        material={materials.Screen}
        castShadow
        receiveShadow
      >
        {workstations.map((desk, i) => (
          <Instance
            key={`desk-screen-${i}`}
            position={desk.position}
            rotation={desk.rotation || [0, 0, 0]}
            scale={desk.scale ?? 1}
          />
        ))}
      </Instances>

      {/* ===== Chair Part ===== */}
      <Instances
        geometry={nodes.Cube1033_3.geometry}
        material={materials.ChairFabric}
        castShadow
        receiveShadow
      >
        {workstations.map((desk, i) => (
          <Instance
            key={`desk-chair-${i}`}
            position={desk.position}
            rotation={desk.rotation || [0, 0, 0]}
            scale={desk.scale ?? 1}
          />
        ))}
      </Instances>
    </>
  );
}
