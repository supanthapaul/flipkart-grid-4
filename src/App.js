import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react';
import Navbar from './components/Navbar/Navbar';
import Seller from "./components/Seller/Seller";
import ReactDOM  from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from './components/Test';

function App() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  return (
		<>
		
			<BrowserRouter>
				<Navbar />
				<Test />
				<Routes>
				<Route path='/Seller' element={<Seller />} />
				
				</Routes>
			</BrowserRouter>
				
				{address ? (
					<>
						<button onClick={disconnectWallet}>Disconnect Wallet</button>
						<p>Your address: {address}</p>
					</>
				) : (
					<button onClick={connectWithMetamask}>Connect with Metamask</button>
				)}
		</>
    
  );
}

export default App;
