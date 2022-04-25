import { Card, CardContent, CardHeader, Stack } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, cartTotal, fetchDrinks } from "../redux/appSlice";

const isEmpty = (obj) => Object.keys(obj).length === 0;

export default function Drinks() {
  const dispatch = useDispatch();
  const drinks = useSelector((state) => state.drinks);

  const currentTotal = useSelector((state) => cartTotal(state));
  const funds = useSelector((state) => state.funds);

  useEffect(() => {
    dispatch(fetchDrinks());
  }, [dispatch]);

  if (isEmpty(drinks)) {
    return "Loading drinks...";
  }

  const handleCardClick = (id) => {
    const newTotal = currentTotal + drinks[id].cost;
    const insufficiantFunds = newTotal > funds;
    if (insufficiantFunds) {
      alert("You cannot purchase more drinks, please add more funds");
    } else {
      dispatch(addToCart(id));
    }
  };

  return (
    <Stack spacing={2} direction={"row"} flexWrap>
      {Object.values(drinks).map(({ id, name, cost }) => (
        <Card
          variant="outlined"
          key={name}
          sx={{
            cursor: "pointer",
            "&:hover": {
              border: "1px solid blue",
            },
          }}
          onClick={() => handleCardClick(id)}
        >
          <CardHeader title={name} />

          <CardContent>{`${cost} ₪`}</CardContent>
        </Card>
      ))}
    </Stack>
  );
}
