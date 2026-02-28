"use client";

import React, { useState } from "react";
import { UserPlus, Search, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PeoplePage() {
    const [searchQuery, setSearchQuery] = useState("");

    // Hardcoded for UI preview
    const friends = [
        { id: 1, name: "Sarah Jenkins", email: "sarah.j@example.com", initials: "SJ", listsShared: 2 },
        { id: 2, name: "Michael Chen", email: "m.chen@example.com", initials: "MC", listsShared: 1 },
        { id: 3, name: "Emma Wilson", email: "emma.w@example.com", initials: "EW", listsShared: 0 },
    ];

    return (
        <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-stone-200 fade-in pb-32">
            <Header />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-3xl">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-stone-200 pb-8">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-serif font-light text-stone-900 mb-3 tracking-tight">People</h1>
                        <p className="text-stone-500 font-light text-lg">Connections you've invited to share your journey.</p>
                    </div>
                    <Button className="bg-stone-800 hover:bg-stone-900 text-stone-50 shrink-0">
                        <UserPlus className="h-4 w-4 mr-2" /> Invite someone
                    </Button>
                </div>

                {/* Minimal Search */}
                <div className="relative mb-12 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 h-4 w-4" />
                    <Input
                        placeholder="Search your connections..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-transparent border-t-0 border-x-0 border-b border-stone-300 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-stone-800 text-stone-800 placeholder:text-stone-400 pb-2 px-0"
                    />
                </div>

                {/* Connections List */}
                <div className="space-y-4">
                    {friends.map((friend) => (
                        <div key={friend.id} className="flex items-center justify-between p-6 bg-white border border-stone-200 rounded-2xl hover:border-stone-300 transition-colors">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12 border border-stone-200">
                                    <AvatarFallback className="bg-stone-100 text-stone-600 font-serif">{friend.initials}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-medium text-stone-900">{friend.name}</h3>
                                    <p className="text-sm text-stone-500 font-light">{friend.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="hidden sm:flex flex-col items-end">
                                    <span className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">Shared Journals</span>
                                    <span className="text-sm font-serif text-stone-900">{friend.listsShared}</span>
                                </div>
                                <Button variant="ghost" size="icon" className="text-stone-400 hover:text-stone-900">
                                    <ExternalLink className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}

                    {friends.length === 0 && (
                        <div className="text-center py-20 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                            <Users className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                            <h3 className="text-lg font-serif text-stone-900 mb-2">No connections yet</h3>
                            <p className="text-stone-500 font-light mb-6">
                                Invite people close to you to keep them updated on your aspirations.
                            </p>
                            <Button variant="outline" className="border-stone-300 text-stone-700 hover:bg-stone-100">
                                <UserPlus className="h-4 w-4 mr-2" /> Invite someone
                            </Button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
