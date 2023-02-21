/**
 * Button
 * Basic application component
 * Requires icon and onClick event handler
 */

import PropTypes from "prop-types"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { MouseEventHandler } from "react"

const Button = ({
  icon,
  onClick,
  onMouseDown,
  onMouseUp,
}: {
  icon: IconProp
  onClick: MouseEventHandler
  onMouseDown: MouseEventHandler
  onMouseUp: MouseEventHandler
}) => {
  return (
    // MouseEventHandler is a function with at least one argument (event)
    <button
      type="button" // Without specifying type, form buttons will behave as "submit"
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <FontAwesomeIcon icon={icon} className="fa-icon" />
    </button>
  )
}

// By default, mousedown and mouseup have no function
Button.defaultProps = {
  onMouseDown: () => {},
  onMouseUp: () => {},
}

Button.propTypes = {
  icon: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
}

export default Button
