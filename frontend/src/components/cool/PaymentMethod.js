const PaymentMethod = ({ value, onChange }) => (
  <div className="mb-4">
    <label className="block font-medium mb-1">Payment Method</label>
    <div className="space-x-4">
      <label>
        <input type="radio" value="credit_card" checked={value === "credit_card"} onChange={e => onChange(e.target.value)} />
        Credit Card
      </label>
      <label>
        <input type="radio" value="paypal" checked={value === "paypal"} onChange={e => onChange(e.target.value)} />
        PayPal
      </label>
    </div>
  </div>
);

export default PaymentMethod;
