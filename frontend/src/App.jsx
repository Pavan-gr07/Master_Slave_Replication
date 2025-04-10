import { useEffect, useState } from 'react';
import { apiFetch } from './apiProxy';

function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [error, setError] = useState(null);

  const fetchNotes = async () => {
    try {
      const res = await apiFetch('/api/note');
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiFetch('/api/note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setForm({ title: '', content: '' });
      fetchNotes();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: '2rem', fontFamily: 'Segoe UI' }}>
      <h1 style={{ textAlign: 'center' }}>🛡️ MongoDB Replica Failover Demo</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Note Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        <textarea
          placeholder="Note Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          style={{ padding: '0.5rem', fontSize: '1rem' }}
          rows={4}
        ></textarea>
        <button type="submit" style={{ padding: '0.5rem', fontSize: '1rem', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>
          ➕ Add Note
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {notes.map((note) => (
          <li key={note._id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
            <strong>{note.title}</strong>: {note.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
