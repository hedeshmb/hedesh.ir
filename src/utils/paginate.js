import _ from "lodash";

export function paginate(items, pageNUmber, pageSize) {
  const startIndex = (pageNUmber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
