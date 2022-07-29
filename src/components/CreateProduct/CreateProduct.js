import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useAddress } from '@thirdweb-dev/react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Typography, TextField, Button, Container, Checkbox, FormControlLabel, CircularProgress, InputAdornment, Grid, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { v4 as uuid } from 'uuid'


const FORM_INITIAL_STATE = {
	productId: '',
	productName: '',
	productDescription: '',
	productImage: '',
	productSellerId: '',
	productPrice: 0,
	productCategory: 'mobile',
	productWarrantyPeriod: 0,
	nftCollectionAddress: '',
}

const CreateProduct = () => {
	const history = useHistory();
	const authState = useStoreState(state => state.auth.user);
	const startAddProduct = useStoreActions(actions => actions.products.startAddProduct);
	const addProduct = useStoreActions(actions => actions.products.addProduct);
	const [formState, setFormState] = useState(FORM_INITIAL_STATE);
	const [isLoading, setIsLoading] = useState(false);

	const address = useAddress();

	useEffect(() => {
		if (authState.type != "seller") {
			history.push('/');
		}
	}, [authState]);

	useEffect(() => {
		setFormState({
			...formState,
			productId: uuid(),
			productSellerId: authState.uid,
			nftCollectionAddress: authState.nftCollectionAddress,
		})
	}, []);

	const handleFormSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		
		startAddProduct(formState)
		.then(() => {
			setIsLoading(false);
			addProduct(formState);
			setFormState(FORM_INITIAL_STATE);
			history.push('/');
		})
		.catch(error => {
			setIsLoading(false);
			console.log(error);
		});
	}

	return (
		<Container maxWidth="sm" style={{ marginTop: '1rem' }}>
			<Typography variant="h4" style={{ marginBottom: '1rem' }}>List a New Product</Typography>
			{address ? (
				<form onSubmit={handleFormSubmit}>
					<TextField
						type="text"
						label="Product Name"
						value={formState.productName}
						required
						onChange={(e) => setFormState({ ...formState, productName: e.target.value })}
						fullWidth
						style={{ marginBottom: '1rem' }}
						placeholder="Enter your Product Name" />
					<TextField
						type="text"
						label="Product Description"
						value={formState.productDescription}
						onChange={(e) => setFormState({ ...formState, productDescription: e.target.value })}
						fullWidth
						required
						style={{ marginBottom: '1rem' }}
						placeholder="Enter your Product Description" />
					<TextField
						type="url"
						label="Product Image"
						value={formState.productImage}
						onChange={(e) => setFormState({ ...formState, productImage: e.target.value })}
						fullWidth
						required
						style={{ marginBottom: '1rem' }}
						placeholder="Enter your Product Image URL" />
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								type="number"
								label="Price"
								value={formState.productPrice}
								onChange={(e) => setFormState({ ...formState, productPrice: e.target.value })}
								fullWidth
								required
								InputProps={{
									startAdornment: <InputAdornment position="start">$MATIC</InputAdornment>,
								}}
								style={{ marginBottom: '1rem' }}
								placeholder="Enter your Product Price (in MATIC)" />
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl fullWidth>
								<InputLabel id="category-select-label">Category</InputLabel>
								<Select
									labelId="category-select-label"
									value={formState.productCategory}
									label="Product Category"
									required
									onChange={(e) => setFormState({ ...formState, productCategory: e.target.value })}
								>
									<MenuItem value={"mobile"}>Mobiles</MenuItem>
									<MenuItem value={"computer"}>Computer</MenuItem>
									<MenuItem value={"appliances"}>Appliances</MenuItem>
									<MenuItem value={"accesories"}>Accesories</MenuItem>
									<MenuItem value={"console"}>Consoles</MenuItem>
								</Select>
							</FormControl>

						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								type="number"
								label="Warranty Period"
								value={formState.productWarrantyPeriod}
								onChange={(e) => setFormState({ ...formState, productWarrantyPeriod: e.target.value })}
								fullWidth
								required
								InputProps={{
									endAdornment: <InputAdornment position="end">Years</InputAdornment>,
								}}
								style={{ marginBottom: '1rem' }}
								placeholder="Product Warranty Period (in Years)" />
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								type="text"
								label="NFT Collection Address"
								value={formState.nftCollectionAddress}
								fullWidth
								disabled
								style={{ marginBottom: '1rem' }}
								placeholder="Enter your Product Price (in MATIC)" />
						</Grid>
					</Grid>

					<Button
						variant="contained"
						type='submit'
						disabled={isLoading}>
						{isLoading ? <CircularProgress size={20} /> : 'List Product'}
					</Button>
				</form>
			) : (
				<Typography variant="h6" color="inherit">Connect your wallet </Typography>
			)}
		</Container>
	)
}

export default CreateProduct;