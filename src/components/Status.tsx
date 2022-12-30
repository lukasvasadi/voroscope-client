/**
 * Status
 * Present system information in footer section
 */

import PropTypes from "prop-types"

const Status = ({ status }: { status: string }) => {
  return (
    <footer>
      {/* <p style={{ color: status === 'connected' ? 'green' : '#800000'}}>{status}</p> */}
    </footer>
  )
}

Status.defaultProps = {
  status: "disconnected",
}

Status.propTypes = {
  status: PropTypes.string,
}

export default Status
