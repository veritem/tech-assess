import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <nav className="flex justify-around border-b-2 border-blue-500 py-5">
            <h2>
                <Link to="/">Tech-asess</Link>
            </h2>
            <ul className="flex space-x-2">
                <li>
                    <Link to="/new">New todo</Link>
                </li>
                <li>
                    <Link to="/charts">Chart</Link>
                </li>
                <li>
                    <a href="https://github.com/veritem/tech-assess" rel="noreferrer" target="_blank">
                        Github
                    </a>
                </li>
            </ul>
        </nav>
    );
}
