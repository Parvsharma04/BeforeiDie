"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Settings, LogOut, CheckCircle2, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuthStore } from "@/lib/store";

const Header = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    // Auth Store
    const { user, logout } = useAuthStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const navLinks = [
        { name: "My Lists", path: "/lists" },
        { name: "Discover", path: "/discover" },
        { name: "Memories", path: "/progress" },
        { name: "People", path: "/friends" },
    ];

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    if (!mounted) return null;

    const NavItems = () => (
        <>
            {navLinks.map((link) => (
                <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm font-medium transition-colors hover:text-stone-900 ${pathname === link.path
                        ? "text-stone-900 border-b border-stone-800"
                        : "text-stone-500"
                        }`}
                >
                    {link.name}
                </Link>
            ))}
        </>
    );

    return (
        <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-stone-50/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="flex items-center justify-center text-stone-700 bg-stone-200 h-8 w-8 rounded-full transition-transform group-hover:scale-105">
                            <span className="font-serif italic font-semibold">bd</span>
                        </div>
                        <span className="font-serif text-lg font-semibold tracking-tight text-stone-800">
                            Before I Die
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <NavItems />
                    </nav>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <ThemeToggle />

                    {/* Desktop User Menu */}
                    <div className="hidden md:flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8 border border-stone-200">
                                        <AvatarImage src={user?.avatar || "/placeholder-avatar.jpg"} alt={user?.name} />
                                        <AvatarFallback className="bg-stone-200 text-stone-700">
                                            {user?.name?.substring(0, 2).toUpperCase() || "ME"}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none font-serif text-stone-900">{user?.name}</p>
                                        <p className="text-xs leading-none text-stone-500">
                                            {user?.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/settings" className="cursor-pointer">
                                        <Settings className="mr-2 h-4 w-4 text-stone-500" />
                                        <span>Settings</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden text-stone-700">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-stone-50 border-stone-200">
                            <nav className="flex flex-col gap-6 mt-8">
                                <NavItems />
                                <hr className="border-stone-200" />
                                <Link
                                    href="/settings"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center text-sm font-medium text-stone-600 hover:text-stone-900"
                                >
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center text-sm font-medium text-red-600 hover:text-red-700 text-left"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </button>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

export default Header;
