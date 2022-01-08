// Promise 物件代表一個即將完成、或失敗的非同步操作，以及它所產生的值。

const { readFile } = require("fs/promises");

readFile("test.txt", "utf-8")
  .then((result) => {
    console.log(`這是內建的 promise 版本 ${result}`);
  })
  .catch((err) => {
    console.error(err);
  });
