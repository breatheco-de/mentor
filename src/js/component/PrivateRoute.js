import React, { useContext } from "react";
import { useHistory, Route } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { Loading } from "../component/loading";
export const PrivateRoute = props => {
	const history = useHistory();
	const { store } = useContext(Context);

	if (!store.token)
		return (
			<div className="alert alert-danger">
				You need to provide a token or{" "}
				<a href={`${process.env.BC_API_HOST}/v1/auth/view/login?url=${window.location.href}`}>log in.</a>
			</div>
		);
	else if (!store.me) return <Loading msg="Loading your user information..." />;

	return <Route {...props}>{props.children}</Route>;
};
PrivateRoute.propTypes = {
	path: PropTypes.string,
	children: PropTypes.any
};
// PrivateRoute.defaultProps = {
// 	onClick: null
// };
