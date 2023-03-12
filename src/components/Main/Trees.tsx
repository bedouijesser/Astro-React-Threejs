import { GhibliShader } from "./GhiibliShader";
import { useGLTF } from "@react-three/drei";
import { Ref, forwardRef, useMemo } from "react";
import { BufferGeometry, Color, Group, Mesh, ShaderMaterial, Vector3 } from "three";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
export type GLTFResult = GLTF & {
	nodes: {
		Pyramid: Mesh;
		Foliage: {
			geometry: BufferGeometry;
		};
	};
};

export const Trees = forwardRef((props: { colors: Color[], position: [number, number, number]}, ref: Ref<Group>) => {
	const { nodes } = useGLTF("/trees.glb") as GLTFResult;
	const uniforms: ShaderMaterial['uniforms'] = useMemo(() => {
		return {
			colorMap: {
				value: props.colors,
			},
			brightnessThresholds: {
				value: [0.9, 0.45, 0.001],
			},
			lightPosition: {
				value: new Vector3(15, 15, 15),
			},
		};
	}, [props.colors]);
	return (
		<group ref={ref} {...props} dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Foliage.geometry}
				position={[0.33, -0.05, -0.68]}
			>
				<shaderMaterial
					attach="material"
					{...GhibliShader}
					uniforms={uniforms}
				/>
			</mesh>
		</group>
	);
});

useGLTF.preload("/trees.glb");
