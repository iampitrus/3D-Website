import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRef } from "react";
import { useSnapshot } from "valtio";
import state from "../store";

function CameraRig({ children }) {
  const group = useRef();
  const snap = useSnapshot(state);

  useFrame((state, delta) => {
    // Work on the responsiveness
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // set the initial postion of the model
    let targetPosition = [-0.4, 0, 2];
    if (snap.intro) {
      isBreakpoint && (targetPosition = [0, 0, 2]);
      isMobile && (targetPosition = [0, 0.2, 2.5]);
    } else {
      isMobile ? (targetPosition = [0, 0, 2.5]) : (targetPosition = [0, 0, 2]);
    }

    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    // Set the model rotation smoothly
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });

  return <group ref={group}>{children}</group>;
}

export default CameraRig;
