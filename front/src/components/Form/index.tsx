"use client";
import React, { useState } from "react";

interface FormData {
  accountName: string;
  requesterEmail: string;
  subject: string;
  detailing: string;
}

interface FormProps {
  onSubmit: (data: FormData) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    accountName: "",
    requesterEmail: "",
    subject: "",
    detailing: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Account Name:
        <input
          type="text"
          name="accountName"
          value={formData.accountName}
          onChange={handleChange}
        />
      </label>
      <label>
        Requester Email:
        <input
          type="email"
          name="requesterEmail"
          value={formData.requesterEmail}
          onChange={handleChange}
        />
      </label>
      <label>
        Subject:
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
        />
      </label>
      <label>
        Detailing:
        <textarea
          name="detailing"
          value={formData.detailing}
          onChange={handleChange}
        ></textarea>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
