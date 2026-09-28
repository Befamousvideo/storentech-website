export function ClosedInterview({
  title = "Interview",
  message,
}: {
  title?: string;
  message: string;
}) {
  return (
    <div className="interview-shell interview-locked">
      <p className="kicker">Private page</p>
      <h1>{title}</h1>
      <hr className="rule" />
      <p className="lede">{message}</p>
    </div>
  );
}
