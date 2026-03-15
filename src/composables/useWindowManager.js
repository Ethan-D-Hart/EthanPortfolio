import { reactive } from 'vue'

let topZ = 100

export function useWindowManager() {
  const windows = reactive([
    { id: 'main',      title: 'HOME.VUE',   position: { x: 80,  y: 48  }, zIndex: 100, visible: true,  minimized: false },
    { id: 'song',      title: 'SONG.MP3',   position: { x: 400, y: 80  }, zIndex: 99,  visible: false, minimized: false },
    { id: 'project_1', title: 'PROJECT_1',  position: { x: 250, y: 80  }, zIndex: 98,  visible: false, minimized: false },
    { id: 'project_2', title: 'PROJECT_2',  position: { x: 270, y: 100 }, zIndex: 97,  visible: false, minimized: false },
    { id: 'project_3', title: 'PROJECT_3',  position: { x: 290, y: 120 }, zIndex: 96,  visible: false, minimized: false },
  ])

  const openWindow = (id) => {
    const win = windows.find(w => w.id === id)
    if (win) {
      win.visible = true
      win.minimized = false
      focusWindow(id)
    }
  }

  const closeWindow = (id) => {
    const win = windows.find(w => w.id === id)
    if (win) win.visible = false
  }

  const focusWindow = (id) => {
    topZ++
    const win = windows.find(w => w.id === id)
    if (win) win.zIndex = topZ
  }

  const toggleMinimize = (id) => {
    const win = windows.find(w => w.id === id)
    if (win) win.minimized = !win.minimized
  }

  return { windows, openWindow, closeWindow, focusWindow, toggleMinimize }
}
