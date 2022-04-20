/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Stack } from "@mui/material";
import Cart from "./components/Cart";
import Drinks from "./components/Drinks";
import AddFunds from "./components/Funds";
import { PurchaseButton } from "./components/PurchaseButton";

function App() {
  return (
    <div>
      <header
        css={css`
          text-align: center;
          background-color: pink;
          padding: 10px;
          margin-bottom: 8px;
        `}
      >
        <h1>Vending Machine</h1>
      </header>
      <div
        css={css`
          width: 800px;
          padding: 20px;
          margin: 0 auto;
          min-height: 50vh;
          background-color: #fefcee;
          border-radius: 8px;
          box-shadow: 0 0 10px 0px rgb(0 0 0 / 70%);
        `}
      >
        <Stack rowGap={2}>
          <AddFunds />
          <Drinks />
          <Cart />
          <PurchaseButton />
        </Stack>
      </div>
    </div>
  );
}

export default App;
