'use strict'

process.env.NODE_ENV = 'production'

const { say } = require('cfonts')
const { setViewResolver, getRoutes } = require('../src/router/routes');

const axios = require('axios');
const chalk = require('chalk');
const del = require('del');
const webpack = require('webpack');
const Multispinner = require('multispinner');

const envConf = require('../.env');
const buildConfig = require('./webpack.conf/build.conf');

const doneLog = chalk.bgGreen.white(' DONE ') + ' '
const errorLog = chalk.bgRed.white(' ERROR ') + ' '
const okayLog = chalk.bgBlue.white(' OKAY ') + ' '
const isCI = process.env.CI || false

if (process.env.BUILD_TARGET === 'clean') clean()
else build()

function clean() {
  del.sync(['dist/*', '!.gitignore'])
  console.log(`\n${doneLog}\n`)
  process.exit()
}

function build () {
  greeting()

  del.sync(['dist/*', '!.gitignore'])

  const m = new Multispinner([
    'app',
    'cache-routes'
  ], {
    preText: 'building',
    postText: 'process',
    autoStart: true,
  })

  let results = ''

  m.on('success', () => {
    process.stdout.write('\x1B[2J\x1B[0f')
    console.log(`\n\n${results}`)
    console.log(`${okayLog}take it away ${chalk.yellow('`success`')}\n`)
  });

  cacheRoutes()
    .then(() => {
      m.success('cache-routes');
    })
    .catch(err => {
      throw err;
      m.error('cache-routes');
    });

  pack(buildConfig)
    .then(result => {
      results += result + '\n\n'
      m.success('app');

      cacheRoutes()
        .then(() => {
          m.success('cache-routes');
        }).catch(err => {
          throw err;
          m.error('cache-routes');
        });
    }).catch(err => {
      m.error('app');
      console.log(`\n  ${errorLog}failed to build app process`);
      console.error(`\n${err}\n`);
      process.exit(1);
    });
}


function cacheRoutes() {

  setViewResolver(() => '');
  const appRoutes = getRoutes();

  const routesForCache = {};

  const resolvePath = (path) => {
    const dirs = path.split('/');
    const where = {};
    const parts = [];

    dirs.map((item) => {
      // 匹配 :id(\d+)
      const match = item.match(/:([\w\d]+)(?:\((.*?)\))?/);
      const conf = {};
      if (match) {
        parts.push(`{${match[1]}}`);
        if (match[2]) {
          where[match[1]] = match[2];
        }
      } else {
        parts.push(item);
      }
    });

    return {
      path: parts.join('/'),
      where,
    };
  };

  const resolveRoute = (routes, basePath) => {
    routes.map((item) => {
      if (item.name) {
        const route = Object.assign(resolvePath(basePath ? `${basePath}/${item.path}`: item.path), {name: item.name})
        routesForCache[item.name] = route;
      } else if (item.children) {
        resolveRoute(item.children, basePath ? `${basePath}/${item.path}`: item.path);
      }
    });
  };

  resolveRoute(appRoutes);

  const cacheRoutesApi = `${envConf.API_ROUTE_DOMAIN}/api/util/cache-frontend-routes`;

  return axios.post(cacheRoutesApi, {
    token: envConf.FRONTEND_BUILD_TOKEN,
    routes: routesForCache,
  });
}

function pack (config) {
  return new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) reject(err.stack || err)
      else if (stats.hasErrors()) {
        let err = ''

        stats.toString({
          chunks: false,
          colors: true
        })
        .split(/\r?\n/)
        .forEach(line => {
          err += `    ${line}\n`
        })

        reject(err)
      } else {
        resolve(stats.toString({
          chunks: false,
          colors: true
        }))
      }
    })
  })
}

function greeting () {
  const cols = process.stdout.columns
  let text = ''

  if (cols > 85) text = 'lets-build'
  else if (cols > 60) text = 'lets-|build'
  else text = false

  if (text && !isCI) {
    say(text, {
      colors: ['yellow'],
      font: 'simple3d',
      space: false
    })
  } else console.log(chalk.yellow.bold('\n  lets-build'))
  console.log()
}
