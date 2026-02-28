"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, BookOpen, Feather, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import LandingPage from "@/components/LandingPage";
import CreateListModal from "@/components/CreateListModal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export default function HomePage() {
  const { user, token } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isThoughtModalOpen, setIsThoughtModalOpen] = useState(false);
  const [thoughtText, setThoughtText] = useState("");
  const [isSubmittingThought, setIsSubmittingThought] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const handleSaveThought = async () => {
    if (!thoughtText.trim()) return;
    setIsSubmittingThought(true);

    try {
      await api.post('/activities/thought', { text: thoughtText });
      queryClient.invalidateQueries({ queryKey: ['thoughts'] });

      toast({
        title: "Thought captured",
        description: "Your reflection has been safely stored.",
      });

      setThoughtText("");
      setIsThoughtModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save your thought. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingThought(false);
    }
  };

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

  const { data: dbThoughts = [] } = useQuery({
    queryKey: ['thoughts'],
    queryFn: async () => {
      const res = await api.get('/activities?limit=50');
      // Filter activities to only show thoughts
      return res.data.activities.filter((a: any) => a.type === 'thought').slice(0, 3);
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
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-stone-300 dark:selection:bg-stone-700 selection:text-stone-900 dark:selection:text-stone-100 fade-in">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-5xl">
        {/* Warm Greeting section */}
        <section className="mb-16">
          <h1 className="text-4xl lg:text-5xl font-serif font-light text-foreground mb-4 tracking-tight">
            Good evening, <span className="italic text-muted-foreground">{user.name.split(' ')[0]}.</span>
          </h1>
          <p className="text-muted-foreground text-lg font-light max-w-2xl">
            A quiet space to reflect on where you've been and where you still want to go.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">

            {/* Active Lists */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif text-foreground">Your journals</h2>
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground hover:bg-muted font-medium text-sm"
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
                    className="group bg-card border border-border rounded-2xl p-6 cursor-pointer hover:border-foreground/20 hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl transition-transform group-hover:scale-110 duration-500">{list.emoji}</span>
                      <span className="text-xs font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        View →
                      </span>
                    </div>
                    <h3 className="font-serif text-lg text-card-foreground mb-1">{list.title}</h3>
                    <p className="text-sm text-muted-foreground font-light line-clamp-2 mb-6">
                      {list.description}
                    </p>

                    {/* Soft Progress Representation */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary/40 rounded-full transition-all duration-1000"
                          style={{ width: `${list.total > 0 ? (list.completed / list.total) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground font-medium tabular-nums">
                        {list.completed}/{list.total}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Create New Prompt Card */}
                <div
                  onClick={() => setIsCreateModalOpen(true)}
                  className="border border-dashed border-border rounded-2xl p-6 cursor-pointer hover:bg-muted/50 transition-colors flex flex-col items-center justify-center text-center min-h-[200px]"
                >
                  <div className="w-10 h-10 rounded-full bg-secondary flex flex-col items-center justify-center text-secondary-foreground mb-3">
                    <Plus className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Start another journal</p>
                  <p className="text-xs text-muted-foreground mt-1">Capture a new set of dreams</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar / Reflection Area */}
          <div className="space-y-8">
            {/* Reflection Prompt */}
            <div className="bg-card border border-border rounded-2xl p-8 relative overflow-hidden transition-all duration-500 hover:shadow-md hover:border-border group">
              <Feather className="absolute -right-4 -bottom-4 w-32 h-32 text-muted/30 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12" />
              <h3 className="font-serif text-xl mb-3 relative z-10 text-foreground">Reflection</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed relative z-10 mb-6 font-serif italic">
                "What is one thing you accomplished recently that your younger self would be proud of?"
              </p>
              <Button
                onClick={() => setIsThoughtModalOpen(true)}
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 relative z-10 transition-all hover:scale-[1.02] active:scale-[0.98] border border-border/50 shadow-sm"
                variant="secondary"
              >
                Write a thought
              </Button>
            </div>

            {/* Recent Memories (replacing gamified stats) */}
            <div>
              <h3 className="font-serif text-lg text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-muted-foreground" />
                Recent memories
              </h3>
              <div className="space-y-4">
                {memories.map((memory: any) => (
                  <div key={memory.id} className="bg-card border border-border rounded-xl p-4 flex gap-4 items-start hover:shadow-sm transition-shadow">
                    <div className="w-12 h-12 rounded-lg bg-secondary shrink-0 flex items-center justify-center text-xl">{memory.list.emoji}</div>
                    <div>
                      <p className="text-sm font-medium text-card-foreground">{memory.text}</p>
                      {memory.reflection ? (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2 font-serif italic">"{memory.reflection}"</p>
                      ) : (
                        <p className="text-xs text-muted-foreground mt-1">From {memory.list.title}</p>
                      )}
                    </div>
                  </div>
                ))}

                {memories.length === 0 && (
                  <div className="text-sm text-muted-foreground font-light italic text-center py-6 border border-dashed border-border rounded-xl">
                    No fulfilled aspirations yet.
                  </div>
                )}
              </div>
            </div>
            {/* Recent Thoughts */}
            {dbThoughts.length > 0 && (
              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="font-serif text-lg text-foreground mb-4 flex items-center gap-2">
                  <Feather className="w-4 h-4 text-muted-foreground" />
                  Stored Notes
                </h3>
                <div className="space-y-4">
                  {dbThoughts.map((thought: any) => (
                    <div key={thought.id} className="bg-card border border-border rounded-xl p-5 hover:shadow-sm transition-shadow relative group">
                      <p className="text-sm font-medium text-card-foreground leading-relaxed whitespace-pre-wrap">{thought.message}</p>
                      <p className="text-[10px] text-muted-foreground mt-3 uppercase tracking-widest">
                        {new Date(thought.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                      <button
                        onClick={async () => {
                          try {
                            await api.delete(`/activities/${thought.id}`);
                            queryClient.invalidateQueries({ queryKey: ['thoughts'] });
                          } catch (e) {
                            toast({ title: "Error deleting thought", variant: "destructive" });
                          }
                        }}
                        className="absolute top-4 right-4 text-muted-foreground/0 group-hover:text-muted-foreground hover:text-destructive transition-all text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <CreateListModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />

      {/* Write a Thought Modal */}
      <Dialog open={isThoughtModalOpen} onOpenChange={setIsThoughtModalOpen}>
        <DialogContent className="sm:max-w-[500px] border-border bg-card text-card-foreground shadow-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl mb-2 text-foreground">Capture a thought</DialogTitle>
            <DialogDescription className="text-muted-foreground font-serif text-base">
              <span className="italic">"What is one thing you accomplished recently that your younger self would be proud of?"</span>
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Write freely... This is for your eyes only."
              value={thoughtText}
              onChange={(e) => setThoughtText(e.target.value)}
              className="min-h-[150px] resize-none border-border focus-visible:ring-1 focus-visible:ring-primary bg-background/50 leading-relaxed font-sans text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsThoughtModalOpen(false)} disabled={isSubmittingThought} className="text-muted-foreground hover:text-foreground">
              Cancel
            </Button>
            <Button onClick={handleSaveThought} disabled={isSubmittingThought || !thoughtText.trim()} className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[100px] shadow-sm transition-all">
              {isSubmittingThought ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save thought"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
