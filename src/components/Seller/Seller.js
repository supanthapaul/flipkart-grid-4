import { useEffect, useState } from 'react';
import { useAddress, useSDK } from '@thirdweb-dev/react';
import { Typography, TextField, Button, Container, Checkbox, FormControlLabel, CircularProgress } from '@mui/material'

const FORM_INITIAL_STATE = {
	companyName: '',
	nftCollectionName: '',
	collectionNameSame: true,
	recipientAddress: '',
	nftCollectionAddress: ''
}

const Seller = () => {
	const sdk = useSDK();
	const address = useAddress();
	const [formState, setFormState] = useState(FORM_INITIAL_STATE);
	const [isContractDeploying, setIsContractDeploying] = useState(false);

	useEffect(() => {
		setFormState({ ...formState, recipientAddress: address });
	}, [address]);

	const onCreateNFTCollection = async () => {
		const { companyName, nftCollectionName, collectionNameSame, recipientAddress } = formState;
		if(recipientAddress === '') {
			console.log(recipientAddress);
			return;
		}
		// deploy contract
		setIsContractDeploying(true);
		const collectionAddress = await sdk.deployer.deployNFTCollection({
			name: collectionNameSame ? companyName : nftCollectionName,
			primary_sale_recipient: recipientAddress,
		});
		setIsContractDeploying(false);
		setFormState({ ...formState, nftCollectionAddress: collectionAddress });
		console.log(collectionAddress);
	}
	return (
		<Container maxWidth="sm">
			<Typography variant="h4" style={{ marginBottom: '1rem' }}>Start Selling!</Typography>
			{address ? (
				<form>
					<TextField
						type="text"
						label="Company Name"
						value={formState.companyName}
						onChange={(e) => setFormState({ ...formState, companyName: e.target.value })}
						fullWidth
						style={{ marginBottom: '1rem' }}
						placeholder="Enter your Company Name" />
					<TextField
						type="text"
						label="NFT Collection name"
						value={formState.collectionNameSame ? formState.companyName : formState.nftCollectionName}
						onChange={(e) => setFormState({ ...formState, nftCollectionName: e.target.value })}
						disabled={formState.collectionNameSame}
						fullWidth
						placeholder="Enter your NFT Collection name" />
					<FormControlLabel
						control={<Checkbox 
							checked={formState.collectionNameSame}
							onChange={(e) => setFormState({ ...formState, collectionNameSame: e.target.checked })}
							 />}
						label="NFT Collection name same as company name"
						style={{ marginBottom: '1rem' }} />
					<TextField
						type="text"
						value={address}
						onChange={(e) => setFormState({ ...formState, recipientAddress: e.target.value })}
						label="Recipient Address"
						placeholder="Recipient Address"
						style={{ marginBottom: '1rem' }}
						fullWidth
						disabled />
					<Button variant="outlined" onClick={onCreateNFTCollection}>
						{isContractDeploying ? <CircularProgress size={20} /> : 'Create NFT Collection'}
					</Button>
					<Button 
						variant="contained"
						style={{ marginLeft: '1rem' }}
						disabled={formState.nftCollectionAddress == ''}>
						Submit
					</Button>
				</form>
			) : (
				<Typography variant="h6" color="inherit">Connect your wallet </Typography>
			)}
		</Container>
	);
};

export default Seller;