import * as React from 'react';
import firebase from '../../firebase/firebaseSetup';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';



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
        />
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
            <StyledFirebaseAuth style={{minWidth:500}} uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
              
            </Box>
          
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}