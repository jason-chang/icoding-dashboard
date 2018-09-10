
const variables = {
  system: 'android',
  medium: 'mobile',
  client: 'wechat',
};

function inin() {
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    // ios
    variables.system = 'ios';
  } else if (/(Android)/i.test(navigator.userAgent)) {
    // android
    variables.system = 'android';
  }
}

inin();

function varIs(name, point) {
  if (typeof point === 'string') {
    return variables[name] === point;
  }

  return point.indexOf(variables[name]) !== -1;
}

function varNot(name, point) {
  if (typeof point === 'string') {
    return variables[name] !== point;
  }

  return point.indexOf(variables[name]) === -1;
}

/* =-------------------= 系统判断 =-------------------= */
export function systemIs(point) {
  return varIs('system', point);
}

export function systemNot(point) {
  return varNot('system', point);
}

export function isAndriod() {
  return systemIs('android');
}

export function isIos() {
  return systemIs('ios');
}

/* =-------------------= 媒介判断 =-------------------= */
export function mediumIs(point) {
  return varIs('medium', point);
}

export function mediumNot(point) {
  return varNot('medium', point);
}

export function isInMobile() {
  return mediumIs('mobile');
}

/* =-------------------= 客户端判断 =-------------------= */
export function clientIs(point) {
  return varIs('client', point);
}

export function clientNot(point) {
  return varNot('client', point);
}

export function isInApp() {
  return clientIs('app');
}

export function isInWechat() {
  return clientIs('wechat');
}

export default {};
