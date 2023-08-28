import { useState } from "react";

let initialArtists = [
  { id: 0, name: "Marta Colvin Andrade" },
  { id: 1, name: "Lamidi Olonade Fakeye" },
  { id: 2, name: "Louise Nevelson" },
];

export default function List() {
  const [artists, setArtists] = useState(initialArtists);

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <ul className="space-y-4">
        {artists.map((artist) => (
          <li key={artist.id}>
            {artist.name}{" "}
            <button
              className="py-2 px-4 bg-red-500 text-white rounded"
              onClick={() => {
                setArtists(artists.filter((artis) => artis.id !== artist.id));
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
