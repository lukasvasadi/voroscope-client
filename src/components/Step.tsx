import PropTypes from "prop-types"

const Step = ({ step }: { step: object | any }) => {
  return (
    <h4 className={`step ${step.active ? "highlight" : ""}`}>
      X:{step.x} &nbsp; Y:{step.y} &nbsp; Z:{step.z} &nbsp; SPEED:{step.speed}
    </h4>
  )
}

Step.propTypes = {
  step: PropTypes.object,
}

export default Step
