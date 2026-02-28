"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, BookOpen, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import CreateListModal from "@/components/CreateListModal";
import { useAuthStore } from "@/lib/store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { formatDistanceToNow } from "date-fns";

export default function MyListsPage() {
    const { token } = useAuthStore();
    const router = useRouter();
    const queryClient = useQueryClient();

    const [searchQuery, setSearchQuery] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { data: bucketLists = [], isLoading } = useQuery({
        queryKey: ['lists'],
        queryFn: async () => {
            const res = await api.get('/lists');
            return res.data;
        },
        enabled: !!token,
    });

    const filteredLists = bucketLists.filter((list: any) =>
        list.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCreateSuccess = () => {
        setIsCreateModalOpen(false);
        queryClient.invalidateQueries({ queryKey: ['lists'] });
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-stone-200 fade-in">
            <Header />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-stone-200 pb-8">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-serif font-light text-stone-900 mb-3 tracking-tight">Your Journals</h1>
                        <p className="text-stone-500 font-light text-lg">A quiet collection of your dreams and aspirations.</p>
                    </div>
                    <Button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-stone-800 hover:bg-stone-900 text-stone-50 shrink-0"
                    >
                        <Plus className="h-4 w-4 mr-2" /> Start a new journal
                    </Button>
                </div>

                {/* Minimal Search */}
                <div className="relative mb-12 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 h-4 w-4" />
                    <Input
                        placeholder="Search your collections..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-transparent border-t-0 border-x-0 border-b border-stone-300 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-stone-800 text-stone-800 placeholder:text-stone-400 pb-2 px-0"
                    />
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 text-stone-400 animate-spin" />
                    </div>
                ) : (
                    <>
                        {/* Clean List View instead of messy cards */}
                        <div className="space-y-4">
                            {filteredLists.map((list: any) => (
                                <div
                                    key={list.id}
                                    onClick={() => router.push(`/lists/${list.id}`)}
                                    className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white border border-stone-100 rounded-2xl hover:border-stone-300 hover:shadow-sm transition-all duration-300 cursor-pointer"
                                >
                                    <div className="flex items-center gap-5 mb-4 sm:mb-0">
                                        <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                                            {list.emoji}
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-lg text-stone-900 mb-1">{list.title}</h3>
                                            <div className="hidden sm:flex items-center gap-3 text-sm text-stone-500 font-light">
                                                <span>{list.category || "General"}</span>
                                                <span className="w-1 h-1 rounded-full bg-stone-300" />
                                                <span>Updated {formatDistanceToNow(new Date(list.updatedAt), { addSuffix: true })}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 shrink-0 sm:pl-6 sm:border-l border-stone-100">
                                        <div className="flex flex-col items-end gap-1 w-24">
                                            <div className="flex justify-between w-full text-xs text-stone-500 font-medium">
                                                <span>{list.completed}/{list.total}</span>
                                                <span>{list.total > 0 ? Math.round((list.completed / list.total) * 100) : 0}%</span>
                                            </div>
                                            <div className="h-1 w-full bg-stone-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-stone-400 transition-all duration-1000"
                                                    style={{ width: `${list.total > 0 ? (list.completed / list.total) * 100 : 0}%` }}
                                                />
                                            </div>
                                        </div>
                                        <BookOpen className="w-5 h-5 text-stone-300 group-hover:text-stone-600 transition-colors hidden sm:block" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredLists.length === 0 && (
                            <div className="text-center py-20 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                                <BookOpen className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                                <h3 className="text-lg font-serif text-stone-900 mb-2">No journals found</h3>
                                <p className="text-stone-500 font-light mb-6">
                                    {searchQuery ? "Try adjusting your search." : "Ready to write down your first aspirations?"}
                                </p>
                                <Button
                                    variant="outline"
                                    className="border-stone-300 text-stone-700 hover:bg-stone-100"
                                    onClick={() => setIsCreateModalOpen(true)}
                                >
                                    <Plus className="h-4 w-4 mr-2" /> Start a journal
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </main>

            <CreateListModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onSuccess={handleCreateSuccess} />
        </div>
    );
}
