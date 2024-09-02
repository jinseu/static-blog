const fs = require('fs');
const minify = require('html-minifier').minify;
const React = require('react');
const ReactDOMServer = require('react-dom/server');
require("@babel/register");
const createDirectory = require('./util.js').createDirectory
// settings
const blogDomain = require('../settings/blog').blogDomain;

// location where static content is published
const distLocation = __dirname + '/../dist';
const jsLocation = distLocation + '/js';
const cssLocation = distLocation + '/css';
const feedsLocation = distLocation + '/feeds'

// deletes dist for full rebuild
if (process.env.FULL && fs.existsSync(distLocation)) {
    fs.rmSync(distLocation, { recursive: true, force: true });
};

createDirectory(jsLocation);
createDirectory(cssLocation);
createDirectory(feedsLocation);
fs.writeFileSync(distLocation + "/feeds/sitemap.txt", "");


// build blog pages e.g. custom 404
require("./pages.js");

// build the blog posts
require("./posts.js");