import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Register() {
    const submitRegister = async (formData: FormData) => {
        "use server";

        const name = formData.get("name");
        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");

        const body = {
            name,
            username,
            email,
            password,
        };

        // process.env.API_URL
        const response = await fetch(
            process.env.NEXT_PUBLIC_URL_API + `/users/register`,
            {
                method: "POST",
                cache: "no-store",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (!response.ok) {
            const data = await response.json();
            console.log(data.message);
            redirect(`/register?error=invalid data`);
        }
        const data = await response.json();
        redirect("/login");
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
                    {/* left side */}
                    <div className="flex flex-col justify-center p-8 md:p-14">
                        <span className="mb-1 text-xl font-bold ">
                            Register
                        </span>
                        <span className="font-light text-sm text-gray-400 mb-8">
                            Please enter your details
                        </span>

                        <form action={submitRegister}>
                            <div className="py-2">
                                <span className="mb-2 text-md text-sm">
                                    Name
                                </span>

                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 text-sm "
                                    id="name"
                                    name="name"
                                    // value={input.name}
                                    // onChange={handleRegistInput}
                                />
                            </div>
                            <div className="py-2">
                                <span className="mb-2 text-md text-sm">
                                    Username
                                </span>

                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 text-sm "
                                    id="username"
                                    name="username"
                                    // value={input.username}
                                    // onChange={handleRegistInput}
                                />
                            </div>
                            <div className="py-2">
                                <span className="mb-2 text-md text-sm">
                                    Email
                                </span>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 text-sm "
                                    id="email"
                                    name="email"
                                    // value={input.email}
                                    // onChange={handleRegistInput}
                                />
                            </div>
                            <div className="py-2 mb-8">
                                <span className="mb-2 text-md text-sm">
                                    Password
                                </span>
                                <input
                                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 text-sm"
                                    type="password"
                                    id="pass"
                                    name="password"
                                    // value={input.password}
                                    // onChange={handleRegistInput}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-sky-500/100 text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300 text-sm"
                            >
                                Submit
                            </button>
                        </form>
                        <div className="flex items-center space-x-2">
                            <Link
                                href={"/login"}
                                className="flex items-center text-gray-700 hover:text-sky-500 transition-colors duration-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6 mr-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
                                    />
                                </svg>
                                <span className="text-sm"> Back</span>
                            </Link>
                        </div>
                    </div>
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
