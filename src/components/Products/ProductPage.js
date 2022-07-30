import React, { useEffect, useState } from 'react'
import { useContract, useMintNFT, useAddress, useSDK } from '@thirdweb-dev/react'
import { useParams , useHistory} from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Button, Typography, CircularProgress } from '@mui/material';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';

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
			tokenId : 0
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