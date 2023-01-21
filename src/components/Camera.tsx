/**
 * Camera
 * Show live feed from Raspi imaging module
 * Requires image data string
 */

import PropTypes from "prop-types"
import Button from "./Button"
import { faCamera } from "@fortawesome/free-solid-svg-icons"
import { useEffect, ReactElement } from "react"

const Camera = ({
  image,
  cameraConnect,
}: {
  image: string
  cameraConnect: Function
}) => {
  let imageElement: ReactElement
  if (image !== "") {
    imageElement = <img src={"data:image/jpeg;base64, " + image} alt="" />
  } else {
    imageElement = (
      <Button
        icon={faCamera}
        onClick={() => cameraConnect(true)}
        onMouseDown={(_) => {}}
        onMouseUp={(_) => {}}
      />
    )
  }
  return <div className="camera">{imageElement}</div>
}

Camera.propTypes = {
  image: PropTypes.string.isRequired,
  cameraConnect: PropTypes.func,
}

export default Camera
