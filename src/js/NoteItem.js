import Swal from "sweetalert2";
class NoteItem extends HTMLElement {
  set note(data) {
    this._note = data;
    this.render();
  }

  render() {
    this.innerHTML = `
      <h3>${this._note.title}</h3>
      <p>${this._note.body}</p>
      <div class="meta">${formatDate(this._note.createdAt)}</div>
      <div class="btn-group">
        <button id="archive-button" class="btn-muted">
          ${this._note.archived ? "Unarchive" : "Archive"}
        </button>
        <button id="delete-button" class="btn-danger"}>Delete</button>
      </div>
      `;

    const id = this.getAttribute("data-id");

    // Button Event Listener
    this.querySelector("#archive-button").addEventListener("click", () => {
      this._note.archived ? this.unArchiveNote(id) : this.archiveNote(id);
    });

    this.querySelector("#delete-button").addEventListener("click", () => {
      this.deleteNote(id);
    });
  }

  async archiveNote(id) {
    try {
      await fetch(`https://notes-api.dicoding.dev/v2/notes/${id}/archive`, {
        method: "POST",
      });
      this.closest("note-list")?.renderNotes();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Archive Note!",
        text: error.message,
      });
    }
  }

  async unArchiveNote(id) {
    try {
      await fetch(`https://notes-api.dicoding.dev/v2/notes/${id}/unarchive`, {
        method: "POST",
      });
      this.closest("note-list")?.renderArchivedNotes();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Unarchive Note!",
        text: error.message,
      });
    }
  }
  
  async deleteNote(id) {
    try {
      await fetch(`https://notes-api.dicoding.dev/v2/notes/${id}`, {
        method: "DELETE",
      });
      this.closest("note-list")?.renderNotes();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Delete Note!",
        text: error.message,
      });
    }
  }
}
customElements.define("note-item", NoteItem);

function formatDate(dateString) {
  const date = new Date(dateString);

  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  };

  const formattedDate = new Intl.DateTimeFormat("id-ID", options).format(date);

  // Contoh Output: "12 Oktober 2022 pukul 12.15"
  return formattedDate.replace(".", ":").replace("pukul ", "") + " WIB";
}
