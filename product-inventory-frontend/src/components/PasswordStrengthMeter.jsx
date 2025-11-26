import React from "react";
import "../styles/passwordStrength.css";

export default function PasswordStrengthMeter({ password, email }) {
  if (!password) return null;

  const minLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const noEmail = email ? !password.includes(email.split("@")[0]) : true;

  const strengthScore =
    [minLength, hasUpper, hasLower, hasNumber, hasSymbol, noEmail].filter(Boolean)
      .length;

  const getStrengthLabel = () => {
    if (strengthScore <= 2) return "Weak";
    if (strengthScore <= 4) return "Medium";
    return "Strong";
  };

  return (
    <div className="strength-box">
      <div className="strength-header">
        <span>Password strength:</span>
        <span className={`strength-label ${getStrengthLabel().toLowerCase()}`}>
          {getStrengthLabel()}
        </span>
      </div>

      <ul className="checklist">
        <li className={minLength ? "good" : "bad"}>✓ Must be at least 8 characters</li>
        <li className={hasUpper ? "good" : "bad"}>✓ Contains an uppercase letter</li>
        <li className={hasLower ? "good" : "bad"}>✓ Contains a lowercase letter</li>
        <li className={hasNumber ? "good" : "bad"}>✓ Contains a number</li>
        <li className={hasSymbol ? "good" : "bad"}>✓ Contains a special character</li>
        <li className={noEmail ? "good" : "bad"}>✓ Does not contain your email</li>
      </ul>
    </div>
  );
}
