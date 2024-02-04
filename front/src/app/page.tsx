"use client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import React from "react";
import Form from "../components/Form";
import submitForm from "../services/create-ticket";
import createOrganization from "@/services/create-organization";
const cors = require("cors");

const Home: React.FC = () => {
  const handleSubmit = async (formData: any) => {
    console.log(formData);
    try {
      const response = await createOrganization(formData.accountName);
      toast.success("Formulário enviado com sucesso!", {
        autoClose: 25000,
        hideProgressBar: true,
        type: "info",
        position: "top-right",
      });
    } catch (error) {
      toast.error("Erro ao enviar o formulário. Por favor, tente novamente.", {
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <>
      <div>
        <h1>Next.js Formulário</h1>
        <Form onSubmit={handleSubmit} />
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
