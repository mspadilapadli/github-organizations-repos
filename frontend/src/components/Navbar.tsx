import Link from "next/link";

export default function Navbar() {
    return (
        <>
            <div className="navbar bg-gray-200 shadow-md h-6 ">
                <div className="flex-1">
                    <Link
                        href={`/github-organizations/list-orgs`}
                        className="btn btn-ghost text-base"
                    >
                        Github
                    </Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <details>
                                <summary>My Account</summary>
                                <ul className="bg-base-100 rounded-t-none p-2">
                                    <li>
                                        <a>Logout</a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
