import PropTypes from "prop-types"
import {
  faCog,
  faFileCode,
  faMicroscope,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons"
import Button from "./Button"

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
        onMouseDown={(_e) => {}}
        onMouseUp={(_e) => {}}
      />
      <Button
        icon={faFileCode}
        onClick={() => {
          props.setVisMicroscope(false)
          props.setVisStepCreate(true)
          props.setVisSettings(false)
          props.setVisAbout(false)
        }}
        onMouseDown={(_e) => {}}
        onMouseUp={(_e) => {}}
      />
      <Button
        icon={faCog}
        onClick={() => {
          props.setVisMicroscope(false)
          props.setVisStepCreate(false)
          props.setVisSettings(true)
          props.setVisAbout(false)
        }}
        onMouseDown={(_e) => {}}
        onMouseUp={(_e) => {}}
      />
      <Button
        icon={faQuestionCircle}
        onClick={() => {
          props.setVisMicroscope(false)
          props.setVisStepCreate(false)
          props.setVisSettings(false)
          props.setVisAbout(true)
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
