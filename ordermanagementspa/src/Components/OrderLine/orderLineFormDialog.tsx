import { OrderLine } from "../../Models/OrderLine";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import OrderLineForm from "./orderLineForm";

interface OrderLineFormProps {
  open: boolean;
  onClose: () => void;
  orderLine: OrderLine;
}
const OrderLineFormDialog = ({
  orderLine,
  open,
  onClose,
}: OrderLineFormProps): JSX.Element => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={"lg"}>
      <DialogTitle>Order Line Form</DialogTitle>
      <DialogContent>
        <OrderLineForm
          orderLine={orderLine}
          onClose={handleClose}
        ></OrderLineForm>
      </DialogContent>
    </Dialog>
  );
};

export default OrderLineFormDialog;
