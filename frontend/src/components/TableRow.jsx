import axios from "axios";
import Link from "next/link";
export default function Table({ e, i, fetchOrgs }) {
    // console.log(e.id, "id ni boss");

    return (
        <>
            <tr>
                <th>{i + 1}</th>
                <td>
                    <Link
                        className="hover:text-sky-600"
                        href={`/github-organizations/list-orgs/${e.login}`}
                    >
                        {e.login}
                    </Link>
                </td>
                <th>{e.id}</th>
                <td>
                    {e.description
                        ? e.description
                        : `We are a community of developers focused on creating high-quality open-source software. Discover our projects and contribute!`}
                </td>
                <td className="flex justify-center items-center space-x-4 ">
                    <Link href={`/github-organizations/list-orgs/${e.login}`}>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 9H16C16.55 9 17 8.55 17 8C17 7.45 16.55 7 16 7H12C11.45 7 11 7.45 11 8C11 8.55 11.45 9 12 9ZM12 13H16C16.55 13 17 12.55 17 12C17 11.45 16.55 11 16 11H12C11.45 11 11 11.45 11 12C11 12.55 11.45 13 12 13ZM12 17H16C16.55 17 17 16.55 17 16C17 15.45 16.55 15 16 15H12C11.45 15 11 15.45 11 16C11 16.55 11.45 17 12 17ZM7 7H9V9H7V7ZM7 11H9V13H7V11ZM7 15H9V17H7V15ZM20 3H4C3.45 3 3 3.45 3 4V20C3 20.55 3.45 21 4 21H20C20.55 21 21 20.55 21 20V4C21 3.45 20.55 3 20 3ZM19 19H5V5H19V19Z"
                                fill="#00B4FF"
                            />
                        </svg>
                    </Link>
                </td>
            </tr>
        </>
    );
}
