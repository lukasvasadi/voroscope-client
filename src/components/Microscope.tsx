import PropTypes from "prop-types"
import Camera from "./Camera"
import Panel from "./Panel"

const Microscope = ({
  visibility,
  image,
  grabFrame,
  connectDevs,
  sendMessageStage,
}: {
  visibility: boolean
  image: string
  grabFrame: (() => void)
  connectDevs: ((state: boolean) => void)
  sendMessageStage: ((message: object) => void)
}) => {
  return (
    <section className={visibility ? "microscope" : "hide"}>
      <Camera image={image} connectDevs={connectDevs} />
      <Panel
        grabFrame={grabFrame}
        connectDevs={connectDevs}
        sendMessageStage={sendMessageStage}
      />
    </section>
  )
}

Microscope.propTypes = {
  visibility: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  grabFrame: PropTypes.func.isRequired,
  connectDevs: PropTypes.func.isRequired,
  sendMessageStage: PropTypes.func.isRequired,
}

export default Microscope
