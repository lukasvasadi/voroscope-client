/**
 * Button
 * Basic application component
 * Requires icon and onClick event handler
 */

import PropTypes from "prop-types"
import Button from "./Button"
import { faFloppyDisk, faRotateRight } from "@fortawesome/free-solid-svg-icons"
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

    return (
      <section className={`settings ${visibility ? "show-grid" : "hide"}`}>
        <form>
          <label htmlFor="endpoint">Endpoint</label>
          <input
            type="text"
            id="endpoint"
            name="endpoint"
            onChange={(e) => setEndpoint(e.target.value)}
            defaultValue={settings.endpoint}
          />
        </form>
        <form>
          <label htmlFor="resolution">Resolution</label>
          <input
            type="text"
            id="resolution"
            name="resolution"
            onChange={(e) => {
              var arr = e.target.value.split(",")
              setResolution(
                arr.map((str) => {
                  return parseInt(str, 10)
                })
              )
            }}
            defaultValue={settings.resolution.toString()}
          />
        </form>
        <form>
          <label htmlFor="pitch-xy">Pitch XY (mm)</label>
          <input
            type="text"
            id="pitch-xy"
            name="pitch-xy"
            onChange={(e) => setPitchXY(parseFloat(e.target.value))}
            defaultValue={settings.pitchXY}
          />
        </form>
        <form>
          <label htmlFor="pitch-z">Pitch Z (mm)</label>
          <input
            type="text"
            id="pitch-z"
            name="pitch-z"
            onChange={(e) => setPitchZ(parseFloat(e.target.value))}
            defaultValue={settings.pitchZ}
          />
        </form>
        <Button
          icon={faFloppyDisk}
          onClick={(_e) => {
            updateSettings({
              endpoint: endpoint,
              resolution: resolution,
              pitchXY: pitchXY,
              pitchZ: pitchZ,
            })
          }}
          onMouseDown={(_e) => {}}
          onMouseUp={(_e) => {}}
        />
        <Button
          icon={faRotateRight}
          onClick={(_e) => {
            window.Main.getDefault().then((config) => console.log(config))
          }}
          onMouseDown={(_e) => {}}
          onMouseUp={(_e) => {}}
        />
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
