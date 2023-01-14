import PropTypes from "prop-types"

const Step = ({ step }: { step: object | any }) => {
  return (
    <h4 className={`step ${step.active ? "highlight" : ""}`}>{step.command}</h4>
  )
}

Step.propTypes = {
  step: PropTypes.object,
}

export default Step
