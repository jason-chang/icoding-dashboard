/**
 * 深度拷贝对象
 * @param target
 * @param arg
 * @returns {*}
 * @constructor
 */
export function pObjectCopyDeep(target, arg) {
  for (const argItem in arg) {
    const type = typeof arg[argItem];
    if (!target[argItem] || (type !== 'Object' && type !== 'object')) {
      target[argItem] = arg[argItem];
    } else {
      target[argItem] = pObjectCopyDeep(target[argItem], arg[argItem]);
    }
  }
  return target;
}

/**
 * 解析url参数
 */
export function pUrlParse() {
  const url = window.location.search;
  const obj = {};
  const reg = /[?&][^?&]+=[^?&]+/g;
  const arr = url.match(reg);
  if (arr) {
    arr.forEach(item => {
      const tempArr = item.substring(1).split('=');
      const key = decodeURIComponent(tempArr[0]);
      const val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
}

export function stopEvent(e) {
  if (!e) {
    return;
  }
  if (e.preventDefault) {
    e.preventDefault();
  }
  if (e.stopPropagation) {
    e.stopPropagation();
  }
}

