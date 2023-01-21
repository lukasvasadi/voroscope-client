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
  settings: Config | null
  updateSettings: Function
}) => {
  if (settings) {
    const [endpoint, setEndpoint] = useState<string>(settings.endpoint)
    const [resolution, setResolution] = useState<number[]>(settings.resolution)
    const [pitchXY, setPitchXY] = useState<number>(settings.pitchXY)
    const [pitchZ, setPitchZ] = useState<number>(settings.pitchZ)
    const [imageSavePath, setImageSavePath] = useState<string>(
      settings.imageSavePath
    )

    return (
      <section className={visibility ? "settings" : "hide"}>
        <form>
          <fieldset>
            <label htmlFor="endpoint">Endpoint</label>
            <input
              type="text"
              id="endpoint"
              name="endpoint"
              onChange={(e) => setEndpoint(e.target.value)}
              defaultValue={endpoint}
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
                var arr = e.target.value.split(",")
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
              onChange={(e) => setPitchXY(parseFloat(e.target.value))}
              defaultValue={pitchXY}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="pitch-z">Pitch Z (mm)</label>
            <input
              type="text"
              id="pitch-z"
              name="pitch-z"
              onChange={(e) => setPitchZ(parseFloat(e.target.value))}
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
                onClick={() => {
                  window.Main.getFile(true).then(
                    (result: ElectronDialogResult) => {
                      if (!result.canceled) {
                        const input = document.querySelector(
                          "input[name='image-save-path']"
                        ) as HTMLInputElement
                        input.value = result.filePaths[0]
                        setImageSavePath(result.filePaths[0])
                      }
                    }
                  )
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
                endpoint: endpoint,
                resolution: resolution,
                pitchXY: pitchXY,
                pitchZ: pitchZ,
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
            onClick={() => {
              window.Main.getConfig().then((config) => {
                console.log(config)
                const inputs = document.querySelectorAll(
                  "section.settings input"
                ) as NodeListOf<HTMLInputElement>
                console.log(config)
                inputs[0].value = config.endpoint
                inputs[1].value = config.resolution
                  .toString()
                  .replace(",", ", ")
                inputs[2].value = config.pitchXY.toString()
                inputs[3].value = config.pitchZ.toString()
                inputs[4].value = config.imageSavePath
              })
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
