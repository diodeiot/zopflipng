cmake_minimum_required(VERSION 3.15)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)
set(CMAKE_POSITION_INDEPENDENT_CODE ON)
project(zopflipng_addon)
set(CMAKE_CXX_STANDARD 11)

add_definitions(-DNAPI_VERSION=8)

include_directories(${CMAKE_JS_INC})
include_directories("addon/napi")
include_directories("third_party/zopfli/src/zopflipng")

file(GLOB SOURCE_FILES addon/*.cpp)
add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES} ${CMAKE_JS_SRC})
set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")
target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB})

add_subdirectory(third_party/zopfli)
target_link_libraries(${PROJECT_NAME} libzopflipng)
target_compile_options(libzopflipng PRIVATE -fPIC)
