const Prod = require("../model/product");
const Cate = require("../model/category");

//inserting product
exports.postAddProduct = async (req, res) => {
  const title = req.body.title;
  const newProduct = await Prod.create({
    title,
  });
  console.log("newProduct", newProduct);

  await newProduct.save();
  res.status(201).json(newProduct);
};

// getting all products
exports.getProducts = async (req, res) => {
  const ITEMS_PER_PAGE = 3;
  const page = parseInt(req.query.page || "0");
  const totalPages = await Prod.countDocuments({});
  const prods = await Prod.find({})
    .skip(page * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE);
  res.json({
    totalPages: Math.ceil(totalPages / ITEMS_PER_PAGE),
    prods,
  });
  console.log("prods", prods);
};

// getting single product
exports.getEditProduct = (req, res) => {
  const id = req.params.id;
  Prod.findById(id, (err, prods) => {
    res.json(prods);
  });
};

// //delete product
exports.postDeleteProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Prod.findByIdAndRemove(id);

  await Cate.updateMany(
    { _id: product.categories },
    { $pull: { products: product._id } }
  );
  res.send("deleted");
};

//update product
exports.postEditProduct = (req, res) => {
  const id = req.params.id;

  Prod.findByIdAndUpdate(id, req.body, (err, prods) => {
    if (!prods) {
      res.status(404).send("Product Data Not Found");
    } else {
      prods
        .save()
        .then((prods) => {
          res.json(prods);
        })
        .catch((err) => res.status(500).send(err.message));
    }
  });
};

//getting  products based on categories
exports.getProductCategories = async (req, res) => {
  const id = req.params.id;
  const prods = await Prod.findById(id).populate("categories");
  console.log("product", prods);
  res.status(201).json(prods.categories);
};

//adding products to category
exports.newProductCategories = async (req, res, next) => {
  const id = req.params.id;
  //create new category
  const newCategory = await Cate(req.body);
  console.log("newCategory", newCategory);
  //get product
  const product = await Prod.findByIdAndUpdate(id);
  //Assign product as a catorgy's products
  newCategory.products = product;
  //save the category
  await newCategory.save();
  //add category to the product's products array "category"
  product.categories.push(newCategory);
  //save product
  await product.save();
  res.status(201).json(newCategory);
};
