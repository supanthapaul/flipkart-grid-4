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
					<Button variant='outlined' color="inherit" size="medium" onClick={() => switchNetwork(ChainId.Rinkeby)}>
						Switch to Rinkeby Testnet
					</Button>
				}
			>
				<AlertTitle>Wrong Network!</AlertTitle>
				This app is built on the Ethereum Rinkeby network, but you are currently on a different network. In order to use this app, please switch to the Rinkeby network.
			</Alert>
			:<></>
		}
			
		</>
	)
}

export default NetworkSwitcher