const fs = require('fs');

exports.createDirectory = function(path) {
    const directory = path.replace(/\/([\w-]*)\.([\w]*)$/, '');
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
};


// for minifying html
minifyOptions = {
    collapseWhitespace: true,
    conservativeCollapse: true,
    processScripts: ["application/ld+json"],
    minifyJS: true
};

// function to build static content
exports.buildPage = function buildPage(path, content, type = "html") {
    path = path.charAt(0) !== "/" ? "/" + path : path; // add slash if needed
    let filepath = `${distLocation}${path}.${type}`; // the location for the file
    createDirectory(filepath); // create directory if needed
    // add html tag and minify if html
    content = type === "html" ? '<!DOCTYPE html>\n' + minify(content, minifyOptions) : content;
    // write the static file
    fs.writeFile(filepath, content, function(err) {
        if (err) { 
            console.error(err); 
            return false 
        }
        if (type === "html" && !path.match(/^\/404$|^\/error$/g)) { // exclude these pages from sitemap
            fs.appendFileSync(distLocation + "/feeds/sitemap.txt", `${blogDomain}${path.replace(/index$/g, "")}` + '\r\n'); // write to sitemap
        }
        console.log(`Build of ${path}.${type} successful`);
        return true;
    });
};
