const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const inventoryController = require("../controllers/inventoryController");

router.get("/checkBought", auth, inventoryController.checkBought);
router.post("/buyInventory", auth, inventoryController.buyInventory);

module.exports = router;
