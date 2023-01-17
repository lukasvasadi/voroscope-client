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
  }

  interface ElectronDialogResult {
    canceled: boolean
    filePaths: string[]
  }

  interface Step {
    id: number
    command: string
    active: boolean
  }
}

declare namespace api {
  function setConfig(config: Config): void
  function getConfig(): Promise<object>
  function getDefault(): Promise<Config>
  function closePort(
    callback: (event: IpcRendererEvent, ...args: any[]) => void
  ): void
  function getSettings(): Promise<object>
  function getFile(): Promise<object>
  function getFileContents(filePath: string): Promise<string>
}
