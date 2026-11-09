import { LAW_COPY, LAW_INTAKE_HOLD_NOTE, LAW_INTAKE_URL } from "@/lib/law-landing";

export function LawInertCta({
  label,
  noteId,
}: {
  label: string;
  noteId: string;
}) {
  return (
    <div className="law-cta-block">
      <button
        type="button"
        className="law-cta"
        aria-disabled="true"
        aria-describedby={noteId}
        data-intended-href={LAW_INTAKE_URL}
      >
        {label}
      </button>
      <p id={noteId} className="law-cta-hold">
        {LAW_INTAKE_HOLD_NOTE}
      </p>
    </div>
  );
}

export function LawHeroNote() {
  return <p className="law-cta-note">{LAW_COPY.hero.note}</p>;
}

export function LawClosingNote() {
  return <p className="law-cta-note">{LAW_COPY.closing.note}</p>;
}
