import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Card } from "../component/card";
import { useHistory, useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Loading } from "../component/loading";

export const ChooseService = () => {
	const history = useHistory();
	const { academy_slug } = useParams();
	const { actions, store } = useContext(Context);

	useEffect(
		() => {
			if (!store.academy && academy_slug && academy_slug != "") {
				actions.setAcademy(store.me.roles.find(r => r.academy.slug === academy_slug));
			}
		},
		[store.me]
	);

	if (!store.academy) return <Loading msg="Loading academy..." />;
	if (store.services.length == 0)
		return (
			<div className="alert alert-secondary text-center">
				There are no services for {store.academy.name},{" "}
				<Link to={`/academies?${store.token}`}>back to academies</Link>.
			</div>
		);

	return (
		<ul className="list-group">
			{store.services.map(s => (
				<li key={s.id}>
					<Card
						heading={s.name}
						onClick={() => {
							console.log(`Set service ${s.slug}`);
							actions.setService(s);
							history.push(
								`/academy/${store.academy.slug}/service/${s.slug}/mentor?token=${store.token}`
							);
						}}
					/>
				</li>
			))}
		</ul>
	);
};
