import {
  Card,
  CardContent,
  CardHeader,
  ImageList,
  ImageListItem,
  Paper,
  Stack,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchDrinks } from "../../redux/appSlice";

const isEmpty = (obj) => Object.keys(obj).length === 0;

export default function Drinks() {
  const dispatch = useDispatch();
  const drinks = useSelector((state) => state.drinks);

  useEffect(() => {
    dispatch(fetchDrinks());
  }, []);

  if (isEmpty(drinks)) {
    return "Loading drinks...";
  }

  return (
    <Stack spacing={2} direction={"row"} flexWrap>
      {Object.values(drinks).map(({ id, name, cost }) => (
        <Card variant="outlined" key={name} sx={{ cursor: "pointer" }} onClick={() => dispatch(addToCart(id))}>
          <CardHeader title={name} />

          <CardContent>{cost}</CardContent>
        </Card>
      ))}
    </Stack>
  );
}
