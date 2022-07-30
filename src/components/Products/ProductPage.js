import React, { useEffect, useState } from 'react'
import { useContract, useMintNFT, useAddress, useSDK } from '@thirdweb-dev/react'
import { useParams, useHistory } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Button, Typography, CircularProgress } from '@mui/material';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';


// productId: '',
// productName: '',
// productDescription: '',
// productImage: '',
// productSellerId: '',
// productPrice: 0,
// productCategory: 'mobile',
// productWarrantyPeriod: 0,
// nftCollectionAddress: '',
const ProductPage = () => {
	const { id } = useParams();
	const address = useAddress();
	const history = useHistory();
	const sdk = useSDK();
	const [seller, setSeller] = useState(null);
	const [isLoading, setisLoading] = useState(false);
	const [buyState, setBuyState] = useState("");

	const product = useStoreState(state => state.products.items.find(product => product.productId === id));
	const startGetSeller = useStoreActions(state => state.products.startGetSeller);
	const startAddOrder = useStoreActions(state => state.orders.startAddOrder);
	const addOrderToState = useStoreActions(state => state.orders.addOrder);
	const authState = useStoreState(state => state.auth.user);
	const { contract } = useContract(product?.nftCollectionAddress);
	const {
		mutateAsync: mintNft,
		isLoading: isMintingNft,
		error,
	} = useMintNFT(contract?.nft);

	useEffect(() => {
		if (product && !seller) {
			startGetSeller(product.productSellerId).then(seller => {
				setSeller(seller.data());
				console.log(seller.data());
			});
		}
	}, [product]);

	const onProductBuy = async () => {
		if (!product || !seller) return;
		const order = {
			uid: authState.uid,
			orderId: uuid(),
			productId: product.productId,
			sellerId: seller.uid,
			nftCollectionAddress: product.nftCollectionAddress,
			tokenId: 0
		}
		setisLoading(true);
		setBuyState("Transferring funds to seller...");
		const result = await sdk.wallet.transfer(seller.walletAddress, product.productPrice);
		console.log(result.receipt.transactionHash);
		setBuyState("Minting your warranty NFT...");
		const mint = await mintNft({
			metadata: {
				name: product?.productName,
				description: product?.productDescription,
				image: product?.productImage,
				properties: {
					expiry: dayjs().add(product?.productWarrantyPeriod, 'year').toISOString(),
					productId: product?.productId,
					orderId: order.orderId,
				}
			},
			to: address,
		});
		setBuyState("Finalizing Your Order...");
		order.tokenId = mint.id.toString();
		console.log(order);
		// add order to firebase
		await startAddOrder(order);
		// add order to state
		addOrderToState(order);
		setisLoading(false);
		// redirect to orders page
		history.push('/orders');
		setBuyState("");
	}
	return (
		<>
			{address ? (
				<>
					<Container maxWidth="lg">
						<Grid container component="main">
							<Grid item
								xs={4}
								sm={4}
								md={5}
								sx={{

									backgroundRepeat: 'no-repeat',
									backgroundSize: 'cover',
									backgroundPosition: 'center',
								}}
								style={{
									color: 'white',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',

								}}
							>
								<Box
									component="img"
									sx={{
										height: 350,
										width: "auto",

									}}
									alt="Shopping cart"
									src={product?.productImage}
								/>
								<Box>
									<Button disabled={isLoading} variant="contained" size='large' onClick={onProductBuy}>
										{isLoading ? (
											<>
												<CircularProgress size={20} />
												{buyState}
											</>
										)
											: (
												<>
													Buy Now
												</>
											)
										}
									</Button>
								</Box>
							</Grid>
							<Grid item xs={12} sm={8} md={7}>
								<Box>
									<Typography variant='h4' align="left">{product?.productName}</Typography>
									<Chip label={product?.productCategory} />

									<Typography variant="h6" fontWeight={800} color="coral">
										<img
											src="/eth-logo.svg"
											height={15}
											style={{ marginRight: '0.5rem' }}
										/>
										{product?.productPrice}
									</Typography>

									<Typography variant="h5" align="left" paragraph>{product?.productDescription}</Typography>
									<Typography variant="h6" align="left" paragraph>Warranty Period: {product?.productWarrantyPeriod}</Typography>


									<Typography variant="h5" align="left" paragraph>Sold by: {seller?.companyName}</Typography>

								</Box>
							</Grid>
						</Grid>
					</Container>

				</>
			) : (
				<Typography variant="h6" color="inherit">Connect your wallet </Typography>
			)}
		</>
	)
}

export default ProductPage