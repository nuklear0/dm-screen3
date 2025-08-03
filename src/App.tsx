import { useState } from "react";
import './App.css';  // Assuming this is in the same folder as your component

export default function InitiativeTracker() {
  interface Character {
    name: string;
    initiative: number;
    hp: number;
    ac: number;
  }

  const [characters, setCharacters] = useState<Character[]>([]);
  const [name, setName] = useState("");
  const [initiative, setInitiative] = useState("");
  const [hp, setHp] = useState("");
  const [ac, setAc] = useState("");

  // Pre-made characters to generate
  const premadeCharacters = [
    { name: "Tara", initiative: 0, hp: 0, ac: 0},
    { name: "Nimrodel", initiative: 0, hp: 0, ac: 0 },
    { name: "Frank", initiative: 0, hp: 0, ac: 0 },
    { name: "Shieldbiter", initiative: 0, hp: 0, ac: 0 },
  ];

  const addCharacter = () => {
    if (name.trim() === "" || initiative.trim() === "" || hp.trim() === "") return;
    setCharacters((prev) =>
      [...prev, { name, initiative: parseInt(initiative, 10), hp: parseInt(hp, 10), ac: parseInt(ac, 10) }].sort(
        (a, b) => b.initiative - a.initiative
      )
    );
    setName("");
    setInitiative("");
    setHp("");
  };

  const generatePremadeCharacters = () => {
    setCharacters((prev) => [
      ...prev,
      ...premadeCharacters,
    ].sort((a, b) => b.initiative - a.initiative)); // Sort by initiative
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

  const refreshOrder = () => {
    setCharacters((prev) =>
      [...prev].sort((a, b) => b.initiative - a.initiative) // Sort in descending order by initiative
    );
  };

  return (
    <div className="container">
      <h1>Friendly reminder: don't kill them</h1>
      <div className="form-container">
        <input
          className="input"
          placeholder="Character Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input"
          type="number"
          placeholder="Initiative"
          value={initiative}
          onChange={(e) => setInitiative(e.target.value)}
        />
        <input
          className="input"
          type="number"
          placeholder="HP"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
        />
        <button className="add-btn" onClick={addCharacter}>
          Add Character
        </button>
      </div>
      
      <button className="generate-btn" onClick={generatePremadeCharacters}>
        Generate Pre-made Characters
      </button>

      <div>
        {characters.map((char, index) => (
          <div key={index} className="character">
            <input
              className="input"
              value={char.name}
              onChange={(e) => updateCharacter(index, "name", e.target.value)}
            />
            <input
              className="input"
              type="number"
              value={char.initiative}
              onChange={(e) => updateCharacter(index, "initiative", e.target.value)}
            />
            <input
              className="input"
              type="number"
              value={char.hp}
              onChange={(e) => updateCharacter(index, "hp", e.target.value)}
            />

            <input
              className="input"
              type="number"
              value={char.ac}
              onChange={(e) => updateCharacter(index, "ac", e.target.value)}
            />
            <div className="button-container">
              <button className="duplicate-btn" onClick={() => duplicateCharacter(index)}>
                Duplicate
              </button>
              <button className="remove-btn" onClick={() => removeCharacter(index)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {characters.length > 0 && (
        <button className="reset-btn" onClick={resetList}>
          Reset Initiative List
        </button>
      )}
      <button className="refresh-btn" onClick={refreshOrder}>
  Refresh Order
</button>
    </div>
  );
}
