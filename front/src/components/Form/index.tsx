"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { File } from "buffer";
import { ToastContainer, toast } from "react-toastify";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextareaAutosize,
} from "@mui/material";

import {
  CustomForm,
  buttonStyles,
  focusStyles,
  textStyles,
  textStylesAutosize,
} from "./styles";

interface FormData {
  accountName: string;
  requesterEmail: string;
  subject: string;
  detailing: string;
  orderNumber?: string;
  affectingAllUsers?: boolean;
  transactionNumber?: string;
  transactionStatus?: string;
  paymentAcquirer?: string;
  skuId?: string;
  printOfThePage?: any;
  tags: string[];
}
interface FormProps {
  onSubmit: (data: FormData) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [module, setModule] = React.useState("");
  const [formData, setFormData] = useState<FormData>({
    accountName: "",
    requesterEmail: "",
    subject: "",
    detailing: "",
    orderNumber: "",
    affectingAllUsers: true,
    transactionNumber: "",
    transactionStatus: "",
    paymentAcquirer: "",
    skuId: "",
    printOfThePage: null,
    tags: [""],
  });

  const handleChange = (event: SelectChangeEvent) => {
    setModule(event.target.value as string);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: FormData = {
      accountName: e.currentTarget.accountName.value,
      requesterEmail: e.currentTarget.requesterEmail.value,
      subject: e.currentTarget.subject.value,
      detailing: e.currentTarget.detailing.value,
      orderNumber: e.currentTarget.orderNumber?.value || "",
      affectingAllUsers: formData.affectingAllUsers,
      transactionNumber: e.currentTarget.transactionNumber?.value || "",
      transactionStatus: e.currentTarget.transactionStatus?.value || "",
      paymentAcquirer: e.currentTarget.paymentAcquirer?.value || "",
      skuId: e.currentTarget.skuId?.value || "",
      printOfThePage: e.currentTarget.printOfThePage?.files?.length
        ? e.currentTarget.printOfThePage?.files[0]
        : null,
      tags: [""],
    };

    switch (module) {
      case "Orders":
        if (
          !data.orderNumber ||
          !data.accountName ||
          !data.requesterEmail ||
          !data.subject ||
          !data.detailing
        ) {
          toast.error("Preencha todos os campos para Orders", {
            autoClose: 2000,
            hideProgressBar: true,
          });
          return;
        } else {
          data.subject = `Module: ${data.subject}, order number:${data.orderNumber}, Affectionf all users: ${data.affectingAllUsers}`;
          data.tags = ["Orders", `AffectingAllUsers:${data.affectingAllUsers}`];
        }
        break;
      case "Payments":
        if (
          !data.transactionNumber ||
          !data.transactionStatus ||
          !data.paymentAcquirer ||
          !data.accountName ||
          !data.requesterEmail ||
          !data.subject ||
          !data.detailing
        ) {
          toast.error("Preencha todos os campos obrigatórios para Payments", {
            autoClose: 2000,
            hideProgressBar: true,
          });
          return;
        } else {
          data.subject = `Module: ${data.subject}, transaction number:${data.transactionNumber}, transaction status:${data.transactionNumber}, payment acquirer:${data.paymentAcquirer}`;
          data.tags = [
            "Payments",
            `paymentAcquirer:${data.paymentAcquirer}`,
            `transactionStatus:${data.transactionStatus}`,
          ];
        }
        break;
      case "Catalog":
        if (
          !data.skuId ||
          !data.printOfThePage ||
          !data.accountName ||
          !data.requesterEmail ||
          !data.subject ||
          !data.detailing
        ) {
          toast.error("Preencha todos os campos obrigatórios para Catalog", {
            autoClose: 2000,
            hideProgressBar: true,
          });
          return;
        } else {
          data.subject = `Module: ${data.subject}, skuId:${data.skuId}`;
          data.tags = ["Catalog"];
        }
        break;
      case "Others":
        if (
          !data.detailing ||
          !data.accountName ||
          !data.requesterEmail ||
          !data.subject
        ) {
          toast.error("Preencha o campo obrigatório para Others", {
            autoClose: 2000,
            hideProgressBar: true,
          });
          return;
        }
        break;
    }
    onSubmit(data);
  };

