import { api } from "../../electron/preload"

declare global {
  // eslint-disable-next-line
  interface Window {
    Main: typeof api
  }
}

declare namespace api {
  function getSettings(): Promise<object>
  function getFile(): Promise<object>
  function getFileContents(filePath: string): Promise<string>
}
