const fs = require("fs/promises");

async function placeheaders() {
  try {
    await fs.access("addon/napi", fs.constants.F_OK);
    return;
  } catch (error) {}
  await fs.mkdir("addon/napi");
  await fs.copyFile("node_modules/node-addon-api/napi.h", "addon/napi/napi.h");
  await fs.copyFile(
    "node_modules/node-addon-api/napi-inl.h",
    "addon/napi/napi-inl.h"
  );
  await fs.copyFile(
    "node_modules/node-addon-api/napi-inl.deprecated.h",
    "addon/napi/napi-inl.deprecated.h"
  );
}

placeheaders();
