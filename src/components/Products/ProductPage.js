import React, { useEffect, useState } from 'react'
import {useContract, useMintNFT, useAddress} from '@thirdweb-dev/react'
import { useParams } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Button, Typography } from '@mui/material';

const ProductPage = () => {
	const { id } = useParams();
	const address = useAddress();
	const [contractAddr, setContract] = useState(null);
	const product = useStoreState(state => state.products.items.find(product => product.productId === id));
	const {contract} = useContract(product?.nftCollectionAddress);
	const {
		mutate: mintNft,
		isLoading,
		error,
	} = useMintNFT(contract?.nft);

	useEffect(() => {
		if(product) {
			setContract(product.nftCollectionAddress);
		}
	}, [product]);
	const onProductBuy = () => {
		mintNft({
			metadata: {
				name: product?.productName,
				description: product?.productDescription,
				image: product?.productImage,
				price: 1,
				properties: {
					
				}
			},
			to: address,
			price: 1,
		})
	}
	return (
		<>
			<Typography variant='h4'>{product?.productName}</Typography>
			<Button disabled={isLoading} onClick={onProductBuy}>Buy Now</Button>

		</>
	)
}

export default ProductPage