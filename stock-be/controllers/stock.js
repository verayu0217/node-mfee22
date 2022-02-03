const stockModel = require("../models/stock");

let getAll = async (req, res, next) => {
  let data = await stockModel.getAll();
  res.json(data);
};

let getPriceByCode = async (req, res, next) => {
  //取得目前在第幾頁
  //如果沒有設定req.query.page 那就設成1
  let page = req.query.page || 1;
  console.log("aaa", page);

  //TODO:取得目前總筆數
  let total = await stockModel.countByCode(req.params.stockId);

  //TODO:計算總共應該要有幾頁
  //  決定一頁有幾筆
  const perPage = 3;
  const lastPage = Math.ceil(total / perPage);

  //TODO: 計算SQL要用的offset
  let offset = (page - 1) * perPage;

  let data = await stockModel.getPriceByCode(
    req.params.stockId,
    perPage,
    offset
  );

  //TODO:準備要response
  res.json({
    pagination: { total, perPage, page, lastPage },
    data,
  });
};

module.exports = {
  getAll,
  getPriceByCode,
};
