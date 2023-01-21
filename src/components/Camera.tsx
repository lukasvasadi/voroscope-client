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
  connectCamera,
}: {
  image: string
  connectCamera: Function
}) => {
  let imageElement: ReactElement
  if (image !== "") {
    imageElement = <img src={"data:image/jpeg;base64, " + image} alt="" />
  } else {
    imageElement = (
      <Button
        icon={faCamera}
        onClick={() => connectCamera(true)}
        onMouseDown={() => {}}
        onMouseUp={() => {}}
      />
    )
  }
  return <div className="camera">{imageElement}</div>
}

Camera.propTypes = {
  image: PropTypes.string.isRequired,
  connectCamera: PropTypes.func,
}

export default Camera
