import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { easing } from 'maath';

const CameraController = ({
  enable = true,
  isPlaying,
  selectedSection,
  focusSeatPosition,
  setIsFollowingPath,
  setOpenDuration,
}) => {
  const { camera } = useThree();

  // Pre-allocated vectors to avoid GC lag
  const start = useRef(new THREE.Vector3(-7, 4, 0));
  const end = useRef(new THREE.Vector3(-7, 4, -15));
  const lookAtEnd = useRef(new THREE.Vector3(-6.5, 3, -200));

  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  const tempVec1 = useRef(new THREE.Vector3());
  const tempVec2 = useRef(new THREE.Vector3());

  // State for path animation
  const pathProgress = useRef(0);
  const isFollowingPath = useRef(false);
  const activePath = useRef(null);

  // State for focus member
  const isFocusingMember = useRef(false);
  const focusTarget = useRef(new THREE.Vector3());
  const focusLookAt = useRef(new THREE.Vector3());

  useEffect(() => {
    if (!isPlaying) {
      camera.position.copy(start.current);
      currentLookAt.current.set(0, 0, 0);
      camera.lookAt(currentLookAt.current);
    }
  }, [isPlaying, camera]);

  // Reset path when switching sections
  useEffect(() => {
    if (selectedSection?.path?.length > 0) {
      pathProgress.current = 0;
      isFollowingPath.current = true;
      isFocusingMember.current = false;
      activePath.current = selectedSection.path;
      setIsFollowingPath(true);
    }
  }, [selectedSection, setIsFollowingPath]);

  // Handle seat member focus
  useEffect(() => {
    if (focusSeatPosition && !isFollowingPath.current) {
      isFocusingMember.current = true;
      focusTarget.current.set(...focusSeatPosition.position);
      focusLookAt.current.set(...focusSeatPosition.lookAt);
    } else if (!focusSeatPosition) {
      isFocusingMember.current = false;
    }
  }, [focusSeatPosition]);

  useFrame((state, delta) => {
    if (!enable) return;

    // 1. Focus Member Mode
    if (isFocusingMember.current && focusSeatPosition) {
      easing.damp3(camera.position, focusTarget.current, 0.3, delta);
      easing.damp3(currentLookAt.current, focusLookAt.current, 0.3, delta);
      camera.lookAt(currentLookAt.current);
      return;
    }

    // 2. Path Following Mode
    if (isFollowingPath.current && activePath.current?.length > 0) {
      const path = activePath.current;
      const totalPoints = path.length;

      pathProgress.current += delta * 0.6; // Movement speed
      const clampedProgress = Math.min(pathProgress.current, totalPoints - 0.001);
      const currentIndex = Math.floor(clampedProgress);
      const nextIndex = Math.min(currentIndex + 1, totalPoints - 1);
      const t = clampedProgress - currentIndex;

      // Easing for smooth transition between waypoints
      const easedT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const currentWaypoint = path[currentIndex];
      const nextWaypoint = path[nextIndex];

      // Interpolate target position
      tempVec1.current.set(...currentWaypoint.position);
      tempVec2.current.set(...nextWaypoint.position);
      targetPos.current.lerpVectors(tempVec1.current, tempVec2.current, easedT);

      // Interpolate target lookAt
      tempVec1.current.set(...currentWaypoint.lookAt);
      tempVec2.current.set(...nextWaypoint.lookAt);
      targetLook.current.lerpVectors(tempVec1.current, tempVec2.current, easedT);

      // Damp camera towards interpolated targets
      easing.damp3(camera.position, targetPos.current, 0.2, delta);
      easing.damp3(currentLookAt.current, targetLook.current, 0.2, delta);
      camera.lookAt(currentLookAt.current);

      if (pathProgress.current >= totalPoints - 0.1) {
        isFollowingPath.current = false;
        setIsFollowingPath(false);
      }
      return;
    }

    // 3. Section View Mode (No path)
    if (selectedSection?.position) {
      targetPos.current.set(...selectedSection.position);
      targetLook.current.set(...selectedSection.lookAt);

      easing.damp3(camera.position, targetPos.current, 0.4, delta);
      easing.damp3(currentLookAt.current, targetLook.current, 0.4, delta);
      camera.lookAt(currentLookAt.current);
      return;
    }

    // 4. Initial Animation Mode
    if (!isPlaying) return;

    const distance = camera.position.distanceTo(end.current);
    const totalDistance = start.current.distanceTo(end.current);
    const progress = Math.min(1 - distance / totalDistance, 0.5);
    setOpenDuration(progress);

    easing.damp3(camera.position, end.current, 0.5, delta);
    easing.damp3(currentLookAt.current, lookAtEnd.current, 0.5, delta);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};

export default CameraController;
