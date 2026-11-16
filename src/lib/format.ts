const priceFormatter = new Intl.NumberFormat('th-TH', {
  style: 'currency',
  currency: 'THB',
})

export function formatPrice(amount: number) {
  return priceFormatter.format(amount)
}
