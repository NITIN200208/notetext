import React, { useState, useEffect } from "react";
import { MdDelete, MdOutlineMenu } from "react-icons/md";
import axios from "axios"; // To make HTTP requests
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState(""); 

  // Fetch notes from the backend (Spring Boot)
  useEffect(() => {
    axios.get("http://localhost:8080/api/notes")
      .then(response => {
        setNotes(response.data);
      })
      .catch(error => console.error("Error fetching notes:", error));
  }, []);

  // Update notes in the backend when changed
  const addNote = () => {
    if (newNote.trim()) {
      const [title, ...contentArr] = newNote.split("\n");
      const note = {
        title: title.trim(),
        content: contentArr.join("\n").trim(),
        date: new Date().toLocaleString(),
      };

      axios.post("http://localhost:8080/api/notes", note)
        .then(response => {
          setNotes([response.data, ...notes]); // Add the newly created note
          setNewNote(""); // Clear textarea after add
        })
        .catch(error => console.error("Error adding note:", error));
    }
  };

  const deleteNote = (id) => {
    axios.delete(`http://localhost:8080/api/notes/${id}`)
      .then(() => {
        setNotes(notes.filter(note => note.id !== id)); // Remove the deleted note
      })
      .catch(error => console.error("Error deleting note:", error));
  };

  return (
    <div className="app">
      <header>
        <MdOutlineMenu style={{ fontSize: "24px", marginRight: "10px" }} />
        <h1>Notes</h1>
      </header>

      <main>
        <div className="textarea-container">
          <textarea
            placeholder="Enter the note"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <button onClick={addNote} className="add-button">
            Add Note
          </button>
        </div>

        <div className="notes-container">
          {notes.map((note) => (
            <div key={note.id} className="note">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <small>{note.date}</small>
              <button onClick={() => deleteNote(note.id)}>
                <MdDelete />
              </button>
            </div>
          ))}
        </div>
      </main>

      <footer>© 2024</footer>
    </div>
  );
}

export default App;
