import { NumericFormat } from 'react-number-format';

export function InputCurrency() {
  return (
    <NumericFormat
      thousandSeparator="."
      decimalSeparator=","
      className="w-full border border-gray-900"
    />
  )
}
