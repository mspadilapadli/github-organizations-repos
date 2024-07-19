import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function LayoutSideNav({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {/* <!-- Navbar start --> */}
            <Navbar />
            {/* <!-- Navbar end --> */}

            {/* <!-- Sidebar start--> */}
            <div className="flex">
                <Sidebar />
                {/* <!-- Sidebar end --> */}

                <div className="w-screen">
                    {/* <!-- your content goes here --> */}
                    {children}
                </div>
            </div>
        </>
    );
}
