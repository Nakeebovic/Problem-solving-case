const router = require("express").Router();
const asyncHandler = require("../middlewares/error-handler/async");
const controllers = global.controllers;
//////// User API ///////////
router.post("/challange", asyncHandler(controllers.challange.createController.create));

module.exports = router;
