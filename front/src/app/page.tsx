"use client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import React from "react";
import Form from "../components/Form";
import createTicket from "../services/create-ticket";
import createOrganization from "@/services/create-organization";
import createUser from "@/services/create-user";
import createImage from "@/services/create-image";

const Home: React.FC = () => {
  const handleSubmit = async (formData: any) => {
    try {
      const orgResponse = await createOrganization(formData.requesterEmail);
      const userResponse = await createUser(
        formData.requesterEmail,
        formData.accountName
      );
      const tokenImage = await createImage(formData.printOfThePage);
      console.log(tokenImage);
      const ticketResponse = await createTicket(
        formData.requesterEmail,
        formData.subject,
        formData.detailing,
        formData.tags,
        tokenImage
      );

      console.log(ticketResponse);

      toast.success(
        `Ticket de id ${ticketResponse.ticket.id} criado com sucesso`,
        {
          autoClose: 25000,
          hideProgressBar: true,
          type: "info",
          position: "top-right",
        }
      );
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
