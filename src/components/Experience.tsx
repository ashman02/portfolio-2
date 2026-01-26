import React, { useRef } from "react";
import { Marcus } from "./Marcus";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
gsap.registerPlugin(useGSAP)

const Experience = () => {
  const marcusRef = useRef<THREE.Group>(null);
  useFrame((_state, delta) => {
    if (marcusRef.current) {
      marcusRef.current.rotation.y += delta * 0.2;
    }
  });
  useGSAP(() => {
    if(marcusRef.current){
        gsap.to(marcusRef.current.position, {y : 0, duration : 0.8, ease : "sine.inOut"})
    }
  }, [marcusRef.current])
  return (
    <>
      {/* Lights */}
      <ambientLight intensity={1} color={"#ffffff"} />
      <Marcus ref={marcusRef} scale={8} position-y={-6} />
      <Sparkles
        color={new THREE.Color("#1a1a1a")}
        scale={9}
        count={200}
        size={0.7}
        opacity={0.5}
        speed={0.5}
      />
    </>
  );
};

export default Experience;
