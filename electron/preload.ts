import { contextBridge, ipcRenderer, FileFilter } from "electron"

export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems
   *
   * The function below can accessed using `window.Main.sendMessage`
   */

  sendMessage: (message: string) => ipcRenderer.send("message", message),

  getDefaultConfig: () => ipcRenderer.invoke("get-default-config"),
  getConfig: () => ipcRenderer.invoke("get-config"),
  setConfig: (config: Config) => ipcRenderer.send("set-config", config),
  getFile: (openFile: boolean = false) =>
    ipcRenderer.invoke("get-file", openFile),
  getFileContents: (filePath: string) =>
    ipcRenderer.invoke("get-file-contents", filePath),
  getSavePath: (
    fname: string = "steps.gcode",
    filter: FileFilter = { name: "Gcode", extensions: [".gcode"] }
  ) => ipcRenderer.invoke("get-save-path", fname, filter),
  saveScript: (path: string, content: string) =>
    ipcRenderer.invoke("save-script", path, content),
  saveImage: (base64String: string, fname: string) =>
    ipcRenderer.send("save-image", base64String, fname),

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) =>
    ipcRenderer.on(channel, (_, data) => callback(data)),
}

contextBridge.exposeInMainWorld("Main", api)
