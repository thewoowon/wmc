import { useEffect, useRef } from 'react'
import { Engine, Render, Bodies, World, Runner } from 'matter-js'
import { debounce } from 'lodash'

function MatterComposition() {
  const scene = useRef<HTMLDivElement>(null)
  const isPressed = useRef(false)
  const engine = useRef(Engine.create())
  const useRender = useRef<Render>(null)

  // const handleResize = debounce(() =>{
  //       const cw = window.innerWidth
  //       const ch = window.innerHeight

  //       const render = Render.create({
  //       element: scene.current ?? new HTMLDivElement(),
  //       engine: engine.current,
  //       options: {
  //           width: cw,
  //           height: ch,
  //           wireframes: false,
  //           background: 'transparent'
  //       }
  //       })

  //       World.add(engine.current.world, [
  //       Bodies.rectangle(cw / 2,0, cw, 20, { isStatic: true, render: { fillStyle: 'blue' } }),
  //       Bodies.rectangle(0, ch / 2, 20, ch, { isStatic: true, render: { fillStyle: 'blue' }  }),
  //       Bodies.rectangle(cw / 2, ch, cw, 20, { isStatic: true, render: { fillStyle: 'blue' }  }),
  //       Bodies.rectangle(cw, ch / 2, 20, ch, { isStatic: true, render: { fillStyle: 'blue' }  })
  //       ])
  //       Runner.run(engine.current)
  //       Render.run(render)

  // },1000)

  useEffect(() => {
    const cw = window.innerWidth
    const ch = window.innerHeight

    let render = Render.create({
      element: scene.current ?? new HTMLDivElement(),
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: 'transparent',
      },
    })

    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2, 0, cw, 20, {
        isStatic: true,
        render: { fillStyle: '#000000' },
      }),
      Bodies.rectangle(0, ch / 2, 20, ch, {
        isStatic: true,
        render: { fillStyle: '#000000' },
      }),
      Bodies.rectangle(cw / 2, ch, cw, 20, {
        isStatic: true,
        render: { fillStyle: '#000000' },
      }),
      Bodies.rectangle(cw, ch / 2, 20, ch, {
        isStatic: true,
        render: { fillStyle: '#000000' },
      }),
    ])
    Runner.run(engine.current)
    Render.run(render)

    const handleResize = debounce(() => {
      Render.stop(render)
      World.clear(engine.current.world, false)
      Engine.clear(engine.current)
      render.canvas.remove()

      const cw = window.innerWidth
      const ch = window.innerHeight

      render = Render.create({
        element: scene.current ?? new HTMLDivElement(),
        engine: engine.current,
        options: {
          width: cw,
          height: ch,
          wireframes: false,
          background: 'transparent',
        },
      })

      World.add(engine.current.world, [
        Bodies.rectangle(cw / 2, 0, cw, 20, {
          isStatic: true,
          render: { fillStyle: '#000000' },
        }),
        Bodies.rectangle(0, ch / 2, 20, ch, {
          isStatic: true,
          render: { fillStyle: '#000000' },
        }),
        Bodies.rectangle(cw / 2, ch, cw, 20, {
          isStatic: true,
          render: { fillStyle: '#000000' },
        }),
        Bodies.rectangle(cw, ch / 2, 20, ch, {
          isStatic: true,
          render: { fillStyle: '#000000' },
        }),
      ])
      Runner.run(engine.current)
      Render.run(render)
    }, 1000)

    window.addEventListener('resize', handleResize)

    return () => {
      Render.stop(render)
      World.clear(engine.current.world, false)
      Engine.clear(engine.current)
      render.canvas.remove()
      window.removeEventListener('resize', handleResize)
      //   render.canvas = new HTMLCanvasElement()
      //   render.context = new CanvasRenderingContext2D()
      //   render.textures = {}
    }
  }, [])

  useEffect(() => {
    console.log('hello rendering')
  }, [scene.current?.clientWidth])

  const handleDown = () => {
    isPressed.current = true
  }

  const handleUp = () => {
    isPressed.current = false
  }

  const handleAddCircle = (e: any) => {
    if (isPressed.current) {
      const ball = Bodies.circle(
        e.clientX,
        e.clientY,
        10 + Math.random() * 30,
        {
          mass: 10,
          restitution: 0.9,
          friction: 0.005,
          render: {
            fillStyle: '#0000ff',
          },
        }
      )
      World.add(engine.current.world, [ball])
    }
  }

  return (
    <div
      onMouseDown={handleDown}
      onMouseUp={handleUp}
      onMouseMove={handleAddCircle}
      className="w-full h-full"
    >
      <div ref={scene} style={{ width: '100vw', height: '100vh' }} />
    </div>
  )
}

export default MatterComposition
