import React, { useEffect, useState } from "react";
import zxcvbn from "zxcvbn";
import "../styles/passwordStrength.css";

export default function PasswordStrengthMeter({ password, setScore }) {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    // Avoid running when password empty
    if (!password) {
      setStrength(0);
      setScore(0);
      return;
    }

    const result = zxcvbn(password);
    setStrength(result.score);
    setScore(result.score);  // parent receives score
  }, [password, setScore]); // ⭐ include setScore (ESLint safe)

  const strengthLevels = [
    { label: "Very Weak", color: "#ff3e36" },
    { label: "Weak", color: "#ff691f" },
    { label: "Fair", color: "#ffda3a" },
    { label: "Good", color: "#0be779" },
    { label: "Strong", color: "#2dbf50" },
  ];

  const { label, color } = strengthLevels[strength];

  return (
    <div className="strength-container">
      <div className="bars">
        {[0, 1, 2, 3, 4].map((idx) => (
          <div
            key={idx}
            className="bar"
            style={{
              backgroundColor: idx <= strength ? color : "#eee",
            }}
          ></div>
        ))}
      </div>
      {password && <p className="strength-label" style={{ color }}>{label}</p>}
    </div>
  );
}
