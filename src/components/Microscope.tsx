import PropTypes from "prop-types"
import Camera from "./Camera"
import Panel from "./Panel"

const Microscope = ({
  visibility,
  image,
  connectCamera,
  sendGcode,
  sendGcodeRelPos,
}: {
  visibility: boolean
  image: string
  connectCamera: Function
  sendGcode: Function
  sendGcodeRelPos: Function
}) => {
  return (
    <section className={visibility ? "microscope" : "hide"}>
      <Camera image={image} connectCamera={connectCamera} />
      <Panel sendGcode={sendGcode} sendGcodeRelPos={sendGcodeRelPos} />
    </section>
  )
}

Microscope.propTypes = {
  visibility: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  connectCamera: PropTypes.func.isRequired,
  sendGcode: PropTypes.func,
  sendGcodeRelPos: PropTypes.func,
}

export default Microscope
