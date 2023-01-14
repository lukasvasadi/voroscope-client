import { api } from "../../electron/preload"

declare global {
  // eslint-disable-next-line
  interface Window {
    Main: typeof api
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
  function getSettings(): Promise<object>
  function getFile(): Promise<object>
  function getFileContents(filePath: string): Promise<string>
}
