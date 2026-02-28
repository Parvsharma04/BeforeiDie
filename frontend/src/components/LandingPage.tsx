"use client";

import React, { useState } from "react";
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
        <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-stone-200 flex flex-col items-center justify-center p-4">
            <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                {/* Left Side - Hero / Editorial Content */}
                <div className="space-y-8 fade-in">
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-stone-200 text-stone-700 rounded-full flex items-center justify-center text-xl font-serif italic font-semibold">
                            bd
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-serif font-light text-stone-900 leading-tight tracking-tight">
                            Remember <br />
                            <span className="italic text-stone-500">what matters.</span>
                        </h1>
                    </div>

                    <p className="text-lg lg:text-xl text-stone-600 leading-relaxed max-w-md font-light">
                        A quiet, intentional journal for your life's aspirations. No streaks. No pressure. Just a gentle place to capture the things you don't want to forget to live.
                    </p>

                    <div className="pt-4 grid grid-cols-1 gap-6 max-w-sm">
                        <div className="flex items-start gap-4">
                            <Feather className="w-5 h-5 text-stone-400 mt-1 shrink-0" />
                            <div>
                                <h3 className="font-serif font-medium text-stone-800">Reflect deeply</h3>
                                <p className="text-sm text-stone-500 mt-1">Write your aspirations like a journal, returning to them as life changes.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Heart className="w-5 h-5 text-stone-400 mt-1 shrink-0" />
                            <div>
                                <h3 className="font-serif font-medium text-stone-800">Collect memories</h3>
                                <p className="text-sm text-stone-500 mt-1">Crossed-out items become personal memoirs, not gamified checkmarks.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Soft Auth Form */}
                <div className="w-full max-w-sm mx-auto lg:mx-0 bg-white p-8 rounded-2xl shadow-sm border border-stone-100 slide-up">
                    <div className="mb-8">
                        <h2 className="text-2xl font-serif text-stone-900">
                            {isLogin ? "Welcome back" : "Begin your journal"}
                        </h2>
                        <p className="text-stone-500 text-sm mt-2">
                            {isLogin ? "Sign in to continue." : "Create a quiet space for your dreams."}
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-stone-500" htmlFor="name">Preferred name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400 focus:border-stone-400 transition-colors"
                                />
                            </div>
                        )}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-stone-500" htmlFor="email">Email address</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400 focus:border-stone-400 transition-colors"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-stone-500" htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400 focus:border-stone-400 transition-colors"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-4 bg-stone-800 hover:bg-stone-900 text-stone-50 py-5 rounded-lg font-medium transition-all"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : isLogin ? "Sign in" : "Create space"}
                        </Button>
                    </form>

                    <div className="mt-8 text-center border-t border-stone-100 pt-6">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-stone-500 text-sm hover:text-stone-800 transition-colors"
                        >
                            {isLogin
                                ? "Need an account? Start here."
                                : "Already have an account? Sign in."}
                        </button>
                    </div>
                </div>
            </div>

            {/* Minimal footer */}
            <div className="absolute bottom-6 text-center w-full text-stone-400 text-xs">
                Before I Die 🕊️ &copy; {new Date().getFullYear()}
            </div>
        </div>
    );
};

export default LandingPage;
