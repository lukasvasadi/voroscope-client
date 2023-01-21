import PropTypes from "prop-types"
import Step from "./Step"
import Button from "./Button"
import { useState } from "react"
import {
  faFolderOpen,
  faPlay,
  faPause,
  faStop,
} from "@fortawesome/free-solid-svg-icons"

const stepsPlaceholder: Step[] = []
for (var i = 0; i < 15; i++) {
  stepsPlaceholder.push({
    id: i,
    command: `X${i * 5 + 10} Y${i * 5 + 10} Z${i} F800`,
    active: i ? false : true,
    draggable: false,
  })
}

const ControlsAutomated = ({ visibility }: { visibility: boolean }) => {
  const [steps, setSteps] = useState<Step[]>(stepsPlaceholder)

  return (
    <div className={visibility ? "sequence" : "hide"}>
      <div>
        <Button
          icon={faFolderOpen}
          onClick={(_e) => {
            window.Main.getFile().then((result: ElectronDialogResult) => {
              // Proceed if user selects file
              if (!result.canceled) {
                window.Main.getFileContents(result.filePaths[0]).then(
                  (contents: string) => {
                    var gcodeList: string[] = contents.split("\n") // Split string into gcode array
                    var stepList: Step[] = [] // Initialize empty step list
                    for (var i = 0; i < gcodeList.length; i++) {
                      // Populate step list if gcode is not an empty string
                      if (gcodeList[i]) {
                        stepList.push({
                          id: i,
                          command: gcodeList[i].substring(3),
                          active: false,
                          draggable: true,
                        })
                      }
                    }
                    console.log(stepList)
                    setSteps(stepList)
                  }
                )
              }
            })
          }}
          onMouseDown={(_e) => {}}
          onMouseUp={(_e) => {}}
        />
        <Button
          icon={faPlay}
          onMouseDown={(_e) => {}}
          onMouseUp={(_e) => {}}
          onClick={(_e) => {}}
        />
        <Button
          icon={faPause}
          onMouseDown={(_e) => {}}
          onMouseUp={(_e) => {}}
          onClick={(_e) => {}}
        />
        <Button
          icon={faStop}
          onMouseDown={(_e) => {}}
          onMouseUp={(_e) => {}}
          onClick={(_e) => {}}
        />
      </div>
      <ul>
        {steps.map((step) => (
          <Step key={step.id} step={step} />
        ))}
      </ul>
    </div>
  )
}

ControlsAutomated.propTypes = {
  visibility: PropTypes.bool,
}

export default ControlsAutomated
