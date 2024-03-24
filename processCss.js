const postcss = require("postcss");
const fs = require("fs");
 
fs.readFile("./src/index.css", (err, css) => {
  postcss()
    .process(css, { from: "./src/index.css", to: "output.css" })
    .then((result) => {
      console.log(result);
    });
});