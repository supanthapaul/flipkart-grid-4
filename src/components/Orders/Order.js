import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Container } from '@mui/system';
import { Typography } from '@mui/material';


export default function Order() {
	return (
		<Paper elevation={1}>
			<Grid container spacing={2}>
				<Grid item xs={2} sm={3} md={3}>
					<Box
						component="img"
						sx={{
							height: 100,
							width: "auto",
							margin: "6px 16px 6px 16px"

						}}
						alt="Shopping cart"
						src="/Images/shopping.png"
					/>
				</Grid>

				<Grid item xs={2} sm={3} md={3} style={{
					paddingTop: 50
				}}>
					<Typography align="left">
						Handsaplast washproof adhesive band aid
					</Typography>
				</Grid>

				<Grid item xs={2} sm={3} md={3} style={{
					paddingTop: 50
				}}>
					<Typography>
						Rs.196
					</Typography>
				</Grid>

				<Grid item xs={2} sm={3} md={3} style={{
					paddingTop: 50
				}}>
					<Typography>
						F
					</Typography>
				</Grid>
			</Grid>
		</Paper>

	);
}
