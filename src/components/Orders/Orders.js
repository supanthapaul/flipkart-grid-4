import React from 'react'
import Order from './Order'
import { Container } from '@mui/system';

const Orders = () => {
  return (
    <Container maxWidth="lg"
        style={{
            marginTop:16
        }}
    >
        <Order />
        <Order />
    </Container>
  )
}

export default Orders