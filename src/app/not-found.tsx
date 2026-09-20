import Link from "next/link";

export default function NotFound() {
  return (
    <header className="page-hero">
      <div className="wrap">
        <p className="kicker">404</p>
        <h1>That page is not on the map.</h1>
        <hr className="rule" />
        <p className="lede">Return home, or start the paid analysis.</p>
        <div className="btn-row" style={{ marginTop: "1.6rem" }}>
          <Link className="btn btn-solid" href="/">
            Home
          </Link>
          <Link className="btn" href="/pay">
            Start the paid analysis
          </Link>
        </div>
      </div>
    </header>
  );
}
