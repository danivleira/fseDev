"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { useForm } from "react-hook-form";
import { TextareaAutosize } from "@mui/material";

interface FormData {
  accountName: string;
  requesterEmail: string;
  subject: string;
  detailing: string;
}
interface FormProps {
  onSubmit: (data: FormData) => void;
}

const textStyles = {
  color: "white",
  backgroundColor: "#F72068",
  borderRadius: "25px",
  width: "25vw",
};

const buttonStyles = {
  color: "white",
  backgroundColor: "#F72068",
  borderRadius: "25px",
  width: "20vw",
};

const focusStyles = {
  borderRadius: "25px",
  borderColor: "blue",
};

const CustomForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "25px",
});

const schema = yup.object().shape({
  accountName: yup
    .string()
    .required("Account name é obrigatorio")
    .min(5, "Mínimo de 5 letras")
    .matches(
      /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
      "O account name deve conter apenas letras"
    ),

  requesterEmail: yup
    .string()
    .required("Requester email é obrigatorio")
    .email("email não é valido"),

  subject: yup.string().required("Subject é obrigatorio"),

  detailing: yup.string().required("Ofereça detalhes sobre seu ticket"),
});

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema), // Aqui está o uso do yupResolver com o esquema yup
  });

  const [formData, setFormData] = useState<FormData>({
    accountName: "",
    requesterEmail: "",
    subject: "",
    detailing: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    accountName: false,
    requesterEmail: false,
    subject: false,
    detailing: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // Não é necessário mais setFormData, o register do useForm faz isso automaticamente
  };

  const onSubmitHandler = (data: FormData) => {
    onSubmit(data);
  };
  return (
    <CustomForm
      onSubmit={handleSubmit(onSubmitHandler)}
      style={{
        alignItems: "center",
      }}
    >
      <TextField
        label="Account Name"
        variant="outlined"
        {...register("accountName")}
        InputLabelProps={{ style: textStyles }}
        inputProps={{ style: textStyles }}
        InputProps={{ style: focusStyles }}
        error={!!errors.accountName}
        helperText={errors.accountName?.message}
      />
      <TextField
        label="Requester Email"
        variant="outlined"
        type="email"
        {...register("requesterEmail")}
        InputLabelProps={{ style: textStyles }}
        inputProps={{ style: textStyles }}
        InputProps={{ style: focusStyles }}
        error={!!errors.requesterEmail}
        helperText={errors.requesterEmail?.message}
      />
      <TextField
        label="Subject"
        variant="outlined"
        {...register("subject")}
        InputLabelProps={{ style: textStyles }}
        inputProps={{ style: textStyles }}
        InputProps={{ style: focusStyles }}
        error={!!errors.subject}
        helperText={errors.subject?.message}
      />

      <TextareaAutosize
        placeholder="Detailing"
        style={{
          ...textStyles,
          backgroundColor: "#F72068",
          color: "white",
          padding: "8px",
          fontSize: "16px",
          width: "25vw",
          minHeight: "100px",
          borderColor: errors.detailing ? "red" : "",
        }}
        {...register("detailing")}
      />

      {errors.detailing && (
        <div style={{ color: "red", marginTop: "8px", fontSize: "14px" }}>
          {errors.detailing.message}
        </div>
      )}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        style={buttonStyles}
      >
        Submit
      </Button>
    </CustomForm>
  );
};

export default Form;
