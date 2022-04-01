import Head from "next/head"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import TopNav from '../layout/TopNav'
import Footer from "./Footer"


const Layout = ({children, title = 'SlicedAdvice - Marketplace for Bite-Sized Expert Advice'}: any) => {
  return (
    <div>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        <TopNav />
        {children}
        <Footer />
        <ToastContainer />
    </div>
  )
}

export default Layout