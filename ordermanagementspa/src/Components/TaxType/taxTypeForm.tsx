import { Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import { addTaxType, updateTaxType } from "../Services/taxTypeServices";
import { TaxType } from "../../Models/TaxType";
import { AxiosResponse } from "axios";

interface TaxTypeFormProps {
  onClose: () => void;
  taxType: TaxType;
}

const TaxTypeForm = ({ taxType, onClose }: TaxTypeFormProps): JSX.Element => {
  const [editTaxType, setTaxType] = useState<TaxType>(taxType);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    let result: AxiosResponse<TaxType> | undefined = undefined;
    if (editTaxType) {
      if (editTaxType.id === 0) {
        // Crear.
        result = await addTaxType(editTaxType);
      } else {
        // Modificar.
        result = await updateTaxType(editTaxType);
      }

      if (result.status === 200) {
        setMsg("The operation is success.");
        onClose();
      } else {
        setMsg("The operation isn´t success, try again.");
      }
    }
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    if (editTaxType) {
      setTaxType({
        ...editTaxType,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div className="formFields">
          <div className="formFieldPanel">
            <TextField
              className="formField"
              label="Name"
              focused
              type="text"
              name="name"
              value={editTaxType?.name}
              onChange={(e: { target: { name: string; value: string } }) =>
                handleChange(e)
              }
              placeholder="Write the name of tax"
              style={{ width: 300 }}
            />
            <TextField
              className="formField"
              label="TaxPercentage"
              focused
              name="taxPercentage"
              value={editTaxType?.taxPercentage}
              onChange={(e) => handleChange(e)}
              placeholder="Write your tax percentage"
              style={{ width: 300 }}
            />
          </div>
          <div className="formButtonsPanel">
            <Button
              className="formButton"
              type="submit"
              variant="contained"
              color="primary"
            >
              Save
            </Button>
            <Button
              className="formButton"
              type="button"
              variant="contained"
              color="primary"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default TaxTypeForm;
