/* 
  Manual controls component
  Occupies right-hand side of main microscope window
  Provides user ability to translate stage, control image feed, and 
  capture images
*/

import PropTypes from "prop-types"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import {
  faDotCircle,
  faArrowCircleUp,
  faArrowCircleLeft,
  faArrowCircleRight,
  faArrowCircleDown,
  faHome,
  faPaperPlane,
  faXmark,
  faLightbulb,
  faCamera,
} from "@fortawesome/free-solid-svg-icons"
import Button from "./Button"

interface Control {
  id: number
  icon: IconProp
  arr: number[]
}

const xyIcons = [
  faDotCircle,
  faArrowCircleUp,
  faDotCircle,
  faArrowCircleLeft,
  faHome,
  faArrowCircleRight,
  faDotCircle,
  faArrowCircleDown,
  faDotCircle,
]

const zIcons = [faArrowCircleUp, faArrowCircleDown]

let xyId = 0
var xyControls: Control[] = []

for (let y = 1; y >= -1; y--) {
  for (let x = -1; x <= 1; x++) {
    xyControls.push({
      id: xyId,
      icon: xyIcons[xyId],
      arr: [x, y, 0],
    })
    xyId++
  }
}

let zId = 0
let zControls: Control[] = []

for (let z = 1; z >= -1; z -= 2) {
  zControls.push({
    id: zId,
    icon: zIcons[zId],
    arr: [0, 0, z],
  })
  zId++
}

// Define timer function for mouse down events
let interval: NodeJS.Timeout
const timer = (callback: (...args: any[]) => void, delay: number = 1000) => {
  interval = setInterval(callback, delay)
}

let config: Config
window.Main.getConfig().then((conf) => {
  config = conf
})

const Controls = ({
  visibility,
  grabFrame,
  connectDevs,
  sendMessageStage,
}: {
  visibility: boolean
  grabFrame: Function
  connectDevs: Function
  sendMessageStage: Function
}) => {
  return (
    /* 
      Map each button to xyz binary array 
      Arrays get multiplied by user-defined pitch value 
    */
    <div className={visibility ? "controls" : "hide"}>
      <div className="pane">
        <h3>xy</h3>
        <div className="xy">
          {xyControls.map((xy) => (
            <Button
              key={xy.id}
              icon={xy.icon}
              onClick={() => {
                let cmd = xy.arr.map((val, ind) => val * config.pitch[ind])
                sendMessageStage({
                  cmd: `G0 X${cmd[0]} Y${cmd[1]} Z${cmd[2]}`,
                })
              }}
              onMouseDown={() => {
                timer(() => {
                  let cmd = xy.arr.map((val, ind) => val * config.pitch[ind])
                  sendMessageStage({
                    cmd: `G0 X${cmd[0]} Y${cmd[1]} Z${cmd[2]}`,
                  })
                })
              }}
              onMouseUp={() => clearInterval(interval)}
            />
          ))}
        </div>
      </div>
      <div className="pane">
        <h3>z</h3>
        <div>
          {zControls.map((z) => (
            <Button
              key={z.id}
              icon={z.icon}
              onClick={() => {
                let cmd = z.arr.map((val, ind) => val * config.pitch[ind])
                sendMessageStage({
                  cmd: `G0 X${cmd[0]} Y${cmd[1]} Z${cmd[2]}`,
                })
              }}
              onMouseDown={() => {
                timer(() => {
                  let cmd = z.arr.map((val, ind) => val * config.pitch[ind])
                  sendMessageStage({
                    cmd: `G0 X${cmd[0]} Y${cmd[1]} Z${cmd[2]}`,
                  })
                })
              }}
              onMouseUp={() => clearInterval(interval)}
            />
          ))}
        </div>
      </div>
      <div className="pane">
        <h3>gcode</h3>
        <form>
          <input
            type="text"
            placeholder="G1 X0 Y0 Z0"
            required
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                e.preventDefault()
                sendMessageStage({ cmd: "G90" }) // Momentarily switch to absolute positioning
                sendMessageStage({ cmd: (e.target as HTMLInputElement).value })
                sendMessageStage({ cmd: "G91" }) // Return to relative stage positioning
              }
            }}
          />
          <Button
            icon={faPaperPlane}
            onClick={() => {
              console.log(visibility)
            }}
          />
        </form>
      </div>
      <div className="pane">
        <h3>camera</h3>
        <div>
          <Button
            icon={faCamera}
            onClick={() => {
              grabFrame()
            }}
          />
          <Button icon={faLightbulb} onClick={() => {}} />
          <Button
            icon={faXmark}
            onClick={() => {
              connectDevs(false)
            }}
          />
        </div>
      </div>
    </div>
  )
}

Controls.propTypes = {
  visibility: PropTypes.bool.isRequired,
  grabFrame: PropTypes.func.isRequired,
  connectDevs: PropTypes.func.isRequired,
  sendMessageStage: PropTypes.func.isRequired,
}

export default Controls
