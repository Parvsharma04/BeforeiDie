"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { Loader2 } from "lucide-react";

interface CreateListModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (list: any) => void;
}

const CreateListModal = ({ isOpen, onClose, onSuccess }: CreateListModalProps) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [emoji, setEmoji] = useState("✨");
    const queryClient = useQueryClient();

    const emojis = ["✨", "🌍", "📚", "🎨", "💪", "🧗‍♂️", "🧘‍♀️", "🎵", "📝", "🏡", "🌱", "❤️"];

    const createMutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await api.post('/lists', {
                title: data.name,
                description: data.description,
                emoji: data.emoji
            });
            return res.data;
        },
        onSuccess: (data) => {
            onSuccess(data);
            setName("");
            setDescription("");
            setEmoji("✨");
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createMutation.mutate({ name, description, emoji });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-white border-stone-200 rounded-2xl shadow-xl overflow-hidden p-0">
                <div className="px-6 py-8">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-2xl font-serif font-light text-stone-900">Start a new journal</DialogTitle>
                        <DialogDescription className="text-stone-500 font-light">
                            Give your aspirations a quiet home.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="emoji" className="text-xs font-medium text-stone-500 uppercase tracking-wider">Icon</Label>
                            <div className="flex flex-wrap gap-2 p-2 bg-stone-50 rounded-xl border border-stone-200">
                                {emojis.map((e) => (
                                    <button
                                        key={e}
                                        type="button"
                                        onClick={() => setEmoji(e)}
                                        className={`w-10 h-10 rounded-lg text-xl transition-all ${emoji === e
                                            ? "bg-white shadow-sm border border-stone-200 scale-110"
                                            : "hover:bg-stone-200/50 transparent border border-transparent"
                                            }`}
                                    >
                                        {e}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-xs font-medium text-stone-500 uppercase tracking-wider">Title</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g., The Quiet Year"
                                required
                                className="bg-stone-50 border-stone-200 focus-visible:ring-stone-400 font-serif text-lg"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-xs font-medium text-stone-500 uppercase tracking-wider">Description (Optional)</Label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="What is the intent behind this collection?"
                                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-400 resize-none font-light"
                                rows={3}
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-stone-100">
                            <Button type="button" variant="ghost" onClick={onClose} className="text-stone-500 hover:text-stone-900">
                                Cancel
                            </Button>
                            <Button type="submit" disabled={createMutation.isPending} className="bg-stone-800 hover:bg-stone-900 text-stone-50">
                                {createMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                                Create Journal
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreateListModal;
