const express = require("express");
const router = express.Router(); 
const mpController = require("../controllers/mpController");


// My routes

router.get("/", mpController.home);

router.get("/detail", mpController.detail);

router.get("/success", mpController.success);

router.get("/failure", mpController.failure);

router.get("/pending", mpController.pending);

router.post("/notifications", mpController.notifications);

router.get("/api/products", mpController.apiProducts);


module.exports = router;