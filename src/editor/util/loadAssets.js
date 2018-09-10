
const assets = {
  markdownCss: 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.9.0/github-markdown.min.css',
  highlightJs: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js',
  highlightJsLang: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/languages/{param}.min.js',
  highlightJsCssStyle: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/{param}.min.css',
};

// create script element to load js
export function loadJs(src, callback) {
  if (!(typeof callback === 'function')) {
    callback = () => {};
  }
  const check = document.querySelectorAll(`script[src='${src}']`);
  if (check.length > 0) {
    check[0].addEventListener('load', () => {
      callback();
    });
    callback();
    return;
  }
  const script = document.createElement('script');
  const head = document.getElementsByTagName('head')[0];
  script.type = 'text/javascript';
  script.charset = 'UTF-8';
  script.src = src;
  if (script.addEventListener) {
    script.addEventListener('load', () => {
      callback();
    }, false);
  } else if (script.attachEvent) {
    script.attachEvent('onreadystatechange', () => {
      const target = window.event.srcElement;
      if (target.readyState === 'loaded') {
        callback();
      }
    });
  }
  head.appendChild(script);
}

// Create link element to load css.
export function loadCss(src, callback) {
  if (!(typeof callback === 'function')) {
    callback = () => {};
  }
  const check = document.querySelectorAll(`link[href='${src}']`);
  if (check.length > 0) {
    callback();
    return;
  }
  const link = document.createElement('link');
  const head = document.getElementsByTagName('head')[0];
  link.rel = 'stylesheet';
  link.href = src;
  if (link.addEventListener) {
    link.addEventListener('load', () => {
      callback();
    }, false);
  } else if (link.attachEvent) {
    link.attachEvent('onreadystatechange', () => {
      const target = window.event.srcElement;
      if (target.readyState === 'loaded') {
        callback();
      }
    });
  }
  head.appendChild(link);
}

export default {};
