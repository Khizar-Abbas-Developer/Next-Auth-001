"use client"
import Link from "next/link";
import Image from 'next/image'
import { UserSignOut } from "@/redux/userSlice";
import { ImCross } from "react-icons/im";
import logo from "@/public/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import defaultImg from "@/public/125.gif";
import { Icon } from "@chakra-ui/react";
import { HiOutlineUserCircle } from "react-icons/hi";

const Navbar = () => {
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Menu", href: "/menu" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ]
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const [authorized, setAuthorized] = useState(false);
    const [admin, setAdmin] = useState(false);
    useEffect(() => {
        {
            currentUser?.image !== undefined && currentUser?.image !== "" ? (
                setAuthorized(true)
            ) : (
                setAuthorized(false)
            )
        }
        {
            currentUser?.email === process.env.NEXT_PUBLIC_REACT_APP_ADMIN_EMAIL ? (
                setAdmin(true)
            ) : (
                setAdmin(false)
            )
        }
    }, [currentUser?.image, currentUser?.email])
    const handleLogOut = () => {
        dispatch(UserSignOut(currentUser))
        window.location.href = "/login"
    }
    const pathname = usePathname();
    // function to navigate and to close the sidebar
    const SidebarLink = ({ href, children }) => {
        const router = useRouter();

        const closeSidebar = useCallback(() => {
            document.getElementById("my-drawer-4").click();
        }, []);

        const isActive = href === pathname;

        return (
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay">
                <div onClick={closeSidebar} className={isActive ? ' text-red-500 underline font-semibold' : ''}>
                <Link href={href}>
                    {children}
                </Link>
                </div>
            </label>
        );
    };

    return (
        <>
            <div className="navbar bg-base-500 drop-shadow-md bg-black md:px-5 text-white">
                <div className="flex-none md:hidden z-50">
                    <label htmlFor="my-drawer-4" className="drawer-button ml-2 mr-4 flex justify-center items-center bg-red-500 px-2 py-1 rounded-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </label>
                    {/* //Drawer */}
                    <div className="drawer drawer-start">
                        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

                        <div className="drawer-side">
                            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay">
                            </label>
                            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay">
                                    <ImCross className="text-2xl text-red-500" />
                                </label>
                                <div className="flex flex-col justify-center items-center gap-6 text-lg">
                                    {
                                        navLinks.map((link) => {
                                            return (
                                                <SidebarLink href={link.href} key={link.name}>{link.name}</SidebarLink>
                                            )
                                        })
                                    }
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <Link href={"/"} className="font-bold text-lg">
                        Logo
                    </Link>
                </div>
                {/* middle dev */}
                <div className="hidden md:flex items-center text-lg justify-between gap-4">
                    {
                        navLinks.map((link) => {
                            return (
                                <Link href={link.href} key={link.name} className={pathname === link.href ? "text-red-500 underline font-semibold" : ""}>{link.name}</Link>
                            )
                        })
                    }
                </div>
                {/* middle dev */}
                {/* third div starting from here */}
                <div className="dropdown dropdown-end ml-6">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        {authorized ? (
                            <div className="w-10 rounded-full border-2 border-red-600">
                                <Image src={currentUser?.image} width={24} height={24} className="w-6 h-6 md:w-7 md:h-7 rounded-full object-cover" alt="" />
                            </div>

                        ) : (
                            <div className="flex justify-center items-center">
                                <Icon as={HiOutlineUserCircle} className="text-[40px]" />
                            </div>
                        )
                        }
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-500 rounded-box w-52 bg-black text-red-500">
                        {
                            admin ? (
                                <>
                                    <li className="cursor-pointer">
                                        <Link href={"/product"} className="justify-between">
                                            Settings
                                            <span className="badge bg-red-500 text-black border-none">New</span>
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                null
                            )
                        }
                        {
                            authorized ? (
                                <>
                                    <li className="cursor-pointer">
                                        <Link href={"/edit-profile"} className="justify-between">
                                            Profile
                                            <span className="badge bg-red-500 text-black border-none">New</span>
                                        </Link>
                                    </li>
                                    <li onClick={handleLogOut} className="cursor-pointer"><a href="/login">Logout</a></li>
                                </>
                            ) : (
                                <li><Link href={"/login"} className="cursor-pointer">Login</Link></li>
                            )
                        }
                    </ul>
                </div>
                {/* third div ending here */}

            </div>
        </>
    );
};

export default Navbar;
