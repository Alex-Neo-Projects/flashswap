import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import { useWallet } from '../hooks/useWallet'
import { usePools } from '../hooks/usePools'
import { cutAddress } from '../utils/cutAddress'
import { ShowToast } from '../components/toast'
import { showToast } from '../utils/showToast'
import { poolQuery } from '../utils/queries'

const Home: NextPage = () => {
  const { login, address } = useWallet()
  const { queryPools } = usePools()

  const [poolData, setPoolData] = useState<Array<any>>([])
  const [loadingPoolData, setLoadingPoolData] = useState<Boolean>(false)

  useEffect(() => {
    const getPools = async () => {
      const poolData = await queryPools(poolQuery)
      setPoolData(poolData.pools)
    }

    setLoadingPoolData(true)
    getPools()
    setLoadingPoolData(false)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <Head>
          <title>Flash Swap</title>
          <meta name="description" content="Flash Swap Demo" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          ></link>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <div className={styles.header}>
            <h1>Flash Swap</h1>
            <div className={styles.login}>
              <button onClick={() => login()} className={styles.loginButton}>
                {address !== null ? (
                  <p>{cutAddress(address)}</p>
                ) : (
                  <p>Connect</p>
                )}
              </button>
            </div>
          </div>

          <div className={styles.instructions}>
            <p>Flash Swap allows you to make flash swaps on Uniswap V3.</p>
            <p>How do I use Flash Swap?</p>
          </div>

          <div className={styles.pools}>
            <h2>Pools</h2>
            <div className={styles.table}>
              {loadingPoolData ? (
                <p>Loading Pool Data...</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Pool</th>
                      <th>Volume USD</th>
                      <th>TVL USD</th>
                      <th>TVL ETH</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    poolData.map((pool, idx) => (
                        <tr key={idx+1}>
                          <th>{idx+1}</th>
                          <th>temp</th>
                          <th>${pool.volumeUSD}</th>
                          <th>{pool.totalValueLockedETH} ETH</th>
                          <th>${pool.totalValueLockedUSD}</th>
                        </tr>
                    ))  
                  }
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className={styles.swap}>{/* <h2>Swap</h2> */}</div>

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
    </div>
  )
}

export default Home
