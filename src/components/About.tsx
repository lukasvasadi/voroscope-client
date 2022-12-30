/**
 * About
 * General information on application
 */

import PropTypes from "prop-types"

const About = ({ visibility }: { visibility: boolean }) => {
  return (
    <section className={`about ${visibility ? "show-block" : "hide"}`}>
      <p>
        <strong>Voroscope</strong> is an open-source microscopy platform. It
        consists of an open hardware design—based on the Voron V0 3D printer—as
        well as firmware (C++) and server- (Python) and client-side (TypeScript)
        source code. Inside the microscope, a Raspberry Pi acts as a central
        node to ferry data between the imaging module (Raspberry Pi HQ camera
        module), motion control board (SKR Mini E3 V3), and host computer, which
        communicates with the Pi over a wireless socket connection. With the
        exception of the imaging module, the software was written to be as
        hardware agnostic as possible. For more information, read the docs on{" "}
        <a href="https://lukasvasadi.github.io" target="_blank">
          lukasvasadi.github.io
        </a>
        .
      </p>
    </section>
  )
}

About.propTypes = {
  visibility: PropTypes.bool.isRequired,
}

export default About
