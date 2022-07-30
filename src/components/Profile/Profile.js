import React from 'react'
import {  useStoreState } from 'easy-peasy';


const Profile = () => {
	const authState = useStoreState(state => state.auth.user);
	return (
		<div>{authState.name}</div>
	)
}

export default Profile