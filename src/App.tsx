import { useState } from "react";

export default function InitiativeTracker() {
  interface Character {
    name: string;
    initiative: number;
    hp: number;
  }
  
  const [characters, setCharacters] = useState<Character[]>([]);

  
  const [name, setName] = useState("");
  const [initiative, setInitiative] = useState("");
  const [hp, setHp] = useState("");

  

  const addCharacter = () => {
    if (name.trim() === "" || initiative.trim() === "" || hp.trim() === "") return;
    setCharacters((prev) =>
      [...prev, { name, initiative: parseInt(initiative, 10), hp: parseInt(hp, 10) }].sort(
        (a, b) => b.initiative - a.initiative
      )
    );
    setName("");
    setInitiative("");
    setHp("");
  };

  const updateCharacter = (index: number, field: string, value: string) => {
    setCharacters((prev) =>
      prev.map((char, i) =>
        i === index ? { ...char, [field]: field === "name" ? value : parseInt(value, 10) } : char
      )
    );
  };

  const removeCharacter = (index: number) => {
    setCharacters((prev) => prev.filter((_, i) => i !== index));
  };

  const duplicateCharacter = (index: number) => {
    setCharacters((prev) =>
      [...prev, { ...prev[index] }].sort((a, b) => b.initiative - a.initiative)
    );
  };

  const resetList = () => {
    setCharacters([]);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">DnD Initiative Tracker</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded w-1/3"
          placeholder="Character Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 rounded w-1/4"
          type="number"
          placeholder="Initiative"
          value={initiative}
          onChange={(e) => setInitiative(e.target.value)}
        />
        <input
          className="border p-2 rounded w-1/4"
          type="number"
          placeholder="HP"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 rounded" onClick={addCharacter}>
          Add
        </button>
      </div>
      <div className="space-y-2">
        {characters.map((char, index) => (
          <div key={index} className="border p-2 rounded shadow flex justify-between items-center">
            <input
              className="w-1/3 border p-2 rounded"
              value={char.name}
              onChange={(e) => updateCharacter(index, "name", e.target.value)}
            />
            <input
              className="w-1/4 border p-2 rounded"
              type="number"
              value={char.initiative}
              onChange={(e) => updateCharacter(index, "initiative", e.target.value)}
            />
            <input
              className="w-1/4 border p-2 rounded"
              type="number"
              value={char.hp}
              onChange={(e) => updateCharacter(index, "hp", e.target.value)}
            />
            <div className="flex gap-2">
              <button
                className="bg-gray-300 px-2 py-1 rounded"
                onClick={() => duplicateCharacter(index)}
              >
                Duplicate
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => removeCharacter(index)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      {characters.length > 0 && (
        <button className="bg-red-600 text-white p-2 rounded mt-4" onClick={resetList}>
          Reset Initiative List
        </button>
      )}
    </div>
  );
}
