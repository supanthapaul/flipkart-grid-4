import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react';
import Navbar from './components/Navbar/Navbar';
import Seller from "./components/Seller/Seller";
import Login from './components/Login/Login';
import { BrowserRouter, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Test from './components/Test';
import CreateProduct from './components/CreateProduct/CreateProduct';
import ProductPage from './components/Products/ProductPage';
import Profile from './components/Profile/Profile';

function App() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  return (
		<>
		
			<BrowserRouter>
				<Navbar />
				
				<PrivateRoute exact path='/' component={Test} />
				<PrivateRoute exact path='/profile' component={Profile} />
				<PrivateRoute exact path='/seller-register' component={Seller} />
				<PrivateRoute exact path='/create-product' component={CreateProduct} />
				<PrivateRoute exact path='/product/:id' component={ProductPage} />
				<Route exact path='/login' component={Login} />
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
