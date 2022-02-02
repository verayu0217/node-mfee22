const express = require("express");
const router = express.Router();
const { checkLogin } = require("../middlewares/auth");

//checkLogin這個中間件會對這個router有效
router.use(checkLogin);

router.get("/", (req, res, next) => {
  //因為有用checkLogin 自己寫的中間件
  //可以到這表示req.session.member一定有資料
  res.json(req.session.member);
});

module.exports = router;
