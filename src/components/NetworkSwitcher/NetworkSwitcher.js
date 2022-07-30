import { Alert, AlertTitle, Button } from '@mui/material'
import { useNetwork, ChainId, useNetworkMismatch, useAddress } from "@thirdweb-dev/react";
import React from 'react'

const NetworkSwitcher = () => {
	const isMismatched = useNetworkMismatch();
	const address = useAddress();
	const [, switchNetwork] = useNetwork();
	return (
		<>
		{
			(address && isMismatched) ?
			<Alert severity="warning"
				action={
					<Button variant='outlined' color="inherit" size="medium" onClick={() => switchNetwork(ChainId.Mumbai)}>
						Switch to Polygon Mumbai
					</Button>
				}
			>
				<AlertTitle>Wrong Network!</AlertTitle>
				This app is built on the Polygon Mumbai network, but you are currently on a different network. In order to use this app, please switch to the Polygon Mumbai network.
			</Alert>
			:<></>
		}
			
		</>
	)
}

export default NetworkSwitcher