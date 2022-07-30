import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {  useStoreState } from 'easy-peasy';




const theme = createTheme();


export default function Profile() {
	const authState = useStoreState(state => state.auth.user);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };
 

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, height: 100, width: 100 }} src={`https://avatars.dicebear.com/api/croodles-neutral/${authState.name}.svg`}>
            
          </Avatar>
          <Typography component="h1" variant="h5">
			Personal Information
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            
		  <TextField
              margin="normal"
              required
              fullWidth
			  disabled
              id="name"
              label="Name"
              value={authState.name}
			  
              autoFocus
            />
			<TextField
              margin="normal"
              required
              fullWidth
			  disabled
              id="email"
              label="Email Address"
              value={authState.email}
              autoFocus
            />
			 <TextField
              margin="normal"
              required
              fullWidth
			  disabled
              name="wallet address"
              label="Wallet Address"
			  value={authState.walletAddress}
              id="wallet address"
              
            />

			{
			authState.companyName &&(
				<TextField
              margin="normal"
              required
              fullWidth
			  disabled
              name="companyName"
              label="Company Name"
			  value={authState.companyName}
              id="companyName"
              
            />
			)
		  }

          {
			authState.nftCollectionAddress &&(
				<TextField
              margin="normal"
              required
              fullWidth
			  disabled
              name="nftCollectionAddress"
              label="NFT Collection Address"
			  value={authState.nftCollectionAddress}
              id="nftCollectionAddress"
              
            />
			)
		  }

			
            
          </Box>
        </Box>
    
      </Container>
    </ThemeProvider>
  );
}