'use client'

import { Quaternion, Vector3, Group, Color, MeshBasicMaterial, Mesh, MeshStandardMaterial } from 'three'
import { useEffect, useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment, Html, useProgress } from '@react-three/drei'
import { easing } from 'maath'
import getUuid from 'uuid-by-string'

import { PiArrowCircleLeftThin, PiArrowCircleRightThin } from "react-icons/pi";

const GOLDENRATIO = 16 / 9

function Loader() {
  const { progress } = useProgress()
  const [hidden, set] = useState()

  return (
    <Html center className="text-white inset-0 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        transition: 'all 0.5s',
        opacity: hidden ? 0 : 1,
        width: '120px',
        height: '18px',
      }}>
      {progress ? progress.toFixed(0) : '0'}% 로딩 중...
    </Html>
  )
}

export function MinimapSection({ images, activeFrame, setActiveFrame, wasActiveFrame, setWasActiveFrame, isMobile }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 1, 6] }} className='!h-svh bg-[#191920]'>
      <color attach="background" args={['#191920']} />
      <fog attach="fog" args={['#191920', 0, 15]} />
      <Suspense fallback={<Loader />}>
        <group position={[0, -0.5, 0]}>
          <Frames images={images} activeFrame={activeFrame} setActiveFrame={setActiveFrame} wasActiveFrame={wasActiveFrame} setWasActiveFrame={setWasActiveFrame} isMobile={isMobile} />
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={2048}
              mixBlur={1}
              mixStrength={80}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#050505"
              metalness={0.5}
            />
          </mesh>
        </group>
      </Suspense>
      <Environment preset="city" />
    </Canvas>
  )
}

export function Navigation({ images, activeFrame, setActiveFrame, setWasActiveFrame, isMobile }) {
  const handleNext = () => {
    if (!images || images.length === 0) return;
    const activeIndex = activeFrame ? images.findIndex(image => getUuid(image.url) === activeFrame) : -1;
    const nextIndex = activeIndex === -1 ? 0 : (activeIndex + 1) % images.length;
    setWasActiveFrame(activeFrame);
    setActiveFrame(getUuid(images[nextIndex].url));
  };

  const handlePrev = () => {
    if (!images || images.length === 0) return;
    const activeIndex = activeFrame ? images.findIndex(image => getUuid(image.url) === activeFrame) : -1;
    const prevIndex = activeIndex === -1 ? images.length - 1 : (activeIndex - 1 + images.length) % images.length;
    setWasActiveFrame(activeFrame);
    setActiveFrame(getUuid(images[prevIndex].url));
  };

  return (
    <>
      {/* Left */}
      <div onClick={handlePrev} className={`absolute bottom-[100px] ${isMobile ? "left-[20px]" : "left-[40px]"} text-white fade-in cursor-pointer hover:scale-95 active:scale-95 transition-transform duration-300`}>
        <PiArrowCircleLeftThin className="w-12 h-12" />
      </div>
      {/* Right */}
      <div onClick={handleNext} className={`absolute bottom-[100px] ${isMobile ? "right-[20px]" : "right-[40px]"} text-white fade-in cursor-pointer hover:scale-95 active:scale-95 transition-transform duration-300`}>
        <PiArrowCircleRightThin className="w-12 h-12" />
      </div>
    </>
  )
}

