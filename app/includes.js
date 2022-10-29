// =========================================================================
// ===============Include routes files==============//

const system = require("./systems");

global.controllers = system.controllers;
global.helpers = system.helpers;

// db.sequelize.sync({alter: false});
// =========================================================================
