import Toolbar from "./components/Toolbar"
import Status from "./components/Status"
import About from "./components/About"
import Settings from "./components/Settings"
import Microscope from "./components/Microscope"
import StepCreate from "./components/StepCreate"
import { useEffect, useState } from "react"
import { w3cwebsocket as W3CWebSocket } from "websocket"
import "./App.css"

// const ENDPOINT = 'ws://localhost:8765'
const ENDPOINT = "ws://10.0.151.85:8765"

let reader: FileReader = new FileReader()
var location: number[] = [0.0, 0.0, 0.0] // Assume starting at home
var pitch: number = 3.0 // Placeholder pitch value

interface Config {
  endpoint: string
  resolution: Array<number>
}

export const App: React.FC = () => {
  const [status, setStatus] = useState<string>("disconnected")
  const [socket, setSocket] = useState<W3CWebSocket | null>(null)
  const [image, setImage] = useState<string>("")

  const [visMicroscope, setVisMicroscope] = useState<boolean>(false)
  const [visStepCreate, setVisStepCreate] = useState<boolean>(false)
  const [visSettings, setVisSettings] = useState<boolean>(true)
  const [visAbout, setVisAbout] = useState<boolean>(false)

  const [settings, updateSettings] = useState<Config>({
    endpoint: "",
    resolution: [640, 480],
  })

  // Pull settings from file
  window.Main.getSettings().then((defaultConfig: Config) =>
    updateSettings(defaultConfig)
  )

  // useEffect(() => {
  //   const socket = new W3CWebSocket(ENDPOINT)
  //   setSocket(socket)
  //   // return () => socket.close()
  // }, [setSocket])

  // Pass generic message to raspi node
  const sendMessage = (message: object) => {
    if (socket) socket.send(JSON.stringify(message))
  }

  // Pass gcode to raspi node
  const sendGcode = (command: string) => {
    if (command.includes("G1")) {
      // Assume user wants to move to exact coordinate location
      sendMessage({ gcode: "G90" }) // Switch to absolute positioning
      sendMessage({ gcode: command })
      sendMessage({ gcode: "G91" }) // Switch to relative positioning
    } else sendMessage({ gcode: command })
  }

  // Send gcode from control panel buttons
  const sendGcodeRelPos = (map: number[]) => {
    sendGcode("G1 X0")
    console.log(map.map((val) => val * pitch))
  }

  // Listen for state changes
  useEffect(() => console.log(settings), [updateSettings])

  if (socket) {
    socket.onopen = () => {
      console.log("Connected")

      // Initialize system
      sendMessage({ resolution: [640, 480] }) // Set camera resolution
      // sendMessage({ gcode: "G28" }) // Home all motors
      sendMessage({ gcode: "G91" }) // Dafault to relative stage positioning
    }

    socket.onclose = () => {
      console.log("Disconnected")
    }

    socket.onmessage = (message: MessageEvent | any) => {
      try {
        reader.readAsDataURL(message.data)
        reader.onloadend = () => {
          var base64String: string | ArrayBuffer = reader.result
          if (typeof base64String == "string") {
            setImage(base64String.substring(base64String.indexOf(",") + 1))
          } else
            console.log("Received imaging data does not match expected format")
        }
      } catch (TypeError) {
        console.log(message.data)
      }
    }

    socket.onerror = (_e) => {
      // console.log(_e)
      setSocket(null)
    }
  }

  return (
    <>
      <Toolbar
        setVisMicroscope={setVisMicroscope}
        setVisStepCreate={setVisStepCreate}
        setVisSettings={setVisSettings}
        setVisAbout={setVisAbout}
      />
      <main className="grid">
        <Microscope
          visibility={visMicroscope}
          image={image}
          sendGcode={sendGcode}
          sendGcodeRelPos={sendGcodeRelPos}
        />
        <StepCreate visibility={visStepCreate} />
        <Settings
          visibility={visSettings}
          settings={settings}
          updateSettings={(newSettings: Config) => {
            updateSettings(newSettings)
            console.log(settings)
          }}
        />
        <About visibility={visAbout} />
      </main>
      <Status status={status} />
    </>
  )
}
