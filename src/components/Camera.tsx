/**
 * Camera
 * Show live feed from Raspberry Pi imaging module
 * Requires image base64 string
 */

import PropTypes from "prop-types"
import Button from "./Button"
import {faCamera} from "@fortawesome/free-solid-svg-icons"
import {ReactElement} from "react"

const Camera = ({
                    image,
                    connectDevs,
                }: {
    image: string | null
    connectDevs: ((state: boolean) => void)
}) => {
    let imageElement: ReactElement
    if (image)
        // imageElement = <img src={"data:image/jpeg;base64, " + image} alt="" />
        imageElement = <img src={image} alt=""/>
    else
        imageElement = <Button icon={faCamera} onClick={() => connectDevs(true)}/>
    return <div className="camera">{imageElement}</div>
}

Camera.propTypes = {
    image: PropTypes.string,
    connectDevs: PropTypes.func.isRequired,
}

export default Camera
