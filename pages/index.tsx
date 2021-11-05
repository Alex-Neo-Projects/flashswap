import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import styles from '../styles/Home.module.css'

import { ShowToast } from '../components/toast'

import { useWallet } from '../hooks/useWallet'
import { usePools } from '../hooks/usePools'

import { roundNumber } from '../utils/roundNumber'
import { cutAddress } from '../utils/cutAddress'
import { showToast } from '../utils/showToast'
import { poolQuery } from '../utils/queries'

const Home: NextPage = () => {
  const { login, address } = useWallet()
  const { queryPools } = usePools()

  const [poolData, setPoolData] = useState<Array<any>>([])
  const [loadingPoolData, setLoadingPoolData] = useState<Boolean>(false)
  const [selectPools, setSelectPools] = useState<Array<any>>([])

  useEffect(() => {
    const getPools = async () => {
      setLoadingPoolData(true)
      const poolData = await queryPools(poolQuery)
      setPoolData(poolData.pools)
      setLoadingPoolData(false)
    }

    getPools()
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
            <h2>Select Pools</h2>
            <div className={styles.tableSection}>
              {loadingPoolData ? (
                <p>Loading Pool Data...</p>
              ) : (
                <table className={styles.table}>
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
                    {poolData.map((pool, idx) => {
                      return (
                        <tr
                          onClick={() => {
                            setSelectPools((selectedPools) => [
                              ...selectedPools,
                              pool,
                            ])
                          }}
                          key={idx}
                        >
                          <td>{idx + 1}</td>
                          <td>
                            {pool.token0.symbol + '/' + pool.token1.symbol}
                          </td>
                          <td>$ {roundNumber(pool.volumeUSD)}</td>
                          <td>{roundNumber(pool.totalValueLockedETH)} ETH</td>
                          <td>${roundNumber(pool.totalValueLockedUSD)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className={styles.swap}>
            <h2>Swap</h2>
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
    </div>
  )
}

export default Home
