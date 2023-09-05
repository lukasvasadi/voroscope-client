import {contextBridge, ipcRenderer, FileFilter} from "electron"

export const api = {
    /**
     * Here you can expose functions to the renderer process
     * to interact with the main (electron) side without security problems
     *
     * The function below can be accessed using `window.Main.sendMessage`
     */

    sendMessage: (message: string) => ipcRenderer.send("message", message),

    getDefaultConfig: () => ipcRenderer.invoke("get-default-config"),
    getConfig: () => ipcRenderer.invoke("get-config"),
    setConfig: (config: Config) => ipcRenderer.send("set-config", config),
    getFile: (openFile = false) =>
        ipcRenderer.invoke("get-file", openFile),
    getFileContents: (filePath: string) =>
        ipcRenderer.invoke("get-file-contents", filePath),
    getSavePath: (
        filename = "steps.gcode",
        filter: FileFilter = {name: "Gcode", extensions: [".gcode"]}
    ) => ipcRenderer.invoke("get-save-path", filename, filter),
    saveScript: (path: string, content: string) =>
        ipcRenderer.invoke("save-script", path, content),
    saveImage: (base64String: string, filename: string) =>
        ipcRenderer.send("save-image", base64String, filename),

    /**
     * Provide an easier way to listen to events
     */
    on: (channel: string, callback: (data: string) => void) =>
        ipcRenderer.on(channel, (_, data) => callback(data)),
}

contextBridge.exposeInMainWorld("Main", api)
