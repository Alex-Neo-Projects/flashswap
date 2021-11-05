import { createClient } from '@urql/core'
import { useMemo, useCallback } from 'react'

export const usePools = () => {
  const client = useMemo(() => {
    return createClient({
      url: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-subgraph',
      requestPolicy: 'cache-first',
    })
  }, [])

  const queryPools = useCallback(async (query: string) => {
    const pools = await client
      .query(query)
      .toPromise()
      .then(async (res) => {
        console.log(res.data)
      })

    return pools
  }, [])

  return {
    queryPools,
  }
}
