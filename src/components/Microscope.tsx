import PropTypes from "prop-types"
import Camera from "./Camera"
import Panel from "./Panel"

const Microscope = ({
  visibility,
  image,
  grabFrame,
  connectDevices,
  sendMessageStage,
  sendGcode,
  sendGcodeRelPos,
}: {
  visibility: boolean
  image: string
  grabFrame: Function
  connectDevices: Function
  sendMessageStage: Function
  sendGcode: Function
  sendGcodeRelPos: Function
}) => {
  return (
    <section className={visibility ? "microscope" : "hide"}>
      <Camera image={image} connectDevices={connectDevices} />
      <Panel
        grabFrame={grabFrame}
        connectDevices={connectDevices}
        sendMessageStage={sendMessageStage}
        sendGcode={sendGcode}
        sendGcodeRelPos={sendGcodeRelPos}
      />
    </section>
  )
}

Microscope.propTypes = {
  visibility: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  grabFrame: PropTypes.func.isRequired,
  connectDevices: PropTypes.func.isRequired,
  sendMessageStage: PropTypes.func,
  sendGcode: PropTypes.func,
  sendGcodeRelPos: PropTypes.func,
}

export default Microscope
