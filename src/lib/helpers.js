/* eslint prefer-const: 0 */

export const math = {
  pad(num, length) {
    let sLength = num.toString().length;
    while (sLength < length) {
      num = `0${num}`;
      sLength++;
    }
    return num;
  },
};

export const db = {
  dataRows(res) {
    if (!res.length) {
      return [];
    }

    const columns = res[0].columns;
    const values = res[0].values;

    const docs = [];

    for (let row of values.values()) {
      const rowTarget = {};

      for (const key of Object.keys(row)) {
        rowTarget[columns[key]] = row[key];
      }

      docs.push(rowTarget);
    }

    return docs;
  },
  dataRow(res) {
    if (!res.length) {
      return {};
    }

    const columns = res[0].columns;
    const rowData = res[0].values[0];

    let data = {};

    for (let i = 0; i < columns.length; i++) {
      data[columns[i]] = rowData[i];
    }

    return data;
  },
  dataDolumn(res) {
    if (!res.length) {
      return [];
    }

    const values = res[0].values;
    let data = [];

    for (const row of values) {
      data.push(row[0]);
    }

    return data;
  },
  dataValue(res) {
    if (!res.length) {
      return null;
    }

    return res[0].values[0][0];
  },
};

/**
 * 路由解析
 *
 * @param name
 * @param params
 * @returns {*}
 */
export function route(name, params) {
  params = typeof params !== 'object' ? {} : params;

  if (window.apiRoutes[name] === undefined) {
    throw new Error(`helpers.routeParser: route is not found "${name}"`);
  }

  let url = window.apiRoutes[name];

  // 匹配占位符
  let placeholders = url.match(/({(.*?)})/g);
  const placeholderNames = [];

  // 替换占位符 (params)
  if (placeholders) {
    for (let i = 0; i < placeholders.length; i++) {
      let item = placeholders[i];
      let isNecessary = !/\?}$/.test(item);
      let paramName = item.replace(/^{/, '').replace(/\??}$/, '');

      // 如未传入必须参数则抛出异常
      if (isNecessary && !Object.prototype.hasOwnProperty.call(params, paramName)) {
        throw new Error(`helpers.routeParser: param"${paramName}" is necessary`);
      }

      let replace = params[paramName] !== null ? params[paramName] : '';

      url = url.replace(item, replace);

      placeholderNames.push(paramName);
    }
  }

  // 格式化 host & path
  let proto = url.slice(0, url.indexOf('://') + 3);
  let domainAndPath = url.slice(url.indexOf('://') + 3);
  url = proto + domainAndPath.replace(/\/{2,}/g, '/').replace(/\/$/, '');

  // 生成 query
  let query = [];
  for (let paramName in params) {
    if (placeholderNames.indexOf(paramName) === -1) {
      query.push(`${paramName}=${params[paramName]}`);
    }
  }

  url = query.length ? `${url}?` : url;
  url += query.join('&');

  return url;
}

export default {};
