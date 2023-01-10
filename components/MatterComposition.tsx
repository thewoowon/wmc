import { useCallback, useEffect, useRef } from 'react'
import { Engine, Render, Bodies, World, Runner } from 'matter-js'
import { debounce } from 'lodash'

function MatterComposition({
  ref,
  style,
}: {
  ref: React.RefObject<HTMLDivElement>
  style: React.CSSProperties
}) {
  const scene = useRef<HTMLDivElement>(null)
  const isPressed = useRef(false)
  const engine = useRef(Engine.create())
  const useRender = useRef<Render>(null)

  const handleScroll = useCallback(([entry]: IntersectionObserverEntry[]) => {
    const { current } = scene
    if (entry.isIntersecting && current) {
      // 원하는 이벤트를 추가 할 것
      current.style.transitionProperty = 'opacity'
      current.style.transitionDuration = '1s'
      current.style.transitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)'
      current.style.transitionDelay = '0s'
      current.style.opacity = '1'
    }

    const cw = window.innerWidth
    World.add(engine.current.world, [
      Bodies.circle(Math.random() * cw, 0, 200, {
        render: { fillStyle: 'red' },
      }),
    ])
    World.add(engine.current.world, [
      Bodies.rectangle(Math.random() * cw, 0, 300, 300, {
        render: { fillStyle: 'blue' },
      }),
    ])
    World.add(engine.current.world, [
      Bodies.polygon(Math.random() * cw, 0, 5, 200, {
        render: { fillStyle: 'green' },
      }),
    ])
    World.add(engine.current.world, [
      Bodies.polygon(Math.random() * cw, 0, 6, 200, {
        render: { fillStyle: 'orange' },
      }),
    ])
    World.add(engine.current.world, [
      Bodies.polygon(Math.random() * cw, 0, 8, 200, {
        render: { fillStyle: 'yellow' },
      }),
    ])
    World.add(engine.current.world, [
      Bodies.polygon(Math.random() * cw, 0, 10, 200, {
        render: { fillStyle: 'white' },
      }),
    ])
  }, [])

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
    }
  }, [])

  useEffect(() => {
    let observer: IntersectionObserver
    const { current } = scene

    if (current) {
      observer = new IntersectionObserver(handleScroll, { threshold: 0.7 })
      observer.observe(current)

      return () => observer && observer.disconnect()
    }
  }, [handleScroll])

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
            fillStyle: '#33ff33',
          },
        }
      )
      World.add(engine.current.world, [ball])
    }
  }

  return (
    <div className="w-full h-full">
      <div ref={scene} style={{ width: '100vw', height: '100vh' }} />
    </div>
  )
}

export default MatterComposition
