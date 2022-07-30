import { action, thunk } from 'easy-peasy';
import {database} from '../firebase/firebaseSetup';

const INITIAL_STATE = []

const productsModel = {
	items: INITIAL_STATE,
	error: null,
	// Start add product
	startAddProduct: thunk((actions, payload) => {
		return database.collection('products').doc(payload.productId).set(payload)
	}),
	// start get products
	startGetProducts: thunk((actions, payload) => {
		return database.collection('products').get();
	}),
	// start get product with id
	startGetProduct: thunk((actions, payload) => {
		return database.collection('products').doc(payload).get();
	}),
	startGetSeller: thunk((actions, payload) => {
		return database.collection('users').doc(payload).get();
	}),
	// add 1 product to state
	addProduct: action((state, payload) => {
		state.items = [payload, ...state.items];
	}),
	// Set products state
	setProducts: action((state, payload) => {
		state.items = payload;
	}),
	// set error state
	setError: action((state, payload) => {
		state.error = payload;
	}),
}

export default productsModel;