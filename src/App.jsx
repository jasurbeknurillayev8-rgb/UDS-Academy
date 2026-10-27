import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'
import Experience from './scenes/Experience'

export default function App() {
  const fadeRef = useRef()

  return (
    <>
      <Canvas camera={{ position: [0, 0, 9], fov: 55 }}>
        <color attach="background" args={['#05080c']} />
        <ScrollControls pages={8} damping={0.25}>
          <Experience fadeRef={fadeRef} />
        </ScrollControls>
      </Canvas>

      <div
        ref={fadeRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#ffffff',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />
    </>
  )
}