import { useFrame } from "@react-three/fiber";
import { Ref, useRef, useState } from "react";
import { BufferGeometry, Color, Group, Material, Mesh, Vector3 } from "three";
import { GhibliShader } from "./GhiibliShader";
import { Trees } from "./Trees";

function Box(props: { position: [number, number, number] }) {
	const mesh = useRef<Mesh<BufferGeometry, Material | Material[]>>();
	
	const [hovered, setHover] = useState(false);
	const [active, setActive] = useState(false);
	useFrame((state, delta) => (mesh.current.rotation.x += delta));
	return (
		<mesh
			{...props}
			ref={mesh}
			scale={active ? 1.5 : 1}
			castShadow
			onClick={(event) => setActive(!active)}
			onPointerOver={(event) => setHover(true)}
			onPointerOut={(event) => setHover(false)}
		>
			<boxGeometry args={[1, 1, 1]} />
			<shaderMaterial attach='material' {...GhibliShader} uniforms={GhibliShader.uniforms} />
		</mesh>
	);
}

export const Scene = () => {
	const refTrees = useRef<Group>(null);
	
	return (
		<>
			<ambientLight intensity={0.1} />
			<directionalLight
				color={"white"}
				position={[15, 15, 15]}
				castShadow
				shadow-mapSize-width={2048}
				shadow-mapSize-height={2048}
			/>
			<Trees
				ref={refTrees}
				position={[0, 0, -4]}
				colors={[
					new Color("#427062").convertLinearToSRGB(),
					new Color("#33594e").convertLinearToSRGB(),
					new Color("#234549").convertLinearToSRGB(),
					new Color("#1e363f").convertLinearToSRGB(),
				]}
			/>
			<Trees
				ref={refTrees}
				position={[0, 0, 4]}
				colors={[
					new Color("#4a8d7e").convertLinearToSRGB(),
					new Color("#377f6a").convertLinearToSRGB(),
					new Color("#184f52").convertLinearToSRGB(),
					new Color("#143b36").convertLinearToSRGB(),
				]}
			/>
			<Box position={[0,0,0]}/>
		</>
	);
};
