import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CameraController = ({
  enable = true,
  isPlaying,
  selectedSection,
  focusSeatPosition,
  setIsFollowingPath,
  setOpenDuration,
}) => {
  const { camera } = useThree();

  // Memoize vector positions
  const start = useRef(new THREE.Vector3(0, 2.5, 6));
  const end = useRef(new THREE.Vector3(0, 2.5, -6));
  const lookAtEnd = useRef(new THREE.Vector3(0, 1, -50));
  const targetVector = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  // State cho path animation
  const pathProgress = useRef(0);
  const isFollowingPath = useRef(false);
  const activePath = useRef(null);

  // State cho focus member
  const isFocusingMember = useRef(false);
  const focusTarget = useRef(new THREE.Vector3());
  const focusLookAt = useRef(new THREE.Vector3());

  useEffect(() => {
    if (!isPlaying) {
      camera.position.copy(start.current);
    }
  }, [isPlaying, camera]);

  // Reset path khi chuyển section
  useEffect(() => {
    if (
      selectedSection &&
      selectedSection.path &&
      selectedSection.path.length > 0
    ) {
      pathProgress.current = 0;
      isFollowingPath.current = true;
      isFocusingMember.current = false; // Tắt focus member khi chuyển section
      activePath.current = selectedSection.path;
      setIsFollowingPath(true);
    }
  }, [selectedSection, setIsFollowingPath]);

  // Xử lý focus vào seat member
  useEffect(() => {
    if (focusSeatPosition && !isFollowingPath.current) {
      // Chỉ focus khi không đang follow path
      isFocusingMember.current = true;
      focusTarget.current.set(
        focusSeatPosition[0],
        focusSeatPosition[1] + 3, // Offset phía trên seat
        focusSeatPosition[2] + 3 // Offset về phía trước
      );
      focusLookAt.current.set(...focusSeatPosition);
    } else if (!focusSeatPosition) {
      isFocusingMember.current = false;
    }
  }, [focusSeatPosition]);

  useFrame((_, delta) => {
    if (!enable) return; // Chỉ chạy khi camera được enable

    // === TRẠNG THÁI 3: Focus vào member seat (Ưu tiên cao nhất) ===
    if (isFocusingMember.current && focusSeatPosition) {
      camera.position.lerp(focusTarget.current, 1 - Math.exp(-3 * delta));
      currentLookAt.current.lerp(focusLookAt.current, 1 - Math.exp(-4 * delta));
      camera.lookAt(currentLookAt.current);
      return;
    }

    // === TRẠNG THÁI 2: Follow path của section ===
    if (
      isFollowingPath.current &&
      activePath.current &&
      activePath.current.length > 0 &&
      selectedSection
    ) {
      const path = activePath.current;
      const totalPoints = path.length;

      // Tăng progress dần dần
      pathProgress.current += delta * 0.5; // Tốc độ di chuyển

      // Tính index và fractional part cho smooth interpolation
      const clampedProgress = Math.min(
        pathProgress.current,
        totalPoints - 0.001
      );
      const currentIndex = Math.floor(clampedProgress);
      const nextIndex = Math.min(currentIndex + 1, totalPoints - 1);
      const t = clampedProgress - currentIndex; // 0 to 1 between waypoints

      // Easing function cho smooth acceleration/deceleration
      const easeInOutCubic = (x) => {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
      };
      const easedT = easeInOutCubic(t);

      if (currentIndex < totalPoints) {
        const currentWaypoint = path[currentIndex];
        const nextWaypoint = path[nextIndex];

        // Smooth interpolation giữa 2 waypoints
        targetVector.current.set(...currentWaypoint.position);
        const nextPos = new THREE.Vector3(...nextWaypoint.position);
        targetVector.current.lerp(nextPos, easedT);

        targetLookAt.current.set(...currentWaypoint.lookAt);
        const nextLook = new THREE.Vector3(...nextWaypoint.lookAt);
        targetLookAt.current.lerp(nextLook, easedT);

        // Smooth camera movement
        camera.position.lerp(targetVector.current, 1 - Math.exp(-5 * delta));
        currentLookAt.current.lerp(
          targetLookAt.current,
          1 - Math.exp(-5 * delta)
        );
        camera.lookAt(currentLookAt.current);

        // Kết thúc khi đến waypoint cuối
        if (pathProgress.current >= totalPoints - 0.1) {
          isFollowingPath.current = false;
          setIsFollowingPath(false);
        }
      }
      return;
    }

    // Nếu có selectedSection nhưng không có path
    if (selectedSection && selectedSection.position) {
      targetVector.current.set(...selectedSection.position);
      camera.position.lerp(targetVector.current, 1 - Math.exp(-2 * delta));

      targetLookAt.current.set(...selectedSection.lookAt);
      currentLookAt.current.lerp(
        targetLookAt.current,
        1 - Math.exp(-3 * delta)
      );
      camera.lookAt(currentLookAt.current);
      return;
    }

    // === TRẠNG THÁI 1: Animation ban đầu (từ start đến end) ===
    if (!isPlaying) return;

    const speed = 1;
    const distance = camera.position.distanceTo(end.current);
    const totalDistance = start.current.distanceTo(end.current);
    const processMax05 = Math.min(1 - distance / totalDistance, 0.5);

    setOpenDuration(processMax05);
    camera.position.lerp(end.current, 1 - Math.exp(-speed * delta));
    currentLookAt.current.lerp(lookAtEnd.current, 1 - Math.exp(-speed * delta));
    camera.lookAt(currentLookAt.current);
  });

  return null;
};

export default CameraController;
