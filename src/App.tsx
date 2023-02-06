import Toolbar from "./components/Toolbar"
import Status from "./components/Status"
import About from "./components/About"
import Settings from "./components/Settings"
import Microscope from "./components/Microscope"
import Script from "./components/Script"
import { useEffect, useState } from "react"
import { w3cwebsocket as W3CWebSocket } from "websocket"
import "./App.css"

let reader: FileReader = new FileReader()
var location: number[] = [0.0, 0.0, 0.0] // Assume starting at home
var images: number = 0

export const App: React.FC = () => {
  const [socket, setSocket] = useState<W3CWebSocket | null>(null)
  const [image, setImage] = useState<string>("")

  const [visMicroscope, setVisMicroscope] = useState<boolean>(false)
  const [visStepCreate, setVisStepCreate] = useState<boolean>(true)
  const [visSettings, setVisSettings] = useState<boolean>(false)
  const [visAbout, setVisAbout] = useState<boolean>(false)

  const [config, setConfig] = useState<Config | null>(null)
  const [connect, setCamera] = useState<boolean>(false)

  useEffect(() => {
    if (!socket && config) {
      try {
        setSocket(new W3CWebSocket(config.endpoint))
        console.log("Camera connected!")
      } catch (err) {
        console.log(err)
      }
    }
  }, [connect])

  // Pull settings from file
  useEffect(() => {
    window.Main.getConfig().then((config: Config) => setConfig(config))
  }, []) // Empty array means function will only run on component docking

  // Pass generic message to raspi node
  const sendMessage = (message: object) => {
    if (socket) socket.send(JSON.stringify(message))
  }

  // Pass gcode to raspi node
  const sendGcode = (command: string, rel: boolean = false) => {
    if (rel) {
      // Relative positioning
      sendMessage({ gcode: command })
    } else {
      // Absolute positioning
      sendMessage({ gcode: "G90" }) // Switch to absolute positioning
      sendMessage({ gcode: command })
      sendMessage({ gcode: "G91" }) // Switch to relative positioning
    }
  }

  // Send gcode from control panel buttons
  const sendGcodeRelPos = (coor: number[]) => {
    coor = coor.map((val) => val * config.pitchXY)
    sendGcode(`G1 X${coor[0]} Y${coor[1]} Z${coor[2]}`, true)
    // console.log(coor.map((val) => val * config.pitchXY))
  }

  // Listen for state changes
  useEffect(() => console.log(config), [config])

  if (socket) {
    // window.Main.closePort((_) => {
    //   socket.close()
    // })

    socket.onopen = () => {
      console.log("Connected")

      // Initialize system
      sendMessage({ resolution: [640, 480] }) // Set camera resolution
      // sendMessage({ gcode: "G28" }) // Home all motors
      sendMessage({ gcode: "G91" }) // Dafault to relative stage positioning
    }

    socket.onclose = () => {
      setCamera(false)
      console.log("Disconnected")
    }

    socket.onmessage = (message: MessageEvent | any) => {
      try {
        reader.readAsDataURL(message.data)
        reader.onloadend = () => {
          var base64String: string | ArrayBuffer = reader.result
          if (typeof base64String == "string") {
            setImage(base64String.substring(base64String.indexOf(",") + 1))
            images += 1
            // console.log(images)
          } else
            console.log("Received imaging data does not match expected format")
        }
      } catch (TypeError) {
        // console.log(message.data)
        var data = JSON.parse(message.data)
        // if ("location" in data) location = data.location
      }
    }

    socket.onerror = (err) => {
      console.log(err)
      // setSocket(null)
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
      <main>
        <Microscope
          visibility={visMicroscope}
          connectCamera={setCamera}
          image={image}
          sendGcode={sendGcode}
          sendGcodeRelPos={sendGcodeRelPos}
        />
        <Script visibility={visStepCreate} />
        <Settings
          visibility={visSettings}
          settings={config}
          updateSettings={(newSettings: Config) => {
            setConfig(newSettings)
            window.Main.setConfig(newSettings)
          }}
        />
        <About visibility={visAbout} />
      </main>
      <Status status={socket ? "connected" : "disconnected"} />
    </>
  )
}
