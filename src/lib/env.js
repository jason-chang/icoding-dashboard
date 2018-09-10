const alias = {
  dev: 'development',
  prod: 'production',
};

export function is(name) {
  if (typeof name === 'string') {
    if (alias[name]) {
      name = alias[name];
    }

    return process.env.NODE_ENV === name;
  }

  return name.indexOf(process.env.NODE_ENV) !== -1;
}

export function not(name) {
  if (typeof name === 'string') {
    if (alias[name]) {
      name = alias[name];
    }

    return this.ENV !== name;
  }

  return name.indexOf(process.env.NODE_ENV) === -1;
}

export default {};
