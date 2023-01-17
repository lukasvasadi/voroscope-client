import PropTypes from "prop-types"
import Button from "./Button"
import { useState } from "react"
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"

const Step = ({ step }: { step: Step }) => {
  return (
    <li className={`step ${step.active ? "highlight" : ""}`}>
      <span>{step.command}</span>
      <span>
        <Button
          icon={faPlus}
          onMouseDown={(_e) => {}}
          onMouseUp={(_e) => {}}
          onClick={(_e) => {}}
        />
        <Button
          icon={faTrash}
          onMouseDown={(_e) => {}}
          onMouseUp={(_e) => {}}
          onClick={(_e) => {}}
        />
      </span>
    </li>
  )
}

Step.propTypes = {
  step: PropTypes.object,
}

export default Step
