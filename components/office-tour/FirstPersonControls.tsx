'use client';

import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3, Euler } from 'three';

interface FirstPersonControlsProps {
  moveSpeed?: number;
  sprintMultiplier?: number;
  mouseSensitivity?: number;
  onLockChange?: (locked: boolean) => void;
}

export default function FirstPersonControls({
  moveSpeed = 5,
  sprintMultiplier = 1.8,
  mouseSensitivity = 0.002,
  onLockChange,
}: FirstPersonControlsProps) {
  const { camera, gl } = useThree();
  const moveDirection = useRef(new Vector3());
  const velocity = useRef(new Vector3());
  const euler = useRef(new Euler(0, 0, 0, 'YXZ'));
  const isLocked = useRef(false);
  const keys = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const canvas = gl.domElement;

    // Camera position is set by parent, just ensure proper initial rotation
    // Look toward center of office
    camera.lookAt(0, 1.6, 0);

    // Pointer lock handlers
    const onPointerLockChange = () => {
      isLocked.current = document.pointerLockElement === canvas;
      onLockChange?.(isLocked.current);
    };

    const onPointerLockError = () => {
      console.error('Pointer lock error');
    };

    // Mouse move handler
    const onMouseMove = (event: MouseEvent) => {
      if (!isLocked.current) return;

      const movementX = event.movementX || 0;
      const movementY = event.movementY || 0;

      euler.current.setFromQuaternion(camera.quaternion);
      euler.current.y -= movementX * mouseSensitivity;
      euler.current.x -= movementY * mouseSensitivity;

      // Limit vertical rotation to prevent flipping
      euler.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.current.x));

      camera.quaternion.setFromEuler(euler.current);
    };

    // Keyboard handlers
    const onKeyDown = (event: KeyboardEvent) => {
      keys.current[event.code] = true;

      // Additional keyboard shortcuts
      if (event.code === 'KeyF') {
        // Fullscreen toggle (handled by parent)
        if (!document.fullscreenElement) {
          canvas.requestFullscreen?.();
        } else {
          document.exitFullscreen?.();
        }
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      keys.current[event.code] = false;
    };

    // Click to lock pointer
    const onClick = () => {
      if (!isLocked.current) {
        canvas.requestPointerLock();
      }
    };

    // Add event listeners
    document.addEventListener('pointerlockchange', onPointerLockChange);
    document.addEventListener('pointerlockerror', onPointerLockError);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    canvas.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('pointerlockchange', onPointerLockChange);
      document.removeEventListener('pointerlockerror', onPointerLockError);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
      canvas.removeEventListener('click', onClick);
    };
  }, [camera, gl, mouseSensitivity, onLockChange]);

  useFrame((_state, delta) => {
    if (!isLocked.current) return;

    // Calculate movement direction from keyboard input
    moveDirection.current.set(0, 0, 0);

    // WASD controls
    if (keys.current['KeyW'] || keys.current['ArrowUp']) {
      moveDirection.current.z -= 1;
    }
    if (keys.current['KeyS'] || keys.current['ArrowDown']) {
      moveDirection.current.z += 1;
    }
    if (keys.current['KeyA'] || keys.current['ArrowLeft']) {
      moveDirection.current.x -= 1;
    }
    if (keys.current['KeyD'] || keys.current['ArrowRight']) {
      moveDirection.current.x += 1;
    }

    // Check for sprint
    const isSprinting = keys.current['ShiftLeft'] || keys.current['ShiftRight'];
    const currentSpeed = moveSpeed * (isSprinting ? sprintMultiplier : 1);

    // Normalize and apply speed
    if (moveDirection.current.length() > 0) {
      moveDirection.current.normalize();
      moveDirection.current.multiplyScalar(currentSpeed * delta);

      // Apply rotation to movement direction
      const direction = moveDirection.current.clone();
      direction.applyQuaternion(camera.quaternion);

      // Update velocity
      velocity.current.x = direction.x;
      velocity.current.z = direction.z;
    } else {
      // Damping when no input
      velocity.current.x *= 0.9;
      velocity.current.z *= 0.9;
    }

    // Apply velocity to camera position
    camera.position.add(velocity.current);

    // Keep camera at eye level (you can adjust this if your model needs different height)
    camera.position.y = 1.6;
  });

  return null;
}
