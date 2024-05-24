export function PaymentAmount ({ amount, currency, percentage }:
  { amount: number, currency: string, percentage: number }) {
  return (
    <div className="flex gap-2">
      <strong>{amount} {currency}</strong>
      <span>{percentage} %</span>
    </div>
  )
}
