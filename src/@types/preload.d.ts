import { SaveDialogReturnValue, OpenDialogReturnValue } from "electron"
import { api } from "../../electron/preload"

declare global {
  // eslint-disable-next-line
  interface Window {
    Main: typeof api
  }

  interface Config {
    endpoint: string
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
  function setConfig(config: Config): void
  function getConfig(): Promise<Config>
  function getDefault(): Promise<Config>
  // function closePort(
  //   callback: (event: IpcRendererEvent, ...args: any[]) => void
  // ): void
  function getSavePath(): Promise<SaveDialogReturnValue>
  function getFile(openDir: boolean = false): Promise<OpenDialogReturnValue>
  function getFileContents(filePath: string): Promise<string>
  function saveScript(path: string, content: string): void
}
