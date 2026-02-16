import { useState } from "react";
import "./FAQitem.css"

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="faq-item" onClick={() => setOpen(!open)}>
      <div className="faq-question">
        <span>{question}</span>
        <span>{open ? "−" : "+"}</span>
      </div>

      {open && <p className="faq-answer">{answer}</p>}
    </div>
  );
};

export default FAQItem;
