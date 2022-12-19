import Head from 'next/head'
import Image from 'next/image'
export default function Home() {
  return (
    <>
      <Head>
        <title>WMC</title>
        <meta name="description" content="We Make the Code" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="WMC - 모두가 만드는 공간" />
        <meta
          property="og:description"
          content="WMC는 모두가 함께 코드를 만드는 공간입니다."
        />
        <meta
          property="og:image"
          content="https://imagedelivery.net/6qzLODAqs2g1LZbVYqtuQw/bb63b50a-7d84-464c-249a-9da9aa993900/public"
        />
      </Head>
      <main className="font-sans-kr">
        <section className="py-20">
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
            <div className="ml-20">
              <Image
                alt="main_image"
                width={300}
                height={300}
                src="https://imagedelivery.net/6qzLODAqs2g1LZbVYqtuQw/bb63b50a-7d84-464c-249a-9da9aa993900/public"
              />
            </div>
          </div>
        </section>
        <section></section>
        <section></section>
      </main>
    </>
  )
}
