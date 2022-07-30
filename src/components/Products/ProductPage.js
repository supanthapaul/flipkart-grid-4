import React, { useEffect, useState } from 'react'
import { useContract, useMintNFT, useAddress, useSDK } from '@thirdweb-dev/react'
import { useParams } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Button, Typography, CircularProgress } from '@mui/material';

const ProductPage = () => {
	const { id } = useParams();
	const address = useAddress();
	const sdk = useSDK();
	const [seller, setSeller] = useState(null);
	const [isLoading, setisLoading] = useState(false);
	const [buyState, setBuyState] = useState("");

	const product = useStoreState(state => state.products.items.find(product => product.productId === id));
	const startGetSeller = useStoreActions(state => state.products.startGetSeller);
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
					warranty: product?.productWarrantyPeriod
				}
			},
			to: address,
		});
		console.log(mint);
		setisLoading(false);
		setBuyState("");
	}
	return (
		<>
			{address ? (
				<>
					<Typography variant='h4'>{product?.productName}</Typography>
					<Typography variant='body2'>Seller: {seller?.walletAddress}</Typography>
					<Button disabled={isLoading} variant="contained" size='large' onClick={onProductBuy}>
						{isLoading ? (
							<>
							<CircularProgress size={20} />
							{buyState}
							</>
						)
							:(
								<>
								Buy Now
								</>
							)
						}
					</Button>
				</>
			) : (
				<Typography variant="h6" color="inherit">Connect your wallet </Typography>
			)}
		</>
	)
}

export default ProductPage