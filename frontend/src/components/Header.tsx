"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
                    className={`text-sm font-medium transition-colors hover:text-foreground ${pathname === link.path
                        ? "text-foreground border-b border-foreground"
                        : "text-muted-foreground"
                        }`}
                >
                    {link.name}
                </Link>
            ))}
        </>
    );

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-1 group">
                        <div className="relative mt-1 h-8 w-10 transition-all group-hover:scale-110 drop-shadow-sm dark:invert">
                            <Image
                                src="/logo.svg"
                                alt="Before I Die Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <span className="font-serif text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
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
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full border border-border shadow-sm hover:scale-105 transition-transform">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user?.avatar || "/placeholder-avatar.jpg"} alt={user?.name} />
                                        <AvatarFallback className="bg-secondary text-secondary-foreground font-serif">
                                            {user?.name?.substring(0, 2).toUpperCase() || "ME"}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-card border-border" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none font-serif text-card-foreground">{user?.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user?.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-border" />
                                <DropdownMenuItem asChild className="focus:bg-muted focus:text-foreground">
                                    <Link href="/settings" className="cursor-pointer">
                                        <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <span>Settings</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-border" />
                                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden text-foreground hover:bg-muted">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background border-border">
                            <nav className="flex flex-col gap-6 mt-8">
                                <NavItems />
                                <hr className="border-border" />
                                <Link
                                    href="/settings"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center text-sm font-medium text-destructive hover:text-destructive/80 transition-colors text-left"
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
