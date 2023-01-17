import PropTypes from "prop-types"
import Button from "./Button"
import Step from "./Step"
import { useState } from "react"
import {
  faPlus,
  faSave,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons"

const stepsPlaceholder: Step[] = []
for (var i = 0; i < 15; i++) {
  stepsPlaceholder.push({
    id: i,
    command: `X${i * 5 + 10} Y${i * 5 + 10} Z${i} F800`,
    active: i ? false : true,
  })
}

const StepCreate = ({ visibility }: { visibility: boolean }) => {
  const [steps, setSteps] = useState<Step[]>(stepsPlaceholder)

  return (
    <section className={`step-create ${visibility ? "show-block" : "hide"}`}>
      <ul className="sequence-steps">
        {steps.map((step) => (
          <Step key={step.id} step={step} />
        ))}
      </ul>
      <div>
        <form>
          <label>Add step</label>
          <input type="text" placeholder="X1 Y2 Z3 F800" />
          <Button
            icon={faPlus}
            onClick={(_e) => {}}
            onMouseDown={(_e) => {}}
            onMouseUp={(_e) => {}}
          />
        </form>
        <Button
          icon={faSave}
          onClick={(_e) => {}}
          onMouseDown={(_e) => {}}
          onMouseUp={(_e) => {}}
        />
        <Button
          icon={faRotateRight}
          onClick={(_e) => {}}
          onMouseDown={(_e) => {}}
          onMouseUp={(_e) => {}}
        />
      </div>
    </section>
  )
}

StepCreate.propTypes = {
  visibility: PropTypes.bool.isRequired,
}

export default StepCreate
