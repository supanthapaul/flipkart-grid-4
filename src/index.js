import React from "react";
import ReactDOM from 'react-dom';
import App from "./App";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { StoreProvider } from 'easy-peasy';
import store from './store/configureStore';
import './index.css';

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mumbai;

const container = document.getElementById("root");
ReactDOM.render(
  <StoreProvider store={store}>
    <ThirdwebProvider desiredChainId={activeChainId}>
      <App />
    </ThirdwebProvider>
  </StoreProvider>
	, document.getElementById('root')
);

