import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip } from '@mui/material';

const Product = (product) => {
	const { productId, productName, productDescription, productImage, productPrice, productCategory, productWarrantyPeriod } = product.product;
	console.log(product)
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="160"
				src={productImage}
        alt="green iguana"
				style={{
					objectFit: 'contain',
				}}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
				{productName}
        </Typography>
        <Typography variant="h6" fontWeight={800} color="coral">
					<img 
						src="/eth-logo.svg"
						height={15}
						style={{ marginRight: '0.5rem' }}
					/>
          {productPrice}
        </Typography>
				
        <Typography variant="body2" color="text.secondary">
          {productDescription}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Warranty Period: <i>{productWarrantyPeriod} Year(s) </i>
        </Typography>
				
      </CardContent>
      <CardActions>
			<Chip label={productCategory} />
        <Button component={Link} to={`/product/${productId}`} size="small">View Product</Button>
      </CardActions>
    </Card>
    </div>
    
    
  );
}
export default Product;