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
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 fade-in pb-32">
            <Header />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-3xl">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-border pb-8">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-serif font-light text-foreground mb-3 tracking-tight">People</h1>
                        <p className="text-muted-foreground font-light text-lg">Connections you've invited to share your journey.</p>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0 shadow-sm transition-transform hover:scale-105">
                        <UserPlus className="h-4 w-4 mr-2" /> Invite someone
                    </Button>
                </div>

                {/* Search */}
                <div className="relative mb-12 max-w-2xl w-full">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <Input
                        placeholder="Search your connections by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 py-6 text-lg bg-white dark:bg-card border border-border rounded-full shadow-sm focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-foreground placeholder-muted-foreground transition-all"
                    />
                </div>

                {/* Connections List */}
                <div className="space-y-4">
                    {friends.map((friend) => (
                        <div key={friend.id} className="flex items-center justify-between p-6 bg-card border border-border rounded-2xl hover:border-foreground/20 hover:shadow-md transition-all duration-300">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12 border border-border">
                                    <AvatarFallback className="bg-secondary text-secondary-foreground font-serif">{friend.initials}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-medium text-card-foreground">{friend.name}</h3>
                                    <p className="text-sm text-muted-foreground font-light">{friend.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="hidden sm:flex flex-col items-end">
                                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Shared Journals</span>
                                    <span className="text-sm font-serif text-foreground">{friend.listsShared}</span>
                                </div>
                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-muted">
                                    <ExternalLink className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}

                    {friends.length === 0 && (
                        <div className="text-center py-20 bg-card rounded-2xl border border-dashed border-border slide-up">
                            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                            <h3 className="text-lg font-serif text-foreground mb-2">No connections yet</h3>
                            <p className="text-muted-foreground font-light mb-6">
                                Invite people close to you to keep them updated on your aspirations.
                            </p>
                            <Button variant="outline" className="border-border text-foreground hover:bg-muted">
                                <UserPlus className="h-4 w-4 mr-2" /> Invite someone
                            </Button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
