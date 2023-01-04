import PropTypes from "prop-types"
import ControlsManual from "./ControlsManual"
import ControlsAutomated from "./ControlsAutomated"
import { useState } from "react"

const SideBar = ({
  sendGcode,
  sendGcodeRelPos,
}: {
  sendGcode: Function
  sendGcodeRelPos: Function
}) => {
  // Control display visibility
  const [visManual, setVisManual] = useState(true)
  const [visAutomated, setVisAutomated] = useState(false)
  const [focusManual, setFocusManual] = useState("toggle-focus")
  const [focusAutomated, setFocusAutomated] = useState("")

  return (
    <section>
      <div className="toggle">
        <button
          className={focusManual}
          onClick={() => {
            setVisManual(true)
            setVisAutomated(false)
            setFocusManual("toggle-focus")
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
            setFocusAutomated("toggle-focus")
          }}
        >
          Automatic
        </button>
      </div>
      <div className="grid">
        <ControlsManual
          visibility={visManual}
          sendGcode={sendGcode}
          sendGcodeRelPos={sendGcodeRelPos}
        />
        <ControlsAutomated visibility={visAutomated} />
      </div>
    </section>
  )
}

SideBar.propTypes = {
  sendGcode: PropTypes.func.isRequired,
  sendGcodeRelPos: PropTypes.func.isRequired,
}

export default SideBar
