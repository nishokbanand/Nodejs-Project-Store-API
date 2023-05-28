const product = require("../models/product");
const getProductsStatic = async (req, res) => {
  const prod = await product.find({ price: { $gt: 30 } });
  res.status(200).send(prod);
  if (!prod) throw Error("access denied");
};
const getProducts = async (req, res) => {
  const { name, company, featured, sort, fields, numericalFilter } = req.query;
  //   console.log(numericalFilter);
  const queryObject = {};
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (company) {
    queryObject.company = { $regex: company, $options: "i" };
  }
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  //numericalFilter
  const operationMap = {
    ">": "$gt",
    ">=": "$gte",
    "=": "$eq",
    "<": "$lt",
    "<=": "$lte",
  };
  const regex = /\b(<|>|>=|=|<|<=)\b/g;
  let filters = numericalFilter.replace(
    regex,
    (match) => `-${operationMap[match]}-`
  );
  const options = ["price", "rating"];
  filters.split(",").forEach((item) => {
    const [field, op, val] = item.split("-");
    if (options.includes(field)) {
      queryObject[field] = { [op]: Number(val) };
    }
  });
  let result = product.find(queryObject);
  if (sort) {
    sortList = sort.split(",").join(" ");
    // console.log(sortList);
    result = result.sort(sortList);
  }
  if (fields) {
    fieldList = fields.split(",").join(" ");
    result = result.select(fieldList);
  }
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const prod = await result;
  if (!prod) throw Error("No such product");
  //   console.log(prod.length);
  res.status(200).send(prod);
};

module.exports = { getProductsStatic, getProducts };
