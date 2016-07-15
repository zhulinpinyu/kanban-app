import NoteStore from '../../stores/NoteStore'
import persist from '../../libs/persist'
import storage from '../../libs/storage'

export default alt => {
  alt.addStore('NoteStore',NoteStore)
  persist(alt,storage(localStorage),'kanban-app')
}