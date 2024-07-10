const fs = require("fs/promises");
const { optimize } = require("../buildjs");
const { PNG } = require("pngjs");
const { assert } = require("console");

async function test() {
  const origContent = await fs.readFile("./assets/nodejs.png");
  const origPng = PNG.sync.read(origContent);

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
  const newContent = optimize(origContent, options);
  console.log((newContent.length / origContent.length).toFixed(3));

  //verify new png content
  const newPng = PNG.sync.read(newContent);
  assert(origPng.width === newPng.width);
  assert(origPng.height === newPng.height);
}

test();
