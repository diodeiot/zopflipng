cmake_minimum_required(VERSION 3.15)

project(zopflipng)
set(CMAKE_CXX_STANDARD 11)

add_definitions(-DNAPI_VERSION=8)

include_directories(${CMAKE_JS_INC})
include_directories("addon")
include_directories("addon/napi")
include_directories("third_party/zopfli/src/zopflipng")

file(GLOB SOURCE_FILES addon/zopflipng.cpp)

add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES} ${CMAKE_JS_SRC})
set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")
target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB})

target_link_libraries(
  ${PROJECT_NAME}
  ${CMAKE_CURRENT_SOURCE_DIR}/third_party/zopfli/build/libzopfli.a)

target_link_libraries(
  ${PROJECT_NAME}
  ${CMAKE_CURRENT_SOURCE_DIR}/third_party/zopfli/build/libzopflipng.a)
