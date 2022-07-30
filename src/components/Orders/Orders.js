import React from 'react'
import Order from './Order'
import { Container } from '@mui/system';
import { useStoreState } from 'easy-peasy';
import { Typography } from '@mui/material';


const Orders = () => {
	const orders = useStoreState(actions => actions.orders.items);

  return (
    <Container maxWidth="lg"
        style={{
            marginTop: '40px',
        }}
    >
			<Typography variant="h4" style={{
            marginBottom: '1rem',
        }}>Your Orders</Typography>
        {orders.map(order => (
						<Order order={order} key={order.orderId} />
					))}
    </Container>
  )
}

export default Orders