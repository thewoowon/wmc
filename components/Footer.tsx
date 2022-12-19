import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

export default function Footer() {
  return (
    <footer
      className="py-5 bg-black text-white font-sans-kr-light text-md xs:text-md"
      style={{ borderTop: '0.5px solid rgba(255,255,255,1)' }}
    >
      <div
        className="flex justify-between mx-auto"
        style={{ maxWidth: '1080px' }}
      >
        <div>
          <Image
            alt="main_image"
            width={200}
            height={200}
            src="/assets/logo/wmc_png.png"
          />
        </div>
        <span className="mx-auto"></span>
        <div className="flex flex-wrap gap-10">
          <div className="pr-10 cursor-pointer transition duration-200 ease-in-out hover:text-white">
            Home
          </div>
          <div className="pr-10 cursor-pointer transition duration-200 ease-in-out hover:text-white">
            Who?
          </div>
          <div className="pr-10 cursor-pointer transition duration-200 ease-in-out hover:text-white">
            Project
          </div>
          <div className="pr-10 cursor-pointer transition duration-200 ease-in-out hover:text-white">
            Crew
          </div>
          <div className="pr-10 cursor-pointer transition duration-200 ease-in-out hover:text-white">
            Blog
          </div>
          <div className="pr-10 cursor-pointer transition duration-200 ease-in-out hover:text-white">
            Opinion
          </div>
        </div>
      </div>
    </footer>
  )
}
