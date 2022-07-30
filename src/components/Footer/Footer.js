import { Container } from '@mui/system';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function Footer() {
  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 3, sm: 5 }}
        bgcolor="text.secondary"
        color="white"
      >
        <Container maxWidth="lg">
          <Typography align="center" variant="h6">
            Made by Supantha Paul and Ayushi Chaudhuri 
          </Typography>
          <Typography align="center" variant="h6">
          with the help of React.js, ThreeWeb, Firebase and Metamask
          </Typography>
        </Container>
      </Box>
    </footer>
  );
}