import PropTypes from "prop-types"
import Camera from "./Camera"
import Panel from "./Panel"

const Microscope = ({
  visibility,
  cameraConnect,
  image,
  sendGcode,
  sendGcodeRelPos,
}: {
  visibility: boolean
  cameraConnect: Function
  image: string
  sendGcode: Function
  sendGcodeRelPos: Function
}) => {
  return (
    <section className={visibility ? "microscope" : "hide"}>
      <Camera image={image} connectCamera={cameraConnect} />
      <Panel sendGcode={sendGcode} sendGcodeRelPos={sendGcodeRelPos} />
    </section>
  )
}

Microscope.propTypes = {
  visibility: PropTypes.bool.isRequired,
  image: PropTypes.string,
  sendGcode: PropTypes.func,
  sendGcodeRelPos: PropTypes.func,
}

export default Microscope
