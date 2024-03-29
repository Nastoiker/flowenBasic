import React, {useRef, useLayoutEffect, Ref} from "react";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { useThree } from "@react-three/fiber";
import {Group} from "three";

export default function Model({ ...props }) {
  const group = useRef();
  // @ts-ignore
  const { nodes, materials } = useGLTF("/model/scene.gltf");

  const camera = useThree((state: { camera: any }) => state.camera);
  const scene = useThree((state: { scene: any }) => state.scene);

  useLayoutEffect(() => {
    camera.position.set(0, 2, 6);
    materials.Body.color.set("#9BB5CE");

    let fov = camera.fov;

    fov = (1400 * 18) / window.innerWidth;
    camera.fov = fov;
    camera.updateProjectionMatrix();

    const mm = gsap.matchMedia();

    mm.add(
      {
        // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
        isDesktop: `(min-width: 48em)`,
        isMobile: `(max-width:48em`,
      },
      (context) => {
        // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
        // @ts-ignore
        const { isDesktop, isMobile } = context.conditions;

        const t1 = gsap.timeline({
          scrollTrigger: {
            trigger: "#phone-model",
            start: "top+=200 top",
            endTrigger: "#battery",
            end: "top top",
            scrub: 1,
            // markers: true,
          },
        });
        t1.fromTo(camera.position, { y: 2 }, { y: 0 })
          .to(scene.rotation, { y: 0.8 })
          .to(scene.rotation, { y: 3 })
          .to(scene.rotation, { z: 1.58 }, "key1")
          .to(camera.position, { z: 4 }, "key1")
          .to(scene.rotation, { y: 0, z: 0 }, "key2")
          .to(camera.position, { z: 6, x: isDesktop ? -1 : 0 }, "key2");
        // .to(scene.rotation, { z: 0, y: 6.3 }, "key3")
        // .to(camera.position, { x: isDesktop ? 0.8 : 0, y: 0 }, "key3")
        // .to(camera.position, { x: isDesktop ? 1 : 0, y: 0}, "key3");
        // t1.fromTo(scene.rotation, { y: 2 }, { y: 0 })
        //     .to(scene.rotation, { y: 0.8 })
        //     .to(scene.rotation, { y: 3 });

        if (isMobile) {
          camera.fov = 20;
          camera.updateProjectionMatrix();
        }
        // const controls = new OrbitControls( camera, scene );
        // controls.update();
        return () => {
          if (t1) t1.kill();
        };
      }
    );
  }, []);

  return (
    <group ref={group as any} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group scale={100}>
            <mesh
              geometry={nodes.Body_Mic_0.geometry}
              material={materials.material}
            />
            <mesh
              geometry={nodes.Body_Bezel_0.geometry}
              material={materials.Bezel}
            />
            <mesh
              geometry={nodes.Body_Body_0.geometry}
              material={materials.Body}
            />
            <mesh
              geometry={nodes.Body_Wallpaper_0.geometry}
              material={materials.Wallpaper}
            />
            <mesh
              geometry={nodes.Body_Camera_Glass_0.geometry}
              material={materials.Camera_Glass}
            />
            <mesh
              geometry={nodes.Body_Lens_0.geometry}
              material={materials.Lens}
            />
            <mesh
              geometry={nodes.Body_Material_0.geometry}
              material={materials.Material}
            />
            <mesh
              geometry={nodes.Camera_Body_0.geometry}
              material={materials.Body}
            />
            <mesh
              geometry={nodes.Camera_Glass_0.geometry}
              material={materials.Glass}
            />
            <mesh
              geometry={nodes.Camera_Camera_Frame001_0.geometry}
              material={materials["Camera_Frame.001"]}
            />
            <mesh
              geometry={nodes.Camera_Mic_0.geometry}
              material={materials.material}
            />
            <mesh
              geometry={nodes.Body001_Screen_Glass_0.geometry}
              material={materials.Screen_Glass}
            />
            <mesh
              geometry={nodes.Button_Frame_0.geometry}
              material={materials.Frame}
            />
            <mesh
              geometry={nodes.Circle003_Frame_0.geometry}
              material={materials.Frame}
            />
            <mesh
              geometry={nodes.Apple_Logo_Logo_0.geometry}
              material={materials.Logo}
            />
            <mesh
              geometry={nodes.Camera001_Body_0.geometry}
              material={materials.Body}
            />
            <mesh
              geometry={nodes.Camera001_Gray_Glass_0.geometry}
              material={materials.Gray_Glass}
            />
            <mesh
              geometry={nodes.Camera001_Flash_0.geometry}
              material={materials.Flash}
            />
            <mesh
              geometry={nodes.Camera001_Port_0.geometry}
              material={materials.Port}
            />
            <mesh
              geometry={nodes.Camera001_Camera_Frame_0.geometry}
              material={materials.Camera_Frame}
            />
            <mesh
              geometry={nodes.Camera001_Camera_Glass_0.geometry}
              material={materials.Camera_Glass}
            />
            <mesh
              geometry={nodes.Camera001_Lens_0.geometry}
              material={materials.Lens}
            />
            <mesh
              geometry={nodes.Camera001_Black_Glass_0.geometry}
              material={materials.Black_Glass}
            />
            <mesh
              geometry={nodes.Camera003_Material002_0.geometry}
              material={materials["Material.002"]}
            />
            <mesh
              geometry={nodes.Frame_Frame_0.geometry}
              material={materials.Frame}
            />
            <mesh
              geometry={nodes.Frame_Frame2_0.geometry}
              material={materials.Frame2}
            />
            <mesh
              geometry={nodes.Frame_Port_0.geometry}
              material={materials.Port}
            />
            <mesh
              geometry={nodes.Frame_Antenna_0.geometry}
              material={materials.Antenna}
            />
            <mesh
              geometry={nodes.Frame_Mic_0.geometry}
              material={materials.material}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/model/scene.gltf");
