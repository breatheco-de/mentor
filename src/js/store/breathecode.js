const host = process.env.BC_API_HOST;
const breathecode = {
	token: null,
	academy: null,
	setToken: function(_token) {
		this.token = _token;
	},
	setAcademy: function(_academy) {
		this.academy = _academy;
	},
	fetch: function(url, opt = {}) {
		return fetch(host + url, {
			...opt,
			headers: { ...opt.headers, Authorization: `Token ${this.token}`, Academy: this.academy }
		});
	}
};

export default breathecode;
