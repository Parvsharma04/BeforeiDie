"use client";

import React, { useState } from "react";
import { Search, Compass, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";

export default function DiscoverPage() {
    const [searchQuery, setSearchQuery] = useState("");

    // Hardcoded for UI preview
    const categories = [
        { id: "travel", name: "Travel & Adventure", emoji: "✈️" },
        { id: "learning", name: "Growth", emoji: "📚" },
        { id: "health", name: "Wellness", emoji: "🌿" },
        { id: "creative", name: "Creativity", emoji: "🎨" },
        { id: "connection", name: "Connection", emoji: "🤝" },
    ];

    const curatedTemplates = [
        {
            id: 1, title: "The Quiet Year", emoji: "🍂", author: "Curated by BID",
            description: "12 gentle aspirations for a year of slowing down and finding peace in the mundane.",
            saves: 1200, category: "Wellness",
        },
        {
            id: 2, title: "Essential Classics", emoji: "📖", author: "Book Club",
            description: "50 books that shaped modern literature. A lifetime reading list.",
            saves: 850, category: "Growth",
        },
        {
            id: 3, title: "Into the Wild", emoji: "🏔️", author: "Alex Honnold",
            description: "The ultimate outdoor bucket list for those who hear the mountains calling.",
            saves: 3200, category: "Travel & Adventure",
        },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 fade-in pb-32">
            <Header />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-5xl">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-border pb-8">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-serif font-light text-foreground mb-3 tracking-tight">Inspiration</h1>
                        <p className="text-muted-foreground font-light text-lg">Curated aspirations from the community to spark your own journey.</p>
                    </div>
                </div>

                {/* Search & Categories */}
                <div className="flex flex-col gap-8 mb-16">
                    <div className="relative max-w-2xl w-full">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                            placeholder="Discover templates, goals, or people..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 py-6 text-lg bg-white dark:bg-card border border-border rounded-full shadow-sm focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary text-foreground placeholder-muted-foreground transition-all"
                        />
                    </div>

                    <div className="relative w-full overflow-hidden">
                        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x">
                            {categories.map((cat) => (
                                <Button
                                    key={cat.id}
                                    variant="outline"
                                    className="border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted whitespace-nowrap rounded-full px-6 py-5 font-medium shadow-sm transition-all hover:shadow-md snap-start"
                                >
                                    <span className="mr-2 text-lg">{cat.emoji}</span> {cat.name}
                                </Button>
                            ))}
                        </div>
                        {/* Fade to indicate more items (right side) */}
                        <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
                    </div>
                </div>

                {/* Editor's Choice */}
                <section className="mb-20">
                    <h2 className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-8 flex items-center gap-2 opacity-80">
                        <Compass className="w-4 h-4" /> Editor's Choice
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {curatedTemplates.map((template) => (
                            <div key={template.id} className="group bg-card border border-border rounded-2xl p-8 hover:border-foreground/20 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>

                                <div className="text-4xl mb-6 transition-transform group-hover:scale-110 duration-500 origin-left">{template.emoji}</div>
                                <h3 className="text-xl font-serif text-card-foreground mb-2">{template.title}</h3>
                                <p className="text-sm text-muted-foreground font-light mb-6 flex-grow leading-relaxed">
                                    {template.description}
                                </p>

                                <div className="flex items-center justify-between pt-6 border-t border-border mt-auto">
                                    <span className="text-xs font-serif italic text-muted-foreground">{template.author}</span>
                                    <div className="flex items-center text-xs text-muted-foreground font-medium">
                                        <Heart className="w-3 h-3 mr-1" />
                                        {template.saves.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
