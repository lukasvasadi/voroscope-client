/**
 * Toolbar
 * Navigation menu to switch between window options
 * Uses React callbacks to toggle window visibility
 */

import PropTypes from "prop-types"
import Button from "./Button"
import {
    faCog,
    faFileCode,
    faMicroscope,
    faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons"

const Toolbar = ({
                     toggleVisMicroscope,
                     toggleVisScripting,
                     toggleVisSettings,
                     toggleVisAbout,
                 }: {
    toggleVisMicroscope: ((render: boolean) => void)
    toggleVisScripting: ((render: boolean) => void)
    toggleVisSettings: ((render: boolean) => void)
    toggleVisAbout: ((render: boolean) => void)
}) => {
    return (
        <header>
            <div>
                <Button
                    icon={faMicroscope}
                    onClick={() => {
                        toggleVisMicroscope(true)
                        toggleVisScripting(false)
                        toggleVisSettings(false)
                        toggleVisAbout(false)
                    }}
                />
                <Button
                    icon={faFileCode}
                    onClick={() => {
                        toggleVisMicroscope(false)
                        toggleVisScripting(true)
                        toggleVisSettings(false)
                        toggleVisAbout(false)
                    }}
                />
                <Button
                    icon={faCog}
                    onClick={() => {
                        toggleVisMicroscope(false)
                        toggleVisScripting(false)
                        toggleVisSettings(true)
                        toggleVisAbout(false)
                    }}
                />
                <Button
                    icon={faQuestionCircle}
                    onClick={() => {
                        toggleVisMicroscope(false)
                        toggleVisScripting(false)
                        toggleVisSettings(false)
                        toggleVisAbout(true)
                    }}
                />
            </div>
        </header>
    )
}

Toolbar.propTypes = {
    toggleVisMicroscope: PropTypes.func.isRequired,
    toggleVisScripting: PropTypes.func.isRequired,
    toggleVisSettings: PropTypes.func.isRequired,
    toggleVisAbout: PropTypes.func.isRequired,
}

export default Toolbar
