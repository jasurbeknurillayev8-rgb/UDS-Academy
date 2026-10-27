import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import { MathUtils } from 'three'
import SpaceScene from './SpaceScene'
import ClassroomScene, { ORIGIN } from './ClassroomScene'

const clamp = MathUtils.clamp

export default function Experience({ fadeRef }) {
  const scroll = useScroll()
  const space = useRef()
  const room = useRef()

  useFrame((state) => {
    const p = scroll.offset
    const cam = state.camera
    const inRoom = p >= 0.4

    space.current.visible = !inRoom
    room.current.visible = inRoom

    if (!inRoom) {
      // KOSMOS: kamera Yerga yaqinlashadi
      const ps = p / 0.4
      const zoom = clamp((ps - 0.15) / 0.65, 0, 1)
      cam.fov = 55
      cam.position.set(0, 0, 9 - 6.9 * Math.pow(zoom, 1.5))
      cam.rotation.set(0, 0, 0)
    } else {
      // SINF: izometrik burchak, asta yaqinlashadi
      const pc = clamp((p - 0.4) / 0.6, 0, 1)
      cam.fov = 30
      cam.position.set(ORIGIN[0] + 14 - 6 * pc, 13 - 6 * pc, 14 - 6 * pc)
      cam.lookAt(ORIGIN[0], 0.8, 0)
    }
    cam.updateProjectionMatrix()

    // Oq o'tish: kosmosda oqaradi, sinfda ochiladi
    let f
    if (p < 0.4) f = clamp((p / 0.4 - 0.8) / 0.2, 0, 1)
    else f = 1 - clamp((p - 0.4) / 0.05, 0, 1)
    if (fadeRef?.current) fadeRef.current.style.opacity = f
  })

  return (
    <>
      <group ref={space}>
        <SpaceScene />
      </group>
      <group ref={room} visible={false}>
        <ClassroomScene />
      </group>
    </>
  )
}