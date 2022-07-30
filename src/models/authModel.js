import { action, thunk } from 'easy-peasy';
import firebase, {googleAuthProvider, database} from '../firebase/firebaseSetup';

const INITIAL_STATE = {
	uid: null,
	name: "User",
	email: null,
	profilePhoto: null,
	walletAddress: null,
	type: "user",
	companyName: null,
	nftCollectionAddress: null,
}

const authModel = {
	user: INITIAL_STATE,
	error: null,
	// Start login with Google
	startLogin: thunk((actions, payload) => {
		return firebase.auth().signInWithRedirect(googleAuthProvider);
	}),
	startSellerRegister: thunk((actions, payload) => {
		return database.collection('users').doc(payload.uid).update({
			type: "seller",
			companyName: payload.companyName,
			nftCollectionAddress: payload.nftCollectionAddress,
		});
	}),
	// start logout
	startLogout: thunk((actions, payload) => {
		return firebase.auth().signOut();
	}),
	// Set login state
	login: action((state, payload) => {
		state.user = payload;
	}),
	setSeller: action((state, payload) => {
		state.user = {
			...state.user,
			type: "seller",
			companyName: payload.companyName,
			nftCollectionAddress: payload.nftCollectionAddress,
		};
	}),
	// Set wallet address
	setWalletAddress: action((state, payload) => {
		state.user = {
			...state.user,
			walletAddress: payload,
		};
	}),
	// set logout state
	logout: action((state, payload) => {
		state.user = INITIAL_STATE;
	}),
	// set error state
	setError: action((state, payload) => {
		state.error = payload;
	}),
}

export default authModel;