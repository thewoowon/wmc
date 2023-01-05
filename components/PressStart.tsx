import React, { useLayoutEffect, useRef } from 'react'
import {
  Bodies,
  Render,
  Composite,
  Engine,
  Runner,
  Mouse,
  MouseConstraint,
} from 'matter-js'
import { useEffect, useState } from 'react'
import styled from '@emotion/styled'

const engine = Engine.create()
const runner = Runner.create()

Runner.run(runner, engine)

interface Circle {
  x: number
  y: number
  status?: string
}

const Canvas = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`

const Circle = styled.div`
  background-color: #33ff33;
  border-radius: 50%;
  position: absolute;
`

//, backgroundColor: `${rainbow[Math.ceil(Math.random() * 5)-1]}`

const Rectangle = styled.div`
  background-color: #33ff33;
  position: absolute;
`

const rainbow = [
  '#FF0000',
  '#FF7F00',
  '#FFFF00',
  '#00FF00',
  '#0000FF',
  '#4B0082',
  '#9400D3',
]

export function PressStart() {
  const ref = useRef<HTMLDivElement>(null)
  const dots = useRef<Circle[]>([])
  const [, setAnim] = useState(0)

  useEffect(
    function init() {
      Composite.clear(engine.world, false)
      dots.current = []

      const width = ref.current?.clientWidth ?? 0
      const height = ref.current?.clientHeight ?? 0

      const ground = Bodies.rectangle(width / 2 - 50, height, width, 100, {
        isStatic: true,
        render: {
          fillStyle: 'red',
          strokeStyle: 'blue',
          lineWidth: 3,
        },
      })
      const ceiling = Bodies.rectangle(width / 2 - 50, 0, width, 1, {
        isStatic: true,
        render: {
          fillStyle: 'red',
          strokeStyle: 'blue',
          lineWidth: 3,
        },
      })
      const wallL = Bodies.rectangle(-50, height / 2, 1, height, {
        isStatic: true,
        render: {
          fillStyle: 'red',
          strokeStyle: 'blue',
          lineWidth: 3,
        },
      })
      const wallR = Bodies.rectangle(width - 50, height / 2, 1, height, {
        isStatic: true,
        render: {
          fillStyle: 'red',
          strokeStyle: 'blue',
          lineWidth: 3,
        },
      })

      Composite.add(engine.world, [ground, ceiling, wallL, wallR])
    },
    [ref.current?.clientWidth]
  )

  useEffect(() => {
    let unsubscribe: any

    function addDot() {
      const width = ref.current?.clientWidth ?? 0
      const height = ref.current?.clientHeight ?? 0

      const circ = Bodies.circle(
        Math.random() * width * 0.75 + 50,
        Math.random() * height * 0.75 + 50,
        50
      )
      circ.friction = 0.05
      circ.frictionAir = 0.00005
      circ.restitution = 0.9

      Composite.add(engine.world, circ)

      if (dots.current.length < 50) setTimeout(addDot, 300)
    }

    addDot()

    return () => {
      clearTimeout(unsubscribe)
    }
  }, [ref.current?.clientWidth])

  useEffect(
    function triggerAnimation() {
      let unsubscribe: number

      function animate() {
        let i = 0
        for (const dot of Composite.allBodies(engine.world)) {
          if (dot.isStatic) continue

          dots.current[i] = { x: dot.position.x, y: dot.position.y }

          i += 1
        }

        setAnim((x) => x + 1)

        unsubscribe = requestAnimationFrame(animate)
      }

      unsubscribe = requestAnimationFrame(animate)

      return () => {
        cancelAnimationFrame(unsubscribe)
      }
    },
    [ref.current?.clientWidth]
  )

  return (
    <Canvas ref={ref}>
      {dots.current.map((dot, key) => (
        <Circle
          key={key}
          style={{ top: dot.y, left: dot.x, width: '100px', height: '100px' }}
        />
      ))}
    </Canvas>
  )
}
