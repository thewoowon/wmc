import { useCallback, useEffect, useRef } from 'react'
import { Engine, Render, Bodies, World, Runner } from 'matter-js'
import { debounce } from 'lodash'
import { rainbow } from 'constants/constant'

function MatterComposition() {
  const scene = useRef<HTMLDivElement>(null)
  const engine = useRef(Engine.create())
  const isIntersecting = useRef(false)

  const handleScroll = useCallback(([entry]: IntersectionObserverEntry[]) => {
    const { current } = scene
    if (entry.isIntersecting && current) {
      // 원하는 이벤트를 추가 할 것
      current.style.transitionProperty = 'opacity'
      current.style.transitionDuration = '1s'
      current.style.transitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)'
      current.style.transitionDelay = '0s'
      current.style.opacity = '1'

      if (!isIntersecting.current) {
        const cw = window.innerWidth
        World.add(engine.current.world, [
          Bodies.circle(Math.random() * cw, 0, 150, {
            render: { fillStyle: rainbow[0] },
            frictionAir: 0.05,
          }),
        ])
        World.add(engine.current.world, [
          Bodies.circle(Math.random() * cw, 0, 150, {
            render: { fillStyle: rainbow[1] },
            frictionAir: 0.05,
          }),
        ])
        World.add(engine.current.world, [
          Bodies.circle(Math.random() * cw, 0, 150, {
            render: { fillStyle: rainbow[2] },
            frictionAir: 0.05,
          }),
        ])
        World.add(engine.current.world, [
          Bodies.rectangle(Math.random() * cw, 0, 200, 200, {
            render: { fillStyle: rainbow[3] },
            frictionAir: 0.05,
          }),
        ])
        World.add(engine.current.world, [
          Bodies.polygon(Math.random() * cw, 0, 5, 150, {
            render: { fillStyle: rainbow[4] },
            frictionAir: 0.05,
          }),
        ])
        World.add(engine.current.world, [
          Bodies.polygon(Math.random() * cw, 0, 3, 200, {
            render: { fillStyle: rainbow[5] },
            frictionAir: 0.05,
          }),
        ])
        World.add(engine.current.world, [
          Bodies.polygon(Math.random() * cw, 0, 6, 150, {
            render: { fillStyle: rainbow[6] },
            frictionAir: 0.05,
          }),
        ])
        World.add(engine.current.world, [
          Bodies.polygon(Math.random() * cw, 0, 8, 200, {
            render: { fillStyle: rainbow[0] },
            frictionAir: 0.05,
          }),
        ])
        World.add(engine.current.world, [
          Bodies.polygon(Math.random() * cw, 0, 3, 150, {
            render: { fillStyle: rainbow[1] },
            frictionAir: 0.05,
          }),
        ])
        World.add(engine.current.world, [
          Bodies.polygon(Math.random() * cw, 0, 10, 200, {
            render: { fillStyle: rainbow[2] },
            frictionAir: 0.05,
          }),
        ])
        World.add(engine.current.world, [
          Bodies.polygon(Math.random() * cw, 0, 12, 150, {
            render: { fillStyle: rainbow[3] },
            frictionAir: 0.05,
          }),
        ])
        World.add(engine.current.world, [
          Bodies.polygon(Math.random() * cw, 0, 3, 200, {
            render: { fillStyle: rainbow[4] },
            frictionAir: 0.05,
          }),
        ])
        World.add(engine.current.world, [
          Bodies.polygon(Math.random() * cw, 0, 3, 150, {
            render: { fillStyle: rainbow[5] },
            frictionAir: 0.05,
          }),
        ])
        World.add(engine.current.world, [
          Bodies.polygon(Math.random() * cw, 0, 6, 200, {
            render: { fillStyle: rainbow[6] },
            frictionAir: 0.05,
          }),
        ])
        World.add(engine.current.world, [
          Bodies.polygon(Math.random() * cw, 4, 14, 150, {
            render: { fillStyle: rainbow[0] },
            frictionAir: 0.05,
          }),
        ])
        World.add(engine.current.world, [
          Bodies.polygon(Math.random() * cw, 0, 5, 200, {
            render: { fillStyle: '#33ff33' },
            frictionAir: 0.05,
          }),
        ])
        World.add(engine.current.world, [
          Bodies.polygon(Math.random() * cw, 0, 7, 150, {
            render: { fillStyle: rainbow[2] },
            frictionAir: 0.05,
          }),
        ])
        isIntersecting.current = true
      }
    }
  }, [])

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

      isIntersecting.current = false
    }, 1000)

    window.addEventListener('resize', handleResize)

    return () => {
      Render.stop(render)
      World.clear(engine.current.world, false)
      Engine.clear(engine.current)
      render.canvas.remove()
      window.removeEventListener('resize', handleResize)
      isIntersecting.current = false
    }
  }, [])

  useEffect(() => {
    let observer: IntersectionObserver
    const { current } = scene

    if (current) {
      observer = new IntersectionObserver(handleScroll, { threshold: 0.8 })
      observer.observe(current)

      return () => observer && observer.disconnect()
    }
  }, [handleScroll])

  return (
    <div className="w-full h-full">
      <div ref={scene} style={{ width: '100vw', height: '100vh' }} />
    </div>
  )
}

export default MatterComposition
