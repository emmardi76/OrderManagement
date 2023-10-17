import { Order } from "../../Models/Order";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import OrderForm from "./orderForm";

interface OrderFprmsProps {
  open: boolean;
  onClose: () => void;
  order: Order;
}

const OrderFormDialog = ({
  order,
  open,
  onClose,
}: OrderFprmsProps): JSX.Element => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={"lg"}>
      <DialogTitle>Order Form</DialogTitle>
      <DialogContent>
        <OrderForm order={order} onClose={handleClose}></OrderForm>
      </DialogContent>
    </Dialog>
  );
};

export default OrderFormDialog;
