import React, { useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
// Product {
// 	id,
// 	name,
// 	description,
// 	image,
// 	sellerId,
// 	price,
// 	category,
// 	contractAddress
// }
const CreateProduct = () => {
	const history = useHistory();
	const authState = useStoreState(state => state.auth.user);

	useEffect(() => {
		if (authState.type != "seller") {
			history.push('/');
		}
	}, [authState]);
	
	return (
		<div>CreateProduct</div>
	)
}

export default CreateProduct;