import React, { useState, useEffect } from "react";
import "./ChaosBag.css"; // Import external CSS for styling

const ChaosBag = () => {
  // Define characters and their base skills for each test type
  const characters = {
    "Roland Banks": { knowledge: 3, agility: 2, combat: 4, willpower: 3 },
    "Daisy Walker": { knowledge: 5, agility: 2, combat: 2, willpower: 3 },
    "Zoey Samaras": { knowledge: 3, agility: 3, combat: 5, willpower: 3 },
    "Agnes Baker": { knowledge: 4, agility: 2, combat: 2, willpower: 5 },
  };

  const chaosBag = [+1, 0, -1, -1, -1, -2, -3, -4, +2, -6]; // Define chaos tokens
  const [selectedCharacter, setSelectedCharacter] = useState("Daisy Walker"); // Default character
  const [skillType, setSkillType] = useState("knowledge"); // Default skill type
  const [baseSkill, setBaseSkill] = useState(
    characters[selectedCharacter].knowledge
  ); // Character's base skill
  const [modifier, setModifier] = useState(0); // Modifier for the test
  const [difficulty, setDifficulty] = useState(3); // Test difficulty
  const [successTokens, setSuccessTokens] = useState([]);
  const [failTokens, setFailTokens] = useState([]);

  // Update base skill when character or skill type changes
  useEffect(() => {
    setBaseSkill(characters[selectedCharacter][skillType]);
  }, [selectedCharacter, skillType]);

  // Update skill when base skill or modifier changes
  useEffect(() => {
    categorizeTokens();
  }, [baseSkill, modifier, difficulty]);

  const categorizeTokens = () => {
    const skill = baseSkill + modifier;
    const successes = [];
    const failures = [];

    chaosBag.forEach((token) => {
      if (skill + token >= difficulty) {
        successes.push(token);
      } else {
        failures.push(token);
      }
    });

    setSuccessTokens(successes);
    setFailTokens(failures);
  };

  const passChance = (successTokens.length / chaosBag.length) * 100;

  return (
    <div className="chaos-container">
      <h3>Chaos Bag Probability Calculator</h3>

      {/* Character Selection */}
      <div className="input-container">
        <div className="input-group">
          <label>Select Character:</label>
          <select
            value={selectedCharacter}
            onChange={(e) => setSelectedCharacter(e.target.value)}
          >
            {Object.keys(characters).map((character, index) => (
              <option key={index} value={character}>
                {character}
              </option>
            ))}
          </select>
        </div>

        {/* Skill Type Selection */}
        <div className="input-group">
          <label>Select Skill Type:</label>
          <select
            value={skillType}
            onChange={(e) => setSkillType(e.target.value)}
          >
            <option value="knowledge">Knowledge</option>
            <option value="agility">Agility</option>
            <option value="combat">Combat</option>
            <option value="willpower">Willpower</option>
          </select>
        </div>
      </div>

      <div className="input-container">
        {/* Modifier Input */}
        <div className="input-group">
          <label>Modifier:</label>
          <input
            type="number"
            value={modifier}
            onChange={(e) => setModifier(parseInt(e.target.value))}
          />
        </div>

        <div className="input-group">
          <label>Test Difficulty:</label>
          <input
            type="number"
            value={difficulty}
            onChange={(e) => setDifficulty(parseInt(e.target.value))}
          />
        </div>
      </div>

      {/* Display base skill and modified skill */}
      <div>
        <p>
          Base Skill for {skillType}: {baseSkill}
        </p>
        <p>Modified Skill (with modifier): {baseSkill + modifier}</p>
      </div>

      {/* Token Tables */}
      <div className="token-tables">
        <div className="token-table success-table">
          <h4>Success Tokens</h4>
          <div className="tokens">
            {successTokens.map((token, index) => (
              <span key={index} className="token">
                {token}
              </span>
            ))}
          </div>
        </div>

        <div className="token-table fail-table">
          <h4>Fail Tokens</h4>
          <div className="tokens">
            {failTokens.map((token, index) => (
              <span key={index} className="token">
                {token}
              </span>
            ))}
          </div>
        </div>
      </div>

      <h4 className="pass-chance">Pass Chance: {passChance.toFixed(2)}%</h4>
    </div>
  );
};

export default ChaosBag;
