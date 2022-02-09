import React from "react";
import PropTypes from "prop-types";

export const Card = ({ image, heading, description, subheading, onClick }) => {
	return (
		<div className={`card avatar-card ${onClick ? "pointer" : ""}`} onClick={() => (onClick ? onClick() : null)}>
			{image && <img className="card-img-top" src={image} alt="Card image cap" />}
			<div className={`card-body ${description || subheading ? "pt-1" : ""}`}>
				<h5 className="card-title text-capitalize">{heading.toLowerCase()}</h5>
				{description && <p className="card-text">{description}</p>}
				{subheading && (
					<p className="card-text">
						<small className="text-muted">Last updated 3 mins ago</small>
					</p>
				)}
			</div>
		</div>
	);
};
Card.propTypes = {
	image: PropTypes.string,
	heading: PropTypes.string,
	description: PropTypes.string,
	subheading: PropTypes.string,
	onClick: PropTypes.func,
	children: PropTypes.any
};
Card.defaultProps = {
	onClick: null
};
