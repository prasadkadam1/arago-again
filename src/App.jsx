import React from "react";
import Home from "./components/Home";
import UseLoader from "./components/UseLoader";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import Chipset from "./components/Chipset";
const App = () => {
  const HomeComponentWithLoader = UseLoader(Home);


  return (
    <div id="myDiv">
      <HomeComponentWithLoader />
      {/* <Canvas shadows>
      <PerspectiveCamera makeDefault position={[5, 3, 5]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Chipset />
      <OrbitControls />
    </Canvas> */}

    
    </div>
  );
};

export default App;
