import {
  IconBoxMultiple,
  IconBox,
  IconHeart,
  IconHome,
  IconShoppingCart,
  IconUser,
} from '@tabler/icons'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

export default function Header() {
  const { data: session } = useSession()
  const router = useRouter()

  const [toggle, setToggle] = useState(false)
  const clickProfile = () => {
    setToggle(!toggle)
  }

  return (
    <header
      className="bg-black text-zinc-300 font-sans-kr-light lg:text-md md:text-sm sm:text-sm text-xs"
      style={{ borderBottom: '0.5px solid rgba(99,102,241,0.8)' }}
    >
      <div
        className="m-auto flex h-20 items-center w-full"
        style={{ maxWidth: '1080px' }}
      >
        <div
          className="cursor-pointer flex justify-center items-center transition duration-200 ease-in-out hover:text-white"
          onClick={() => {
            router.push('/')
          }}
        >
          <Image
            onClick={clickProfile}
            className="rounded-full cursor-pointer mx-2"
            alt=""
            src={'/assets/logo/wmc_png.png'}
            width={80}
            height={80}
          ></Image>
        </div>
        <span className="m-auto"></span>
        <div className="flex lg:gap-12 md:gap-10 sm:gap-6 xs:gap-4 gap-2 px-4">
          <div
            className="cursor-pointer flex justify-center items-center transition duration-200 ease-in-out hover:text-white"
            onClick={() => {
              router.push('/products')
            }}
          >
            Home
            {/* <IconBox
            stroke={1}
            onClick={() => {
              router.push('/products')
            }}
          ></IconBox> */}
          </div>
          <div
            className="cursor-pointer flex justify-center items-center transition duration-200 ease-in-out hover:text-white"
            onClick={() => {
              router.push('/wishlist')
            }}
          >
            Who?
            {/* <IconHeart
            stroke={1}
            onClick={() => {
              router.push('/wishlist')
            }}
          ></IconHeart> */}
          </div>
          <div
            className="cursor-pointer flex justify-center items-center transition duration-200 ease-in-out hover:text-white"
            onClick={() => {
              router.push('/cart')
            }}
          >
            Project
            {/* <IconShoppingCart
            stroke={1}
            onClick={() => {
              router.push('/cart')
            }}
          ></IconShoppingCart> */}
          </div>
          <div
            className="cursor-pointer flex justify-center items-center transition duration-200 ease-in-out hover:text-white"
            onClick={() => {
              router.push('/qna')
            }}
          >
            Crew
          </div>
          <div
            className="cursor-pointer flex justify-center items-center transition duration-200 ease-in-out hover:text-white"
            onClick={() => {
              router.push('/qna')
            }}
          >
            Blog
          </div>
          {session ? (
            <div className="mr-4 flex justify-center items-center relative">
              <Image
                onClick={clickProfile}
                className="rounded-full cursor-pointer mx-2"
                alt=""
                src={session.user?.image!}
                width={30}
                height={30}
              ></Image>
              {toggle && <ProfileMenu />}
            </div>
          ) : (
            <div
              className="flex justify-center items-center transition duration-200 ease-in-out hover:text-white"
              onClick={() => {
                signIn()
              }}
            >
              Opinion
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

const ProfileMenu = () => {
  const menus = [
    { title: '나의 주문', link: '/my' },
    { title: '로그아웃', link: '/auth/signout' },
  ]
  return (
    <ol
      style={{ border: '1px solid rgba(200,200,200,0.6)' }}
      className="font-sans-kr absolute top-10 z-50 w-[120px] shadow-lg bg-white rounded-md overflow-hidden transition duration-200 ease-in-out"
    >
      {menus.map((menu) => (
        <Link href={menu.link} className="text-zinc-700" key={menu.title}>
          <li className="hover:bg-zinc-100 transition duration-200 ease-in-out px-4 py-2 w-full text-center text-sm text-darkGray">
            {menu.title}
          </li>
        </Link>
      ))}
    </ol>
  )
}
