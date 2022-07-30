import { Container } from '@mui/system';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function Footer() {
  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 2, sm: 4 }}
        bgcolor="text.secondary"
        color="white"
      >
        <Container maxWidth="lg">
          <Typography align="center" variant="body2">
            Made by <strong>Supantha Paul</strong> and <strong>Ayushi Chaudhuri </strong>
          </Typography>
          <Typography align="center" variant="body1">
          with the help of React.js, ThirdWeb, Firebase and Metamask
          </Typography>
        </Container>
      </Box>
    </footer>
  );
}