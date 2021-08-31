const Cate = require("../model/category");
const Prod = require("../model/product");

//inserting category
exports.postAddCategory = (req, res) => {
  const category = req.body.category;

  const newCate = new Cate({
    category,
  });
  newCate
    .save()
    .then((Cate) => {
      res.json(Cate);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

//getting all products on category page
exports.getCategoryItem = async (req, res) => {
  const cate = await Cate.find({}).populate("products");
  // console.log("cate", cate);
  res.json(cate);
};

//delete  category
exports.postDeleteCategory = async (req, res) => {
  const id = req.params.id;
  const category = await Cate.findByIdAndRemove(id);
  await Prod.updateMany(
    { _id: category.products },
    { $pull: { categories: category._id } }
  );
  res.send("deleted");
};

//getting category
exports.getEditCategory = (req, res) => {
  const id = req.params.id;
  Cate.findById(id, (err, cates) => {
    res.json(cates);
  });
};

//update category
exports.postEditCategory = async (req, res) => {
  const id = req.params.id;
  // update category by id
  const category = await Cate.findByIdAndUpdate(id, req.body);
  //pushing updated category id in products model
  const products = await Prod.updateMany(
    { _id: category.products },
    { $push: { categories: category._id } }
  );
  console.log(products);
  //save category
  await category.save();

  res.status(201).json(category);
};

//getting out all the products through category id
exports.getCategoryByProducts = async (req, res) => {
  const id = req.params.id;
  const cate = await Cate.findById(id).populate("products");
  console.log("product", cate);
  res.status(201).json(cate.products);
};

exports.postAddProductsByCategory = async (req, res) => {
  const id = req.params.id;
  //create new category
  const newCategory = await Cate.findById(id);
  console.log("newCategory", newCategory);
  //get product
  const products = await Prod.create(req.body);
  //Assign product as a category's products array
  // newCategory.products = product;
  //save the category
  newCategory.products = newCategory._doc.products || [];

  newCategory.products.push(products._id);

  // await category.save();
  await newCategory.save();
  //add category to the product's "category" array
  // product.categories.push(newCategory);
  //save product
  // await product.save();
  res.status(201).json(newCategory);
};
