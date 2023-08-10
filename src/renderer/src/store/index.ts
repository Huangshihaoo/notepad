import { MainState, Note } from '@renderer/types/mainTypes'
import { defineStore } from 'pinia'

const useMainStore = defineStore('main', {
  // main是它的模块id
  state: (): MainState => ({
    notes: []
  }),
  actions: {
    addNote(title: string): void {
      this.notes.push({
        id: new Date().getTime(),
        title,
        createTime: new Date().getTime(),
        content: '',
        show: true
      })
    },
    updateNoteById(id: number, content: string) {
      this.notes = this.notes.map((note) => {
        if (note.id === id) {
          console.log(note)
          note.content = content
        }
        return note
      })
    },
    changeNoteStateById(id: number, show = false) {
      this.mainNotes.map((item) => {
        if (item.id === id) {
          item.show = show
        }
        return item
      })
    }
  },
  getters: {
    mainNotes: function (): Note[] {
      return this.notes.filter((item) => item.show)
    },
    currentNote: (state) => {
      return (id: number): Note | undefined => {
        return state.notes.find((note) => note.id === id && note.show)
      }
    }
  }
})

export default useMainStore
