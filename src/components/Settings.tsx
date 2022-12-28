import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faDotCircle,
  faArrowCircleUp,
  faArrowCircleLeft,
  faArrowCircleRight,
  faArrowCircleDown,
  faHome,
  faPaperPlane,
  faStop,
  faVideo,
} from "@fortawesome/free-solid-svg-icons"

const Controls = ({ command }: { command: any }) => {
  const onClick = (e: Event) => {
    console.log(e)
  }

  return (
    <section>
      {/* <h2>Controls</h2> */}
      <div className="grid controls">
        <div className="panel">
          <h3>xy</h3>
          <div className="grid xy">
            <button id="topLeft" onClick={command}>
              <FontAwesomeIcon icon={faDotCircle} className="fa-icon" />
            </button>
            <button onClick={command}>
              <FontAwesomeIcon icon={faArrowCircleUp} className="fa-icon" />
            </button>
            <button onClick={command}>
              <FontAwesomeIcon icon={faDotCircle} className="fa-icon" />
            </button>
            <button onClick={command}>
              <FontAwesomeIcon icon={faArrowCircleLeft} className="fa-icon" />
            </button>
            <button onClick={command}>
              <FontAwesomeIcon icon={faHome} className="fa-icon" />
            </button>
            <button onClick={command}>
              <FontAwesomeIcon icon={faArrowCircleRight} className="fa-icon" />
            </button>
            <button onClick={command}>
              <FontAwesomeIcon icon={faDotCircle} className="fa-icon" />
            </button>
            <button onClick={command}>
              <FontAwesomeIcon icon={faArrowCircleDown} className="fa-icon" />
            </button>
            <button onClick={command}>
              <FontAwesomeIcon icon={faDotCircle} className="fa-icon" />
            </button>
          </div>
        </div>
        <div className="panel">
          <h3>z</h3>
          <div className="grid">
            <button onClick={command}>
              <FontAwesomeIcon icon={faArrowCircleUp} className="fa-icon" />
            </button>
            <button onClick={command}>
              <FontAwesomeIcon icon={faArrowCircleDown} className="fa-icon" />
            </button>
          </div>
        </div>
        <div className="panel">
          <h3>gcode</h3>
          <form className="grid gcode">
            <input type="text" placeholder="G1 X0 Y0 Z0" required />
            <button onClick={command}>
              <FontAwesomeIcon icon={faPaperPlane} className="fa-icon" />
            </button>
          </form>
        </div>
        <div className="panel">
          <h3>camera</h3>
          <button>
            <FontAwesomeIcon icon={faStop} className="fa-icon" />
          </button>
          <button>
            <FontAwesomeIcon icon={faVideo} className="fa-icon" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Controls
