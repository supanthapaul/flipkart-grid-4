import * as React from 'react';
import firebase from '../../firebase/firebaseSetup';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { white } from '@mui/material/colors';



const theme = createTheme();
const uiConfig = {
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
		firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={4}
          sm={4}
          md={5}
          sx={{
            backgroundColor:'primary.main',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						
					}}
        >
          <Box m={2} pt={6}>
          <Typography align="center" color="white" variant="h3">
            Login
          </Typography>
          </Box>
          
          <Box m={2} pt={3}>
          <Typography variant="h6" align="center" color="white" paragraph>
             Get access to your Orders, Wishlist and Recommendations
            </Typography>
          </Box>
          
          <Box
        component="img"
        sx={{
          height: 350,
          width: "auto",
          
        }}
        alt="Shopping cart"
        src="/Images/shopping.png"
      />
          </Grid>

        <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
             <Box m={2} pt={3}>
          <Typography variant="h6" align="center" paragraph>
             Over 3 million customers trust our products and services. Join us today! Login using your email or gmail to continue.
            </Typography>
          </Box>
            <StyledFirebaseAuth style={{minWidth:500}} uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
              
            </Box>
          
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}