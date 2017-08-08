cmake_minimum_required(VERSION 3.7)
project(lowasm)

set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -std=c++11")

add_executable(lowasm lib/lowasm.cc)
