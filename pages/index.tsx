import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react'
import { useWallet } from '../hooks/useWallet'
import { cutAddress } from '../utils/cutAddress'
import { ShowToast } from "../components/toast"
import { showToast }from "../utils/showToast"

const Home: NextPage = () => {
  const { login, address } = useWallet();
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Flash Swap</title>
        <meta name="description" content="Flash Swap Demo" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Flash Swap</h1>
          <div className={styles.login}>
            <button onClick={() => login()} className={styles.loginButton}>
              {address !== null ? <p>{cutAddress(address)}</p> : <p>Connect</p>}
            </button>
          </div>
        </div>

        <div>
          <p>Flash Swap allows you to make flash swaps on Uniswap V3.</p>
        </div>

        <ShowToast />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://uniswap.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image
              src="/assets/uniswap-logo.svg"
              alt=""
              width={100}
              height={60}
            />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
