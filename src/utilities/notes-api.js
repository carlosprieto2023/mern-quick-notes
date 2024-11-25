import sendRequest from './send-request';
const BASE_URL = '/api/notes';

// Fetch all notes
export function getAllNotes() {
  return sendRequest(BASE_URL);
}
// Send POST request with note content
export function createNote(content) {
  return sendRequest(BASE_URL, 'POST', { content });
}
// Delete a note by ID
export function deleteNoteById(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}
