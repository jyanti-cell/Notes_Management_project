if (typeof window !== 'undefined') {
  const noteForm = document.getElementById('noteForm');
  const noteDate = document.getElementById('noteDate');
  const noteTopic = document.getElementById('noteTopic');
  const noteText = document.getElementById('noteText');
  const notesContainer = document.getElementById('notesContainer');
  const viewAllBtn = document.getElementById('viewAllBtn');
  const filterDate = document.getElementById('filterDate');
  const clearFilter = document.getElementById('clearFilter');
  const applyFilterBtn = document.getElementById('applyFilterBtn');
  const API_URL = 'http://localhost:5001/api/notes';

  async function fetchAndRenderNotes(filterQuery = '') {
    try {
      const url = filterQuery ? `${API_URL}?date=${filterQuery}` : API_URL;
      const response = await fetch(url);
      const result = await response.json();
      notesContainer.innerHTML = '';

      if (!result.success || !result.data || result.data.length === 0) {
        notesContainer.innerHTML = '<p class="empty-msg">No matching notes found.</p>';
        return;
      }

      result.data.forEach(note => {
        const noteEl = document.createElement('div');
        noteEl.className = 'note-item';
        noteEl.innerHTML = `
          <div>
            <div class="note-badges">
              <span class="note-date">📅 ${note.date}</span>
              <span class="note-topic">📌 ${note.topic}</span>
            </div>
            <p class="note-text">${note.text}</p>
          </div>
          <button class="btn-delete" onclick="deleteNote('${note.id}')">Delete</button>
        `;
        notesContainer.appendChild(noteEl);
      });
    } catch (error) {
      console.error(error);
      notesContainer.innerHTML = '<p class="empty-msg" style="color: #f87171;">Server connection error.</p>';
    }
  }

  noteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const noteData = {
      date: noteDate.value,
      topic: noteTopic.value.trim(),
      text: noteText.value.trim()
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData)
      });
      if (response.ok) {
        noteText.value = '';
        noteTopic.value = '';
        filterDate.value = '';
        fetchAndRenderNotes();
      }
    } catch (error) {
      console.error(error);
    }
  });

  if (applyFilterBtn) {
    applyFilterBtn.addEventListener('click', () => {
      if (filterDate.value) {
        fetchAndRenderNotes(filterDate.value);
      }
    });
  }

  if (clearFilter) {
    clearFilter.addEventListener('click', () => {
      filterDate.value = '';
      fetchAndRenderNotes();
    });
  }

  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
      filterDate.value = '';
      fetchAndRenderNotes();
    });
  }

  window.deleteNote = async function(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchAndRenderNotes(filterDate.value);
      }
    } catch (error) {
      console.error(error);
    }
  };

  fetchAndRenderNotes();

} else {
  const express = require('express');
  const app = express();
  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
  });

  let notesData = [];

  class NoteModel {
    static getAll(dateFilter) { 
      if (dateFilter) {
        return notesData.filter(note => note.date === dateFilter);
      }
      return notesData; 
    }
    static create(date, topic, text) {
      const newNote = { id: Date.now().toString(), date, topic, text };
      notesData.unshift(newNote);
      return newNote;
    }
    static delete(id) {
      const initialLength = notesData.length;
      notesData = notesData.filter(note => note.id !== id);
      return notesData.length !== initialLength;
    }
  }

  const getAllNotes = (req, res, next) => {
    try {
      const { date } = req.query;
      res.status(200).json({ success: true, data: NoteModel.getAll(date) });
    } catch (error) { next(error); }
  };

  const createNewNote = (req, res, next) => {
    try {
      const { date, topic, text } = req.body;
      if (!date || !topic || !text || text.trim() === '') {
        const error = new Error('All fields are required');
        error.statusCode = 400;
        throw error;
      }
      res.status(201).json({ success: true, data: NoteModel.create(date, topic.trim(), text.trim()) });
    } catch (error) { next(error); }
  };

  const deleteExistingNote = (req, res, next) => {
    try {
      if (!NoteModel.delete(req.params.id)) {
        const error = new Error('Note not found');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ success: true, message: 'Note deleted' });
    } catch (error) { next(error); }
  };

  const router = express.Router();
  router.get('/', getAllNotes);
  router.post('/', createNewNote);
  router.delete('/:id', deleteExistingNote);
  app.use('/api/notes', router);

  app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({ success: false, error: err.message });
  });

  app.listen(5001, () => {
    console.log('Server is running on port 5001');
  });
}