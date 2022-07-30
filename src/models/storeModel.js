import authModel from './authModel';
import productsModel from './productsModel';
import ordersModel from './ordersModel';

const storeModel = {
	auth: authModel,
	products: productsModel,
	orders: ordersModel,
}

export default storeModel;