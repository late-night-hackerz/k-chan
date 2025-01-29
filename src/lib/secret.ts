export const storePriv = (priv: string) => {
  localStorage.setItem('priv', priv)
}

export const getPriv = () => {
  return localStorage.getItem('priv')
}