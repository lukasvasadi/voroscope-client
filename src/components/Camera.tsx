/* 
  Camera view
  Show live feed from Raspi
  Requires image data string
*/

import PropTypes from "prop-types"
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
        <FontAwesomeIcon icon={faCamera} className="fa-cam" />
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
  image: PropTypes.string,
}

export default Camera
