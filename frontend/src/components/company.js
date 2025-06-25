// PurchaseForm.jsx
import React, { useState } from "react";
import InputField from './cool/InputField'
import SelectField from './cool/SelectField'
import QuantityField from './cool/QuantityField'
import PaymentMethod from './cool/PaymentMethod'
import SubmitButton from './cool/SubmitButton'
import "./PurchaseForm.css";


const PurchaseForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    product: "",
    quantity: 1,
    payment: "credit_card",
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("purchase successfully")
    console.log("Form Submitted", formData);
    // You can connect to API here
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Purchase Form</h2>
      <InputField label="Full Name" value={formData.fullName} onChange={val => handleChange("fullName", val)} />
      <InputField label="Email" type="email" value={formData.email} onChange={val => handleChange("email", val)} />
      <SelectField value={formData.product} onChange={val => handleChange("product", val)} />
      <QuantityField value={formData.quantity} onChange={val => handleChange("quantity", val)} />
      <PaymentMethod value={formData.payment} onChange={val => handleChange("payment", val)} />
      <SubmitButton />
    </form>
  );
};

export default PurchaseForm;








