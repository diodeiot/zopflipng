const fs = require("fs/promises");
const { optimize, ZopfliPNGFilterStrategy } = require("../buildjs");
const { assert } = require("console");

async function test() {
  const pngContent = await fs.readFile("./assets/nodejs.png");
  const options = {
    verbose: true,
    lossy_transparent: false,
    lossy_8bit: false,
    filter_strategies: [],
    auto_filter_strategy: true,
    keep_colortype: false,
    keepchunks: [],
    use_zopfli: true,
    num_iterations: 15,
    num_iterations_large: 5,
  };
  const newSize = optimize(pngContent, options).length;
  console.log((newSize / pngContent.length).toFixed(3));
}

test();
