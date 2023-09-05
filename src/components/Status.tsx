/**
 * Status
 * Present system information in footer section
 */

import PropTypes from "prop-types"
import React from "react";

const Status = ({
                    stagePosition,
                }: {
    stagePosition: React.MutableRefObject<number[] | null[]>
}) => {
    return (
        <footer>
            <p>
        <span>
          {stagePosition.current[0] != null
              ? `X:${stagePosition.current[0]}`
              : "X:?"}
        </span>
                <span>
          {stagePosition.current[1] != null
              ? `Y:${stagePosition.current[1]}`
              : "Y:?"}
        </span>
                <span>
          {stagePosition.current[2] != null
              ? `Z:${stagePosition.current[2]}`
              : "Z:?"}
        </span>
            </p>
        </footer>
    )
}

Status.propTypes = {
    stagePosition: PropTypes.object,
}

export default Status
