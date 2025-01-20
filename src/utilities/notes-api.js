import sendRequest from './send-request';
const BASE_URL = '/api/notes';

// Fetch all notes
export function getAllNotes() {
  return sendRequest(BASE_URL);
}

// Send POST request with note content and optional category
export function createNote(content, category = 'General') {
  // Ensure content is not empty
  if (!content || content.trim() === '') {
    throw new Error('Content cannot be empty');
  }

  return sendRequest(BASE_URL, 'POST', { content, category });
}

// Delete a note by ID
export async function deleteNoteById(noteId) {
  console.log(`Deleting note at: /api/notes/${noteId}`);
  const token = localStorage.getItem('token'); // Ensure token is present
  console.log('Token:', token);
  const response = await fetch(`/api/notes/${noteId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete the note');
  }

  return await response.json();
}

// Update a note by ID
export async function updateNoteById(noteId, updatedNoteData) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/${noteId}`, {
    method: 'PUT', // Use PUT for full updates or PATCH for partial updates
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedNoteData),
  });

  if (!response.ok) {
    throw new Error('Failed to update the note');
  }

  return await response.json(); // Return the updated note from the server
}
