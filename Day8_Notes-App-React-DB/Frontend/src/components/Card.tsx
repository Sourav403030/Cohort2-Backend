import { useEffect, useState } from "react";
import axios from "axios";

interface Note {
  _id: string;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

const Card = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);

  function getNotesData(): void {
    axios
      .get("/api/notes")
      .then((res) => setNotes(res.data.notes));
  }

  function createOrUpdateNote(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    
    if (editingId) {
      // Update existing note
      updateNotes(editingId);
    } else {
      // Create new note
      axios
        .post("/api/notes", {
          title,
          description,
        })
        .then(() => {
          setTitle("");
          setDescription("");
          getNotesData();
        });
    }
  }

  function deleteNote(id: string): void{
    axios.delete(`/api/notes/${id}`)
    .then(()=>{
      getNotesData();
    });
  }

  function getNoteForUpdating(id: string): void{
    axios.get(`/api/note/${id}`)
    .then((res)=>{
      console.log(res);
      setTitle(res.data.note.title);
      setDescription(res.data.note.description);
      setEditingId(id); // Set editing mode
    })
  }

  function updateNotes(id: string): void{
    axios.patch(`/api/notes/${id}`,{
      title,
      description
    })
    .then((res)=>{
      console.log(res);
      setTitle("");
      setDescription("");
      setEditingId(null); // Exit editing mode
      getNotesData(); // Refresh notes list
    })
  }

  useEffect(() => {
    getNotesData();
  }, []);

  const colors: string[] = [
    "#FFCA6C",
    "#FF9A74",
    "#E1EE8C",
    "#B592FD",
    "#03D3FC",
  ];

  return (
    <div>
      <form
        className="text-white flex justify-center mb-10 gap-10"
        onSubmit={createOrUpdateNote}
      >
        <div className="flex gap-5 items-center">
          <label className="font-semibold text-lg" htmlFor="title">
            Title
          </label>
          <input
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className="border-gray-100 rounded-xl px-7 py-3 border focus:outline-none focus:border-blue-500"
            name="title"
            type="text"
            placeholder="Title"
          />
        </div>
        <div className="flex gap-5 items-center">
          <label className="font-semibold text-lg" htmlFor="description">
            Description
          </label>
          <input
            value={description}
            onChange={(e)=>setDescription(e.target.value)}

            className="border-gray-100 rounded-xl px-7 py-3 border focus:outline-none focus:border-blue-500"
            name="description"
            type="text"
            placeholder="Description"
          />
        </div>
        <button className="px-6 rounded-xl bg-blue-400 cursor-pointer font-semibold">
          {editingId ? "Update" : "Submit"}
        </button>
        {editingId && (
          <button 
            type="button"
            onClick={() => {
              setTitle("");
              setDescription("");
              setEditingId(null);
            }}
            className="px-6 rounded-xl bg-gray-400 cursor-pointer font-semibold"
          >
            Cancel
          </button>
        )}
      </form>
      <div className="flex flex-wrap gap-7">
        {notes.map((note, idx) => {
          return (
            <div
              style={{ backgroundColor: colors[idx % colors.length] }}
              key={note._id || idx}
              className="card w-70 h-90 p-5 rounded-xl flex flex-col gap-10 justify-between"
            >
              <div>
                <h2 className="font-semibold text-lg mb-2">{note.title}</h2>
                <p className="line-clamp-6 text-base">{note.description}</p>
              </div>
              <div className="bottom flex justify-between items-center">
                <h3>
                  <i onClick={()=>deleteNote(note._id)} className="ri-delete-bin-line text-white flex items-center justify-center w-10 h-10 bg-red-500 rounded-full cursor-pointer"></i>
                </h3>
                <i onClick={()=>getNoteForUpdating(note._id)} className="ri-pencil-fill text-white flex items-center justify-center w-10 h-10 bg-black rounded-full cursor-pointer"></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
