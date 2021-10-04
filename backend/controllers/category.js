const Category = require("../models/category");

exports.createCategory = (req, res, next) => {
  const category = new Category({
    categoryName: req.body.categoryName,
    numberOfImages: req.body.numberOfImages
  });
  category.save().then((createCategory) => {
    res.status(201).json({
      message: "Category added successfully",
      category: {
        ...createCategory,
        id: createCategory._id,
      },
    });
  }).catch(error => {
    res.status(500).json({
      err:error,
      message: "Creating category failed!"
    })
  });
}

exports.updateCategory =   (req, res, next) => {
  const category = new Category({
    _id: req.body.id,
    categoryName: req.body.categoryName,
    numberOfImages: req.body.numberOfImages
  });
  console.log("put method")
  console.log(category)
  Category.updateOne(
    { _id: req.params.id },
    category
  ).then((result) => {
    console.log(result)
    if (result.n > 0) {
      res.status(200).json({
        message: "Updated successfully",
      });
    } else {
      res.status(401).json({
        message: "Not Updated successfully",
      });
    }
  }).catch(error => {
    console.log(error)
    res.status(500).json({
      message: "Couldn't update the category!"
    })
  });
}

exports.getCategorys =  (req, res, next) => {
  const categoryQuery = Category.find();
  let fetchedCategorys;
  categoryQuery
    .then((documents) => {
      fetchedCategorys = documents;
      return Category.count();
    })
    .then((count) => {
      res.status(200).json({
        message: "Category fetched successfully",
        categorys: fetchedCategorys,
        maxCategorys: count,
      });
    }).catch(error => {
      res.status(500).json({
        message: "Fetching categorys failed!"
      })
    });
}

exports.getCategory = (req, res, next) => {
  Category.findById(req.params.id).then((category) => {
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: "Category not found!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching category failed!"
    })
  });
}

exports.deleteCategory = (req, res, next) => {
  Category.deleteOne({ _id: req.params.id}).then(
    (result) => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({
          message: "Deletion successful!",
        });
      } else {
        res.status(401).json({
          message: "Not Authorized",
        });
      }
    }
  ).catch(error => {
    res.status(500).json({
      message: "Deleting category failed!"
    })
  });
}