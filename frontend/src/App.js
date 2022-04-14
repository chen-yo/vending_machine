/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";

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
          margin: 0 auto;
          background-color: #fefcee;
          height: 100vh;
          border-radius: 8px;
          box-shadow: 0 0 10px 0px rgb(0 0 0 / 70%);
        `}

        
      >

        
      </div>
    </div>
  );
}

export default App;
