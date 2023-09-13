import { Button, Container, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddTaxType, UpdateTaxType } from "../Services/taxTypeServices";
import { TaxType } from "../../Models/TaxType";
import { AxiosResponse } from "axios";

const TaxTypeForm = (initTaxType?: TaxType): JSX.Element => {
  const [taxType, setTaxType] = useState<TaxType>(
    initTaxType ?? { id: 0, name: "", taxPercentage: 0 }
  );
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    let result: AxiosResponse<TaxType> | undefined = undefined;
    if (taxType.id === 0) {
      // Crear.
      result = await AddTaxType(taxType);
    } else {
      // Modificar.
      result = await UpdateTaxType(taxType);
    }

    if (result.status === 200) {
      setMsg("The operation is success.");
    } else {
      setMsg("The operation isn´t success, try again.");
    }
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setTaxType({
      ...taxType,
      [e.target.name]: e.target.value,
    });
    console.log(taxType);
  };
  const navigate = useNavigate();
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <br />
        <br />
        <TextField
          label="Name"
          focused
          type="name"
          name="Name"
          onChange={(e: { target: { name: string; value: string } }) =>
            handleChange(e)
          }
          placeholder="Write the name of tax"
          style={{ width: 300 }}
        />
        <br />
        <br />
        <TextField
          label="TaxPercentage"
          focused
          type="taxPercentage"
          name="TaxPercentage"
          onChange={(e) => handleChange(e)}
          placeholder="Write your tax percentage"
          style={{ width: 300 }}
        />
        <br />
        <br />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
    </Container>
  );
};

export default TaxTypeForm;
