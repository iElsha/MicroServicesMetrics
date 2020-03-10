const express = require("express");
const router = express.Router();
const {URL_REGEX} = require("../constant/regex"); //check that the URL parameter is a valid URL
const Wappalyzer = require("wappalyzer"); // open source module to get tech stack of a website
//https://github.com/AliasIO/wappalyzer
const {formatData} = require("../model/dataManager");

/* GET home page. */
router.get("/", function (req, res) {
	// res.render('index', { title: 'Express' });
	res.render("index");
});

/* GET website's metrics */
router.get("/getMetric", function (req, res) {
	if (!req.query.url) { //no url data present in the request return error
		res.render("index", {errorMessage: "You didn't' provide any url parameters"});
		return false;
	}
	const url = req.query.url;
	//check that the query is an url
	if (!url.match(URL_REGEX)) {// URL is not valid
		res.render("index", {errorMessage: "Your URL parameters is not an URL"});
		return false;
	}

	const wappalyzer = new Wappalyzer(url, {});
	wappalyzer.analyze()
		.then((json) => {
			console.log("received");
			const url = Object.keys(json.urls)[0];
			const {chips,reCaptcha,analytics} = formatData(json.applications);
			res.render("index", {url,chips,reCaptcha,analytics});
		})
		.catch((error) => {
			console.error(`${error}`);
			res.render("index", {errorMessage: "An error occurred while getting mettrics."});
		});
});

module.exports = router;
