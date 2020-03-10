const {IMAGE_ENDPOINT} = require("../constant/endPoints");
const RECAPTCHA_LABEL = "reCAPTCHA";
const ANALYTICS_LABEL = "Google Analytics";

module.exports = {

	/**
	 * from fetched data generate an array used to get the chips for the view
	 * Also returns two attributes if the website use reCaptcha / Google Analytics
	 * @param {[]} data
	 * @returns {*}
	 */
	formatData(data) {
		const chips = [];
		let reCaptcha = false, analytics = false;
		data.forEach(item => {
			if(item.name.toLowerCase()===RECAPTCHA_LABEL.toLowerCase()){ //Detect if it uses reCaptcha
				reCaptcha = true;
			} else if(item.name.toLowerCase()===ANALYTICS_LABEL.toLowerCase()){ //Detect if it uses analytics
				analytics = true;
			}
			chips.push({name: item.name, icon: `${IMAGE_ENDPOINT}${item.icon}`, link: item.website});
		});

		reCaptcha  = reCaptcha ? "Yes": "No"; //if true, set Yes otherwise No
		analytics = analytics ? "Yes": "No"; //if true, set Yes otherwise No
		return {chips,reCaptcha,analytics};
	}
};