import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Iframe from "react-iframe";
import { Loading } from "../component/loading";

export const BookSession = () => {
	const { store, actions } = useContext(Context);
	const [loading, setLoading] = useState(true);
	const { academy_slug, service_slug, mentor_slug } = useParams();

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
	useEffect(
		() => {
			if (!store.mentor && mentor_slug && mentor_slug != "") {
				actions.setMentor(store.mentors.find(m => m.slug === mentor_slug));
			}
			setTimeout(() => setLoading(false), 1000);
		},
		[store.mentors]
	);

	if (!store.academy) return <Loading msg="Loading academy..." />;
	if (!store.service) return <Loading msg="Loading service..." />;
	if (!store.mentor) return <Loading msg="Loading mentor..." />;

	// if (loading) return <Loading msg="Loading booking UI/UX..." />;

	return (
		<>
			{loading && <Loading msg="Loading booking UI/UX..." />}
			<Iframe
				url={store.mentor.booking_url}
				onLoad={() => setLoading(false)}
				width="100%"
				height="750"
				display="initial"
				position="relative"
			/>
		</>
	);
};
