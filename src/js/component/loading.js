import React from "react";
import LoadingImage from "../../img/spinner.gif";
import PropTypes from "prop-types";

export const Loading = ({ msg }) => {
	return (
		<div className="loading">
			{msg && <p>{msg}</p>}
			<img src={LoadingImage} />
		</div>
	);
};
Loading.propTypes = {
	msg: PropTypes.string
};
Loading.defaultProps = {
	msg: null
};
