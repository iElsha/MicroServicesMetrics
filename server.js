let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let sassMiddleware = require("node-sass-middleware");

let indexRouter = require("./routes/index");

let server = express();

// view engine setup
server.set("views", path.join(__dirname, "views"));
server.set("view engine", "pug");

server.use(logger("dev"));
server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(cookieParser());
server.use(sassMiddleware({
	src: path.join(__dirname, "public"),
	dest: path.join(__dirname, "public"),
	indentedSyntax: false, // true = .sass and false = .scss
	sourceMap: true
}));
server.use(express.static(path.join(__dirname, "public")));

server.use("/", indexRouter);

// catch 404 and forward to error handler
server.use(function (req, res, next) {
	next(createError(404));
});

// error handler
server.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = server;
