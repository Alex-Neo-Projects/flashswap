import { ethers } from 'ethers'
import Onboard from 'bnc-onboard'
import { useState, useMemo, useCallback, useEffect } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import { API, Ens, Wallet } from 'bnc-onboard/dist/src/interfaces'
import { showToast } from '../utils/showToast'

export const useWallet = () => {
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [address, setAddress] = useState<String | null>(null)
  const [provider, setProvider] = useState<Web3Provider | null>(null)
  const [onboard, setOnboard] = useState<API | null>(null)

  useEffect(() => {
    const initOnboard = () => {
      return Onboard({
        dappId: process.env.BLOCKNATIVE_KEY,
        networkId: 4,
        hideBranding: true,
        blockPollingInterval: 5000,
        walletSelect: {
          heading: 'Connect to Flash Swap',
          description: 'Select a wallet',
          wallets: [
            {
              walletName: 'metamask',
            },
          ],
        },
        subscriptions: {
          wallet: async (wallet) => {
            if (wallet.provider) {
              const provider = new ethers.providers.Web3Provider(
                wallet.provider
              )
              setProvider(provider)
              setWallet(wallet)
              window.localStorage.setItem(
                'selectedWallet',
                wallet.name !== null ? wallet.name : ''
              )
            } else {
              setProvider(null)
            }
          },
          address: async (address) => {
            if (address !== null) {
              setAddress(address)
            } else {
              setAddress(null)
            }
          },
        },
        walletCheck: [{ checkName: 'accounts' }, { checkName: 'connect' }],
      })
    }

    setOnboard(initOnboard)
  }, [])

  useEffect(() => {
    const localStorageWallet = window.localStorage.getItem('selectedWallet')

    if (localStorageWallet && onboard) {
      onboard.walletSelect(localStorageWallet)
    }
  }, [onboard])

  const login = async () => {
    await onboard?.walletSelect()

    try {
      await onboard?.walletCheck()
      showToast('Connected to Flash Swap!')
    } catch (error) {
      showToast('Error connecting to wallet. Try Again!')
    }
  }

  return {
    wallet,
    provider,
    address,
    login,
  }
}
