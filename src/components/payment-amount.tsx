export function PaymentAmount ({ amount, currency, percentage }:
  { amount: number, currency: string, percentage: number }) {
  return (
    <div className="flex gap-2">
      <strong>{amount.toFixed(1)} {currency}</strong>
      <span>{percentage.toFixed()} %</span>
    </div>
  )
}
