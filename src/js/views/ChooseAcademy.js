import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Card } from "../component/card";
import { useHistory, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const ChooseAcademies = () => {
	const history = useHistory();
	const { actions, store } = useContext(Context);

	return (
		<ul className="list-group">
			{store.me.roles.map(({ academy }) => (
				<li key={academy.id}>
					<Card
						image={academy.logo_url}
						heading={academy.name}
						onClick={() => {
							console.log(`Set academy ${academy.slug}`);
							actions.setAcademy(academy);
							history.push(`/academy/${academy.slug}/services?token=${store.token}`);
						}}
					/>
				</li>
			))}
		</ul>
	);
};
