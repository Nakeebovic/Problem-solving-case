const Joi = require("joi");
const appConfig = require("../../config/app");
const fs = require("fs");
const { parse } = require("csv-parse");
const createSchema = Joi.object().keys({
  fileName: Joi.string().required(),
});

module.exports = {
  create: async (req, res) => {
    const { body } = req;
    const createInputs = await global.helpers.validateInputs.validate(res, createSchema, body);
    req.files[createInputs.fileName].mv(`public/files/${req.files[createInputs.fileName].name}`);
    let prodObj = {};
    const parser = parse({ columns: true }, async function (err, record) {
      for (let i = 0; i < record.length; i++) {
        const element = record[i];
        if (prodObj[element.product]) {
          prodObj[element.product].number += +element.Quantity;
          prodObj[element.product].brand[element.Brand] = prodObj[element.product].brand[element.Brand]
            ? prodObj[element.product].brand[element.Brand] + 1
            : 1;
        } else {
          prodObj[element.product] = { number: 0, avarage: 0, brand: {} };
          prodObj[element.product].number = +element.Quantity;
          prodObj[element.product].brand[element.Brand] = 1;
        }
      }
      await global.helpers.saveFiles(prodObj, record.length, req.files[createInputs.fileName].name);

    });
    await fs.createReadStream(`public/files/${req.files[createInputs.fileName].name}`).pipe(parser);

    return appConfig.send(res, "created", "created");
  },
};
