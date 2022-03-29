import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Nav from '../components/Nav';

const Home: NextPage = () => {
  return (
    <div className="w-screen h-screen">
      <Nav />
    </div>
  )
}

export default Home
