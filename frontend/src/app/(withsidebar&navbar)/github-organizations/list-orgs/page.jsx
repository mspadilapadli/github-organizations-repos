"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import TableRow from "../../../../components/TableRow";
import { useSearchParams } from "next/navigation";

export default function ListOrder() {
    const [orgs, setOrgs] = useState({});
    const [search, setSearch] = useState("");

    const searchParams = useSearchParams();

    const fetchOrgs = async () => {
        try {
            const { data } = await axios({
                method: "get",
                url: "https://api.github.com/organizations",
                headers: {
                    "X-GitHub-Api-Version": "2022-11-28",
                    Authorization: `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`,
                },
            });

            setOrgs(data);
        } catch (error) {
            console.log(error);
            // showToast(error.response.data.message);
        }
    };

    useEffect(() => {
        fetchOrgs();
    }, []);

    return (
        <>
            <div className="">
                <div className="text-center mt-5 mb-7 font-bold text-xl">
                    Github Organizations
                </div>

                <div className="mx-5 bg-white shadow-md rounded-lg p-6">
                    <div className="flex">
                        <div>
                            {/* <label className="ml-3 text-sm">Org's name</label> */}

                            <form
                                className="pt-2 relative text-gray-600 mx-3"
                                // onSubmit={searchSubmit}
                            >
                                <input
                                    className="border-2 border-gray-300 bg-white h-9 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                    placeholder="Find org's name"
                                    id="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="absolute right-0 top-0 mt-5 mr-4"
                                >
                                    <svg
                                        className="text-gray-600 h-4 w-4 fill-current hover:text-sky-800"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        version="1.1"
                                        id="Capa_1"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 56.966 56.966"
                                        style={{
                                            enableBackground:
                                                "new 0 0 56.966 56.966",
                                        }}
                                        xmlSpace="preserve"
                                        width="512px"
                                        height="512px"
                                    >
                                        <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                                    </svg>
                                </button>
                            </form>
                        </div>

                        <div className="flex-grow"></div>
                    </div>
                    <div>
                        <div className="overflow-x-auto mt-7">
                            <table className="table table-zebra">
                                {/* head */}
                                <thead>
                                    <tr className="text-bold text-base text-[#052A49]">
                                        <th>No</th>
                                        <th>Org Name</th>
                                        <th>ID</th>
                                        <th>Description</th>
                                        <th>Repositories</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}

                                    {Array.isArray(orgs) &&
                                        orgs.map((e, i) => {
                                            return (
                                                <TableRow
                                                    e={e}
                                                    i={i}
                                                    key={e.id}
                                                    fetchOrgs={fetchOrgs}
                                                />
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
