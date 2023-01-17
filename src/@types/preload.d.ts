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
}

declare namespace api {
  function setConfig(config: Config): void
  function getConfig(): Promise<object>
  function getDefault(): Promise<Config>
  function closePort(
    callback: (event: IpcRendererEvent, ...args: any[]) => void
  ): void
}
