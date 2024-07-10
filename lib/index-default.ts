const zopflipng = require("../build/Release/zopflipng.node");

export enum ZopfliPNGFilterStrategy {
  kStrategyZero,
  kStrategyOne,
  kStrategyTwo,
  kStrategyThree,
  kStrategyFour,
  kStrategyMinSum,
  kStrategyEntropy,
  kStrategyPredefined,
  kStrategyBruteForce,
}

/**
 * Options of the zopflipng.
 * see https://github.com/google/zopfli/blob/master/src/zopflipng/zopflipng_lib.h
 */
export type ZopfliPNGOptions = {
  verbose: boolean;

  /** Allow altering hidden colors of fully transparent pixels */
  lossy_transparent: boolean;

  /** Convert 16-bit per channel images to 8-bit per channel */
  lossy_8bit: boolean;

  /** Filter strategies to try */
  filter_strategies: ZopfliPNGFilterStrategy[];

  /** Automatically choose filter strategy using less good compression */
  auto_filter_strategy: boolean;

  /**
   * Keep original color type (RGB, RGBA, gray, gray+alpha or palette) and bit
   * depth of the PNG.
   * This results in a loss of compression opportunities, e.g. it will no
   * longer convert a 4-channel RGBA image to 2-channel gray+alpha if the image
   * only had translucent gray pixels.
   * May be useful if a device does not support decoding PNGs of a particular
   * color type.
   * Default value: false.
   */
  keep_colortype: boolean;

  /**
   * PNG chunks to keep
   * chunks to literally copy over from the original PNG to the resulting one
   */
  keepchunks: string[];

  /** Use Zopfli deflate compression */
  use_zopfli: boolean;

  /** Zopfli number of iterations */
  num_iterations: number;

  /** Zopfli number of iterations on large images */
  num_iterations_large: number;
};

export function optimize(data: Buffer, options?: Partial<ZopfliPNGOptions>) {
  return zopflipng.optimize(
    data,
    options?.verbose ?? true,
    options?.lossy_transparent ?? false,
    options?.lossy_8bit ?? false,
    options?.filter_strategies ?? [],
    options?.auto_filter_strategy ?? true,
    options?.keep_colortype ?? false,
    options?.keepchunks ?? [],
    options?.use_zopfli ?? true,
    options?.num_iterations ?? 15,
    options?.num_iterations_large ?? 5
  ) as Buffer;
}
