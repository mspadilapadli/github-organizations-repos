// "use client";
import { redirect } from "next/navigation";
import { useState } from "react";
import { cookies } from "next/headers";
import Link from "next/link";

export default function Login() {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    const handleSubmit = async (formData: FormData) => {
        "use server";
        // e.preventDefault();

        const email = formData.get("email");
        const password = formData.get("password");

        const body = {
            email,
            password,
        };

        // process.env.API_URL
        const response = await fetch(
            process.env.NEXT_PUBLIC_URL_API + `/users/login`,
            {
                method: "POST",
                cache: "no-store",
                body: JSON.stringify(body),
            }
        );

        if (!response.ok) {
            redirect(`/login?error=invalid username or password`);
        }

        const data = (await response.json()) as {
            access_token: string;
        };

        cookies().set("Authorization", `Bearer ${data.access_token}`);
        // console.log(data.access_token, "respone json");
        redirect("/github-organizations/list-orgs");
    };
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
                    {/* left side */}
                    <div className="flex flex-col justify-center p-8 md:p-14">
                        <span className="mb-3 text-xl font-bold">
                            Welcome back
                        </span>
                        <span className="font-light text-sm text-gray-400 mb-8">
                            Welcom back! Please enter your details
                        </span>

                        <form action={handleSubmit}>
                            <div className="py-4">
                                <span className="mb-2 text-md text-sm">
                                    Email
                                </span>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 text-sm "
                                    name="email"
                                    id="email"
                                    // value={email}
                                    // onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="py-4">
                                <span className="mb-2 text-md text-sm">
                                    Password
                                </span>
                                <input
                                    type="password"
                                    name="password"
                                    id="pass"
                                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 text-sm"
                                    // value={password}
                                    // onChange={(e) =>
                                    //     setPassword(e.target.value)
                                    // }
                                />
                            </div>
                            <div className="flex justify-center w-full py-4">
                                <span className="font-bold text-md text-neutral-400 text-sm">
                                    Forgot password
                                </span>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-sky-500/100 text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
                            >
                                Sign in
                            </button>
                        </form>

                        <div className="text-center text-gray-400 text-sm">
                            Don&apos;thave an account?
                            <Link href={"/register"}>
                                <span className="font-bold  text-gray-700 hover:text-sky-500/100 transition-colors duration-300">
                                    Sign up for free
                                </span>
                            </Link>
                        </div>
                    </div>
                    {/* {/* right side * /} */}
                    <div className="relative">
                        <img
                            src="githubwall.jpg"
                            alt="img"
                            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
                        />
                        {/* text on image  */}
                        <div className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
                            <span className="text-white text-lg">
                                Programmers seem to be changing the world. It
                                would be a relief, for them and for all of us,
                                if they knew something about it
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
