/**
 * Button
 * Basic application component
 * Requires icon and onClick event handler
 */

import PropTypes from "prop-types"

interface Config {
  endpoint: string
  resolution: Array<number>
}
let config: Config
window.Main.getSettings().then(
  (defaultConfig: Config) => (config = defaultConfig)
)

const Settings = ({ visibility }: { visibility: boolean }) => {
  console.log(config)
  return (
    <section className={`settings ${visibility ? "show-block" : "hide"}`}>
      <form>
        <label htmlFor="endpoint">Endpoint</label>
        <input
          type="text"
          id="endpoint"
          name="endpoint"
          defaultValue={config.endpoint}
        />
      </form>
      <form>
        <label htmlFor="resolution">Resolution</label>
        <input
          type="text"
          id="resolution"
          name="resolution"
          defaultValue={config.resolution.toString()}
        />
      </form>
    </section>
  )
}

Settings.propTypes = {
  visibility: PropTypes.bool.isRequired,
}

export default Settings
