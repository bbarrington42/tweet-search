// Read contents of .env file and return as JSON Object
// For use in serverless.yml config file

const LineReaderSync = require("line-reader-sync");

exports.twitterCreds = (serverless) => {
    const lrs = new LineReaderSync("./.env")
    const lines = lrs.toLines();

    let acc = [];
    lines.forEach(line => {
        const elems = line.split('=');
        acc.push('"' + elems.join('":"') + '"');
    });

    return JSON.parse("{" + acc.join() + "}");
};
