var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/split', function(req, res, next) {
  let data = {
    "order_meta": {
      "consumer_meta": {
        "order_ids": [
          "3487"
        ]
      },
      "external_id": `${Math.random()}`
    },
    "services": [
      {
        "amount": req.body.prices,
        "currency": "RUB",
        "items": [
          {
            "count": 1,
            "item_code": "323",
            "price": req.body.prices,
            "title": req.body.products,
          }
        ],
        "type": "loan"
      }
    ]
  };
  let config = {
    headers: {
      'Authorization': "Bearer y0_AgAAAABgkpS0AAj_KAAAAADZkyu8fdO7GhZjQHOsYqDTSSeihLT_Lb4",
    },
  };
  console.log (req);
  axios.post ('https://split-api.yandex.net/b2b/order/create',
      data, config,)
      .then((response) => {
        res.send(response.data);
      })
      .catch((response) => {
        console.log(response);
        res.status(400).send(response.error);
      });
});

module.exports = router;
