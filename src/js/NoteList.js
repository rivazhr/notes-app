import "./NoteItem.js";
import Swal from "sweetalert2";

export class NoteList extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    await this.renderNotes();
  }

  // Function to add a new note to the note list
  addNote(newNote) {
    fetch("https://notes-api.dicoding.dev/v2/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newNote.title,
        body: newNote.body,
      }),
    }).then(() => this.renderNotes());
  }

  // Function to render all notes
  async renderNotes() {
    const noteList = document.querySelector("note-list");
    noteList.innerHTML = "<loading-indicator></loading-indicator>";

    try {
      const response = await fetch("https://notes-api.dicoding.dev/v2/notes");
      const { data } = await response.json();

      noteList.innerHTML = "";
      // Checking if the data exist
      if (data.length > 0) {
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        data.forEach((note) => {
          const noteElement = document.createElement("note-item");

          // Custom Atributtes Definition
          noteElement.setAttribute("data-id", note.id);
          noteElement.note = note;
          noteList.append(noteElement);
        });

        noteList.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        noteList.append("Tidak ada catatan yang tersimpan");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Something went wrong!",
      });
      // noteList.innerHTML = "";
      // noteList.append("Terjadi kesalahan dalam mengambil data: " + error.message);
    }
  }

  async renderArchivedNotes() {
    const noteList = document.querySelector("note-list");
    noteList.innerHTML = "<loading-indicator></loading-indicator>";
    try {
      const response = await fetch(
        "https://notes-api.dicoding.dev/v2/notes/archived",
      );
      const { data } = await response.json();

      noteList.innerHTML = "";
      // Checking if the data exist
      if (data.length > 0) {
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        data.forEach((note) => {
          const noteElement = document.createElement("note-item");

          // Custom Atributtes Definition
          noteElement.classList.add("archived");
          noteElement.setAttribute("data-id", note.id);
          noteElement.note = note;
          noteList.append(noteElement);
        });

        noteList.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        noteList.append("Tidak ada catatan yang diarsipkan");
      }
    } catch (error) {
      noteList.innerHTML = "";
      noteList.append("Terjadi kesalahan dalam mengambil data: " + error);
    }
  }
}
customElements.define("note-list", NoteList);
