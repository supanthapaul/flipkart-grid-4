# Web3 Store- Blockchain-based eCommerce warranty system using NFTs

## About The Project

This platform is using NFT as a warranty system of the purchased products. The seller can create an NFT Collection for each retailer\brand that will contain all the warranties of products sold by that retailer\brand as NFTs. The platform mints an NFT to the respective brand’s Collection which will contain all the necessary metadata regarding the purchase like expiry date, order ID, product ID, buyer ID etc. This NFT is minted to the wallet address of the buyer so that the buyer truly owns the warranty and can resale the product if required.


## Features

- Firebase is used for authentication purposes.
- Metamask is used as the E-wallet for minting NFT.
- Various features such as Collection creation for sellers, resale for buyers are implemented.
- Metadata of the order invoice such as warranty, warranty expiry date, invoice id etc. are minted as NFTs. 
- Interactive and responsive UI.
- Graphical and visual innovative effects are implemented.
- Latest technologies are used.

## Tech Stack

- `Frontend:` Reactjs, MUI
- `Backend:` ThirdWeb, Firebase, Easy-Peasy

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

Nodejs should be installed in the device. Along with Nodejs, any code editor and Metamask extension of chrome should also be installed.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/supanthapaul/flipkart-grid-4.git
   ```
2. After cloning this repository, migrate to `flipkart-grid-4` folder. Then, follow the following steps:

- Create Metamask account
- Link metamask account to the application

3. This project uses Firebase. To connect it with your firebase project, create a `.env` file on the root directory with the following keys,  
```REACT_APP_API_KEY  
REACT_APP_APP_ID  
REACT_APP_AUTH_DOMAIN  
REACT_APP_MESSAGING_SENDER_ID  
REACT_APP_PROJECT_ID  
REACT_APP_STORAGE_BUCKET
```

Key values should correspond to your Firebase project config.


4. Run the following commands to run your app:

```bash
  npm i (to install all the dependencies)
  npm start
  Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
```


