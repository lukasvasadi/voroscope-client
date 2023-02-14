import {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  SaveDialogReturnValue,
  OpenDialogReturnValue,
} from "electron"
import { PathOrFileDescriptor } from "fs"
import fs from "fs"
import path from "path"

/**
 * The following allows TypeScript to get the magic constants auto-generated by the Forge Webpack
 * plugin, which inform Electron where to look for the Webpack-bundled app code (depending on
 * whether development or production)
 */
declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true" // Disable security warnings in console

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require("electron-squirrel-startup")) {
  app.quit()
}

class Store {
  path: PathOrFileDescriptor
  data: Config
  constructor(config: { fname: string; data: Config }) {
    const userHomePath = app.getPath("home")

    // this.path = path.join(userDataPath, config.fname + ".json")
    this.path = path.join(userHomePath, config.fname) // Save without json extension
    this.data = parseDataFile(this.path, config.data)
  }

  get() {
    return this.data
  }

  set(data: Config) {
    this.data = data
    fs.writeFileSync(this.path, JSON.stringify(this.data))
  }
}

function parseDataFile(path: fs.PathOrFileDescriptor, data: Config) {
  try {
    /**
     * fs.readFileSync returns a Buffer or string
     *
     * JSON.parse requires string parameter, so any Buffer argument must
     * first be converted to a string type
     */
    return JSON.parse(fs.readFileSync(path).toString())
  } catch (err) {
    return data
  }
}

// Create default system configuration
let defaultConfig: Config = {
  endpoint: "ws://10.0.151.85:8765",
  imageSavePath: path.join(
    app.getPath("home"),
    "Documents",
    "Voroscope",
    "Data"
  ),
  resolution: [640, 480],
  pitchXY: 3.0,
  pitchZ: 0.5,
}

// Initialize store
const store = new Store({
  fname: ".voroconfig",
  data: defaultConfig,
})

let mainWindow: BrowserWindow
const createWindow = (): void => {
  // Create the browser window
  mainWindow = new BrowserWindow({
    height: 900,
    width: 1200,
    resizable: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  // Load the html
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  // Open DevTools
  mainWindow.webContents.openDevTools({ mode: "detach" })
}

async function registerListeners() {
  /**
   * From bridge integration
   * Check preload.ts for more details
   */
  ipcMain.on("message", (_, message) => {
    console.log(message)
  })

  ipcMain.handle("get-default", (): Config => {
    return defaultConfig
  })

  ipcMain.handle("get-config", (): Config => {
    return store.get()
  })

  ipcMain.on("set-config", (_, config): void => store.set(config))

  ipcMain.handle(
    "get-file",
    async (_, openDir: boolean = false): Promise<OpenDialogReturnValue> => {
      return dialog.showOpenDialog(mainWindow, {
        properties: openDir ? ["openDirectory"] : ["openFile"],
      })
    }
  )

  ipcMain.handle("get-file-contents", (_, filePath: string): string => {
    return fs.readFileSync(filePath, "utf-8")
  })

  ipcMain.handle("get-save-path", async (): Promise<SaveDialogReturnValue> => {
    return dialog.showSaveDialog(mainWindow, {
      defaultPath: path.join(app.getPath("home"), "Documents", "steps.gcode"),
      properties: ["createDirectory"],
      filters: [{ name: "Gcode", extensions: [".gcode"] }],
    })
  })

  ipcMain.handle("save-script", (_, path: string, content: string): void => {
    fs.writeFile(path, content, (err) => {
      if (err) {
        console.error(err)
      }
      // File written successfully
    })
  })

  /**
   * https://stackoverflow.com/questions/43487543/writing-binary-data-using-node-js-fs-writefile-to-create-an-image-file
   */
  ipcMain.on("save-image-file", (_, base64String: string): void => {
    var buf = Buffer.from(base64String, "base64")
    fs.writeFile("image.jpg", buf, (err) => {
      if (err) throw err
      console.log("Image file saved!")
    })
  })
}

/**
 * This method will be called when Electron has finished
 * initialization and is ready to create browser windows
 *
 * Some APIs can only be used after this event occurs
 */
app
  .on("ready", createWindow)
  .whenReady()
  .then(registerListeners)
  .catch((err) => console.error(err))

/**
 * Quit when all windows are closed, except on macOS, where it is common
 * for applications and their menu bars to remain active until the user quits
 * explicitly with Cmd + Q
 */
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  /**
   * On OS X itis common to re-create a window in the app when the
   * dock icon is clicked and there are no other windows open
   */
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
