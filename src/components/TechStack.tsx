import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import {
  BallCollider,
  Physics,
  RigidBody,
  CuboidCollider,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

const textureLoader = new THREE.TextureLoader();
const techIcons = [
  { src: "/images/azure.svg", label: "Azure" },
  { src: "/images/aws.svg", label: "AWS" },
  { src: "/images/vnet.svg", label: "Azure VNet" },
  { src: "/images/vpc.svg", label: "AWS VPC" },
  { src: "/images/terraform.svg", label: "Terraform" },
  { src: "/images/ansible.svg", label: "Ansible" },
  { src: "/images/docker.svg", label: "Docker" },
  { src: "/images/kubernetes.svg", label: "Kubernetes" },
  { src: "/images/jenkins.svg", label: "Jenkins" },
  { src: "/images/linux.svg", label: "Linux" },
  { src: "/images/prometheus.svg", label: "Prometheus" },
  { src: "/images/mysql.webp", label: "MySQL" },
  { src: "/images/mongo.webp", label: "MongoDB" },
];
const textures = techIcons.map((icon) => textureLoader.load(icon.src));

const sphereGeometry = new THREE.SphereGeometry(1.8, 28, 28);

const spheres = [...Array(22)].map(() => ({
  scale: [1.3, 1.4, 1.5, 1.6, 1.7][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);
  const localMaterial = useMemo(() => material.clone(), [material]);
  const attractor = useMemo(() => new THREE.Vector3(0, -8, 0), []);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .sub(attractor)
      .normalize()
      .multiply(
        new THREE.Vector3(
          -30 * delta * scale,
          -42 * delta * scale,
          -30 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.28}
      angularDamping={0.05}
      friction={0.12}
      position={[r(34), r(26) - 8, r(26)]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[1.8 * scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow={false}
        receiveShadow={false}
        scale={scale}
        geometry={sphereGeometry}
        material={localMaterial}
        rotation={[0.3, 1, 1]}
        onPointerOver={() => {
          localMaterial.emissiveIntensity = 0.7;
        }}
        onPointerOut={() => {
          localMaterial.emissiveIntensity = 0.25;
        }}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.9
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const Bounds = () => {
  const bounds = {
    x: 30,
    y: 16,
    z: 22,
    thickness: 0.6,
    centerY: -8,
    centerZ: 0,
  };

  return (
    <RigidBody type="fixed" colliders={false}>
      <CuboidCollider
        args={[bounds.x, bounds.thickness, bounds.z]}
        position={[0, bounds.centerY - bounds.y, bounds.centerZ]}
      />
      <CuboidCollider
        args={[bounds.x, bounds.thickness, bounds.z]}
        position={[0, bounds.centerY + bounds.y, bounds.centerZ]}
      />
      <CuboidCollider
        args={[bounds.thickness, bounds.y, bounds.z]}
        position={[-bounds.x, bounds.centerY, bounds.centerZ]}
      />
      <CuboidCollider
        args={[bounds.thickness, bounds.y, bounds.z]}
        position={[bounds.x, bounds.centerY, bounds.centerZ]}
      />
      <CuboidCollider
        args={[bounds.x, bounds.y, bounds.thickness]}
        position={[0, bounds.centerY, bounds.centerZ - bounds.z]}
      />
      <CuboidCollider
        args={[bounds.x, bounds.y, bounds.thickness]}
        position={[0, bounds.centerY, bounds.centerZ + bounds.z]}
      />
    </RigidBody>
  );
};

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const extraTags = [
    "Azure DevOps",
    "Git",
    "Grafana",
    "Azure Monitor",
    "AWS CloudWatch",
    "KQL",
    "Python",
    "Shell Scripting",
    "Aerospike",
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = document
        .getElementById("work")!
        .getBoundingClientRect().top;
      setIsActive(scrollY > threshold);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.25,
          metalness: 0.4,
          roughness: 1,
          clearcoat: 0.05,
        })
    );
  }, []);

  return (
    <div className="techstack">
      <h2> My Techstack</h2>

      <div className="techstack-legend">
        {techIcons.map((icon) => (
          <div className="techstack-legend-item" key={icon.label}>
            <img src={icon.src} alt={icon.label} loading="lazy" />
            <span>{icon.label}</span>
          </div>
        ))}
      </div>
      <div className="techstack-tags">
        {extraTags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <Canvas
        dpr={[1, 1.25]}
        gl={{
          alpha: true,
          stencil: false,
          depth: false,
          antialias: false,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 32], fov: 42, near: 1, far: 170 }}
        onCreated={(state) => {
          state.gl.toneMappingExposure = 1.3;
          state.camera.lookAt(0, -8, 0);
          state.camera.updateProjectionMatrix();
        }}
        className="tech-canvas"
      >
        <ambientLight intensity={0.85} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
        />
        <directionalLight position={[0, 5, -4]} intensity={1.6} />
        <Physics gravity={[0, 0, 0]}>
          <Bounds />
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              material={materials[Math.floor(Math.random() * materials.length)]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.4}
          environmentRotation={[0, 4, 2]}
        />
      </Canvas>
    </div>
  );
};

export default TechStack;
