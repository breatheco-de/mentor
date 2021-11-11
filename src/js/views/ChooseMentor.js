import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Card } from "../component/card";
import { useHistory, useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Loading } from "../component/loading";

export const ChooseMentor = () => {
	const history = useHistory();
	const { academy_slug, service_slug } = useParams();
	const { actions, store } = useContext(Context);

	useEffect(
		() => {
			if (!store.academy && academy_slug && academy_slug != "") {
				actions.setAcademy(store.me.roles.find(r => r.academy.slug === academy_slug));
			}
		},
		[store.me]
	);
	useEffect(
		() => {
			if (!store.service && service_slug && service_slug != "") {
				actions.setService(store.services.find(s => s.slug === service_slug));
			}
		},
		[store.services]
	);

	if (!store.academy) return <Loading msg="Loading academy..." />;
	if (!store.service) return <Loading msg="Loading service..." />;

	if (store.mentors.length === 0)
		return (
			<div className="alert alert-light">
				There are not mentors available for this service,{" "}
				<Link to={`/academy/${store.academy.slug}?${store.token}`}>back to services</Link>
			</div>
		);
	return (
		<ul className="list-group">
			{store.mentors.map(m => (
				<li key={m.id}>
					<Card
						image={m.user && m.user.profile && m.user.profile.avatar_url}
						description={m.bio}
						heading={m.user ? `${m.user.first_name} ${m.user.last_name}` : m.name}
						onClick={() => {
							console.log(`Set mentor`);
							actions.setMentor(m);
							history.push(
								`/academy/downtown-miami/service/geekpal/mentor/${m.slug}?token=${store.token}`
							);
						}}
					/>
				</li>
			))}
		</ul>
	);
};
