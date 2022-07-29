import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Product = (product) => {
	const { productId, productName, productDescription, productImage, productPrice, productCategory } = product.product;
	console.log(product)
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
				src={productImage}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
				{productName}
        </Typography>
        <Typography variant="h6" fontWeight={800} color="coral">
					<img 
						src="/polygon-logo.svg"
						height={15}
						style={{ marginRight: '0.5rem' }}
					/>
          {productPrice}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {productDescription}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to cart</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </div>
    
    
  );
}
export default Product;