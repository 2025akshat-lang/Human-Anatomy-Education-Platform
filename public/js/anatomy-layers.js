window.HumanAtlasLayers = (() => {
  function bind(root, onToggle) {
    root.addEventListener("click", event => {
      const button = event.target.closest("[data-l]")
      if (button) onToggle(button.dataset.l)
    })
  }

  function sync(root, state) {
    root.querySelectorAll("[data-l]").forEach(button => {
      const active = Boolean(state[button.dataset.l])
      button.classList.toggle("on", active)
      button.setAttribute("aria-pressed", String(active))
    })
  }

  return { bind, sync }
})()
