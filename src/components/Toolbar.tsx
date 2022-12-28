import PropTypes from "prop-types"
import {
  faCog,
  faRobot,
  faFileCode,
  faMicroscope,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons"
import Button from "./Button"

interface PropsDefinition {
  setVisibilityMicroscope(data: boolean): void
  setVisibilityStepCreate(data: boolean): void
}

const Toolbar = (props: PropsDefinition) => {
  return (
    <header>
      <Button
        icon={faMicroscope}
        onClick={() => {
          props.setVisibilityMicroscope(true)
          props.setVisibilityStepCreate(false)
        }}
        onMouseDown={(_e) => {}}
        onMouseUp={(_e) => {}}
      />
      {/* <Button
        icon={faRobot}
        onClick={() => {
          props.setVisibilityMicroscope(true)
          props.setVisibilityStepCreate(false)
        }}
      /> */}
      <Button
        icon={faFileCode}
        onClick={() => {
          props.setVisibilityMicroscope(false)
          props.setVisibilityStepCreate(true)
        }}
        onMouseDown={(_e) => {}}
        onMouseUp={(_e) => {}}
      />
      <Button
        icon={faCog}
        onClick={() => {
          props.setVisibilityMicroscope(false)
          props.setVisibilityStepCreate(true)
        }}
        onMouseDown={(_e) => {}}
        onMouseUp={(_e) => {}}
      />
      <Button
        icon={faQuestionCircle}
        onClick={() => {
          props.setVisibilityMicroscope(false)
          props.setVisibilityStepCreate(true)
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
