class NoteItem extends HTMLElement {
  set noteData(note) {
    this.innerHTML = `
      <div class="note-card" data-noteid=${note.id}>
        <h3>${note.title}</h3>
        <p>${note.body}</p>
        <div class="meta">${formatDate(note.createdAt)}</div>
      </div>
    `;
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);

  const options = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jakarta',
  };

  const formattedDate = new Intl.DateTimeFormat('id-ID', options).format(date);
  
  // Contoh Output: "12 Oktober 2022 pukul 12.15"
  return formattedDate.replace('.', ':').replace('pukul ', '') + ' WIB';
}
customElements.define('note-item', NoteItem);