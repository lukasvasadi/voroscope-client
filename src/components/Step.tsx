/**
 * Step
 * A listitem that contains gcode step
 */

import PropTypes from "prop-types"
import Button from "./Button"
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"

const Step = ({
  step,
  stepAdd,
  stepDelete,
}: {
  step: Step
  stepAdd: Function
  stepDelete: Function
}) => {
  return (
    <li
      className={`step ${step.active ? "highlight" : ""}`}
      draggable={step.draggable}
    >
      <span>{step.command}</span>
      <span>
        <Button icon={faPlus} onClick={() => stepAdd()} />
        <Button icon={faTrash} onClick={() => stepDelete()} />
      </span>
    </li>
  )
}

// By default, stepAdd and stepDelete are void
Step.defaultProps = {
  stepAdd: () => {},
  stepDelete: () => {},
}

Step.propTypes = {
  step: PropTypes.object,
  stepAdd: PropTypes.func,
  stepDelete: PropTypes.func,
}

export default Step
