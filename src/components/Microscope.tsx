import PropTypes from "prop-types"
import Camera from "./Camera"
import SideBar from "./SideBar"

const Microscope = ({
  visibility,
  image,
  sendGcode,
  sendGcodeRelPos,
}: {
  visibility: boolean
  image: string
  sendGcode: Function
  sendGcodeRelPos: Function
}) => {
  return (
    <section className={`grid microscope ${visibility ? "show-grid" : "hide"}`}>
      <Camera image={image} />
      <SideBar sendGcode={sendGcode} sendGcodeRelPos={sendGcodeRelPos} />
    </section>
  )
}

Microscope.propTypes = {
  visibility: PropTypes.bool.isRequired,
  image: PropTypes.string,
}

export default Microscope
