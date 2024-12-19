/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

module.exports = function (/* ctx */) {
  return {
    css: ['app.scss'],

    extras: [
      'roboto-font', // opcionalno
      'material-icons' // opcionalno
    ],

    boot: [
      'axios' // Dodaj axios boot file
    ],

    build: {
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node20'
      },
      vueRouterMode: 'hash', // 'hash' ili 'history'
      vitePlugins: [
        ['vite-plugin-checker', {
          eslint: {
            lintCommand: 'eslint "./**/*.{js,mjs,cjs,vue}"'
          }
        }]
      ]
    },

    devServer: {
      open: true // automatski otvara preglednik
    },

    framework: {
      config: {},
      plugins: [] // Dodaj Quasar plugine ovdje
    },

    animations: [],

    ssr: {
      pwa: false,
      prodPort: 3000, // port za produkciju
      middlewares: ['render']
    },

    pwa: {
      workboxMode: 'generateSW',
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false
    },

    capacitor: {
      hideSplashscreen: true
    },

    electron: {
      inspectPort: 5858,
      bundler: 'packager',
      packager: {},
      builder: {
        appId: 'knjiznica'
      }
    },

    bex: {
      contentScripts: ['my-content-script']
    }
  };
};
