"use client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import React from "react";
import Form from "../components/Form";
import submitForm from "../services/create-ticket";
import createOrganization from "@/services/create-organization";
import createUser from "@/services/create-user";

const Home: React.FC = () => {
  const handleSubmit = async (formData: any) => {
    try {
      createOrganization(formData.requesterEmail)
        .then((orgResponse) => {
          return createUser(formData.requesterEmail, formData.accountName);
        })
        .then((userResponse) => {
          return submitForm(
            formData.requesterEmail,
            formData.subject,
            formData.detailing
          );
        })
        .then((ticketResponse) => {
          toast.success(
            `Ticket de id ${ticketResponse.ticket.id} criado com sucesso`,
            {
              autoClose: 25000,
              hideProgressBar: true,
              type: "info",
              position: "top-right",
            }
          );
        })
        .catch((error) => {
          toast.error(
            "Erro ao enviar o formulário. Por favor, tente novamente.",
            {
              autoClose: 2000,
              hideProgressBar: true,
            }
          );
        });
    } catch (error) {
      toast.error("Erro ao enviar o formulário. Por favor, tente novamente.", {
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#030202",
        color: "white",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Abrir Ticket</h1>
      <Form onSubmit={handleSubmit} />

      <ToastContainer />
    </div>
  );
};

export default Home;
