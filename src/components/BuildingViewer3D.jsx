import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  Html,
  Bounds,
  useBounds,
  useGLTF,
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";

/** Fit-once helper for nice framing */
const FitOnce = ({ children }) => {
  const api = useBounds();
  useEffect(() => {
    api.refresh().fit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return children;
};

const InnerScene = ({ glbUrl, finishUrl, targetNames = ["*"] }) => {
  const { gl } = useThree();

  // Load GLB (DRACO path is harmless if the model isn't Draco-compressed)
  // Add decoder files to public/draco/* only if your model is Draco-encoded.
  const { scene: gltfScene } = useGLTF(glbUrl, "/draco/");

  // Load finish texture
  const finishTex = useLoader(THREE.TextureLoader, finishUrl);

  // Texture setup
  useEffect(() => {
    if (!finishTex) return;
    finishTex.wrapS = THREE.RepeatWrapping;
    finishTex.wrapT = THREE.RepeatWrapping;
    finishTex.repeat.set(3.5, 3.5); // tweak tiling to taste
    finishTex.anisotropy = Math.min(16, gl.capabilities.getMaxAnisotropy?.() || 8);
    finishTex.colorSpace = THREE.SRGBColorSpace;
    finishTex.needsUpdate = true;
  }, [finishTex, gl]);

  const facadeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: finishTex,
        metalness: 0.08,
        roughness: 0.6,
      }),
    [finishTex]
  );

  // Clone, center, scale, and apply materials
  const model = useMemo(() => {
    const clone = gltfScene.clone(true);

    // Center to origin
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    clone.position.sub(center);

    // Scale to a consistent card-friendly size
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const target = 10; // world units
    const scale = target / maxDim;
    clone.scale.setScalar(scale);

    // Apply to targets
    clone.traverse((obj) => {
      if (!obj.isMesh) return;
      const isTarget =
        targetNames[0] === "*" ||
        targetNames.some((t) => (obj.name || "").toLowerCase().includes(t.toLowerCase()));
      if (isTarget) obj.material = facadeMat;
      obj.castShadow = true;
      obj.receiveShadow = true;
    });

    // Log a sample mesh name once (helps set targetNames later)
    let printed = false;
    clone.traverse((o) => {
      if (o.isMesh && !printed) {
        // eslint-disable-next-line no-console
        console.log("[GLB mesh sample name]:", o.name);
        printed = true;
      }
    });

    return clone;
  }, [gltfScene, facadeMat, targetNames]);

  return <primitive object={model} />;
};

const BuildingViewer3D = forwardRef(function BuildingViewer3D(
  { glbUrl, finishUrl, targetNames = ["*"], className },
  ref
) {
  const capRef = useRef();

  useImperativeHandle(ref, () => ({
    capture: () => capRef.current?.toDataURL?.("image/png"),
  }));

  return (
    <Canvas
      className={className}
      shadows
      camera={{ fov: 38, position: [12, 9, 16] }}
      gl={{ preserveDrawingBuffer: true }} // allows PNG capture
      onCreated={({ gl }) => {
        capRef.current = gl.domElement;
      }}
    >
      {/* Neutral background so it pops on your white card */}
      <color attach="background" args={["#f4f6f8"]} />

      {/* Soft, premium lighting */}
      <hemisphereLight intensity={0.7} groundColor={new THREE.Color("#b0b6bb")} />
      <directionalLight
        position={[6, 12, 6]}
        intensity={1.25}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <Environment preset="apartment" />

      <React.Suspense fallback={<Html center>Loading 3D…</Html>}>
        <Bounds clip observe margin={1}>
          <FitOnce>
            <InnerScene glbUrl={glbUrl} finishUrl={finishUrl} targetNames={targetNames} />
          </FitOnce>
        </Bounds>
      </React.Suspense>

      <ContactShadows position={[0, -0.02, 0]} opacity={0.45} scale={20} blur={2.25} far={8} />

      {/* Orbit / zoom / pan controls */}
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        enableZoom
        zoomSpeed={0.9}
        enablePan
        panSpeed={0.6}
        minDistance={6}
        maxDistance={30}
        maxPolarAngle={Math.PI * 0.495} // prevent flipping under ground; remove for full freedom
      />
    </Canvas>
  );
});

export default BuildingViewer3D;

// Optional: if you import a static URL string elsewhere, you can preload it like:
// useGLTF.preload(glbUrl, "/draco/");
