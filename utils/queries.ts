const poolQuery = `
    query {
        pools(first: 50, orderBy: totalValueLockedUSD, orderDirection: desc) {
            id, 
            token0 {
                id, 
                symbol, 
                name
            },
            token1 {
                id, 
                symbol, 
                name
            },
            volumeUSD, 
            totalValueLockedToken0, 
            totalValueLockedToken1, 
            totalValueLockedETH, 
            totalValueLockedUSD,
            poolHourData, 
            poolDayData
        }
    }
`

export { poolQuery }
