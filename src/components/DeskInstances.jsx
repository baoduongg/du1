import { Instances, Instance } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

export function DeskInstances({
  deskPositions,
  nodes,
  materials,
  onDeskClick,
}) {
  /**
   * Map instanceId -> seatId
   */
  const seatMap = useMemo(
    () => deskPositions.map((d) => d.seatId),
    [deskPositions]
  );

  /**
   * Shared click handler
   */
  const handleClick = (e) => {
    e.stopPropagation();
    const seatId = seatMap[e.instanceId];
    onDeskClick?.(seatId);
  };

  return (
    <>
      {/* ===== Desk Part 1 ===== */}
      <Instances
        geometry={nodes.Cube025_1.geometry}
        material={materials['Material.013']}
        castShadow
        receiveShadow
        onClick={handleClick}
      >
        {deskPositions.map((desk, i) => (
          <Instance
            key={`desk-1-${desk.seatId}`}
            position={desk.position}
            rotation={desk.rotation}
            scale={desk.scale ?? 1}
          />
        ))}
      </Instances>

      {/* ===== Desk Part 2 ===== */}
      <Instances
        geometry={nodes.Cube025_2.geometry}
        material={nodes.Cube025_2.material}
        castShadow
        receiveShadow
        onClick={handleClick}
      >
        {deskPositions.map((desk) => (
          <Instance
            key={`desk-2-${desk.seatId}`}
            position={desk.position}
            rotation={desk.rotation}
            scale={desk.scale ?? 1}
          />
        ))}
      </Instances>

      {/* ===== Chair ===== */}
      <Instances
        geometry={nodes.Cube025_3.geometry}
        material={materials['Chair 1.012']}
        castShadow
        receiveShadow
        onClick={handleClick}
      >
        {deskPositions.map((desk) => (
          <Instance
            key={`desk-3-${desk.seatId}`}
            position={desk.position}
            rotation={desk.rotation}
            scale={desk.scale ?? 1}
          />
        ))}
      </Instances>
    </>
  );
}
