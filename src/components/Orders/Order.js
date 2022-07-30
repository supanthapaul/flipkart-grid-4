import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useStoreActions } from 'easy-peasy';
import { ThirdwebNftMedia, useNFTCollection, useNFT } from "@thirdweb-dev/react";
import { Typography, Button } from '@mui/material';
import dayjs from 'dayjs';


const Order = ({ order }) => {
	const [product, setProduct] = useState(null);
	const startGetProduct = useStoreActions(actions => actions.products.startGetProduct);
	const contract = useNFTCollection(order.nftCollectionAddress);
	const { data: nft, isLoading } = useNFT(contract, parseInt(order.tokenId));

	useEffect(() => {
		startGetProduct(order.productId).then(res => {
			setProduct(res.data())
		});
	}, []);
	return (
		<Paper elevation={1}>
			<Grid container spacing={2}>
				<Grid item xs={2} sm={3} md={3}>
					<Box
						component="img"
						sx={{
							height: 100,
							width: "auto",
							margin: "6px 16px 6px 16px"

						}}
						alt="Shopping cart"
						src={product ? product.productImage : "/Images/shopping.png"}
					/>
				</Grid>

				<Grid item xs={2} sm={3} md={3} style={{
					paddingTop: 50
				}}>
					<Typography align="left">
						<strong>
							{product ? product.productName : "Fething product..."}
						</strong>
					</Typography>
					<Typography align="left">
						{product?.productDescription}
					</Typography>
				</Grid>

				<Grid item xs={2} sm={3} md={3} style={{
					paddingTop: 50
				}}>

					<Typography variant="h6" fontWeight={800} color="coral">
						<img
							src="/eth-logo.svg"
							height={15}
							style={{ marginRight: '0.5rem' }}
						/>
						{product?.productPrice}
					</Typography>
				</Grid>

				<Grid item xs={2} sm={3} md={3} style={{
					paddingTop: 50
				}}>

					{!isLoading && nft ? (
						<>
							<Typography>Product expires on {dayjs(nft.metadata.properties.expiry).format('DD/MM/YYYY')}</Typography>
							<Button variant="outlined" color="primary" onClick={() => {
								window.open( 
									`https://testnets.opensea.io/assets/rinkeby/${order.nftCollectionAddress}/${order.tokenId}`, "_blank");
							}}>View Warrranty NFT</Button>
						</>
					) : (
						<p>Fetching warranty NFT...</p>
					)}
				</Grid>
			</Grid>
		</Paper>

	);
}
export default Order;