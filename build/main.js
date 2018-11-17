require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./nuxt.config.js":
/*!************************!*\
  !*** ./nuxt.config.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const pkg = __webpack_require__(/*! ./package */ "./package.json");

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [{
      charset: 'utf-8'
    }, {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    }, {
      hid: 'description',
      name: 'description',
      content: pkg.description
    }],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#fff'
  },

  /*
  ** Global CSS
  */
  css: ['element-ui/lib/theme-chalk/index.css', {
    src: 'assets/base.less',
    lang: 'less'
  }],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['@/plugins/element-ui'],

  /*
  ** Nuxt.js modules
  */
  modules: [// Doc: https://github.com/nuxt-community/axios-module#usage
  '@nuxtjs/axios'],

  /*
  ** Axios module configuration
  */
  axios: {// See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          // loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }

  }
};

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, description, author, private, babel, scripts, dependencies, devDependencies, default */
/***/ (function(module) {

module.exports = {"name":"imagegallery","version":"1.0.0","description":"My astonishing Nuxt.js project","author":"zhenxing.xiang","private":true,"babel":{"presets":["es2015"]},"scripts":{"dev":"cross-env NODE_ENV=development nodemon server/index.js --exec backpack --watch server","test":"mocha --require babel-register --recursive","build":"nuxt build && backpack build","start":"cross-env NODE_ENV=production node build/main.js","generate":"nuxt generate","lint":"eslint --ext .js,.vue --ignore-path .gitignore .","precommit":"npm run lint"},"dependencies":{"@nuxtjs/axios":"^5.0.0","consola":"^2.2.6","cross-env":"^5.2.0","element-ui":"^2.4.6","koa":"^2.5.2","koa-bodyparser":"^4.2.1","koa-connect":"^2.0.1","koa-mount":"^4.0.0","koa-static":"^5.0.0","koa-trie-router":"^2.1.6","less":"^3.8.1","less-loader":"^4.1.0","nuxt":"^2.2.0","ramda":"^0.25.0"},"devDependencies":{"babel-cli":"^6.26.0","babel-core":"^6.26.3","babel-eslint":"^8.2.1","babel-preset-env":"^1.7.0","babel-preset-es2015":"^6.24.1","babel-register":"^6.26.0","backpack-core":"^0.8.2","eslint":"^5.0.1","eslint-loader":"^2.0.0","eslint-plugin-vue":"^4.0.0","mocha":"^5.2.0","nodemon":"^1.11.0"}};

/***/ }),

/***/ "./server/config/index.js":
/*!********************************!*\
  !*** ./server/config/index.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/* harmony default export */ __webpack_exports__["default"] = ({
  app: {
    name: 'something',
    version: '1.0.0'
  },
  server: {
    port: 3000
  },
  static_dir: {
    gallery: '../gallery',
    options: {}
  },
  session: {
    secretKey: 'something'
  }
});

/***/ }),

/***/ "./server/index.js":
/*!*************************!*\
  !*** ./server/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./server/config/index.js");
/* harmony import */ var _middlewares__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./middlewares */ "./server/middlewares.js");
/* harmony import */ var koa_static__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! koa-static */ "koa-static");
/* harmony import */ var koa_static__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(koa_static__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_3__);
const Koa = __webpack_require__(/*! koa */ "koa");

const consola = __webpack_require__(/*! consola */ "consola");

const {
  Nuxt,
  Builder
} = __webpack_require__(/*! nuxt */ "nuxt");





const app = new Koa();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || _config__WEBPACK_IMPORTED_MODULE_0__["default"].server.port; // Import and Set Nuxt.js options

let nuxtConfig = __webpack_require__(/*! ../nuxt.config.js */ "./nuxt.config.js");

