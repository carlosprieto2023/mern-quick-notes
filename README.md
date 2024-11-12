# Notes App

## User Stories

### AAV - As A Viewer

- **As a viewer**, I want to see an authentication page to sign up or log in so that I can create notes.

### AAU - As A User

- **As a user**, I want to see a [Log Out] link/button to return to the auth page.
- **As a user**, I want to see a “No Notes Yet!” message if I have yet to enter any notes.
- **As a user**, I want to see a listing of all of my previously entered notes, including the text and date & time (`createdAt` property) for each note.
  - Use the `toLocaleString()` method to better format the date/time.
  - This app is user-centric, so only the notes for the logged-in user should be displayed.
- **As a user**, I want to see an `<input>` or `<textarea>` and an [Add Note] button above the listing of notes that I can use to enter a new note.
- **As a user**, when I click the [Add Note] button to add a new note, I want to see it appear in the list of existing notes.

## Requirements

1. **Authentication Page**:
   - Allow users to sign up or log in.
2. **Log Out**:

   - Show a [Log Out] button that logs the user out and returns to the auth page.

3. **Notes List**:

   - Display a "No Notes Yet!" message if the user has no notes.
   - Display a list of all notes created by the logged-in user, with the note text and date/time formatted using `toLocaleString()`.

4. **Add Note Functionality**:
   - Provide an `<input>` or `<textarea>` and an [Add Note] button to allow users to add new notes.
   - After adding a new note, the new note should immediately appear in the list of notes.

## Bonus

- AAU, I want to be able to toggle the display of the notes between ascending & descending date (createdAt).
- AAU, I want to be able to delete a note.
- AAU, I want to be able to edit a note

## Technologies Used

- React
- Express (for backend API)
- MongoDB (for data storage)
- Bcrypt (for password hashing)
- JWT (for authentication)
- JavaScript/ES6+

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/carlosprieto2023/mern-quick-notes.git
   ```
