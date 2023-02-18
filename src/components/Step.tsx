/**
 * Step
 * A listitem that contains gcode step
 */

import PropTypes from "prop-types"
import Button from "./Button"
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"

const Step = ({
  step,
  stepStartId,
  stepEnterId,
  addStep,
  deleteStep,
}: {
  step: Step
  stepStartId: React.MutableRefObject<number | null>
  stepEnterId: React.MutableRefObject<number | null>
  addStep: Function
  deleteStep: Function
}) => {
  return (
    <li
      className={`step ${step.active ? "highlight" : ""}`}
      draggable={step.draggable}
      onDragStart={() => (stepStartId.current = step.id)}
      onDragEnter={() => (stepEnterId.current = step.id)}
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
  stepStartId: null,
  stepEnterId: null,
  addStep: (_e: MouseEvent) => {},
  deleteStep: (_e: MouseEvent) => {},
}

Step.propTypes = {
  step: PropTypes.object.isRequired,
  stepStartId: PropTypes.object,
  stepEnterId: PropTypes.object,
  addStep: PropTypes.func,
  deleteStep: PropTypes.func,
}

export default Step
