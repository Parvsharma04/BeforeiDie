"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { BookOpen, Calendar, Filter, Mountain, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { useAuthStore } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export default function MemoriesPage() {
    const { token } = useAuthStore();
    const [filter, setFilter] = useState("all");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { data: rawMemories = [], isLoading } = useQuery({
        queryKey: ['memories'],
        queryFn: async () => {
            const res = await api.get('/users/memories');
            return res.data;
        },
        enabled: !!token,
    });

    const memories = useMemo(() => {
        return rawMemories.map((m: any) => ({
            id: m.id,
            text: m.text,
            listTitle: m.list.title,
            emoji: m.list.emoji,
            completedAt: m.completedAt,
            reflection: m.reflection,
            hasPhoto: false, // Feature not implemented yet
            year: new Date(m.completedAt).getFullYear()
        }));
    }, [rawMemories]);

    // Group memories by year
    const groupedMemories = useMemo(() => {
        return memories.reduce((acc: any, memory: any) => {
            if (!acc[memory.year]) acc[memory.year] = [];
            acc[memory.year].push(memory);
            return acc;
        }, {});
    }, [memories]);

    const years = Object.keys(groupedMemories).map(Number).sort((a, b) => b - a);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-stone-200 fade-in pb-32">
            <Header />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-stone-200 pb-8">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-serif font-light text-stone-900 mb-3 tracking-tight">Memories</h1>
                        <p className="text-stone-500 font-light text-lg">A timeline of your lived experiences and reflections.</p>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 text-stone-300 animate-spin" />
                    </div>
                ) : (
                    <>
                        {/* Filters */}
                        {years.length > 0 && (
                            <div className="flex items-center gap-4 mb-16 overflow-x-auto pb-2 scrollbar-none">
                                <Button
                                    variant="ghost"
                                    onClick={() => setFilter("all")}
                                    className={`font-medium ${filter === "all" ? "bg-stone-200 text-stone-900" : "text-stone-500 hover:text-stone-900"}`}
                                >
                                    All time
                                </Button>
                                {years.map(year => (
                                    <Button
                                        key={year}
                                        variant="ghost"
                                        onClick={() => setFilter(year.toString())}
                                        className={`font-medium ${filter === year.toString() ? "bg-stone-200 text-stone-900" : "text-stone-500 hover:text-stone-900"}`}
                                    >
                                        {year}
                                    </Button>
                                ))}
                                <div className="w-px h-6 bg-stone-300 mx-2" />
                                <Button variant="ghost" className="text-stone-500 hover:text-stone-900 gap-2">
                                    <Filter className="w-4 h-4" /> Attributes
                                </Button>
                            </div>
                        )}

                        {/* Timeline */}
                        <div className="space-y-16">
                            {years.filter(y => filter === "all" || filter === y.toString()).map(year => (
                                <section key={year} className="relative">
                                    <h2 className="text-3xl font-serif font-light text-stone-400 mb-8 sticky top-20 bg-stone-50/90 backdrop-blur-sm z-10 py-4">
                                        {year}
                                    </h2>

                                    <div className="space-y-12">
                                        {groupedMemories[year].map((memory: any) => (
                                            <div key={memory.id} className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
                                                {/* Meta */}
                                                <div className="pt-2">
                                                    <div className="text-sm font-medium text-stone-500 mb-1">
                                                        {new Date(memory.completedAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-stone-400">
                                                        <span className="text-lg">{memory.emoji}</span>
                                                        From {memory.listTitle}
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="bg-white border border-stone-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                                    <h3 className="text-xl font-serif text-stone-900 mb-4">{memory.text}</h3>

                                                    {memory.reflection && (
                                                        <p className="text-stone-600 leading-relaxed font-light mb-6">
                                                            {memory.reflection}
                                                        </p>
                                                    )}

                                                    {memory.hasPhoto && (
                                                        <div className="relative h-64 w-full bg-stone-100 rounded-xl overflow-hidden flex items-center justify-center border border-stone-100">
                                                            <span className="text-stone-300 font-serif italic text-sm">Image placeholder</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            ))}

                            {memories.length === 0 && (
                                <div className="text-center py-20 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                                    <Mountain className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-serif text-stone-900 mb-2">No memories yet</h3>
                                    <p className="text-stone-500 font-light mb-6">
                                        Fulfilled aspirations will appear here as a timeline of your life.
                                    </p>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
