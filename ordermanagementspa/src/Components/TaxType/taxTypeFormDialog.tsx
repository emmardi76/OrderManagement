import {
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { TaxType } from "../../Models/TaxType";
import TaxTypeForm from "./taxTypeForm";

interface TaxTypeFormProps {
  open: boolean;
  onClose: () => void;
  taxType: TaxType;
}

const TaxTypeFormDialog = ({
  taxType,
  open,
  onClose,
}: TaxTypeFormProps): JSX.Element => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={"lg"}>
      <DialogTitle>Tax Type Form</DialogTitle>
      <DialogContent>
        <TaxTypeForm taxType={taxType} onClose={handleClose}></TaxTypeForm>
      </DialogContent>
    </Dialog>
  );
};

export default TaxTypeFormDialog;
