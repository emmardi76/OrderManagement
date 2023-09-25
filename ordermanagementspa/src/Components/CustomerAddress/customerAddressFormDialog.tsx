import { CustomerAddress } from "../../Models/CustomerAddress";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import CustomerAddressForm from "./customerAddressForm";

interface CustomerAddressFormProps {
  open: boolean;
  onClose: () => void;
  customerAddress: CustomerAddress;
}

const CustomerAddressFormDialog = ({
  customerAddress,
  open,
  onClose,
}: CustomerAddressFormProps): JSX.Element => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Customer Address Form</DialogTitle>
      <DialogContent>
        <CustomerAddressForm
          customerAddress={customerAddress}
          onClose={handleClose}
        ></CustomerAddressForm>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerAddressFormDialog;
