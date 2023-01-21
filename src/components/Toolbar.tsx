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

interface PropsDefinition {
  setVisMicroscope(visibility: boolean): void
  setVisStepCreate(visibility: boolean): void
  setVisSettings(visibility: boolean): void
  setVisAbout(visibility: boolean): void
}

const Toolbar = (props: PropsDefinition) => {
  return (
    <header>
      <Button
        icon={faMicroscope}
        onClick={() => {
          props.setVisMicroscope(true)
          props.setVisStepCreate(false)
          props.setVisSettings(false)
          props.setVisAbout(false)
        }}
      />
      <Button
        icon={faFileCode}
        onClick={() => {
          props.setVisMicroscope(false)
          props.setVisStepCreate(true)
          props.setVisSettings(false)
          props.setVisAbout(false)
        }}
      />
      <Button
        icon={faCog}
        onClick={() => {
          props.setVisMicroscope(false)
          props.setVisStepCreate(false)
          props.setVisSettings(true)
          props.setVisAbout(false)
        }}
      />
      <Button
        icon={faQuestionCircle}
        onClick={() => {
          props.setVisMicroscope(false)
          props.setVisStepCreate(false)
          props.setVisSettings(false)
          props.setVisAbout(true)
        }}
      />
    </header>
  )
}

Toolbar.propTypes = {
  props: PropTypes.object,
}

export default Toolbar
