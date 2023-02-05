/**
 * Step
 * A listitem that contains gcode step
 */

import PropTypes from "prop-types"
import Button from "./Button"
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"

const Step = ({
  step,
  addStep,
  deleteStep,
}: {
  step: Step
  addStep: Function
  deleteStep: Function
}) => {
  return (
    <li
      className={`step ${step.active ? "highlight" : ""}`}
      draggable={step.draggable}
    >
      <span>{step.command}</span>
      <span>
        <Button icon={faPlus} onClick={(e) => addStep(e)} />
        <Button icon={faTrash} onClick={(e) => deleteStep(e)} />
      </span>
    </li>
  )
}

// Default event handlers
Step.defaultProps = {
  addStep: (_e: MouseEvent) => {},
  deleteStep: (_e: MouseEvent) => {},
}

Step.propTypes = {
  step: PropTypes.object.isRequired,
  addStep: PropTypes.func,
  deleteStep: PropTypes.func,
}

export default Step
