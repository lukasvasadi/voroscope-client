/* 
  Manual controls component
  Occupies right-hand side of main microscope window
  Provides user ability to translate stage, control image feed, and 
  capture images
*/

import PropTypes from "prop-types"
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

// Define timer function for mouse down events
let interval: NodeJS.Timeout
const timer = (callback: (...args: any[]) => void, delay: number = 1000) => {
  interval = setInterval(callback, delay)
}

// Create mappings for button layout
const xyControlsTop = [
  {
    id: 0,
    icon: faDotCircle,
    arr: [-1, 0, 1],
  },
  {
    id: 1,
    icon: faArrowCircleUp,
    arr: [0, 0, 1],
  },
  {
    id: 2,
    icon: faDotCircle,
    arr: [1, 0, 1],
  },
  {
    id: 3,
    icon: faArrowCircleLeft,
    arr: [-1, 0, 0],
  },
]

const xyControlsBtm = [
  {
    id: 0,
    icon: faArrowCircleRight,
    arr: [1, 0, 0],
  },
  {
    id: 1,
    icon: faDotCircle,
    arr: [-1, 0, -1],
  },
  {
    id: 2,
    icon: faArrowCircleDown,
    arr: [0, 0, -1],
  },
  {
    id: 3,
    icon: faDotCircle,
    arr: [1, 0, -1],
  },
]

const zControls = [
  {
    id: 0,
    icon: faArrowCircleUp,
    arr: [0, 1, 0],
  },
  {
    id: 1,
    icon: faArrowCircleDown,
    arr: [0, -1, 0],
  },
]

const ControlsManual = ({
  visibility,
  sendGcode,
  sendGcodeRelPos,
}: {
  visibility: boolean
  sendGcode: Function
  sendGcodeRelPos: Function
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
          {xyControlsTop.map((xy) => (
            <Button
              key={xy.id}
              icon={xy.icon}
              onClick={(_e) => sendGcodeRelPos(xy.arr)}
              onMouseDown={(_e) => {
                timer(() => {
                  sendGcodeRelPos(xy.arr)
                })
              }}
              onMouseUp={(_e) => clearInterval(interval)}
            />
          ))}
          <Button
            icon={faHome}
            onClick={(_e) => sendGcode("G28")}
            onMouseDown={(_e) => {}}
            onMouseUp={(_e) => {}}
          />
          {xyControlsBtm.map((xy) => (
            <Button
              key={xy.id}
              icon={xy.icon}
              onClick={(_e) => sendGcodeRelPos(xy.arr)}
              onMouseDown={(_e) => {
                timer(() => {
                  sendGcodeRelPos(xy.arr)
                })
              }}
              onMouseUp={(_e) => clearInterval(interval)}
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
              onClick={(_e) => sendGcodeRelPos(z.arr)}
              onMouseDown={(_e) => {
                timer(() => {
                  sendGcodeRelPos(z.arr)
                })
              }}
              onMouseUp={(_e) => clearInterval(interval)}
            />
          ))}
        </div>
      </div>
      <div className="pane">
        <h3>gcode</h3>
        <form>
          <input type="text" placeholder="G1 X0 Y0 Z0" required />
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
        <Button icon={faCamera} onClick={() => {}} />
        <Button icon={faLightbulb} onClick={() => {}} />
        <Button icon={faXmark} onClick={() => {}} />
      </div>
    </div>
  )
}

ControlsManual.propTypes = {
  visibility: PropTypes.bool.isRequired,
  sendGcode: PropTypes.func.isRequired,
  sendGcodeRelPos: PropTypes.func.isRequired,
}

export default ControlsManual
