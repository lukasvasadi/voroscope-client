/**
 * Button
 * Basic application component
 * Requires icon and onClick event handler
 */

import PropTypes from "prop-types"
import Button from "./Button"
import {
  faFolderOpen,
  faFloppyDisk,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

const Settings = ({
  visibility,
  settings,
  updateSettings,
}: {
  visibility: boolean
  settings: Config
  updateSettings: (newConfig: Config) => void
}) => {
  if (settings) {
    const [address, setAddress] = useState<string>(settings.address)
    const [cameraPort, setCameraPort] = useState<number>(settings.cameraPort)
    const [stagePort, setStagePort] = useState<number>(settings.stagePort)
    const [resolution, setResolution] = useState<number[]>(settings.resolution)
    const [pitchXY, setPitchXY] = useState<number>(settings.pitch[0])
    const [pitchZ, setPitchZ] = useState<number>(settings.pitch[2])
    const [imageSavePath, setImageSavePath] = useState<string>(
      settings.imageSavePath
    )

    return (
      <section className={visibility ? "settings" : "hide"}>
        <form>
          <fieldset>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              onChange={(e) => setAddress(e.target.value)}
              defaultValue={address}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="camera-port">Camera Port</label>
            <input
              type="text"
              id="camera-port"
              name="camera-port"
              onChange={(e) => setCameraPort(parseInt(e.target.value))}
              defaultValue={cameraPort}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="stage-port">Stage Port</label>
            <input
              type="text"
              id="stage-port"
              name="stage-port"
              onChange={(e) => setStagePort(parseInt(e.target.value))}
              defaultValue={stagePort}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="resolution">Resolution</label>
            <input
              type="text"
              id="resolution"
              name="resolution"
              readOnly={true}
              onChange={(e) => {
                const arr = e.target.value.split(",")
                setResolution(
                  arr.map((str) => {
                    return parseInt(str, 10)
                  })
                )
              }}
              defaultValue={resolution.toString().replace(",", ", ")}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="pitch-xy">Pitch XY (mm)</label>
            <input
              type="text"
              id="pitch-xy"
              name="pitch-xy"
              onChange={(e) => {
                const val: number = parseFloat(e.target.value)
                if (!Number.isNaN(val)) {
                  setPitchXY(val)
                }
              }}
              defaultValue={pitchXY}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="pitch-z">Pitch Z (mm)</label>
            <input
              type="text"
              id="pitch-z"
              name="pitch-z"
              onChange={(e) => {
                const val: number = parseFloat(e.target.value)
                if (!Number.isNaN(val)) {
                  setPitchZ(val)
                }
              }}
              defaultValue={pitchZ}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="image-save-path">Image save path</label>
            <div>
              <input
                type="text"
                id="image-save-path"
                name="image-save-path"
                onChange={(e) => setImageSavePath(e.target.value)}
                defaultValue={imageSavePath}
              />
              <Button
                icon={faFolderOpen}
                onClick={async () => {
                  try {
                    const result: Electron.OpenDialogReturnValue =
                      await window.Main.getFile(true)
                    if (!result.canceled) {
                      const input = document.querySelector(
                        "input[name='image-save-path']"
                      ) as HTMLInputElement
                      input.value = result.filePaths[0]
                      setImageSavePath(result.filePaths[0])
                    }
                  } catch (err) {
                    console.log(`ERROR: ${err}`)
                  }
                }}
              />
            </div>
          </fieldset>
        </form>
        <div>
          <Button
            icon={faFloppyDisk}
            onClick={() => {
              updateSettings({
                address: address,
                cameraPort: cameraPort,
                stagePort: stagePort,
                resolution: resolution,
                pitch: [pitchXY, pitchXY, pitchZ],
                imageSavePath: imageSavePath,
              })
              const configSaveNotification = new Notification(
                "Hardware configuration updated 🤯"
              )
              setTimeout(() => configSaveNotification.close(), 3000)
            }}
          />
          <Button
            icon={faRotateRight}
            onClick={async () => {
              try {
                const config = await window.Main.getConfig()

                const inputs = document.querySelectorAll(
                  "section.settings input"
                ) as NodeListOf<HTMLInputElement>

                inputs[0].value = config.address
                inputs[1].value = config.cameraPort.toString()
                inputs[2].value = config.stagePort.toString()
                inputs[3].value = config.resolution
                  .toString()
                  .replace(",", ", ")
                inputs[4].value = config.pitch[0].toString()
                inputs[5].value = config.pitch[2].toString()
                inputs[6].value = config.imageSavePath
              } catch (err) {
                console.log(`ERROR: ${err}`)
              }

              const configResetNotification = new Notification(
                "Hardware configuration restored from memory 👀"
              )
              setTimeout(() => configResetNotification.close(), 3000)
            }}
          />
        </div>
      </section>
    )
  }
}

Settings.propTypes = {
  visibility: PropTypes.bool.isRequired,
  settings: PropTypes.object,
  updateSettings: PropTypes.func,
}

export default Settings
