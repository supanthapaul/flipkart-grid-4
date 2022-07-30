import { action, thunk } from 'easy-peasy';
import {database} from '../firebase/firebaseSetup';


// order = {
// 	uid: authState.uid,
// 	orderId: uuid(),
// 	productId: product.productId,
// 	sellerId: seller.uid,
// 	nftCollectionAddress: product.nftCollectionAddress,
// 	tokenId : 0
// }
const INITIAL_STATE = []

const ordersModel = {
	items: INITIAL_STATE,
	error: null,
	// Start add order
	startAddOrder: thunk((actions, payload) => {
		return database.collection('orders').doc(payload.orderId).set(payload)
	}),
	// start get orders
	startGetOrders: thunk((actions, payload) => {
		return database.collection('orders').where('uid', '==', payload).get();
	}),
	// start get product with id
	startGetOrder: thunk((actions, payload) => {
		return database.collection('orders').doc(payload).get();
	}),
	startGetSeller: thunk((actions, payload) => {
		return database.collection('users').doc(payload).get();
	}),
	// add 1 order to state
	addOrder: action((state, payload) => {
		state.items = [payload, ...state.items];
	}),
	// Set orders state
	setOrders: action((state, payload) => {
		state.items = payload;
	}),
	// set error state
	setError: action((state, payload) => {
		state.error = payload;
	}),
}

export default ordersModel;