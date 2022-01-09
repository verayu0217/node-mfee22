//async await
// promise的語法糖

const { readFile } = require("fs/promises");

// async 是宣告停止範圍

// async function 函式名稱 () {}

// 箭頭函式+立即執行(IIFE)
(async () => {
  // 抓錯誤只能用try-catch
  try {
    let result = await readFile("test.txt", "utf-8");
    console.log(`這是內建的 promise 版本 ${result}`);
  } catch (err) {
    console.error(err);
  }
})();
