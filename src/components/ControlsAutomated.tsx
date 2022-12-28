import PropTypes from "prop-types"
import Step from "./Step"
import Button from "./Button"
import { useState } from "react"
import {
  faFolderOpen,
  faPlay,
  faPause,
  faStop,
} from "@fortawesome/free-solid-svg-icons"

const ControlsAutomated = ({ visibility }: { visibility: boolean }) => {
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

  const open = () => {
    console.log("open")
  }

  return (
    <section
      className={`controls sequence ${visibility ? "show-block" : "hide"}`}
    >
      <div className="sequence-btns">
        <Button
          icon={faFolderOpen}
          onClick={open}
          onMouseDown={(_e) => {}}
          onMouseUp={(_e) => {}}
        />
        <Button
          icon={faPlay}
          onMouseDown={(_e) => {}}
          onMouseUp={(_e) => {}}
          onClick={open}
        />
        <Button
          icon={faPause}
          onMouseDown={(_e) => {}}
          onMouseUp={(_e) => {}}
          onClick={open}
        />
        <Button
          icon={faStop}
          onMouseDown={(_e) => {}}
          onMouseUp={(_e) => {}}
          onClick={open}
        />
      </div>
      <div className="sequence-steps">
        {steps.map((step) => (
          <Step key={step.id} step={step} />
        ))}
      </div>
    </section>
  )
}

ControlsAutomated.propTypes = {
  visibility: PropTypes.bool,
}

export default ControlsAutomated
