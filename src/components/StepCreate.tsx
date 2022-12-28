import PropTypes from "prop-types"
import Button from "./Button"
import Step from "./Step"
import { useState } from "react"
import { faUpload } from "@fortawesome/free-solid-svg-icons"

const StepCreate = ({ visibility }: { visibility: boolean }) => {
  const push = () => {
    console.log("upload")
  }

  const [steps, setSteps] = useState([
    {
      id: 0,
      x: 7,
      y: 2,
      z: 3,
      speed: 800,
      active: true,
    },
    {
      id: 1,
      x: 7,
      y: 2,
      z: 3,
      speed: 800,
      active: false,
    },
    {
      id: 2,
      x: 7,
      y: 2,
      z: 3,
      speed: 800,
      active: false,
    },
    {
      id: 3,
      x: 7,
      y: 2,
      z: 3,
      speed: 800,
      active: false,
    },
    {
      id: 4,
      x: 7,
      y: 2,
      z: 3,
      speed: 800,
      active: false,
    },
    {
      id: 5,
      x: 7,
      y: 2,
      z: 3,
      speed: 800,
      active: false,
    },
    {
      id: 6,
      x: 7,
      y: 2,
      z: 3,
      speed: 800,
      active: false,
    },
    {
      id: 7,
      x: 7,
      y: 2,
      z: 3,
      speed: 800,
      active: false,
    },
    {
      id: 8,
      x: 7,
      y: 2,
      z: 3,
      speed: 800,
      active: false,
    },
    {
      id: 9,
      x: 7,
      y: 2,
      z: 3,
      speed: 800,
      active: false,
    },
    {
      id: 10,
      x: 7,
      y: 2,
      z: 3,
      speed: 800,
      active: false,
    },
  ])

  return (
    <section className={`step-create ${visibility ? "show-block" : "hide"}`}>
      <div>
        <div className="sequence-steps">
          {steps.map((step) => (
            <Step key={step.id} step={step} />
          ))}
        </div>
      </div>
      <div>
        <form>
          <label>Add step</label>
          <input type="text" placeholder="X1 Y2 Z3 F800" />
          <Button
            icon={faUpload}
            onClick={push}
            onMouseDown={(_e) => {}}
            onMouseUp={(_e) => {}}
          />
        </form>
      </div>
    </section>
  )
}

StepCreate.propTypes = {
  visibility: PropTypes.bool.isRequired,
}

export default StepCreate
