import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

export default function Footer() {
  return (
    <footer
      className="py-5 bg-black text-white font-sans-kr-light text-md xs:text-md"
      style={{ borderTop: '0.5px solid rgba(99,102,241,0.8)' }}
    ></footer>
  )
}
