import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Product from './Product';
import { useStoreState } from 'easy-peasy';



export default function Products() {
	const products = useStoreState(state => state.products.items);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1} padding={4}>
				{products.map(product => (
					<Grid item xs={12} sm={6} md={3} key={product.productId}>
						<Product product={product} />
					</Grid>
				))}
        </Grid>
    </Box>
  );
}
