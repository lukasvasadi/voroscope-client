import PropTypes from "prop-types"
import Camera from "./Camera"
import Panel from "./Panel"

const Microscope = ({
  visibility,
  image,
  connect,
  sendGcode,
  sendGcodeRelPos,
}: {
  visibility: boolean
  image: string
  connect: Function
  sendGcode: Function
  sendGcodeRelPos: Function
}) => {
  return (
    <section className={visibility ? "microscope" : "hide"}>
      <Camera image={image} connect={connect} />
      <Panel sendGcode={sendGcode} sendGcodeRelPos={sendGcodeRelPos} />
    </section>
  )
}

Microscope.propTypes = {
  visibility: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  connect: PropTypes.func.isRequired,
  sendGcode: PropTypes.func,
  sendGcodeRelPos: PropTypes.func,
}

export default Microscope
