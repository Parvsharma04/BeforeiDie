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
        <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-stone-200 fade-in pb-32">
            <Header />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-5xl">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-stone-200 pb-8">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-serif font-light text-stone-900 mb-3 tracking-tight">Inspiration</h1>
                        <p className="text-stone-500 font-light text-lg">Curated aspirations from the community to spark your own journey.</p>
                    </div>
                </div>

                {/* Minimal Search & Categories */}
                <div className="flex flex-col md:flex-row gap-8 mb-16">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 h-4 w-4" />
                        <Input
                            placeholder="Find inspiration..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-transparent border-t-0 border-x-0 border-b border-stone-300 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-stone-800 text-stone-800 placeholder:text-stone-400 pb-2 px-0"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none flex-1">
                        {categories.map((cat) => (
                            <Button
                                key={cat.id}
                                variant="outline"
                                className="border-stone-200 text-stone-600 hover:bg-stone-100 whitespace-nowrap rounded-full px-5 font-medium"
                            >
                                <span className="mr-2">{cat.emoji}</span> {cat.name}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Editor's Choice */}
                <section className="mb-20">
                    <h2 className="text-sm font-bold tracking-widest text-stone-400 uppercase mb-8 flex items-center gap-2">
                        <Compass className="w-4 h-4" /> Editor's Choice
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {curatedTemplates.map((template) => (
                            <div key={template.id} className="group bg-white border border-stone-200 rounded-2xl p-8 hover:border-stone-300 hover:shadow-sm transition-all duration-300 flex flex-col h-full cursor-pointer relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                                    <ArrowRight className="w-5 h-5 text-stone-400" />
                                </div>

                                <div className="text-4xl mb-6">{template.emoji}</div>
                                <h3 className="text-xl font-serif text-stone-900 mb-2">{template.title}</h3>
                                <p className="text-sm text-stone-500 font-light mb-6 flex-grow leading-relaxed">
                                    {template.description}
                                </p>

                                <div className="flex items-center justify-between pt-6 border-t border-stone-100 mt-auto">
                                    <span className="text-xs font-serif italic text-stone-400">{template.author}</span>
                                    <div className="flex items-center text-xs text-stone-400 font-medium">
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
