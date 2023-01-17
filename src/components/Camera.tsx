/**
 * Camera
 * Show live feed from Raspi imaging module
 * Requires image data string
 */

import PropTypes from "prop-types"
import Button from "./Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCamera } from "@fortawesome/free-solid-svg-icons"
import { ReactElement } from "react"

const Camera = ({ image }: { image: string }) => {
  let imageElement: ReactElement
  if (image !== "") {
    imageElement = <img src={"data:image/jpeg;base64, " + image} alt="" />
  } else {
    imageElement = (
      <div className="filler">
        <Button
          icon={faCamera}
          onClick={(_) => {}}
          onMouseDown={(_) => {}}
          onMouseUp={(_) => {}}
        />
      </div>
    )
  }
  return (
    <section>
      <div className="camera">{imageElement}</div>
    </section>
  )
}

Camera.propTypes = {
  image: PropTypes.string.isRequired,
}

export default Camera
