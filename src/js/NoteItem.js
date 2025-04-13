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
    const archiveBtn = this.querySelector("#archive-button");
    archiveBtn.disabled = true;
    const originalText = archiveBtn.textContent;
    archiveBtn.textContent = "Archiving...";
    
    try {
      await fetch(`https://notes-api.dicoding.dev/v2/notes/${id}/archive`, {
        method: "POST",
      });
      this.closest("note-list")?.renderNotes();
      
      archiveBtn.disabled = false;
      archiveBtn.textContent = originalText;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Archive Note!",
        text: error.message,
        confirmButtonColor: "#69247c",
        confirmButtonText: "Okay",
      });
    }
  }
  
  async unArchiveNote(id) {
    const unArchiveBtn = this.querySelector("#archive-button");
    unArchiveBtn.disabled = true;
    const originalText = unArchiveBtn.textContent;
    unArchiveBtn.textContent = "Unarchiving...";
    
    try {
      await fetch(`https://notes-api.dicoding.dev/v2/notes/${id}/unarchive`, {
        method: "POST",
      });
      this.closest("note-list")?.renderArchivedNotes();
      unArchiveBtn.disabled = false;
      unArchiveBtn.textContent = originalText;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Unarchive Note!",
        text: error.message,
        confirmButtonColor: "#69247c",
        confirmButtonText: "Okay",
      });
    }
  }

  async deleteNote(id) {
    const deleteBtn = this.querySelector("#delete-button");
    deleteBtn.disabled = true;
    const originalText = deleteBtn.textContent;
    deleteBtn.textContent = "Deleting...";

    try {
      await fetch(`https://notes-api.dicoding.dev/v2/notes/${id}`, {
        method: "DELETE",
      });
      this.closest("note-list")?.renderNotes();
      deleteBtn.disabled = false;
      deleteBtn.textContent = originalText;
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
