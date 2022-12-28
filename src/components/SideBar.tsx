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
  const [visibilityManual, setVisibilityManual] = useState(true)
  const [visibilityAutomated, setVisibilityAutomated] = useState(false)
  const [focusManual, setFocusManual] = useState("toggle-focus")
  const [focusAutomated, setFocusAutomated] = useState("")

  return (
    <section>
      <div className="toggle">
        <button
          className={focusManual}
          onClick={() => {
            setVisibilityManual(true)
            setVisibilityAutomated(false)
            setFocusManual("toggle-focus")
            setFocusAutomated("")
          }}
        >
          Manual
        </button>
        <button
          className={focusAutomated}
          onClick={() => {
            setVisibilityManual(false)
            setVisibilityAutomated(true)
            setFocusManual("")
            setFocusAutomated("toggle-focus")
          }}
        >
          Automatic
        </button>
      </div>
      <div className="grid">
        <ControlsManual
          visibility={visibilityManual}
          sendGcode={sendGcode}
          sendGcodeRelPos={sendGcodeRelPos}
        />
        <ControlsAutomated visibility={visibilityAutomated} />
      </div>
    </section>
  )
}

SideBar.propTypes = {
  sendGcode: PropTypes.func.isRequired,
  sendGcodeRelPos: PropTypes.func.isRequired,
}

export default SideBar
