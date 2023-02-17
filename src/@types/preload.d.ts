import { SaveDialogReturnValue, OpenDialogReturnValue } from "electron"
import { api } from "../../electron/preload"

declare global {
  // eslint-disable-next-line
  interface Window {
    Main: typeof api
  }

  interface Config {
    address: string
    cameraPort: number
    stagePort: number
    resolution: number[]
    pitchXY: number
    pitchZ: number
    imageSavePath: string
  }

  interface Step {
    id: number
    command: string
    active: boolean
    draggable: boolean
  }
}

declare namespace api {
  function getDefaultConfig(): Promise<Config>
  function getConfig(): Promise<Config>
  function setConfig(config: Config): void
  function getFile(openDir: boolean = false): Promise<OpenDialogReturnValue>
  function getFileContents(filePath: string): Promise<string>
  function getSavePath(): Promise<SaveDialogReturnValue>
  function saveScript(path: string, content: string): void
  function saveImage(base64String: string): void
}
