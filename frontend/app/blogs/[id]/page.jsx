'use client';

import { getBlog } from '@/services/blog';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import Head from 'next/head';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";

import Cookies from 'js-cookie';

export default function BlogDetailPage({ params }) {
    const { id } = React.use(params);
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter()
    const token = Cookies.get("token");

    const fetchBlog = async (id) => {
        try {
            const data = await getBlog(id, token);
            setBlog(data);
        } catch (error) {
            if (error.message == "Invalid or expired token.") {
                toast.warning("Please login to continue");
                router.push(`/auth?mode=login&redirect=${encodeURIComponent(pathname)}`);
            }
            console.error("Failed to fetch blog:", error);
        } finally {
            setLoading(false);
        }
    };

    const pathname = usePathname();
    useEffect(() => {
        if (!token) {
            toast.warning("Please login to continue");
            router.push(`/auth?mode=login&redirect=${encodeURIComponent(pathname)}`);
            return;
        } if (id) {
            fetchBlog(id);
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <p>Loading blog post...</p>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <p>Blog post not found</p>
            </div>
        );
    }

    // Sanitize and render markdown
    const htmlContent = DOMPurify.sanitize(marked.parse(blog.content || ""));

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Head>
                <title>{blog.title} | Chip Sphere</title>
            </Head>

            <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-primary/80 cursor-pointer mb-6 hover:text-primary"
                >
                    ← Back to Blogs
                </button>

                <div className="mb-8">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-accent text-white mb-4  ${blog.type === 'Career' ? 'bg-purple-500' :
                        blog.type === 'Technical' ? 'bg-green-600' : 'bg-blue-500'}`}>
                        {blog.type}
                    </span>
                    <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
                    <p className="text-muted-foreground mb-4">{blog.description}</p>
                    <div className="flex items-center text-muted-foreground mb-6">
                        <span>By {blog.author?.name || "Unknown Author"}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(blog.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}</span>

                        <span className="mx-2">•</span>
                        <span>{blog.durationRead} min read</span>
                    </div>
                </div>
                <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                    <img
                        src={blog.image || '/default-blog-image.jpg'} // Add a default image path
                        alt={blog.title}
                        className="object-cover"
                        // Important for above-the-fold images
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                    />
                </div>
                <article className="prose prose-invert max-w-none  [&_*]:text-foreground">
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                </article>
            </main >
        </div >
    );
}
