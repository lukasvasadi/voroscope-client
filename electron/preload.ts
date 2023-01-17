import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron"

export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems
   *
   * The function below can accessed using `window.Main.sendMessage`
   */

  sendMessage: (message: string) => ipcRenderer.send("message", message),
  setConfig: (config: Config) => ipcRenderer.send("set-config", config),
  getConfig: () => ipcRenderer.invoke("get-config"),
  getDefault: () => ipcRenderer.invoke("get-default"),
  closePort: (callback: (event: IpcRendererEvent, ...args: any[]) => void) =>
    ipcRenderer.on("close-port", callback),

  getFile: () => ipcRenderer.invoke("get-file"),
  getFileContents: (filePath: string) =>
    ipcRenderer.invoke("get-file-contents", filePath),

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) =>
    ipcRenderer.on(channel, (_, data) => callback(data)),
}

contextBridge.exposeInMainWorld("Main", api)
