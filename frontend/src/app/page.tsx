"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, BookOpen, Feather } from "lucide-react";
import Header from "@/components/Header";
import LandingPage from "@/components/LandingPage";
import CreateListModal from "@/components/CreateListModal";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export default function HomePage() {
  const { user, token } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: bucketLists = [] } = useQuery({
    queryKey: ['lists'],
    queryFn: async () => {
      const res = await api.get('/lists');
      return res.data;
    },
    enabled: !!token,
  });

  const { data: memories = [] } = useQuery({
    queryKey: ['memories', 'recent'],
    queryFn: async () => {
      const res = await api.get('/users/memories');
      return res.data.slice(0, 3); // Top 3
    },
    enabled: !!token,
  });

  const handleCreateSuccess = () => {
    setIsCreateModalOpen(false);
    queryClient.invalidateQueries({ queryKey: ['lists'] });
    toast({
      title: "Journal Created",
      description: "A new space for your aspirations is ready."
    });
  };

  if (!mounted) return null;

  if (!user || !token) {
    return <LandingPage onGetStarted={() => { }} />;
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-stone-200 fade-in">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-5xl">
        {/* Warm Greeting section */}
        <section className="mb-16">
          <h1 className="text-4xl lg:text-5xl font-serif font-light text-stone-900 mb-4 tracking-tight">
            Good evening, <span className="italic text-stone-600">{user.name.split(' ')[0]}.</span>
          </h1>
          <p className="text-stone-500 text-lg font-light max-w-2xl">
            A quiet space to reflect on where you've been and where you still want to go.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">

            {/* Active Lists */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif text-stone-800">Your journals</h2>
                <Button
                  variant="ghost"
                  className="text-stone-500 hover:text-stone-900 font-medium text-sm"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New journal
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bucketLists.map((list: any) => (
                  <div
                    key={list.id}
                    onClick={() => router.push(`/lists/${list.id}`)}
                    className="group bg-white border border-stone-200 rounded-2xl p-6 cursor-pointer hover:border-stone-300 hover:shadow-sm transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl">{list.emoji}</span>
                      <span className="text-xs font-medium text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        View →
                      </span>
                    </div>
                    <h3 className="font-serif text-lg text-stone-900 mb-1">{list.title}</h3>
                    <p className="text-sm text-stone-500 font-light line-clamp-2 mb-6">
                      {list.description}
                    </p>

                    {/* Soft Progress Representation */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-stone-300 rounded-full transition-all duration-1000"
                          style={{ width: `${list.total > 0 ? (list.completed / list.total) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-stone-400 font-medium tabular-nums">
                        {list.completed}/{list.total}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Create New Prompt Card */}
                <div
                  onClick={() => setIsCreateModalOpen(true)}
                  className="border border-dashed border-stone-200 rounded-2xl p-6 cursor-pointer hover:bg-stone-100/50 transition-colors flex flex-col items-center justify-center text-center min-h-[200px]"
                >
                  <div className="w-10 h-10 rounded-full bg-stone-100 flex flex-col items-center justify-center text-stone-400 mb-3">
                    <Plus className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-stone-600">Start another journal</p>
                  <p className="text-xs text-stone-400 mt-1">Capture a new set of dreams</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar / Reflection Area */}
          <div className="space-y-8">
            {/* Reflection Prompt */}
            <div className="bg-stone-800 text-stone-100 rounded-2xl p-8 relative overflow-hidden">
              <Feather className="absolute -right-4 -bottom-4 w-32 h-32 text-stone-700 opacity-30" />
              <h3 className="font-serif text-xl mb-3 relative z-10">Reflection</h3>
              <p className="text-sm text-stone-400 font-light leading-relaxed relative z-10 mb-6 font-serif italic">
                "What is one thing you accomplished recently that your younger self would be proud of?"
              </p>
              <Button className="w-full bg-stone-100 text-stone-800 hover:bg-white relative z-10" variant="secondary">
                Write a thought
              </Button>
            </div>

            {/* Recent Memories (replacing gamified stats) */}
            <div>
              <h3 className="font-serif text-lg text-stone-800 mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-stone-400" />
                Recent memories
              </h3>
              <div className="space-y-4">
                {memories.map((memory: any) => (
                  <div key={memory.id} className="bg-white border border-stone-100 rounded-xl p-4 flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-lg bg-stone-100 shrink-0 flex items-center justify-center text-xl">{memory.list.emoji}</div>
                    <div>
                      <p className="text-sm font-medium text-stone-700">{memory.text}</p>
                      {memory.reflection ? (
                        <p className="text-xs text-stone-400 mt-1 line-clamp-2 font-serif italic">"{memory.reflection}"</p>
                      ) : (
                        <p className="text-xs text-stone-400 mt-1">From {memory.list.title}</p>
                      )}
                    </div>
                  </div>
                ))}

                {memories.length === 0 && (
                  <div className="text-sm text-stone-400 font-light italic text-center py-6 border border-dashed border-stone-200 rounded-xl">
                    No fulfilled aspirations yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <CreateListModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
}