  return (
    <CustomForm
      onSubmit={handleSubmit}
      style={{
        alignItems: "center",
      }}
    >
      <TextField
        label="Account Name"
        variant="outlined"
        name="accountName"
        InputLabelProps={{ style: textStyles }}
        inputProps={{ style: textStyles }}
        InputProps={{ style: focusStyles }}
      />
      <TextField
        label="Requester Email"
        variant="outlined"
        type="email"
        name="requesterEmail"
        InputLabelProps={{ style: textStyles }}
        inputProps={{ style: textStyles }}
        InputProps={{ style: focusStyles }}
      />

      <FormControl fullWidth>
        <InputLabel sx={{ color: "white" }} id="demo-simple-select-label">
          Subject
        </InputLabel>
        <Select
          style={{ ...textStyles }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="subject"
          value={module}
          label="Subject"
          placeholder="Subject"
          onChange={handleChange}
        >
          <MenuItem value={"Orders"}>Orders</MenuItem>
          <MenuItem value={"Payments"}>Payments</MenuItem>
          <MenuItem value={"Catalog"}>Catalog</MenuItem>
          <MenuItem value={"Others"}>Others</MenuItem>
        </Select>
      </FormControl>

      {module === "Orders" && (
        <>
          <br />
          <TextField
            label="Order number"
            variant="outlined"
            name="orderNumber"
            InputLabelProps={{ style: textStyles }}
            inputProps={{ style: textStyles }}
            InputProps={{ style: focusStyles }}
          />
          <FormControl
            sx={{
              borderRadius: "8px",
              minWidth: "25vw",
              alignItems: "center",
              background: "#F72068",
            }}
          >
            <FormLabel
              sx={{
                color: "white",
                background: "#F72068",
              }}
              id="radio-buttons-group-label"
            >
              Affecting all users?
            </FormLabel>
            <RadioGroup
              aria-labelledby="radio-buttons-group-label"
              name="affectingAllUsers"
              value={formData.affectingAllUsers ? "yes" : "no"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  affectingAllUsers: e.target.value === "yes",
                })
              }
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <TextareaAutosize
            placeholder="Detailing"
            name="detailing"
            style={{
              ...textStylesAutosize,
            }}
          />
        </>
      )}
      {module === "Payments" && (
        <>
          <br />
          <TextField
            label="Transaction number"
            variant="outlined"
            name="transactionNumber"
            InputLabelProps={{ style: textStyles }}
            inputProps={{ style: textStyles }}
            InputProps={{ style: focusStyles }}
          />
          <TextField
            label="Transaction status"
            variant="outlined"
            name="transactionStatus"
            InputLabelProps={{ style: textStyles }}
            inputProps={{ style: textStyles }}
            InputProps={{ style: focusStyles }}
          />
          <TextField
            label="Payment Acquirer"
            name="paymentAcquirer"
            variant="outlined"
            InputLabelProps={{ style: textStyles }}
            inputProps={{ style: textStyles }}
            InputProps={{ style: focusStyles }}
          />
          <TextareaAutosize
            placeholder="Detailing"
            name="detailing"
            style={{
              ...textStylesAutosize,
            }}
          />
        </>
      )}
      {module === "Catalog" && (
        <>
          <br />
          <TextField
            label="Skuid"
            name="skuId"
            variant="outlined"
            InputLabelProps={{ style: textStyles }}
            inputProps={{ style: textStyles }}
            InputProps={{ style: focusStyles }}
          />
          <div
            style={{
              background: "#F72068",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "space-evenly",
              borderRadius: "8px",
              height: "5vw",
              width: "25vw",
            }}
          >
            Print of the page
            <input
              type="file"
              name="printOfThePage"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setFormData({
                  ...formData,
                  printOfThePage: file || null,
                });
              }}
            />
          </div>
          <TextareaAutosize
            placeholder="Detailing"
            name="detailing"
            style={{
              ...textStylesAutosize,
            }}
          />
        </>
      )}
      {module === "Others" && (
        <>
          <br />
          <TextareaAutosize
            placeholder="Detailing"
            name="detailing"
            style={{
              ...textStylesAutosize,
            }}
          />
        </>
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
