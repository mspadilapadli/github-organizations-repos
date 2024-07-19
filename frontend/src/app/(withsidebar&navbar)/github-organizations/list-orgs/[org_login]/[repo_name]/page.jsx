"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { distanceDate, formatDate } from "../../../../../../utils/formatedDate";

export default function RepoDetail({ params }) {
    const [repo, setRepo] = useState({});
    const [commits, setCommits] = useState([]);

    const login_name = params.org_login;
    const repo_name = params.repo_name;

    const fetchRepo = async () => {
        try {
            const { data } = await axios({
                method: "get",
                url:
                    "https://api.github.com" +
                    `/repos/${login_name}/${repo_name}`,
                headers: {
                    "X-GitHub-Api-Version": "2022-11-28",
                    Authorization: `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`,
                },
            });

            setRepo(data);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchCommits = async () => {
        try {
            const { data } = await axios({
                method: "get",
                url:
                    "https://api.github.com" +
                    `/repos/${login_name}/${repo_name}/commits`,
                headers: {
                    "X-GitHub-Api-Version": "2022-11-28",
                    Authorization: `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`,
                },
            });

            console.log(data, "---<data commits");
            setCommits(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchRepo();
        fetchCommits();
    }, []);

    return (
        <>
            <div className="bg-gray-100 min-h-screen  p-8 text-gray-900">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center mb-8">
                        <img
                            src={repo?.owner?.avatar_url ?? "github.png"}
                            alt={repo.name}
                            className="w-8 h-8 rounded-full"
                        />
                        <div className="ml-4 flex items-center">
                            <Link
                                href={`/github-organizations/list-orgs/${login_name}/${repo_name}`}
                                className="text-xl font-bold mr-3 hover:underline hover:text-blue-800"
                            >
                                {repo.name}
                            </Link>
                            <div className="badge badge-outline text-xs">
                                {repo.visibility}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flex items-center text-xs my-4">
                            <div className="flex items-center mr-10">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    class="size-4 mr-1"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M6.97 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.25 4.81V16.5a.75.75 0 0 1-1.5 0V4.81L3.53 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5Zm9.53 4.28a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V7.5a.75.75 0 0 1 .75-.75Z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                <p>Branches</p>
                            </div>
                            <div className="flex items-center mr-10">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="size-4 mr-1"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                                    />
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6 6h.008v.008H6V6Z"
                                    />
                                </svg>
                                <p>Tags</p>
                            </div>
                            <div className="flex items-center mr-10">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="size-4"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                    />
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                </svg>

                                <p> {repo.watchers_count} Watches</p>
                            </div>
                            <div className="flex items-center mr-10">
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
                                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                </svg>
                                <Link
                                    href={`/github-organizations/list-orgs/${repo?.owner?.login}/${repo.name}/commits`}
                                    className="hover:underline hover:text-blue-800"
                                >
                                    {commits.length} Commits
                                </Link>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-1">
                            <div
                                key={repo.name}
                                className="bg-white p-4 rounded-lg shadow-lg"
                            >
                                <div className="flex justify-between items-center">
                                    <div className=" flex my-2 items-center">
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
                                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                            />
                                        </svg>

                                        <p className="text-gray-600 text-xs">
                                            <span className="text-black font-semibold">
                                                {commits[0]?.author?.login}{" "}
                                            </span>
                                            {
                                                commits[0]?.commit?.message.split(
                                                    "\n"
                                                )[0]
                                            }
                                        </p>
                                    </div>
                                    <div className="btn bg-[#197935] btn-sm text-white">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="size-6"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                                            />
                                        </svg>
                                        Code
                                    </div>
                                </div>

                                <div className="my-2">
                                    <p className="text-gray-600 text-xs">
                                        {repo.description}
                                    </p>
                                </div>
                                <div className="text-xs">
                                    <hr className="border-t-2 border-gray-200 my-4" />
                                    <p>README.md</p>
                                    <hr className="border-t-2 border-gray-200 my-4" />
                                    <p>LICENSE.txt</p>
                                    <hr className="border-t-2 border-gray-200 my-4" />
                                    <p>TODO.doc</p>
                                    <hr className="border-t-2 border-gray-200 my-4" />
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
