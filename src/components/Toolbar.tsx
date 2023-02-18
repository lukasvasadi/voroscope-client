/**
 * Toolbar
 * Navigation menu to switch between window options
 * Uses React state to toggle window visibility
 */

import PropTypes from "prop-types"
import Button from "./Button"
import {
  faCog,
  faFileCode,
  faMicroscope,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons"

const Toolbar = ({
  toggleVisMicroscope,
  toggleVisScripting,
  toggleVisSettings,
  toggleVisAbout,
}: {
  toggleVisMicroscope: Function
  toggleVisScripting: Function
  toggleVisSettings: Function
  toggleVisAbout: Function
}) => {
  return (
    <header>
      <Button
        icon={faMicroscope}
        onClick={() => {
          toggleVisMicroscope(true)
          toggleVisScripting(false)
          toggleVisSettings(false)
          toggleVisAbout(false)
        }}
      />
      <Button
        icon={faFileCode}
        onClick={() => {
          toggleVisMicroscope(false)
          toggleVisScripting(true)
          toggleVisSettings(false)
          toggleVisAbout(false)
        }}
      />
      <Button
        icon={faCog}
        onClick={() => {
          toggleVisMicroscope(false)
          toggleVisScripting(false)
          toggleVisSettings(true)
          toggleVisAbout(false)
        }}
      />
      <Button
        icon={faQuestionCircle}
        onClick={() => {
          toggleVisMicroscope(false)
          toggleVisScripting(false)
          toggleVisSettings(false)
          toggleVisAbout(true)
        }}
      />
    </header>
  )
}

Toolbar.propTypes = {
  toggleVisMicroscope: PropTypes.func,
  toggleVisScripting: PropTypes.func,
  toggleVisSettings: PropTypes.func,
  toggleVisAbout: PropTypes.func,
}

export default Toolbar
