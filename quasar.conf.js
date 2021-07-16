/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

module.exports = function( /* ctx */ ) {
    return {
        // https://quasar.dev/quasar-cli/cli-documentation/supporting-ie
        supportIE: false,

        // https://quasar.dev/quasar-cli/cli-documentation/supporting-ts
        supportTS: false,

        // https://quasar.dev/quasar-cli/cli-documentation/prefetch-feature
        // preFetch: true,

        // app boot file (/src/boot)
        // --> boot files are part of "main.js"
        // https://quasar.dev/quasar-cli/cli-documentation/boot-files
        boot: [

            'axios',
        ],

        // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
        css: [
            'app.scss'
        ],

        // https://github.com/quasarframework/quasar/tree/dev/extras
        extras: [
            // 'ionicons-v4',
            // 'mdi-v5',
            'fontawesome-v5',
            // 'eva-icons',
            // 'themify',
            // 'line-awesome',
            // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

            'roboto-font', // optional, you are not bound to it
            'material-icons', // optional, you are not bound to it
            'material-icons-outlined'
        ],

        // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
        build: {
            vueRouterMode: 'history', // available values: 'hash', 'history'

            // Add dependencies for transpiling with Babel (Array of regexes)
            // (from node_modules, which are by default not transpiled).
            // Does not applies to modern builds.
            // transpileDependencies: [],

            // modern: true, // https://quasar.dev/quasar-cli/modern-build
            // rtl: false, // https://quasar.dev/options/rtl-support
            // preloadChunks: true,
            // showProgress: false,
            // gzip: true,
            // analyze: true,

            // Options below are automatically set depending on the env, set them if you want to override
            // extractCSS: false,

            // https://quasar.dev/quasar-cli/cli-documentation/handling-webpack
            extendWebpack(cfg) {},
        },

        // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
        devServer: {
            https: true,
            port: 8080,
            open: true // opens browser window automatically
        },

        // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
        framework: {
            iconSet: 'material-icons', // Quasar icon set
            lang: 'en-us', // Quasar language pack

            // Possible values for "all":
            // * 'auto' - Auto-import needed Quasar components & directives
            //            (slightly higher compile time; next to minimum bundle size; most convenient)
            // * false  - Manually specify what to import
            //            (fastest compile time; minimum bundle size; most tedious)
            // * true   - Import everything from Quasar
            //            (not treeshaking Quasar; biggest bundle size; convenient)
            all: 'auto',

            components: [],
            directives: [],

            // Quasar plugins
            plugins: [
                'Loading',
                'Notify'
            ]
        },

        // animations: 'all', // --- includes all animations
        // https://quasar.dev/options/animations
        animations: [],

        // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
        ssr: {
            pwa: false
        },

        // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
        pwa: {
            workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
            workboxOptions: {}, // only for GenerateSW
            manifest: {
                name: 'QWeather App',
                short_name: 'QWeather App',
                description: 'Yours QWeather App',
                display: 'standalone',
                orientation: 'portrait',
                background_color: '#ffffff',
                theme_color: '#027be3',
                icons: [{
                        src: 'src/statics/icons/android-icon-36x36.png',
                        sizes: '36x36',
                        type: 'image/png',
                        density: '0.75'
                    },
                    {
                        src: 'src/statics/icons/android-icon-48x48.png',
                        sizes: '48x48',
                        type: 'image/png',
                        density: '1.0'
                    },
                    {
                        src: 'src/statics/icons/android-icon-72x72.png',
                        sizes: '72x72',
                        type: 'image/png',
                        density: '1.5'
                    },
                    {
                        src: 'src/statics/icons/android-icon-96x96.png',
                        sizes: '96x96',
                        type: 'image/png',
                        density: '2.0'
                    },
                    {
                        src: 'src/statics/icons/android-icon-144x144.png',
                        sizes: '144x144',
                        type: 'image/png',
                        density: '3.0'
                    },
                    {
                        src: 'src/statics/icons/android-icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        density: '4.0'
                    },


                ]
            }
        },

        // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
        cordova: {
            // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
            id: 'com.paavalopoika.qweatherapp'
        },

        // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
        capacitor: {
            hideSplashscreen: true
        },

        // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
        electron: {
            bundler: 'packager', // 'packager' or 'builder'

            packager: {
                platform: 'win32'
                    // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

                // OS X / Mac App Store
                // appBundleId: '',
                // appCategoryType: '',
                // osxSign: '',
                // protocol: 'myapp://path',

                // Windows only
                // win32metadata: { ... }
            },

            builder: {
                // https://www.electron.build/configuration/configuration

                appId: 'qweather-app'
            },

            // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
            nodeIntegration: true,

            extendWebpack( /* cfg */ ) {
                // do something with Electron main process Webpack cfg
                // chainWebpack also available besides this extendWebpack
            }
        }
    }
}