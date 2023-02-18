import PropTypes from "prop-types"
import ControlsManual from "./ControlsManual"
import ControlsAutomated from "./ControlsAutomated"
import { useState } from "react"

const Panel = ({
  connectDevices,
  sendMessageStage,
  sendGcode,
  sendGcodeRelPos,
}: {
  connectDevices: Function
  sendMessageStage: Function
  sendGcode: Function
  sendGcodeRelPos: Function
}) => {
  // Control display visibility
  const [visManual, setVisManual] = useState(true)
  const [visAutomated, setVisAutomated] = useState(false)
  const [focusManual, setFocusManual] = useState("focus")
  const [focusAutomated, setFocusAutomated] = useState("")

  return (
    <div className="control-panel">
      <div>
        <button
          className={focusManual}
          onClick={() => {
            setVisManual(true)
            setVisAutomated(false)
            setFocusManual("focus")
            setFocusAutomated("")
          }}
        >
          Manual
        </button>
        <button
          className={focusAutomated}
          onClick={() => {
            setVisManual(false)
            setVisAutomated(true)
            setFocusManual("")
            setFocusAutomated("focus")
          }}
        >
          Automatic
        </button>
      </div>
      <div>
        <ControlsManual
          visibility={visManual}
          connectDevices={connectDevices}
          sendMessageStage={sendMessageStage}
          sendGcode={sendGcode}
          sendGcodeRelPos={sendGcodeRelPos}
        />
        <ControlsAutomated visibility={visAutomated} />
      </div>
    </div>
  )
}

Panel.propTypes = {
  connectDevices: PropTypes.func.isRequired,
  sendMessageStage: PropTypes.func.isRequired,
  sendGcode: PropTypes.func.isRequired,
  sendGcodeRelPos: PropTypes.func.isRequired,
}

export default Panel
