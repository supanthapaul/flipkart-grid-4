import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Product from './Product';


export default function Products() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1} padding={4}>
        <Grid item xs={4}>
          <Product />
        </Grid>
        <Grid item xs={4}>
          <Product />
          
        </Grid>
        <Grid item xs={4}>
          <Product />
        </Grid>
        </Grid>
    </Box>
  );
}
