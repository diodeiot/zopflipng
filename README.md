# zopflipng

zopflipng is a native addon module of google's zopflipng.

> [!WARNING]  
> Curently this package can only run on unix-like systems

> [!WARNING]  
> Currently this package doesn't use pre-built binaries. It builds addon from source code while package is installed. Compilation process uses `Cmake`, `Make` or `Ninja` and `GCC` so these binaries should be in the path.

## Install

```sh
npm install zopflipng
```

## Example

```sh
npm install pngjs
```

```js
import fs from "fs/promises";
import { optimize } from "zopflipng";

const pngContent = await fs.readFile(
  "node_modules/pngquantjs/assets/nodejs.png"
);
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
optimize(pngContent, options);
```

## Contribution

### Development

```sh
git clone https://github.com/diodeiot/zopflipng --recursive
cd zopflipng
yarn
yarn build
```

When contributing code, please write relevant tests and run `npm test` before submitting pull requests.

## License

MIT
