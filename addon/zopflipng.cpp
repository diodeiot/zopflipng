#include <iostream>

#include <napi.h>
#include "zopflipng_lib.h"

#define ARG_CHECK(env, eval, message)             \
    do                                            \
    {                                             \
        if (!(eval))                              \
            throw Napi::Error::New(env, message); \
    } while (0);

Napi::Value optimize(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();
    ARG_CHECK(env, info.Length() == 11, "invalid param count");

    ARG_CHECK(env, info[0].IsBuffer(), "0. param should be buffer");
    Napi::Uint8Array data_js = info[0].As<Napi::Uint8Array>();
    std::vector<uint8_t> data(data_js.Data(), data_js.Data() + data_js.ByteLength());

    ARG_CHECK(env, info[1].IsBoolean(), "1. param should be boolean");
    Napi::Boolean verbose = info[1].As<Napi::Boolean>();

    ARG_CHECK(env, info[2].IsBoolean(), "2. param should be boolean");
    Napi::Boolean lossy_transparent = info[2].As<Napi::Boolean>();

    ARG_CHECK(env, info[3].IsBoolean(), "3. param should be boolean");
    Napi::Boolean lossy_8bit = info[3].As<Napi::Boolean>();

    ARG_CHECK(env, info[4].IsArray(), "4. param should be array");
    Napi::Array filter_strategies_js = info[4].As<Napi::Array>();
    std::vector<ZopfliPNGFilterStrategy> filter_strategies(filter_strategies_js.Length());
    for (size_t i = 0; i < filter_strategies_js.Length(); i++)
    {
        Napi::Value element = filter_strategies_js.Get(i);
        ARG_CHECK(env, element.IsNumber(), "elements of 4. param should be number");
        int str = element.As<Napi::Number>();
        filter_strategies.push_back((ZopfliPNGFilterStrategy)str);
    }

    ARG_CHECK(env, info[5].IsBoolean(), "5. param should be boolean");
    Napi::Boolean auto_filter_strategy = info[5].As<Napi::Boolean>();

    ARG_CHECK(env, info[6].IsBoolean(), "6. param should be boolean");
    Napi::Boolean keep_colortype = info[6].As<Napi::Boolean>();

    ARG_CHECK(env, info[7].IsArray(), "7. param should be array");
    Napi::Array keepchunksArray = info[7].As<Napi::Array>();
    std::vector<std::string> keepchunks;
    for (size_t i = 0; i < keepchunksArray.Length(); ++i)
    {
        Napi::Value element = keepchunksArray.Get(i);
        ARG_CHECK(env, element.IsString(), "elements of 7. param should be string");
        std::string str = element.As<Napi::String>();
        keepchunks.push_back(str);
    }

    ARG_CHECK(env, info[8].IsBoolean(), "8. param should be boolean");
    Napi::Boolean use_zopfli = info[8].As<Napi::Boolean>();

    ARG_CHECK(env, info[9].IsNumber(), "9. param should be number");
    Napi::Number num_iterations = info[9].As<Napi::Number>();

    ARG_CHECK(env, info[10].IsNumber(), "10. param should be boolean");
    Napi::Number num_iterations_large = info[10].As<Napi::Number>();

    ZopfliPNGOptions options;
    options.verbose = verbose;
    options.lossy_transparent = lossy_transparent;
    options.lossy_8bit = lossy_8bit;
    options.filter_strategies = filter_strategies;
    options.auto_filter_strategy = auto_filter_strategy;
    options.keep_colortype = keep_colortype;
    options.keepchunks = keepchunks;
    options.use_zopfli = use_zopfli;
    options.num_iterations = num_iterations;
    options.num_iterations_large = num_iterations_large;
    std::vector<uint8_t> result;
    int ret = ZopfliPNGOptimize(data, options, options.verbose, &result);
    ARG_CHECK(env, ret == 0, "ZopfliPNGOptimize() returned=" + std::to_string(ret));
    return Napi::Buffer<uint8_t>::Copy(env, result.data(), result.size());
}

Napi::Object Optimize(Napi::Env env, Napi::Object exports)
{
    exports.Set(Napi::String::New(env, "optimize"), Napi::Function::New(env, optimize));
    return exports;
}

NODE_API_MODULE(zopflipng, Optimize)