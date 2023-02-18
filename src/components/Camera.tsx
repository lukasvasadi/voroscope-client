/**
 * Camera
 * Show live feed from Raspi imaging module
 * Requires image data string
 */

import PropTypes from "prop-types"
import Button from "./Button"
import { faCamera } from "@fortawesome/free-solid-svg-icons"
import { ReactElement } from "react"

const Camera = ({
  image,
  connectDevices,
}: {
  image: string
  connectDevices: Function
}) => {
  let imageElement: ReactElement
  if (image)
    imageElement = <img src={"data:image/jpeg;base64, " + image} alt="" />
  else
    imageElement = (
      <Button icon={faCamera} onClick={() => connectDevices(true)} />
    )
  return <div className="camera">{imageElement}</div>
}

Camera.propTypes = {
  image: PropTypes.string.isRequired,
  connectDevices: PropTypes.func.isRequired,
}

export default Camera
