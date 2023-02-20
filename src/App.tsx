import Toolbar from "./components/Toolbar"
import Status from "./components/Status"
import About from "./components/About"
import Settings from "./components/Settings"
import Scripting from "./components/Scripting"
import Microscope from "./components/Microscope"
import { useState, useEffect, useCallback, useRef } from "react"
import { w3cwebsocket as W3CWebSocket } from "websocket"
import "./App.css"

let reader: FileReader = new FileReader() // Formats image string value

export const App: React.FC = () => {
  const [camera, setCamera] = useState<W3CWebSocket | null>(null) // Camera socket connection
  const [stage, setStage] = useState<W3CWebSocket | null>(null) // Stage socket connection
  const [image, setImage] = useState<string>("") // Image base64 string value
  const [config, setConfig] = useState<Config | null>(null) // App configuration

  const [visMicroscope, setVisMicroscope] = useState<boolean>(true) // Show microscope page on default
  const [visScripting, setVisScripting] = useState<boolean>(false)
  const [visSettings, setVisSettings] = useState<boolean>(false)
  const [visAbout, setVisAbout] = useState<boolean>(false)

  const stagePosition = useRef<number[] | null[]>([null, null, null]) // Assume starting at home
  const imageCount = useRef<number>(0)

  // Pull settings from file
  useEffect(() => {
    window.Main.getConfig().then((config: Config) => setConfig(config))
  }, []) // Empty array means hook function only runs on component docking (startup)

  // Open or close hardware connections
  const connectDevices = useCallback(
    (state: boolean) => {
      if (state) {
        setCamera(
          new W3CWebSocket(`ws://${config.address}:${config.cameraPort}`)
        )
        setStage(new W3CWebSocket(`ws://${config.address}:${config.stagePort}`))
      } else {
        if (camera) camera.close()
        if (stage) stage.close()
      }
    },
    [config, camera, stage]
  )

  const updateSettings = useCallback((newConfig: Config) => {
    setConfig(newConfig)
    window.Main.setConfig(newConfig) // Persist new config in memory
  }, [])

  const grabFrame = useCallback(() => {
    const img = document.querySelector("img")

    if (img) {
      for (let i = 0; i <= 100; i + 10) {
        setTimeout(() => {
          img.style.opacity = i.toString()
        }, 10)
      }

      for (let i = 100; i >= 100; i - 10) {
        setTimeout(() => {
          img.style.opacity = i.toString()
        }, 10)
      }

      window.Main.saveImage(image)
    }
  }, [image])

  // Change microscope visibility on callback
  const toggleVisMicroscope = useCallback(
    (state: boolean) => {
      setVisMicroscope(state)
    },
    [visMicroscope]
  )

  // Change scripting visibility on callback
  const toggleVisScripting = useCallback(
    (state: boolean) => {
      setVisScripting(state)
    },
    [visScripting]
  )

  // Change settings visibility on callback
  const toggleVisSettings = useCallback(
    (state: boolean) => {
      setVisSettings(state)
    },
    [visSettings]
  )

  // Change about visibility on callback
  const toggleVisAbout = useCallback(
    (state: boolean) => {
      setVisAbout(state)
    },
    [visAbout]
  )

  // Pass generic message to camera
  const sendMessageCamera = (message: object) => {
    if (camera) camera.send(JSON.stringify(message))
  }

  // Pass generic message to stage
  const sendMessageStage = (message: object) => {
    if (stage) stage.send(JSON.stringify(message))
  }

  // Send direct gcode command
  const sendGcode = (command: string, relPos: boolean = false) => {
    if (relPos) {
      // Relative positioning (default)
      sendMessageStage({ cmd: command })
    } else {
      // Absolute positioning
      sendMessageStage({ cmd: "G90" }) // Switch to absolute positioning
      sendMessageStage({ cmd: command })
      sendMessageStage({ cmd: "G91" }) // Switch to relative positioning
    }
  }

  // Send gcode from control panel buttons (relative moves)
  const sendGcodeRelPos = (coor: number[]) => {
    coor = coor.map((val, ind) => val * config.pitch[ind])
    sendGcode(`G1 X${coor[0]} Y${coor[1]} Z${coor[2]}`, true)
  }

  if (camera) {
    var base64String: string // Initialize raw image data

    camera.onopen = () => {
      console.log("Camera socket connection opened")

      // Initialize system
      sendMessageCamera({
        cfg: {
          resolution: [640, 480],
        },
      }) // Set camera resolution
    }

    camera.onclose = () => {
      setCamera(null)
      console.log("Camera socket connection closed")
    }

    /**
     *
     * @param message contains imaging data as blob
     *
     * FileReader readAsDataURL method converts blob into base64 string
     *
     * FileReader result attribute can also hold ArrayBuffer data,
     * so must explicitly set as string type to avoid compiler error
     *
     * The base64 string has a metadata prefix that must be removed
     */
    camera.onmessage = (message: MessageEvent) => {
      reader.readAsDataURL(message.data)
      reader.onloadend = () => {
        base64String = reader.result as string
        setImage(base64String.substring(base64String.indexOf(",") + 1))
        imageCount.current += 1
      }
      reader.onerror = () => console.log(reader.error)
    }

    camera.onerror = (err) => {
      console.log(err)
    }
  }

  if (stage) {
    var data: StageMessage // Initialize data object

    stage.onopen = () => {
      console.log("Stage socket connection opened")

      // Initialize system
      sendMessageStage({ cmd: "G28" }) // Home all motors
      sendMessageStage({ cmd: "G91" }) // Dafault to relative stage positioning
      sendMessageStage({ pos: {} }) // Start position reporting
    }

    stage.onclose = () => {
      setStage(null)
      console.log("Stage socket connection closed")
    }

    stage.onmessage = (message: MessageEvent) => {
      data = JSON.parse(message.data)
      console.log(data)
      if ("pos" in data) {
        stagePosition.current = (data.pos as string)
          .split(" ", 3)
          .map((val) => Number(val.split(":")[1]))
      }
    }

    stage.onerror = (err) => {
      console.log(err)
    }
  }

  return (
    <>
      <Toolbar
        toggleVisMicroscope={toggleVisMicroscope}
        toggleVisScripting={toggleVisScripting}
        toggleVisSettings={toggleVisSettings}
        toggleVisAbout={toggleVisAbout}
      />
      <main>
        <Microscope
          visibility={visMicroscope}
          image={image}
          grabFrame={grabFrame}
          connectDevices={connectDevices}
          sendMessageStage={sendMessageStage}
          sendGcode={sendGcode}
          sendGcodeRelPos={sendGcodeRelPos}
        />
        <Scripting visibility={visScripting} />
        <Settings
          visibility={visSettings}
          settings={config}
          updateSettings={updateSettings}
        />
        <About visibility={visAbout} />
      </main>
      <Status stagePosition={stagePosition} />
    </>
  )
}
