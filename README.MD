# Micro Services Metrics
## Description
This tool allow you get the technology stack of a website by submitting a form with his URL.

The back-end works with  [express](https://expressjs.com/) in Node.js and the front-end is rendered with [pug](https://pugjs.org) while the style is done in [SCSS](https://sass-lang.com/).

In order to retrieve the data, we use [wappalyzer](https://github.com/AliasIO/wappalyzer). It might takes some seconds to retrieve data because this module scrap the website.

## How to install
```shell script
npm install
```

## How to use
```shell script
npm start
```
Start a browser and open `localhost:3000`

## Improvements possible
- A loading screen while scrapping
- Using [Wappalyzer's API](https://docs.wappalyzer.com/api/basics.html) to retrieve the data without scrapping (usage of a cache). However it is a commercial API.
    - Free tier limits: 10 request per day.

## Contributors
- Maxence Dominici