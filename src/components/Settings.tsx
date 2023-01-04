/**
 * Button
 * Basic application component
 * Requires icon and onClick event handler
 */

import PropTypes from "prop-types"
import Button from "./Button"
import { faCamera } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

interface Config {
  endpoint: string
  resolution: Array<number>
}

const Settings = ({
  visibility,
  settings,
  updateSettings,
}: {
  visibility: boolean
  settings: Config
  updateSettings: Function
}) => {
  const [endpoint, setEndpoint] = useState<string>(settings.endpoint)
  const [resolution, setResolution] = useState<number[]>(settings.resolution)

  return (
    <section className={`settings ${visibility ? "show-block" : "hide"}`}>
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
      <Button
        icon={faCamera}
        onClick={(_e) => {
          updateSettings({
            endpoint: endpoint,
            resolution: resolution,
          })
        }}
        onMouseDown={(_e) => {}}
        onMouseUp={(_e) => {}}
      />
    </section>
  )
}

Settings.propTypes = {
  visibility: PropTypes.bool.isRequired,
  settings: PropTypes.object.isRequired,
  updateSettings: PropTypes.func,
}

export default Settings
