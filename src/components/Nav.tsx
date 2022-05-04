import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <nav className="flex justify-around border-b-2 border-blue-500 py-5">
            <h2>
                <Link to="/">Tech-asess</Link>
            </h2>
            <ul>
                <li>
                    <Link to="/charts">Charts</Link>
                </li>
            </ul>
        </nav>
    );
}
