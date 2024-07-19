"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatDate } from "../../../../../utils/formatedDate";

export default function OrgRepositories({ params }) {
    const [orgRepositories, setOrgRepositories] = useState([]);
    const [orgReposByStar, setOrgReposByStar] = useState([]);
    const [org, serOrg] = useState({});

    const login_name = params.org_login;

    const fetchOrganization = async () => {
        try {
            const { data } = await axios({
                method: "get",
                url: "https://api.github.com" + `/orgs/${login_name}`,
                headers: {
                    "X-GitHub-Api-Version": "2022-11-28",
                    Authorization: `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`,
                },
            });

            serOrg(data);
        } catch (error) {
            console.log(error);
            // showToast(error.response.data.message);
        }
    };

    const fetchOrgRepositories = async () => {
        try {
            const { data } = await axios({
                method: "get",
                url: "https://api.github.com" + `/orgs/${login_name}/repos`,
                headers: {
                    "X-GitHub-Api-Version": "2022-11-28",
                    Authorization: `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`,
                },
            });

            // sortng by star_count
            const sortedReposByStar = data
                .sort((a, b) => b.stargazers_count - a.stargazers_count)
                .slice(0, 6);
            setOrgReposByStar(sortedReposByStar);
            const sortedRepositories = data.sort(
                (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
            );
            setOrgRepositories(sortedRepositories);
        } catch (error) {
            console.log(error);
            // showToast(error.response.data.message);
        }
    };

    useEffect(() => {
        fetchOrganization();
        fetchOrgRepositories();
    }, []);

    return (
        <>
            <div className="bg-gray-100 min-h-screen  p-8 text-gray-900">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center mb-8">
                        <img
                            src={org.avatar_url}
                            alt={org.name}
                            className="w-16 h-16 rounded-full"
                        />
                        <div className="ml-4">
                            <h1 className="text-2xl font-bold">{org.name}</h1>
                            {org.location ? (
                                <div className="flex  text-gray-600 text-sm">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="size-4 mr-2"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                        />
                                    </svg>

                                    {org.location}
                                </div>
                            ) : null}
                            <div className="flex item-center ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="size-4 mr-2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                                    />
                                </svg>

                                <a
                                    href={org.blog}
                                    target="blank"
                                    className="hover:underline text-sm"
                                >
                                    {org.blog}
                                </a>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-lg font-semibold mb-4">
                        Popular repositories
                        <hr className="border-t-2 border-gray-300 my-2" />
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {orgReposByStar.map((repo) => (
                            <div
                                key={repo.name}
                                className="bg-white p-4 rounded-lg shadow-lg"
                            >
                                <div className="flex justify-between items-center">
                                    <Link
                                        href={`/github-organizations/list-orgs/${repo.owner.login}/${repo.name}`}
                                        className=" text-lg font-semibold hover:underline hover:text-blue-800"
                                    >
                                        {repo.name}
                                    </Link>
                                    <div className="badge badge-outline text-xs">
                                        {repo.visibility}
                                    </div>
                                </div>

                                <div className="mb-5 mt-5">
                                    <p className="text-gray-600 text-xs">
                                        {repo.description}
                                    </p>
                                </div>
                                <div className="flex items-center justify-start">
                                    <span className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-4 h-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                                            />
                                        </svg>
                                        <span className="ml-1 text-xs mr-7">
                                            {repo.language}
                                        </span>
                                    </span>
                                    <div className="flex items-center space-x-4">
                                        <span className="flex items-center justify-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="size-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                                />
                                            </svg>
                                            <span className="ml-1 text-xs mr-5">
                                                {repo.stargazers_count}
                                            </span>
                                        </span>
                                        <span className="flex items-center">
                                            <svg
                                                width="22"
                                                height="22"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M7 5C7 3.89543 7.89543 3 9 3C10.1046 3 11 3.89543 11 5C11 5.74028 10.5978 6.38663 10 6.73244V14.0396H11.7915C12.8961 14.0396 13.7915 13.1441 13.7915 12.0396V10.7838C13.1823 10.4411 12.7708 9.78837 12.7708 9.03955C12.7708 7.93498 13.6662 7.03955 14.7708 7.03955C15.8753 7.03955 16.7708 7.93498 16.7708 9.03955C16.7708 9.77123 16.3778 10.4111 15.7915 10.7598V12.0396C15.7915 14.2487 14.0006 16.0396 11.7915 16.0396H10V17.2676C10.5978 17.6134 11 18.2597 11 19C11 20.1046 10.1046 21 9 21C7.89543 21 7 20.1046 7 19C7 18.2597 7.4022 17.6134 8 17.2676V6.73244C7.4022 6.38663 7 5.74028 7 5Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                            <span className="ml-1 text-xs">
                                                {repo.forks}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8">
                        <h2 className="text-lg font-semibold mb-4">People</h2>
                        <p className="text-gray-600 text-sm">
                            You must be a member to see who’s a part of this
                            organization.
                        </p>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-lg font-semibold mb-4">
                            Top languages
                        </h2>
                        <div className="flex space-x-4 text-sm">
                            <span className="bg-red-500 text-white px-2 py-1 rounded">
                                Ruby
                            </span>
                            <span className="bg-yellow-500 text-white px-2 py-1 rounded">
                                JavaScript
                            </span>
                            <span className="bg-purple-500 text-white px-2 py-1 rounded">
                                PHP
                            </span>
                            <span className="bg-blue-500 text-white px-2 py-1 rounded">
                                Python
                            </span>
                            <span className="bg-teal-500 text-white px-2 py-1 rounded">
                                Go
                            </span>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-lg font-semibold mb-4">
                            Repositories
                            <hr className="border-t-2 border-gray-300 my-2" />
                        </h2>
                        <div className="grid grid-cols-1 gap-1">
                            {orgRepositories.map((repo) => (
                                <div
                                    key={repo.name}
                                    className="bg-white p-4 rounded-lg shadow-lg"
                                >
                                    <div className="flex justify-between items-center">
                                        <Link
                                            href={`/github-organizations/list-orgs/${repo.owner.login}/${repo.name}`}
                                            className=" text-lg font-semibold hover:underline hover:text-blue-800"
                                        >
                                            {repo.name}
                                        </Link>
                                        <div className="badge badge-outline text-xs">
                                            {repo.visibility}
                                        </div>
                                    </div>

                                    <div className="my-2">
                                        <p className="text-gray-600 text-xs">
                                            {repo.description}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-start">
                                        <span className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-4 h-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                                                />
                                            </svg>
                                            <span className="ml-1 text-xs mr-7">
                                                {repo.language}
                                            </span>
                                        </span>
                                        <div className="flex items-center space-x-4">
                                            <span className="flex items-center justify-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                                    />
                                                </svg>
                                                <span className="ml-1 text-xs mr-5">
                                                    {repo.stargazers_count}
                                                </span>
                                            </span>
                                            <span className="flex items-center">
                                                <svg
                                                    width="22"
                                                    height="22"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M7 5C7 3.89543 7.89543 3 9 3C10.1046 3 11 3.89543 11 5C11 5.74028 10.5978 6.38663 10 6.73244V14.0396H11.7915C12.8961 14.0396 13.7915 13.1441 13.7915 12.0396V10.7838C13.1823 10.4411 12.7708 9.78837 12.7708 9.03955C12.7708 7.93498 13.6662 7.03955 14.7708 7.03955C15.8753 7.03955 16.7708 7.93498 16.7708 9.03955C16.7708 9.77123 16.3778 10.4111 15.7915 10.7598V12.0396C15.7915 14.2487 14.0006 16.0396 11.7915 16.0396H10V17.2676C10.5978 17.6134 11 18.2597 11 19C11 20.1046 10.1046 21 9 21C7.89543 21 7 20.1046 7 19C7 18.2597 7.4022 17.6134 8 17.2676V6.73244C7.4022 6.38663 7 5.74028 7 5Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                                <span className="ml-1 text-xs mr-5">
                                                    {repo.forks}
                                                </span>
                                                <span className="ml-1 text-xs mr-5  ">
                                                    <p>
                                                        Updated on{" "}
                                                        {formatDate(
                                                            repo.updated_at
                                                        )}
                                                    </p>
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
