"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, BookOpen, Feather, Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { useAuthStore } from "@/lib/store";

interface LandingPageProps {
    onGetStarted: () => void;
}

const LandingPage = ({ onGetStarted }: LandingPageProps) => {
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const login = useAuthStore((state) => state.login);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const endpoint = isLogin ? "/auth/login" : "/auth/register";
            const payload = isLogin
                ? { email: formData.email, password: formData.password }
                : formData;

            const { data } = await api.post(endpoint, payload);

            login(data.user, data.token);
            onGetStarted();
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Authentication Failed",
                description: error.response?.data?.message || "Something went wrong. Please try again."
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary-foreground flex flex-col items-center justify-center p-4">
            <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                {/* Left Side - Hero / Editorial Content */}
                <div className="space-y-8 fade-in">
                    <div className="space-y-4">
                        <div className="relative w-16 h-16 drop-shadow-sm dark:invert">
                            <Image
                                src="/logo.svg"
                                alt="Before I Die Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-serif font-light text-foreground leading-tight tracking-tight">
                            Remember <br />
                            <span className="italic text-muted-foreground">what matters.</span>
                        </h1>
                    </div>

                    <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-md font-light">
                        A quiet, intentional journal for your life's aspirations. No streaks. No pressure. Just a gentle place to capture the things you don't want to forget to live.
                    </p>

                    <div className="pt-4 grid grid-cols-1 gap-6 max-w-sm">
                        <div className="flex items-start gap-4 group">
                            <Feather className="w-5 h-5 text-muted-foreground mt-1 shrink-0 transition-colors group-hover:text-foreground" />
                            <div>
                                <h3 className="font-serif font-medium text-foreground transition-colors">Reflect deeply</h3>
                                <p className="text-sm text-muted-foreground mt-1">Write your aspirations like a journal, returning to them as life changes.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 group">
                            <Heart className="w-5 h-5 text-muted-foreground mt-1 shrink-0 transition-colors group-hover:text-foreground" />
                            <div>
                                <h3 className="font-serif font-medium text-foreground transition-colors">Collect memories</h3>
                                <p className="text-sm text-muted-foreground mt-1">Crossed-out items become personal memoirs, not gamified checkmarks.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Soft Auth Form */}
                <div className="w-full max-w-sm mx-auto lg:mx-0 bg-card p-8 rounded-2xl shadow-sm border border-border slide-up transition-shadow hover:shadow-md">
                    <div className="mb-8">
                        <h2 className="text-2xl font-serif text-card-foreground">
                            {isLogin ? "Welcome back" : "Begin your journal"}
                        </h2>
                        <p className="text-muted-foreground text-sm mt-2">
                            {isLogin ? "Sign in to continue." : "Create a quiet space for your dreams."}
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground" htmlFor="name">Preferred name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-colors"
                                />
                            </div>
                        )}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground" htmlFor="email">Email address</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-colors"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground" htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-colors"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground py-5 rounded-lg font-medium transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : isLogin ? "Sign in" : "Create space"}
                        </Button>
                    </form>

                    <div className="mt-8 text-center border-t border-border pt-6">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                        >
                            {isLogin
                                ? "Need an account? Start here."
                                : "Already have an account? Sign in."}
                        </button>
                    </div>
                </div>
            </div>

            {/* Minimal footer */}
            <div className="absolute bottom-6 text-center w-full text-muted-foreground text-xs opacity-70">
                Before I Die 🕊️ &copy; {new Date().getFullYear()}
            </div>
        </div>
    );
};

export default LandingPage;
