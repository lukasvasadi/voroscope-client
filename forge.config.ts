import type {ForgeConfig} from "@electron-forge/shared-types"
import {MakerSquirrel} from "@electron-forge/maker-squirrel"
import {MakerZIP} from "@electron-forge/maker-zip"
import {MakerDeb} from "@electron-forge/maker-deb"
import {MakerRpm} from "@electron-forge/maker-rpm"
import {WebpackPlugin} from "@electron-forge/plugin-webpack"

import {mainConfig} from "./webpack.main.config"
import {rendererConfig} from "./webpack.renderer.config"

const config: ForgeConfig = {
    packagerConfig: {
        name: "Voroscope",
        executableName: "Voroscope",
        icon: "assets/icon",
        extraResource: ["assets"],
    },
    rebuildConfig: {},
    makers: [
        new MakerSquirrel({}),
        new MakerZIP({}, ["darwin"]),
        new MakerRpm({}),
        new MakerDeb({}),
    ],
    plugins: [
        new WebpackPlugin({
            devContentSecurityPolicy: "connect-src 'self' ws:;",
            mainConfig,
            renderer: {
                config: rendererConfig,
                entryPoints: [
                    {
                        html: "./public/index.html",
                        js: "./src/index.tsx",
                        name: "main_window",
                        preload: {
                            js: "./electron/preload.ts",
                        },
                    },
                ],
            },
        }),
    ],
}

export default config
