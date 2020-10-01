// Object util functions

/**
 * Returns true if object is empty / contains no properties
 * @param obj
 */
export const isEmpty = (obj: any): Boolean => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};
