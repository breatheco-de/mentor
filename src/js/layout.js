import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BookSession } from "./views/BookSession";
import injectContext from "./store/appContext";
import PropTypes from "prop-types";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { ChooseAcademies } from "./views/ChooseAcademy";
import { ChooseService } from "./views/ChooseService";
import { ChooseMentor } from "./views/ChooseMentor";
import { PrivateRoute } from "./component/PrivateRoute";

//create your first component
const Layout = ({ store }) => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Switch>
						<PrivateRoute exact path="/academies">
							<ChooseAcademies />
						</PrivateRoute>
						<PrivateRoute exact path="/academy">
							<ChooseAcademies />
						</PrivateRoute>
						<PrivateRoute exact path="/academy/:academy_slug/services">
							<ChooseService />
						</PrivateRoute>
						<PrivateRoute exact path="/academy/:academy_slug">
							<ChooseService />
						</PrivateRoute>
						<PrivateRoute exact path="/academy/:academy_slug/service/:service_slug/mentor/:mentor_slug">
							<BookSession />
						</PrivateRoute>
						<PrivateRoute exact path="/academy/:academy_slug/service/:service_slug/mentor">
							<ChooseMentor />
						</PrivateRoute>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};
Layout.propTypes = {
	store: PropTypes.object,
	children: PropTypes.any
};

export default injectContext(Layout);
