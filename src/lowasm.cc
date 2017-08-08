#include "lowasm.h"

extern "C" {
/**
 * Clamps `number` within the inclusive `lower` and `upper` bounds.
 * @namespace Number
 * @param number Number to clamp.
 * @param lower The lower bound.
 * @param upper The upper bound.
 * @return Clamped number as a float.
 */
float clamp(float number, float lower, float upper) {
  float result = number;
  result = (result <= upper) ? result : upper;
  result = (result >= lower) ? result : lower;
  return result;
}
}
