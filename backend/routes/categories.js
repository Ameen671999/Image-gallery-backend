const express = require("express");
const CategoryController = require("../controllers/category")
const router = express.Router();

router.post("",CategoryController.createCategory);

router.put("/:id", CategoryController.updateCategory);

router.get("",CategoryController.getCategorys);

router.get("/:id", CategoryController.getCategory);

router.delete("/:id",  CategoryController.deleteCategory);

module.exports = router;