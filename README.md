# zopflipng

zopflipng is a native addon module of google's zopflipng.

> [!WARNING]  
> Currently this package doesn't use pre-built binaries. It builds addon from source code while package is installed. Compilation process uses `Cmake`, `Make` or `Ninja` so these binaries should be in the path.

## Install

```sh
npm install zopflipng
```

## Example

```js
import { optimize } from "zopflipng";
const pngContent = "[Png content here]";
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
```

When contributing code, please write relevant tests and run `npm test` before submitting pull requests.

## License

MIT
