import PropTypes from "prop-types"
import Button from "./Button"
import Step from "./Step"
import { useState, useRef } from "react"
import {
  faPlus,
  faSave,
  faRotateRight,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons"

const stepsPlaceholder: Step[] = []
for (var i = 0; i < 15; i++) {
  stepsPlaceholder.push({
    id: i,
    command: `X${i * 5 + 10} Y${i * 5 + 10} Z${i} F800`,
    // active: i ? false : true,
    active: false,
    draggable: true,
  })
}

const Script = ({ visibility }: { visibility: boolean }) => {
  // const [steps, setSteps] = useState<Step[]>(stepsPlaceholder)
  const [steps, setSteps] = useState<Step[]>([])

  const stepStartId = useRef<number | null>(null)
  const stepEnterId = useRef<number | null>(null)

  return (
    <section className={visibility ? "step-create" : "hide"}>
      <ul
        className="sequence-steps"
        onDragOver={(e) => {
          e.preventDefault()
          const li = e.target as HTMLLIElement
          li.classList.add("dragover")
        }}
        onDragLeave={(e) => {
          const li = e.target as HTMLLIElement
          li.classList.remove("dragover")
        }}
        onDrop={(e) => {
          let _steps = [...steps] // Copy step array
          const dragStep = _steps.splice(stepStartId.current, 1)[0] // Pop step item

          // Array methods have to be executed separately
          _steps.splice(stepEnterId.current, 0, dragStep) // Swap step items
          _steps.forEach((step, ind) => (step.id = ind)) // Reset id values

          setSteps(_steps)

          const li = e.target as HTMLLIElement
          li.classList.remove("dragover")
        }}
        onDragEnd={() => {
          stepStartId.current = stepEnterId.current = null
        }}
      >
        {steps.map((step) => (
          <Step
            key={step.id}
            step={step}
            stepStartId={stepStartId}
            stepEnterId={stepEnterId}
            addStep={(e: MouseEvent) => {
              const btn = e.target as HTMLButtonElement
              const li = btn.closest("li")
              const items = li.closest("ul").children
              for (let i = 0; i < items.length; i++) {
                if (items[i] === li)
                  setSteps([
                    ...steps,
                    {
                      id: steps.length,
                      command: li.textContent,
                      active: false,
                      draggable: true,
                    },
                  ])
              }
            }}
            deleteStep={(e: MouseEvent) => {
              const btn = e.target as HTMLButtonElement
              const li = btn.closest("li")
              const items = li.closest("ul").children
              for (let i = 0; i < items.length; i++) {
                if (items[i] === li)
                  setSteps(
                    steps
                      .filter((step) => step.id !== i)
                      .map((step) =>
                        step.id > i ? { ...step, id: step.id - 1 } : step
                      )
                  )
              }
            }}
          />
        ))}
      </ul>
      <div>
        <form>
          <div>
            <label>Add step</label>
            <input
              type="text"
              placeholder="X1 Y2 Z3 F800"
              name="gcode"
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  e.preventDefault()
                  const gcode = (e.target as HTMLInputElement).value
                  if (gcode) {
                    setSteps([
                      ...steps,
                      {
                        id: steps.length,
                        command: gcode,
                        active: false,
                        draggable: true,
                      },
                    ])
                  }
                }
              }}
            />
          </div>
          <Button
            icon={faPlus}
            onClick={() => {
              const input = document.querySelector("input[name='gcode']")
              const gcode = (input as HTMLInputElement).value
              if (gcode) {
                setSteps([
                  ...steps,
                  {
                    id: steps.length,
                    command: gcode,
                    active: false,
                    draggable: true,
                  },
                ])
              }
            }}
          />
        </form>
        <Button
          icon={faFolderOpen}
          onClick={async () => {
            try {
              let result = await window.Main.getFile()
              if (!result.canceled) {
                let contents: string = await window.Main.getFileContents(
                  result.filePaths[0]
                )
                var gcodeList: string[] = contents.split("\n") // Split string into gcode array
                var stepList: Step[] = [] // Initialize empty step list
                for (var i = 0; i < gcodeList.length; i++) {
                  // Populate step list if gcode is not an empty string
                  if (gcodeList[i]) {
                    stepList.push({
                      id: i,
                      command: gcodeList[i].substring(3),
                      active: false,
                      draggable: true,
                    })
                  }
                }
                setSteps(stepList)
              }
            } catch (err) {
              console.log(`ERROR: ${err}`)
            }
          }}
        />
        <Button
          icon={faSave}
          onClick={async () => {
            let result = await window.Main.getSavePath()
            if (!result.canceled) {
              const ul = document.querySelector("ul[class='sequence-steps']")
              var content = ""
              for (let i = 0; i < ul.children.length; i++) {
                content += `G1 ${
                  (ul.children[i] as HTMLLIElement).textContent
                }\n`
              }
              window.Main.saveScript(result.filePath, content)
            }
          }}
        />
        <Button
          icon={faRotateRight}
          onClick={() => {
            setSteps([])
          }}
        />
      </div>
    </section>
  )
}

Script.propTypes = {
  visibility: PropTypes.bool.isRequired,
}

export default Script
