export const cutAddress = (address: String) => {
  return (
    address?.substring(0, 6) +
    '...' +
    address?.substring(address.length - 4, address.length)
  )
};
