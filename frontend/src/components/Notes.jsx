import React from 'react';

const Notes = ({ notes }) => {
  return (
    <div className="flex flex-col items-center gap-8">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow w-full max-w-2xl"
        >
          <h3 className="text-xl font-semibold mb-2 text-gray-800">{note.title}</h3>
          <p className="text-sm text-pink-600 mb-3">{note.subject}</p>
          <p className="text-gray-600 mb-4">{note.preview}</p>

          {note.pdfUrl && (
            <div className="mb-4">
              <iframe
                src={note.pdfUrl}
                width="100%"
                height="300"
                className="rounded border"
                title={`Preview of ${note.title}`}
              />
            </div>
          )}

          <div className="flex gap-3 mb-4">
            <a href={note.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-sm underline text-blue-600 hover:text-blue-800">
              Προβολή σε νέο παράθυρο
            </a>
            <a href={note.pdfUrl} download className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">
              Κατέβασε PDF
            </a>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-pink-600">€{note.price}</span>
            <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors">
              Αγορά
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-2">{note.download_count} λήψεις</p>
        </div>
      ))}
    </div>
  );
};

export default Notes;
