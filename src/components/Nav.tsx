import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="flex justify-between px-20 border-b-2 border-blue-500 py-5">
      <h2>
        <Link to="/" className="font-bold">
          Tech-asess
        </Link>
      </h2>
      <ul className="flex space-x-6">
        <li>
          <Link to="/new" className="font-bold">
            New todo
          </Link>
        </li>
        <li>
          <Link to="/charts" className="font-bold">
            Chart
          </Link>
        </li>
        {/* <li>
                    <a
                        href="https://github.com/veritem/tech-assess"
                        rel="noreferrer"
                        target="_blank"
                        className="font-bold"
                    >
                        Github
                    </a>
                </li> */}
      </ul>
    </nav>
  );
}
