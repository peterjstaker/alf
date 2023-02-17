export const truncateAdress = (address : string) => {
    return address?.substring(0, 5) + '...' + address?.substring(address?.length -5)
}