function Frames({ images, q = new Quaternion(), p = new Vector3(), activeFrame, setActiveFrame, wasActiveFrame, setWasActiveFrame, isMobile }) {
  const ref = useRef<Group>(null)

  useEffect(() => {
    if (!ref.current) return

    if (activeFrame) {
      const clicked = ref.current.getObjectByName(activeFrame)
      if (clicked && clicked.parent) {
        clicked.parent.updateWorldMatrix(true, true)
        clicked.parent.localToWorld(p.set(0, GOLDENRATIO / 2, isMobile ? 2.75 : 1.25))
        clicked.parent.getWorldQuaternion(q)
      }
    }
    else {
      p.set(0, 0, isMobile ? 7 : 5.5)
      q.identity()
    }
  }, [activeFrame, p, q, isMobile])

  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt)
    easing.dampQ(state.camera.quaternion, q, 0.4, dt)
  })

  return (
    <group
      ref={ref}
      onClick={(e) => {
        e.stopPropagation()
        const frameName = e.object.name
        if (activeFrame === frameName) {
          // Go to url on new tab
          window.open(images.find((image) => getUuid(image.url) === frameName)?.link, '_blank')
        }
        else {
          setWasActiveFrame(activeFrame)
          setActiveFrame(frameName)
        }
      }}
      onPointerMissed={() => {
        setWasActiveFrame(activeFrame)
        setActiveFrame(undefined)
      }}>
      {images.map((props) => <Frame key={props.url} {...props} isActive={activeFrame === getUuid(props.url)} wasActive={wasActiveFrame === getUuid(props.url)} isMobile={isMobile} /> /* prettier-ignore */)}
    </group>
  )
}

function Frame({ url, c = new Color(), isActive, wasActive, title, date, isMobile, ...props }) {
  const image = useRef<Mesh>(null)
  const frame = useRef<Mesh>(null)
  const group = useRef<Group>(null)
  const titleRef = useRef<any>(null)
  const dateRef = useRef<any>(null)
  const wasActiveTime = useRef(0)
  const prevWasActive = useRef(false)

  const [hovered, hover] = useState(false)
  const name = getUuid(url)

  useEffect(() => {
    if (wasActive && !prevWasActive.current) {
      wasActiveTime.current = Date.now()
    }
    prevWasActive.current = wasActive
  }, [wasActive])

  useCursor(hovered)
  useFrame((state, dt) => {
    if (image.current?.material && 'zoom' in image.current.material) {
      (image.current.material as any).zoom = 1
      easing.damp3(image.current.scale, [(!isActive && hovered ? 0.88 : 0.9), (!isActive && hovered ? 0.81 : 0.84), 1], 0.1, dt)
    }
    if (frame.current?.material && 'color' in frame.current.material) {
      easing.dampC((frame.current.material as MeshBasicMaterial).color, hovered ? '#9CC3F2' : 'white', 0.1, dt)
    }

    if (group.current) {
      let targetOpacity = 1
      const isFadingOut = wasActive && Date.now() - wasActiveTime.current > 400

      if (isFadingOut || (!isActive && !wasActive)) {
        const worldPosition = new Vector3()
        group.current.getWorldPosition(worldPosition)
        const distance = worldPosition.distanceTo(state.camera.position)
        const fadeStart = 2.75
        const fadeEnd = isMobile ? 2 : 1.5
        targetOpacity = Math.max(0, Math.min(1, (distance - fadeEnd) / (fadeStart - fadeEnd)))
      }

      const mainMesh = group.current.children[0] as Mesh
      if (mainMesh) {
        easing.damp((mainMesh.material as MeshStandardMaterial), 'opacity', targetOpacity, 0.4, dt)
      }
      if (frame.current) {
        easing.damp((frame.current.material as MeshBasicMaterial), 'opacity', targetOpacity, 0.4, dt)
      }
      if (image.current) {
        easing.damp(image.current.material, 'opacity', targetOpacity, 0.4, dt)
      }
      if (titleRef.current) {
        easing.damp(titleRef.current, 'fillOpacity', targetOpacity, 0.4, dt)
      }
      if (dateRef.current) {
        easing.damp(dateRef.current, 'fillOpacity', targetOpacity, 0.4, dt)
      }
    }
  })

  return (
    <group ref={group} {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[GOLDENRATIO, 1, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} transparent />
        <mesh ref={frame} raycast={() => null} scale={[0.93, 0.89, 0.99]} position={[0, 0, 0.2]}>
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} transparent />
        </mesh>
        <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} scale={[GOLDENRATIO * 0.93, 0.89]} transparent />
      </mesh>
      <Text ref={titleRef} anchorX="left" anchorY="top" position={[0.95, 1.4, 0]} fontSize={0.025}>
        {title}
      </Text>
      <Text ref={dateRef} anchorX="left" anchorY="top" position={[0.95, 1.37, 0]} fontSize={0.025}>
        {date}
      </Text>
    </group>
  )
}
