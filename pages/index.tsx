import type { NextPage } from 'next'
import Head from 'next/head'

import LoginComponent from '../components/Login/LoginComponent';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Profit Mind App</title>
        <meta name="description" content="Affiliated Marketing App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

     <LoginComponent />
    </div>
  )
}

export default Home
