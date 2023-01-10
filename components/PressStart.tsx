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
}

interface Figure {
  x: number
  y: number
  type?: string
}

const Canvas = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`

// part 1 : 2 circles
const Circle = styled.div`
  background-color: #33ff33;
  border-radius: 50%;
  position: absolute;
`
// part 2 : 2 rectangles
const Rectangle = styled.div`
  background-color: #33ff33;
  position: absolute;
`
// part 3 : 2 pentagons
const Pentagon = styled.div`
  background-color: #33ff33;
  position: absolute;
`
// part 4 : 2 hexagons
const Hexagon = styled.div`
  position: absolute;
`

const HexagonTop = styled.div`
  width: 0;
  border-bottom: 30px solid #6c6;
  border-left: 52px solid transparent;
  border-right: 52px solid transparent;
`
const HexagonMiddle = styled.div`
  width: 104px;
  height: 60px;
  background-color: #6c6;
`
const HexagonBottom = styled.div`
  width: 0;
  border-top: 30px solid #6c6;
  border-left: 52px solid transparent;
  border-right: 52px solid transparent;
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
  const dom = useRef<HTMLDivElement>(null)
  const dots = useRef<Figure[]>([])
  const [, setAnim] = useState(0)

  useEffect(
    function init() {
      Composite.clear(engine.world, false)
      dots.current = []

      const width = dom.current?.clientWidth ?? 0
      const height = dom.current?.clientHeight ?? 0

      const ground = Bodies.rectangle(width / 2 - 50, height, width, 400, {
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
    [dom.current?.clientWidth]
  )

  useEffect(() => {
    let unsubscribe: any

    function addDot() {
      const width = dom.current?.clientWidth ?? 0
      const height = dom.current?.clientHeight ?? 0

      const circle = Bodies.circle(
        Math.random() * width * 0.75 + 50,
        Math.random() * height * 0.75 + 50,
        200
      )
      const rectagle = Bodies.rectangle(
        Math.random() * width * 0.75 + 50,
        Math.random() * height * 0.75 + 50,
        4,
        200
      )
      const pentagon = Bodies.polygon(
        Math.random() * width * 0.75 + 50,
        Math.random() * height * 0.75 + 50,
        5,
        200
      )
      const hexagon = Bodies.polygon(
        Math.random() * width * 0.75 + 50,
        Math.random() * height * 0.75 + 50,
        6,
        200
      )

      circle.friction = 0.05
      circle.frictionAir = 0.00005
      circle.restitution = 0.9

      //if (dots.current.length < 50) setTimeout(addDot, 300)
      Composite.add(engine.world, circle)
      Composite.add(engine.world, rectagle)
      Composite.add(engine.world, hexagon)
      Composite.add(engine.world, pentagon)
      Composite.add(engine.world, hexagon)
      Composite.add(engine.world, pentagon)
      Composite.add(engine.world, rectagle)
      Composite.add(engine.world, circle)
    }

    addDot()

    return () => {
      clearTimeout(unsubscribe)
    }
  }, [dom.current?.clientWidth])

  useEffect(
    function triggerAnimation() {
      let unsubscribe: number

      function animate() {
        let i = 0
        for (const dot of Composite.allBodies(engine.world)) {
          if (dot.isStatic) continue
          console.log(dot)
          if (dot.label === 'Circle Body') {
            dots.current[i] = {
              x: dot.position.x,
              y: dot.position.y,
              type: 'circle',
            }
          }
          if (dot.label === 'Rectangle Body') {
            dots.current[i] = {
              x: dot.position.x,
              y: dot.position.y,
              type: 'rectangle',
            }
          }
          if (dot.label === 'Polygon Body') {
            dots.current[i] = {
              x: dot.position.x,
              y: dot.position.y,
              type: 'hexagon',
            }
          }

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
    [dom.current?.clientWidth]
  )

  return (
    <Canvas ref={dom}>
      {dots.current.map((dot, key) => {
        return dot.type === 'circle' ? (
          <Circle
            key={key}
            style={{ top: dot.y, left: dot.x, width: '400px', height: '400px' }}
          />
        ) : dot.type === 'rectangle' ? (
          <Rectangle
            key={key}
            style={{ top: dot.y, left: dot.x, width: '400px', height: '400px' }}
          />
        ) : dot.type === 'pentagon' ? (
          <Pentagon
            key={key}
            style={{ top: dot.y, left: dot.x, width: '400px', height: '400px' }}
          />
        ) : dot.type === 'hexagon' ? (
          <Hexagon key={key} style={{ top: dot.y, left: dot.x }}>
            <HexagonTop></HexagonTop>
            <HexagonMiddle></HexagonMiddle>
            <HexagonBottom></HexagonBottom>
          </Hexagon>
        ) : null
      })}
    </Canvas>
  )
}
