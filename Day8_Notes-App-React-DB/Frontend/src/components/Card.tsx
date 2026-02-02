import React, { useEffect, useState } from "react";
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


  useEffect(()=>{
    async function getNotesData(): Promise<void>{
    const response = await axios.get("http://localhost:3000/api/notes")
    setNotes(response.data.notes);
  }

  getNotesData();
  }, [])

  const colors: string[] = ["#FFCA6C", "#FF9A74", "#E1EE8C", "#B592FD", "#03D3FC"];

  return (
    <div className="flex flex-wrap gap-7">
      {notes.map((note, idx)=>{
        return <div
        style={{backgroundColor: colors[idx % colors.length]}}
         key={note._id || idx}
          className="card w-70 h-90 p-5 rounded-xl flex flex-col gap-10 justify-between">
        <div>
          <h2 className="font-semibold text-lg mb-2">{note.title}</h2>
          <p className="line-clamp-6 text-base">{note.description}</p>
        </div>
        <div className="bottom flex justify-between items-center">
          <h3>{note.createdAt ? new Date(note.createdAt).toDateString() : 'Date'}</h3>
          <i className="ri-pencil-fill text-white flex items-center justify-center w-10 h-10 bg-black rounded-full cursor-pointer"></i>
        </div>
      </div>
      })}
    </div>
  );
};

export default Card;
