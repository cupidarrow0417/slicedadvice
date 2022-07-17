import Head from "next/head"
import { ElementType } from "react"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import TopNav from '../layout/TopNav'
import Footer from "./Footer"


const Layout = ({children, title = 'SlicedAdvice - Marketplace for Bite-Sized Expert Advice'}: any) => {
  return (
    <div className="bg-brand-bg-light px-2 sm:px-6 md:px-8 md:py-4 lg:px-10 overflow-clip">
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        <TopNav />
        <div className="mx-auto bg-brand-bg-light mt-4 mb-8">
          {children}
        </div>
        <Footer />
        <ToastContainer />
    </div>
  )
}

export default Layout