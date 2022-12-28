import PropTypes from "prop-types"
import Camera from "./Camera"

const Automation = ({
  visibility,
  image,
}: {
  visibility: boolean
  image: string
}) => {
  return (
    <section className={`grid microscope ${visibility ? "show-grid" : "hide"}`}>
      <Camera image={image} />
    </section>
  )
}

Automation.propTypes = {
  visibility: PropTypes.bool.isRequired,
  image: PropTypes.string,
}

export default Automation
