import { contextBridge, ipcRenderer } from "electron"

export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems
   *
   * The function below can accessed using `window.Main.sendMessage`
   */

  sendMessage: (message: string) => ipcRenderer.send("message", message),

  getConfig: () => ipcRenderer.invoke("get-config"),
  setConfig: (config: Config) => ipcRenderer.send("set-config", config),
  getDefault: () => ipcRenderer.invoke("get-default"),
  getFile: (openFile: boolean = false) =>
    ipcRenderer.invoke("get-file", openFile),
  getFileContents: (filePath: string) =>
    ipcRenderer.invoke("get-file-contents", filePath),
  getSavePath: () => ipcRenderer.invoke("get-save-path"),
  saveScript: (path: string, content: string) =>
    ipcRenderer.invoke("save-script", path, content),

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) =>
    ipcRenderer.on(channel, (_, data) => callback(data)),
}

contextBridge.exposeInMainWorld("Main", api)
