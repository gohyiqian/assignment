import express from "express";
const app = express();
import userBalances from "./users.js";
import axios from "axios";

const port = 3000;
const apiURL = "https://www.bitstamp.net/api/v2/ticker/";

//test
app.get("/", async (req, res) => {
  res.send(Object.keys(userBalances));
});

app.get("/user/:userId", async (req, res) => {
  try {
    const id = req.params.userId;
    const userInfo = userBalances[`user-${id}`];
    // res.send(userInfo);

    if (!userInfo) {
      return res.status(400).json({
        error: "user does not exist",
      });
    }
    // an array of crypto ticker that the user is holding
    const userHoldings = Object.keys(userInfo);

    // map over each ticker to get the latest price
    let promises = userHoldings.map(async (crypto) => {
      const response = await axios({
        url: `${apiURL}${crypto.toLowerCase()}usd`,
        method: "GET",
      });
      const latestTickerPrice = await response.data.last;
      // res.send(latestTickerPrice);
      return Number(latestTickerPrice) * Number(userInfo[crypto]);
      // res.status(200).json(data);
    });
    // get an array of all promises (total price per crypto)
    const values = await Promise.all(promises);

    // sum the values in the array (total price for all)
    const totalValue = await values.reduce((prev, curr) => prev + curr);

    res.json({
      id: id,
      USD: (Math.round(totalValue * 100) / 100).toFixed(2),
    });
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
});

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default server;
