import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { cartTotal, purchase, reset } from "../../redux/appSlice";

export function PurchaseButton() {
  const dispatch = useDispatch();
  const total = useSelector((state) => cartTotal(state));
  const funds = useSelector((state) => state.funds);

  return (
    <Button
      disabled={total === 0 || total > funds}
      variant="outlined"
      onClick={() => {
        dispatch(purchase())
          .unwrap()
          .then((leftFunds) => alert("Thanks for purchasing"));
      }}
    >
      Purchase
    </Button>
  );
}