nuxtConfig.dev = !(app.env === 'production');

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(nuxtConfig); // Build in development

  if (nuxtConfig.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } // access to local file


  const gallery = path__WEBPACK_IMPORTED_MODULE_3___default.a.resolve(__dirname, _config__WEBPACK_IMPORTED_MODULE_0__["default"].static_dir.gallery);
  app.use(koa_static__WEBPACK_IMPORTED_MODULE_2___default()(gallery)); // Middlewares are imported here.

  Object(_middlewares__WEBPACK_IMPORTED_MODULE_1__["default"])(app);
  app.use(async (ctx, next) => {
    await next();
    ctx.status = 200; // koa defaults to 404 when it sees that status is unset

    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve);
      ctx.res.on('finish', resolve);
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject);
      });
    });
  });
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}

start();
/* WEBPACK VAR INJECTION */}.call(this, "server"))

/***/ }),

/***/ "./server/middlewares.js":
/*!*******************************!*\
  !*** ./server/middlewares.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var koa_bodyparser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-bodyparser */ "koa-bodyparser");
/* harmony import */ var koa_bodyparser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_bodyparser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routes */ "./server/routes.js");
 // All middlewares are used here.
// Check other Koa official middlewares: https://github.com/koajs



/* harmony default export */ __webpack_exports__["default"] = (app => {
  // Catch and format the error in the upstream.
  // https://github.com/koajs/koa/wiki/Error-Handling
  app.use(async (ctx, next) => {
    try {
      await next(); // Handle 404 - throw it as an error.

      if (ctx.status === 404 && ctx.res.headersSent === false) {
        ctx.throw(404);
      } // Use this when you want to format the 200 res further.
      // e.g. {"status":200,"data":{"message":"Hello home sample!"}}
      // else, you get, e.g. {"message":"Hello home sample!"}


      if (ctx.status === 200 && ctx.res.headersSent === false) {
        ctx.body = {
          status: 200,
          data: ctx.body
        };
      }
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = {
        status: ctx.status,
        message: err.message
      };
      ctx.app.emit('error', err, ctx);
    }
  }); // The parsed body will store in ctx.request.body
  // If nothing was parsed, body will be an empty object {}
  // https://github.com/koajs/bodyparser
  // https://github.com/koajs/koa/issues/719

  app.use(koa_bodyparser__WEBPACK_IMPORTED_MODULE_0___default()()); // Add routes by group.

  const mount = __webpack_require__(/*! koa-mount */ "koa-mount");

  app.use(mount('/api', Object(_routes__WEBPACK_IMPORTED_MODULE_1__["default"])(app)));
});

/***/ }),

/***/ "./server/routes.js":
/*!**************************!*\
  !*** ./server/routes.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var koa_trie_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-trie-router */ "koa-trie-router");
/* harmony import */ var koa_trie_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_trie_router__WEBPACK_IMPORTED_MODULE_0__);
const fs = __webpack_require__(/*! fs */ "fs");

const path = __webpack_require__(/*! path */ "path");


const router = new koa_trie_router__WEBPACK_IMPORTED_MODULE_0___default.a();
const gallery = path.resolve(__dirname, '../gallery/');

const getImageNames = async function (ctx, next) {
  await next();
  let files = [];
  await new Promise((resolve, reject) => {
    // 读image文件夹
    fs.readdir(gallery, function (err, picFiles) {
      if (err) ctx.throw(err);
      files = picFiles;
      resolve();
    });
  });
  ctx.body = files;
}; //TODO: 文件夹递归查询


/* harmony default export */ __webpack_exports__["default"] = (app => {
  router.get('/images', getImageNames);
  return router.middleware();
});
/* WEBPACK VAR INJECTION */}.call(this, "server"))

/***/ }),

/***/ "consola":
/*!**************************!*\
  !*** external "consola" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("consola");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),

/***/ "koa-bodyparser":
/*!*********************************!*\
  !*** external "koa-bodyparser" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ }),

/***/ "koa-mount":
/*!****************************!*\
  !*** external "koa-mount" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-mount");

/***/ }),

/***/ "koa-static":
/*!*****************************!*\
  !*** external "koa-static" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-static");

/***/ }),

/***/ "koa-trie-router":
/*!**********************************!*\
  !*** external "koa-trie-router" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-trie-router");

/***/ }),

/***/ "nuxt":
/*!***********************!*\
  !*** external "nuxt" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })

/******/ });
//# sourceMappingURL=main.map