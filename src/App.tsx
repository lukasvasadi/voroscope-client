import Toolbar from "./components/Toolbar"
import Status from "./components/Status"
import About from "./components/About"
import Settings from "./components/Settings"
import Scripting from "./components/Scripting"
import Microscope from "./components/Microscope"
import React, {useState, useEffect, useCallback, useRef} from "react"
import {w3cwebsocket as W3CWebSocket} from "websocket"
import "./App.css"

export const App: React.FC = () => {
    const [camera, setCamera] = useState<W3CWebSocket | null>(null) // Camera socket connection
    const [stage, setStage] = useState<W3CWebSocket | null>(null) // Stage socket connection
    const [image, setImage] = useState<string | null>(null) // Image base64 string value
    const [config, setConfig] = useState<Config | null>(null) // App configuration

    const [visMicroscope, setVisMicroscope] = useState<boolean>(true) // Show microscope page on default
    const [visScripting, setVisScripting] = useState<boolean>(false)
    const [visSettings, setVisSettings] = useState<boolean>(false)
    const [visAbout, setVisAbout] = useState<boolean>(false)

    const stagePosition = useRef<number[] | null[]>([null, null, null]) // X, Y, Z location
    const imageReceivedCount = useRef<number>(0)
    const imageRenderedCount = useRef<number>(0)
    const streamTime = useRef<number | null>(null)
    // const stepCount = useRef<number>(0)

    // Pull configuration settings from file
    useEffect(() => {
        window.Main.getConfig().then((config: Config) => setConfig(config))
    }, []) // Empty array means hook function only runs on component docking (startup)

    useEffect(() => {
        imageRenderedCount.current += 1
        // console.log(`${imageReceivedCount.current - imageRenderedCount.current + 2}`)
    }, [image])

    useEffect(() => {
        if (!streamTime.current && document.querySelector("img")) {
            streamTime.current = Date.now()
        } else if (streamTime.current) {
            const fps = Math.round((imageReceivedCount.current * 1000) / (Date.now() - streamTime.current))
            console.log(`FPS: ${fps}`)
        }
    }, [image]);

    // Open or close hardware connections
    const connectDevs = useCallback(
        (state: boolean) => {
            if (state) {
                setCamera(
                    new W3CWebSocket(`ws://${config.address}:${config.cameraPort}`)
                )
                setStage(new W3CWebSocket(`ws://${config.address}:${config.stagePort}`))
            } else {
                if (camera) camera.close()
                if (stage) stage.close()
                setImage(null)
            }
        },
        [config, camera, stage]
    )

    // Update system configuration based on user input
    const updateSettings = useCallback((newConfig: Config) => {
        setConfig(newConfig)
        window.Main.setConfig(newConfig) // Persist new config in memory
    }, [])

    // Grab image with shutter effect
    const grabFrame = useCallback(() => {
        const img = document.querySelector("img")
        const delay = 50 // Delay period (ms)

        if (img) {
            let opacity = 1.0

            const opacityDecrement = setInterval(() => {
                if (opacity > 0.2) {
                    opacity -= 0.1
                    img.style.opacity = opacity.toFixed(2)
                } else {
                    const opacityIncrement = setInterval(async () => {
                        if (opacity < 1.0) {
                            opacity += 0.1
                            img.style.opacity = opacity.toFixed(2)
                        } else clearInterval(opacityIncrement)
                    }, delay)

                    clearInterval(opacityDecrement)

                    setTimeout(async () => {
                        const date = new Date()
                        const defaultFilename = `${date.getFullYear()}-${
                            date.getMonth() + 1
                        }-${date.getDate()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}_snapshot.jpg`

                        const result = await window.Main.getSavePath(defaultFilename, {
                            name: "Images",
                            extensions: ["jpg"],
                        })

                        if (!result.canceled) window.Main.saveImage(image, result.filePath)
                    }, 1000)
                }
            }, delay)
        }
    }, [image])

    // Change microscope visibility on callback
    const toggleVisMicroscope = useCallback(
        (render: boolean) => {
            setVisMicroscope(render)
        },
        [visMicroscope]
    )

    // Change scripting visibility on callback
    const toggleVisScripting = useCallback(
        (render: boolean) => {
            setVisScripting(render)
        },
        [visScripting]
    )

    // Change settings visibility on callback
    const toggleVisSettings = useCallback(
        (render: boolean) => {
            setVisSettings(render)
        },
        [visSettings]
    )

    // Change about visibility on callback
    const toggleVisAbout = useCallback(
        (render: boolean) => {
            setVisAbout(render)
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

    if (camera) {
        const urlCreator = window.URL || window.webkitURL
        let imageUrl: string

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
         */
        camera.onmessage = async (message: MessageEvent) => {
            imageUrl = urlCreator.createObjectURL(message.data)
            setImage(imageUrl)
            imageReceivedCount.current += 1
        }

        camera.onerror = (err) => {
            console.log(err)
        }
    }

    if (stage) {
        let data: StageMessage // Initialize data object

        stage.onopen = () => {
            console.log("Stage socket connection opened")

            // Initialize system
            sendMessageStage({cmd: "G28"}) // Home all motors
            sendMessageStage({cmd: "G91"}) // Default to relative stage positioning
            sendMessageStage({pos: "1"}) // Start position reporting
        }

        stage.onclose = () => {
            setStage(null)
            console.log("Stage socket connection closed")
        }

        stage.onmessage = (message: MessageEvent) => {
            data = JSON.parse(message.data)
            if ("pos" in data) {
                stagePosition.current = (data.pos as string)
                    .split(" ", 3)
                    .map((val) => Number(val.split(":")[1]))
            } else {
                console.log(message)
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
                    connectDevs={connectDevs}
                    sendMessageStage={sendMessageStage}
                />
                <Scripting visibility={visScripting}/>
                <Settings
                    visibility={visSettings}
                    settings={config}
                    updateSettings={updateSettings}
                />
                <About visible={visAbout}/>
            </main>
            <Status stagePosition={stagePosition}/>
        </>
    )
}
