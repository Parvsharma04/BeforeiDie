"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MoreVertical, Plus, Feather, Check, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { useAuthStore } from "@/lib/store";

export default function ListDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const { token } = useAuthStore();
    const queryClient = useQueryClient();

    const [newItemText, setNewItemText] = useState("");
    const [writingReflection, setWritingReflection] = useState<number | null>(null);
    const [reflectionText, setReflectionText] = useState("");

    const { data: list, isLoading } = useQuery({
        queryKey: ['list', id],
        queryFn: async () => {
            const res = await api.get(`/lists/${id}`);
            return res.data;
        },
        enabled: !!token && !!id,
    });

    const addItemMutation = useMutation({
        mutationFn: async (text: string) => {
            await api.post(`/lists/${id}/items`, { text });
        },
        onSuccess: () => {
            setNewItemText("");
            queryClient.invalidateQueries({ queryKey: ['list', id] });
        }
    });

    const updateItemMutation = useMutation({
        mutationFn: async ({ itemId, data }: { itemId: number, data: any }) => {
            await api.patch(`/lists/${id}/items/${itemId}`, data);
        },
        onSuccess: () => {
            setWritingReflection(null);
            setReflectionText("");
            queryClient.invalidateQueries({ queryKey: ['list', id] });
        }
    });

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItemText.trim()) return;
        addItemMutation.mutate(newItemText);
    };

    const toggleItemComplete = (itemId: number, currentStatus: boolean) => {
        updateItemMutation.mutate({ itemId, data: { completed: !currentStatus } });
    };

    const handleSaveReflection = (itemId: number) => {
        if (!reflectionText.trim()) return;
        updateItemMutation.mutate({ itemId, data: { reflection: reflectionText } });
    };

    if (isLoading || !list) {
        return (
            <div className="min-h-screen bg-stone-50 flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-stone-300 animate-spin" />
                </div>
            </div>
        );
    }

    const pendingItems = list.items?.filter((i: any) => !i.completed) || [];
    const completedItems = list.items?.filter((i: any) => i.completed) || [];

    return (
        <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-stone-200 fade-in pb-32">
            <Header />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
                {/* Journal Navigation */}
                <button
                    onClick={() => router.push("/lists")}
                    className="flex items-center text-sm text-stone-500 hover:text-stone-900 transition-colors mb-12"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Journals
                </button>

                {/* Journal Title Heading */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-6">
                        <div className="text-6xl mb-6">{list.emoji}</div>
                        <Button variant="ghost" size="icon" className="text-stone-400 hover:text-stone-900">
                            <MoreVertical className="w-5 h-5" />
                        </Button>
                    </div>
                    <h1 className="text-5xl font-serif font-light text-stone-900 mb-4 tracking-tight leading-tight">
                        {list.title}
                    </h1>
                    {list.description && (
                        <p className="text-xl text-stone-500 font-serif italic max-w-2xl leading-relaxed">
                            {list.description}
                        </p>
                    )}
                </div>

                {/* Progress Visualizer (Subtle) */}
                <div className="flex items-center gap-4 mb-16 pb-8 border-b border-stone-200">
                    <div className="flex-1 h-1 bg-stone-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-stone-800 transition-all duration-1000"
                            style={{ width: `${list.total > 0 ? (list.completed / list.total) * 100 : 0}%` }}
                        />
                    </div>
                    <span className="text-sm font-medium text-stone-500 font-serif tracking-widest uppercase">
                        {list.completed} of {list.total} fulfilled
                    </span>
                </div>

                {/* Add new aspiration */}
                <form onSubmit={handleAddItem} className="mb-16 relative">
                    <Input
                        placeholder="Write a new calling..."
                        value={newItemText}
                        onChange={(e) => setNewItemText(e.target.value)}
                        disabled={addItemMutation.isPending}
                        className="w-full text-lg lg:text-xl py-6 pl-0 pr-12 bg-transparent border-t-0 border-x-0 border-b border-stone-300 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-stone-800 text-stone-800 placeholder:text-stone-300 font-serif"
                    />
                    <Button
                        type="submit"
                        size="icon"
                        variant="ghost"
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-900 hover:bg-transparent"
                        disabled={!newItemText.trim() || addItemMutation.isPending}
                    >
                        {addItemMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-6 h-6" />}
                    </Button>
                </form>

                {/* Aspirations (Uncompleted) */}
                <div className="space-y-6 mb-20">
                    <h2 className="text-sm font-bold tracking-widest text-stone-400 uppercase mb-8">Yet to experience</h2>

                    {pendingItems.map((item: any) => (
                        <div key={item.id} className="group flex items-start gap-4 p-4 -ml-4 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-stone-100 transition-all duration-300">
                            <button
                                onClick={() => toggleItemComplete(item.id, item.completed)}
                                disabled={updateItemMutation.isPending}
                                className="mt-1 w-6 h-6 rounded-full border border-stone-300 flex items-center justify-center shrink-0 group-hover:border-stone-500 transition-colors flex-col"
                            >
                                <Check className="w-3 h-3 text-stone-50 opacity-0 transition-opacity" />
                            </button>
                            <span className="text-lg text-stone-800 leading-relaxed pt-0.5">{item.text}</span>
                        </div>
                    ))}

                    {pendingItems.length === 0 && (
                        <div className="text-stone-400 italic font-serif py-4">No dreams waiting. Time to dream some more.</div>
                    )}
                </div>

                {/* Memories (Completed) - Richer UI */}
                {completedItems.length > 0 && (
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 mb-10">
                            <h2 className="text-sm font-bold tracking-widest text-stone-400 uppercase">Lived experiences</h2>
                            <div className="h-px bg-stone-200 flex-1" />
                        </div>

                        {completedItems.map((item: any) => (
                            <div key={item.id} className="relative pl-8 pb-10 border-l border-stone-200 last:border-transparent last:pb-0">
                                <div className="absolute w-3 h-3 rounded-full bg-stone-800 -left-1.5 top-2 border-4 border-stone-50" />

                                <div className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-lg font-medium text-stone-400 line-through decoration-stone-300">
                                            {item.text}
                                            <button onClick={() => toggleItemComplete(item.id, item.completed)} className="ml-2 text-xs text-stone-400 hover:text-stone-600 underline">Undo</button>
                                        </h3>
                                        {item.completedAt && (
                                            <span className="text-xs text-stone-400 font-medium bg-stone-100 px-2 py-1 rounded-md">
                                                {new Date(item.completedAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                                            </span>
                                        )}
                                    </div>

                                    {item.reflection ? (
                                        <div className="mt-4 pt-4 border-t border-stone-100">
                                            <p className="font-serif italic text-stone-600 leading-relaxed relative">
                                                <span className="text-4xl text-stone-200 absolute -top-4 -left-2 leading-none">"</span>
                                                <span className="relative z-10 pl-4">{item.reflection}</span>
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                                            <button
                                                onClick={() => {
                                                    setWritingReflection(item.id);
                                                    setReflectionText("");
                                                }}
                                                className="text-sm text-stone-400 hover:text-stone-900 flex items-center gap-2 transition-colors font-medium"
                                            >
                                                <Feather className="w-4 h-4" /> Add a reflection
                                            </button>
                                            <button className="text-sm text-stone-400 hover:text-stone-900 flex items-center gap-2 transition-colors font-medium">
                                                <ImageIcon className="w-4 h-4" /> Add photo
                                            </button>
                                        </div>
                                    )}

                                    {writingReflection === item.id && (
                                        <div className="mt-4 animate-fade-in">
                                            <textarea
                                                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4 text-sm font-serif italic text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-400 resize-none"
                                                rows={3}
                                                value={reflectionText}
                                                onChange={(e) => setReflectionText(e.target.value)}
                                                placeholder="What did this mean to you? How did it feel?"
                                            />
                                            <div className="flex justify-end gap-2 mt-2">
                                                <Button size="sm" variant="ghost" onClick={() => setWritingReflection(null)} className="text-stone-500">Cancel</Button>
                                                <Button size="sm" onClick={() => handleSaveReflection(item.id)} disabled={updateItemMutation.isPending} className="bg-stone-800 text-stone-50">
                                                    {updateItemMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                                                    Save reflection
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
