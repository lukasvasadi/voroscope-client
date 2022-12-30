import PropTypes from "prop-types"
import {
  faCog,
  faFileCode,
  faMicroscope,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons"
import Button from "./Button"

interface PropsDefinition {
  setVisibilityMicroscope(visibility: boolean): void
  setVisibilityStepCreate(visibility: boolean): void
  setVisibilitySettings(visibility: boolean): void
  setVisibilityAbout(visibility: boolean): void
}

const Toolbar = (props: PropsDefinition) => {
  return (
    <header>
      <Button
        icon={faMicroscope}
        onClick={() => {
          props.setVisibilityMicroscope(true)
          props.setVisibilityStepCreate(false)
          props.setVisibilitySettings(false)
          props.setVisibilityAbout(false)
        }}
        onMouseDown={(_e) => {}}
        onMouseUp={(_e) => {}}
      />
      <Button
        icon={faFileCode}
        onClick={() => {
          props.setVisibilityMicroscope(false)
          props.setVisibilityStepCreate(true)
          props.setVisibilitySettings(false)
          props.setVisibilityAbout(false)
        }}
        onMouseDown={(_e) => {}}
        onMouseUp={(_e) => {}}
      />
      <Button
        icon={faCog}
        onClick={() => {
          props.setVisibilityMicroscope(false)
          props.setVisibilityStepCreate(false)
          props.setVisibilitySettings(true)
          props.setVisibilityAbout(false)
        }}
        onMouseDown={(_e) => {}}
        onMouseUp={(_e) => {}}
      />
      <Button
        icon={faQuestionCircle}
        onClick={() => {
          props.setVisibilityMicroscope(false)
          props.setVisibilityStepCreate(false)
          props.setVisibilitySettings(false)
          props.setVisibilityAbout(true)
        }}
        onMouseDown={(_e) => {}}
        onMouseUp={(_e) => {}}
      />
    </header>
  )
}

Toolbar.propTypes = {
  setVisibility: PropTypes.func,
}

export default Toolbar
