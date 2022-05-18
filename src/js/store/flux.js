import bc from "./breathecode";
import qs from "query-string";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: qs.parse(window.location.search).token || null,
			syllabus: qs.parse(window.location.search).syllabus || null,
			academy: null,
			me: null,
			service: null,
			services: [],
			mentor: null,
			mentors: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			getMe: async token => {
				bc.setToken(token);
				const store = getStore();
				//v1/auth/user/me
				const resp = await bc.fetch(`/v1/auth/user/me`);
				const me = await resp.json();
				setStore({ me });
			},
			setAcademy: async a => {
				console.log("set academy", a);
				if (!a) return false;
				if (a.academy) a = a.academy;

				bc.setAcademy(a.id);
				setStore({ academy: a });

				const resp = await bc.fetch(`/v1/mentorship/academy/service`);
				const services = await resp.json();
				setStore({ services });
			},
			setService: async service => {
				console.log("set service", service);
				if (!service) return false;
				let store = getStore();

				const resp = await bc.fetch(
					`/v1/mentorship/academy/mentor?service=${service.slug}&syllabus=${store.syllabus}&status=ACTIVE`
				);
				const mentors = await resp.json();
				setStore({ mentors, service });
			},
			setMentor: async mentor => {
				if (!mentor) return false;

				setStore({ mentor });
			}
		}
	};
};

export default getState;
