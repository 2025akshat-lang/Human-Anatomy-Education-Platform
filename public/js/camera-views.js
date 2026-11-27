window.HumanAtlasCameraViews = {
  bind(root, onView) {
    root.addEventListener("click", (event) => {
      const button = event.target.closest("[data-v]")
      if (button) onView(button.dataset.v)
    })
  },
}
