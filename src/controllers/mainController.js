const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  index: (req, res) => {
    res.render("index", {
      productsVisited: products.filter(
        ({ category }) => category === "visited"
      ),
      productsInSale: products.filter(
        ({ category }) => category === "in-sale"
      ),
      toThousand
    });
  },
  search: (req, res) => {
    const keywords = req.query.keywords.toLowerCase();
    const results = products.filter(({ name }) => name.toLowerCase().includes(keywords));
    return res.render("results", {
      keywords,
      results: (results.length !== 0 ? results : false),
      toThousand
    });
  },
};
module.exports = controller;
