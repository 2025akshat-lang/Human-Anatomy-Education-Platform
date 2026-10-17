import { useRef, useState } from "react"
import { Icon } from "./components/icons"
import { Button } from "./components/ui"

type ModelSex = "general" | "female" | "male" | "pregnancy"

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [cleanView, setCleanView] = useState(false)
  const [modelSex, setModelSex] = useState<ModelSex>("general")
  const viewerRef = useRef<HTMLIFrameElement>(null)

  const updateModelSex = (sex: ModelSex) => {
    setModelSex(sex)
    viewerRef.current?.contentWindow?.postMessage(
      { type: "human-atlas:set-sex", sex },
      window.location.origin,
    )
  }

  return (
    <main className={`webgl-shell ${cleanView ? "is-clean" : ""}`}>
      {!cleanView && (
        <header className="lab-header">
          <div className="lab-brand">
            <span className="lab-brand__mark">
              <i />
              <i />
              <i />
            </span>
            <span>
              HUMAN <b>ATLAS</b>
            </span>
            <small>WEBGL LAB</small>
          </div>

          <div className="model-set" aria-label="Anatomical model set">
            <span>Model set</span>
            <Button
              className={modelSex === "general" ? "is-active" : ""}
              onClick={() => updateModelSex("general")}
            >
              General
            </Button>
            <Button
              className={modelSex === "female" ? "is-active" : ""}
              onClick={() => updateModelSex("female")}
              title="Procedural comparative morphology; not a reviewed sex-specific scan"
            >
              Female
            </Button>
            <Button
              className={modelSex === "male" ? "is-active" : ""}
              onClick={() => updateModelSex("male")}
              title="Procedural comparative morphology; not a reviewed sex-specific scan"
            >
              Male
            </Button>
            <Button
              className={modelSex === "pregnancy" ? "is-active" : ""}
              onClick={() => updateModelSex("pregnancy")}
              title="Separate conceptual pregnancy anatomy state; validation pending"
            >
              Pregnancy
            </Button>
          </div>

          <div className="scale-route">
            <span>Body</span>
            <Icon name="chevron" size={12} />
            <span>Structure</span>
            <Icon name="chevron" size={12} />
            <b>Tissue · Micro</b>
          </div>
          <div className="lab-state">
            <i />
            Procedural model
          </div>
          <Button className="clean-button" onClick={() => setCleanView(true)}>
            <Icon name="focus" size={17} />
            <span>Clean view</span>
          </Button>
        </header>
      )}

      <section className="viewer-frame">
        {!loaded && (
          <div className="viewer-loading">
            <span className="loading-orbit">
              <i />
            </span>
            <b>Building anatomical scene</b>
            <small>Preparing selectable geometry and multiscale views</small>
          </div>
        )}
        <iframe
          allow="fullscreen"
          ref={viewerRef}
          onLoad={() => {
            setLoaded(true)
            updateModelSex(modelSex)
          }}
          src={`${import.meta.env.BASE_URL}human-atlas-3d.html`}
          title="Interactive three-dimensional human anatomy model"
        />
        {cleanView && (
          <Button
            className="restore-interface"
            onClick={() => setCleanView(false)}
          >
            <Icon name="menu" size={17} />
            <span>Dashboard</span>
          </Button>
        )}
        {!cleanView && (
          <>
            <div className="interaction-hint">
              <Icon name="focus" size={14} />
              Tap a structure · tap again for cutaway · select a component for
              micro view
            </div>
            <div className="model-disclosure">
              <Icon name="info" size={14} />
              Procedural educational geometry · sex morphology and validation
              pending
            </div>
          </>
        )}
      </section>
    </main>
  )
}
