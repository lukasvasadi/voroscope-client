import PropTypes from "prop-types"
import Controls from "./Controls"
import Automation from "./Automation"
import { useState } from "react"

const Panel = ({
  grabFrame,
  connectDevs,
  sendMessageStage,
  sendGcode,
  sendGcodeRelPos,
}: {
  grabFrame: Function
  connectDevs: Function
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
        <Controls
          visibility={visManual}
          grabFrame={grabFrame}
          connectDevs={connectDevs}
          sendMessageStage={sendMessageStage}
          sendGcode={sendGcode}
          sendGcodeRelPos={sendGcodeRelPos}
        />
        <Automation visible={visAutomated} />
      </div>
    </div>
  )
}

Panel.propTypes = {
  grabFrame: PropTypes.func.isRequired,
  connectDevs: PropTypes.func.isRequired,
  sendMessageStage: PropTypes.func.isRequired,
  sendGcode: PropTypes.func.isRequired,
  sendGcodeRelPos: PropTypes.func.isRequired,
}

export default Panel
