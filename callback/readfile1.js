const { readFile } = require("fs");

readFile("test.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
  // insert to mysql
});
