import Toolbar from "./components/Toolbar"
import Status from "./components/Status"
import Microscope from "./components/Microscope"
import Automation from "./components/Automation"
import StepCreate from "./components/StepCreate"
import { useEffect, useState } from "react"
import { w3cwebsocket as W3CWebSocket } from "websocket"
import "./App.css"

// const ENDPOINT = 'ws://localhost:8765'
const ENDPOINT = "ws://10.0.151.85:8765"

let reader: FileReader = new FileReader()
var location: number[] = [0.0, 0.0, 0.0] // Assume starting at home
var pitch: number = 3.0 // Placeholder pitch value
var images: number = 0

export const App: React.FC = () => {
  const [status, setStatus] = useState("disconnected")
  const [socket, setSocket] = useState<W3CWebSocket | null>(null)
  const [image, setImage] = useState<string>("")

  const [visibilityMicroscope, setVisibilityMicroscope] =
    useState<boolean>(true)
  const [visibilityAutomation, setVisibilityAutomation] =
    useState<boolean>(false)
  const [visibilityStepCreate, setVisibilityStepCreate] =
    useState<boolean>(false)

  useEffect(() => {
    const socket = new W3CWebSocket(ENDPOINT)
    setSocket(socket)
    // return () => socket.close()
  }, [setSocket])

  // Pass generic message to Raspi node
  const sendMessage = (message: object) => {
    if (socket) socket.send(JSON.stringify(message))
  }

  // Pass gcode to Raspi node
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
          var base64String: string | ArrayBuffer | null = reader.result
          if (typeof base64String == "string") {
            var base64SubString: string = base64String.substring(
              base64String.indexOf(",") + 1
            )
            console.log("Image received")
            setImage(base64SubString)
          } else
            console.log("Received imaging data does not match expected format")
        }
      } catch (TypeError) {
        console.log(message.data)
      }
    }

    socket.onerror = (_e) => {
      console.log(_e)
      setSocket(null)
    }
  }

  return (
    <div>
      <Toolbar
        setVisibilityMicroscope={setVisibilityMicroscope}
        setVisibilityStepCreate={setVisibilityStepCreate}
      />
      <main className="grid">
        <Microscope
          visibility={visibilityMicroscope}
          image={image}
          sendGcode={sendGcode}
          sendGcodeRelPos={sendGcodeRelPos}
        />
        {/* <Automation visibility={visibilityAutomation} image={image} /> */}
        <StepCreate visibility={visibilityStepCreate} />
      </main>
      <Status status={status} />
    </div>
  )
}
