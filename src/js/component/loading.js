import React from "react";
import PropTypes from "prop-types";
import "../../styles/loader.css";

export const Loading = ({ msg }) => {
	return (
		<div className="loading">
			{msg && <p>{msg}</p>}
			<div className="lds-ellipsis">
				<div />
				<div />
				<div />
				<div />
			</div>
		</div>
	);
};
Loading.propTypes = {
	msg: PropTypes.string
};
Loading.defaultProps = {
	msg: null
};
