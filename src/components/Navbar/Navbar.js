import React, { useEffect } from "react";
import { useAddress, useDisconnect, useMetamask, } from '@thirdweb-dev/react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { styled, alpha } from "@mui/material/styles";
import { AppBar, Box, Toolbar, IconButton, Typography, InputBase, MenuItem, Menu } from '@mui/material';
//import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import MoreIcon from "@mui/icons-material/MoreVert";

import firebase, { database } from '../../firebase/firebaseSetup';


const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25)
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto"
	}
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch"
		}
	}
}));

export default function Navbar() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const address = useAddress();
	const connectWithMetamask = useMetamask();
	const disconnectWallet = useDisconnect();
	const history = useHistory();
	const startLogout = useStoreActions(actions => actions.auth.startLogout);
	const startGetProducts = useStoreActions(actions => actions.products.startGetProducts);
	const setProducts = useStoreActions(actions => actions.products.setProducts);
	const startGetOrders = useStoreActions(actions => actions.orders.startGetOrders);
	const setOrders = useStoreActions(actions => actions.orders.setOrders);
	const setLogin = useStoreActions(actions => actions.auth.login);
	const setWalletAddress = useStoreActions(actions => actions.auth.setWalletAddress);
	const setLogout = useStoreActions(actions => actions.auth.logout);
	const authState = useStoreState(state => state.auth.user);

	const [
		mobileMoreAnchorEl,
		setMobileMoreAnchorEl
	] = React.useState(null);

	useEffect(() => {
		// Listen for firebase auth change event
		firebase.auth().onAuthStateChanged(async (user) => {
			if (user) {
				// store user in store
				const userData = await database.collection('users').doc(user.uid).get();
				if (userData.exists) {
					setLogin({
						uid: user.uid,
						name: user.displayName,
						email: user.email,
						profilePhoto: user.photoURL,
						walletAddress: userData.data().walletAddress,
						type: userData.data().type,
						companyName: userData.data().companyName,
						nftCollectionAddress: userData.data().nftCollectionAddress,
					});
				} else {
					const newUserData = {
						uid: user.uid,
						name: user.displayName,
						email: user.email,
						profilePhoto: user.photoURL,
						walletAddress: null,
						type: "user",
						companyName: null,
						nftCollectionAddress: null,
					};
					await database.collection('users').doc(user.uid).set(newUserData);
					setLogin(newUserData);
				}
				// get products
				startGetProducts().then(snapshot => {
					setProducts(snapshot.docs.map(doc => doc.data()));
				});
				// get orders
				startGetOrders(user.uid).then(snapshot => {
					setOrders(snapshot.docs.map(doc => doc.data()));
				});
				history.push('/');
			}
			else {
				disconnectWallet();
				setLogout();
				history.push('/login');
			}
		})

		return () => {
		};
	}, []);

	useEffect(() => {
		if (address && authState.uid) {
			// set wallet address in store
			console.log('setting wallet address in store');
			database.collection('users').doc(authState.uid).update({
				walletAddress: address
			});
			setWalletAddress(address);
		}
	}, [address]);

	const logoutUser = () => {
		startLogout();
	}

	const isMenuOpen = anchorEl ? true : false;
	const isMobileMenuOpen = mobileMoreAnchorEl ? true : false;

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right"
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right"
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose} component={Link} to="/profile">My Profile</MenuItem>
			<MenuItem onClick={handleMenuClose} component={Link} to="/orders">Orders</MenuItem>
			<MenuItem onClick={() => {
				logoutUser();
				handleMenuClose();
			}}>Logout</MenuItem>
		</Menu>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right"
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right"
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton
					size="large"
					aria-label="show 17 new notifications"
					color="inherit"
				>
					<ShoppingCartIcon />
				</IconButton>
				<p>Shopping Cart</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					size="large"
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="open drawer"
						sx={{ mr: 2 }}
					></IconButton>
					<Typography
						component={Link}
						to="/"
						variant="h6"
						noWrap
						sx={{ display: { xs: "none", sm: "block" } }}
						style={{ textDecoration: "none", color: "white" }}
					>
						Flipkart
					</Typography>
					{authState.uid && (
						<>
							<Search>
								<SearchIconWrapper>
									<SearchIcon />
								</SearchIconWrapper>
								<StyledInputBase
									placeholder="Search…"
									inputProps={{ "aria-label": "search" }}
								/>
							</Search>
							<Box sx={{ flexGrow: 1 }} />
							<Box sx={{ display: { xs: "none", md: "flex" } }}>
								<IconButton
									size="large"
									edge="end"
									aria-label="account of current user"
									aria-controls={menuId}
									aria-haspopup="true"
									onClick={handleProfileMenuOpen}
									color="inherit"
								>
									<AccountCircle />
								</IconButton>
								{
									authState.type != "seller" ? (
										<Button component={Link} to="/seller-register" variant="inherit">Become a Seller</Button>
									) : (
										<Button component={Link} to="/create-product" variant="inherit">List a Product</Button>
									)
								}
								{address ?
									(<Button variant="contained" color="error" onClick={disconnectWallet}>Disconnect Wallet</Button>) :
									(<Button variant="contained" color="info" onClick={connectWithMetamask}>Connect Wallet</Button>)}

							</Box>
							<Box sx={{ display: { xs: "flex", md: "none" } }}>
								<IconButton
									size="large"
									aria-label="show more"
									aria-controls={mobileMenuId}
									aria-haspopup="true"
									onClick={handleMobileMenuOpen}
									color="inherit"
								>
									<MoreIcon />
								</IconButton>
							</Box>
						</>
					)}
				</Toolbar>
			</AppBar>
			{authState.uid && renderMobileMenu}
			{authState.uid && renderMenu}
		</Box>
	);
}
