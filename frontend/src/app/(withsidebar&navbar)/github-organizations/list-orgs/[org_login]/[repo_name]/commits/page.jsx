"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    distanceDate,
    formatDate,
} from "../../../../../../../utils/formatedDate";

export default function Commits({ params }) {
    const [repoCommits, setRepoCommits] = useState([]);

    const login_name = params.org_login;
    const repo_name = params.repo_name;

    const fetchRepoCommits = async () => {
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

            // sorting by updated_at
            const sortedCommits = data.sort(
                (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
            );
            setRepoCommits(sortedCommits);
        } catch (error) {
            console.log(error);
            // showToast(error.response.data.message);
        }
    };

    useEffect(() => {
        fetchRepoCommits();
    }, []);

    return (
        <>
            <div className="bg-gray-100 min-h-screen  p-8 text-gray-900">
                <div className="max-w-4xl mx-auto">
                    <div className="mt-8">
                        <h2 className="text-lg font-semibold mb-4">
                            Commits{" "}
                            <span className="text-gray-500 text-sm">
                                {" "}
                                / {repo_name}{" "}
                            </span>
                        </h2>
                        <div className="grid grid-cols-1 gap-1">
                            {repoCommits.map((commit) => (
                                <>
                                    <div className="mt-4 mb-1 text-xs">
                                        Commit on{" "}
                                        {formatDate(
                                            commit?.commit?.author?.date
                                        )}
                                    </div>
                                    <div
                                        key={commit.commit.message}
                                        className="bg-white p-4 rounded-lg shadow-lg"
                                    >
                                        <div className="flex justify-between items-center">
                                            <Link
                                                // href={`/github-organizations/list-orgs/${commit.owner.login}/${commit.name}`}
                                                href={"#"}
                                                className=" text-sm font-semibold hover:underline hover:text-blue-800"
                                            >
                                                {
                                                    commit.commit.message.split(
                                                        "\n"
                                                    )[0]
                                                }
                                            </Link>
                                            <div className="badge badge-outline text-xs">
                                                {commit.visibility}
                                            </div>
                                        </div>

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
                                                {commit?.author?.login}{" "}
                                                {distanceDate(
                                                    commit?.commit?.author?.date
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
