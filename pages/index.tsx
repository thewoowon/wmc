import useScrollFadeIn from 'hooks/useScrollFadeIn'
import useScrollFadeInLeft from 'hooks/useScrollFadeInLeft'
import useScrollFadeInImage from 'hooks/useScrollFadeInLeft'
import useScrollFadeInRight from 'hooks/useScrollFadeInRight'
import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import { useEffect, useRef } from 'react'
import Matter from 'matter-js'

export default function Home() {
  const boxRef = useRef(null)
  const canvasRef = useRef(null)

  const animatedItem_main_1 = useScrollFadeIn()
  const animatedItem_main_2 = useScrollFadeIn()
  const animatedItem_main_3 = useScrollFadeIn()
  const animatedItem_main_4 = useScrollFadeIn()
  const animatedItem_main_5 = useScrollFadeIn()
  const animatedItem_main_6 = useScrollFadeIn()
  const animatedItem_main_7 = useScrollFadeIn()
  const animatedItem_main_8 = useScrollFadeInLeft()
  const animatedItem_main_9 = useScrollFadeInRight()

  useEffect(() => {
    let Engine = Matter.Engine
    let Render = Matter.Render
    let World = Matter.World
    let Bodies = Matter.Bodies

    let engine = Engine.create({})

    let render = Render.create({
      element: boxRef.current ?? undefined,
      engine: engine,
      canvas: canvasRef.current ?? undefined,
      options: {
        width: 300,
        height: 300,
        background: 'rgba(255, 0, 0, 0.5)',
        wireframes: false,
      },
    })

    const floor = Bodies.rectangle(150, 300, 300, 20, {
      isStatic: true,
      render: {
        fillStyle: 'blue',
      },
    })

    const ball = Bodies.circle(150, 0, 10, {
      restitution: 0.9,
      render: {
        fillStyle: 'yellow',
      },
    })

    World.add(engine.world, [floor, ball])

    Engine.run(engine)
    Render.run(render)
  }, [])
  return (
    <>
      <Head>
        <title>WMC</title>
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="WMC" />
        <meta property="og:description" content="We Make the Code!" />
        <meta
          property="og:image"
          content="https://imagedelivery.net/6qzLODAqs2g1LZbVYqtuQw/0acf2d43-427e-461a-d2c9-e1f1f2cbd000/public"
        />
      </Head>
      <div
        ref={boxRef}
        style={{
          width: 300,
          height: 300,
        }}
      >
        <canvas ref={canvasRef} />
      </div>
      <main className="font-sans-kr">
        <section className="flex items-center justify-center min-h-screen">
          <div className="flex flex-wrap justify-center items-center">
            <div className="flex flex-col justify-center items-start mr-20">
              <div className="pt-6 pb-2 text-6xl font-sans-kr-bold text-white">
                모두가 함께 모여
              </div>
              <div className="pb-6 pt-2 text-6xl font-sans-kr-bold text-white">
                코드를 만드는 공간
              </div>
              <div className="py-1 text-xl text-white">
                <span className="font-bold">남녀노소</span> 누구나 참여가 가능한{' '}
                <span className="font-bold">열린 공간</span>,<br></br>
                WMC에서 함께 코드를 만들어갑니다.
              </div>
              <div className="py-1 text-lg text-indigo-500">
                새해가 오기 전에 <span className="font-bold">WMC</span>와 같이
                하는 것은 어때요?
              </div>
              <div className="py-10">
                <button className="text-xl font-bold rounded-md px-4 py-4 bg-indigo-500 text-white transition duration-200 ease-in-out hover:bg-indigo-600">
                  WMC 가입하기
                </button>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Image
                alt="main_image"
                width={500}
                height={500}
                src="/assets/logo/wmc_png.png"
              />
            </div>
          </div>
        </section>
        <section
          style={{ height: '800px' }}
          className="min-h-screen object-cover bg-center bg-no-repeat bg-cover flex flex-col justify-center items-center py-20 text-white"
        >
          <div className="matterjs"></div>
        </section>
        <section
          style={{
            height: '800px',
            backgroundImage: "url('/assets/figure/wmc_1.png')",
          }}
          className=" min-h-screen object-cover bg-center bg-no-repeat bg-cover flex flex-col justify-center items-center py-20 text-white"
        >
          <div
            {...animatedItem_main_1}
            className="py-2 font-sans-kr-bold lg:text-6xl md:text-5xl sm:text-4xl text-3xl"
          >
            We make the Code.
          </div>
          <div
            {...animatedItem_main_2}
            className="py-2 font-sans-kr-bold lg:text-6xl md:text-5xl sm:text-4xl text-3xl"
          >
            우리 함께 만들어요!
          </div>
        </section>
        <section className="min-h-screen">
          <section
            style={{ height: '300px' }}
            className="flex flex-col justify-center items-center py-20 text-white"
          >
            <div
              {...animatedItem_main_8}
              className="font-sans-kr-bold lg:text-6xl md:text-5xl sm:text-4xl text-3xl"
            >
              🌈 여기 열린 공간에서
            </div>
          </section>
          <section
            style={{ height: '300px' }}
            className="flex flex-col justify-center items-center py-20 text-white"
          >
            <div
              {...animatedItem_main_9}
              className="font-sans-kr-bold lg:text-6xl md:text-5xl sm:text-4xl text-3xl"
            >
              🥳 개발자, 디자이너, 기획자가 함께
            </div>
          </section>
          <section
            style={{ height: '300px' }}
            className="flex flex-col justify-center items-center py-20 text-white"
          >
            <div
              {...animatedItem_main_3}
              className="font-sans-kr-bold lg:text-6xl md:text-5xl sm:text-4xl text-3xl"
            >
              🤩 상상만했던 코드와 프로젝트를
            </div>
          </section>
          <section
            style={{ height: '300px' }}
            className="flex flex-col justify-center items-center py-20 text-white"
          >
            <div
              {...animatedItem_main_4}
              className="font-sans-kr-bold lg:text-6xl md:text-5xl sm:text-4xl text-3xl"
            >
              😆 만들어가요!
            </div>
          </section>
        </section>
        <section
          style={{
            height: '800px',
            backgroundImage: "url('/assets/figure/wmc_2.png')",
          }}
          className="min-h-screen object-cover bg-center bg-no-repeat bg-cover flex flex-col justify-center items-center py-20 text-white"
        >
          <div
            {...animatedItem_main_5}
            className="py-2 font-sans-kr-bold lg:text-6xl md:text-5xl sm:text-4xl text-3xl"
          >
            지금 바로 참여하기
          </div>
          <div {...animatedItem_main_6} className="py-10">
            <button className="text-3xl font-bold rounded-md px-8 py-6 bg-indigo-500 text-white transition duration-200 ease-in-out hover:bg-indigo-600">
              프로젝트 보기
            </button>
          </div>
        </section>
      </main>
    </>
  )
}
