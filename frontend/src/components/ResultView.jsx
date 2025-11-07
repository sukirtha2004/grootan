import React from "react";
import "../styles/resultview.css";

const ResultView = ({ data, goBack }) => {
  const { maskedText, email, phone, creditCard, dob, name } = data;

  return (
    <div className="preview-container">

      <button className="back-btn" onClick={goBack}>
        ← Back
      </button>

      <h2 className="title">Masked Output</h2>

      <pre className="masked-box">{maskedText}</pre>

      <h3 className="subtitle">Extracted Information</h3>

      <div className="pii-grid">
        <PIIBlock label="Emails" data={email} />
        <PIIBlock label="Phone Numbers" data={phone} />
        <PIIBlock label="Credit Cards" data={creditCard} />
        <PIIBlock label="Dates of Birth" data={dob} />
        <PIIBlock label="Names" data={name} />
      </div>
    </div>
  );
};

const PIIBlock = ({ label, data }) => (
  <div className="pii-block">
    <h4>{label}</h4>
    {data.length > 0 ? data.map((item, i) => <p key={i}>{item}</p>) : <p className="none">None</p>}
  </div>
);

export default ResultView;
