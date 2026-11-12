export function LawFaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="law-faq-item">
      <summary>
        <span>{question}</span>
      </summary>
      <p>{answer}</p>
    </details>
  );
}
