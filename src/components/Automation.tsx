/**
 * Automation
 * Allow user to load and run automation script
 */

import PropTypes from "prop-types"
import Step from "./Step"
import Button from "./Button"
import {useState} from "react"
import {
    faFolderOpen,
    faPlay,
    faPause,
    faStop,
} from "@fortawesome/free-solid-svg-icons"

const Automation = ({visible}: { visible: boolean }) => {
    const [steps, setSteps] = useState<Step[]>([])

    return (
        <div className={visible ? "automation" : "hide"}>
            <div>
                <Button
                    icon={faFolderOpen}
                    onClick={async () => {
                        try {
                            const result = await window.Main.getFile()
                            if (!result.canceled) {
                                const contents = await window.Main.getFileContents(
                                    result.filePaths[0]
                                )
                                const gcode = contents.split("\n") // Split string into gcode array
                                const _steps = gcode
                                    .filter((val) => val !== "")
                                    .map((val, ind) => ({
                                        id: ind,
                                        command: val.substring(3),
                                        status: ind == 0 ? "pause" : "",
                                        draggable: false,
                                    }))
                                setSteps(_steps)
                            }
                        } catch (err) {
                            console.log(`Error: ${err}`)
                        }
                    }}
                />
                <Button
                    icon={faPlay}
                    onClick={() => {
                        for (const step in steps) console.log(step)
                    }}
                />
                <Button icon={faPause} onClick={() => ({})}/>
                <Button icon={faStop} onClick={() => ({})}/>
            </div>
            <ul>
                {steps.map((step) => (
                    <Step key={step.id} step={step}/>
                ))}
            </ul>
        </div>
    )
}

Automation.propTypes = {
    visible: PropTypes.bool.isRequired,
}

export default Automation
