'use client';

import { getBlog } from '@/services/blog';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import Head from 'next/head';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import { useUser } from '@/context/userContext';

// Animation variants for consistent transitions
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    }
};

export default function BlogDetailPage({ params }) {
    const { id } = React.use(params);
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter()
    const token = Cookies.get("token");
    const { dark } = useUser();

    const fetchBlog = async (id) => {
        try {
            const data = await getBlog(id, token);
            setBlog(data);
        } catch (error) {
            if (error.message == "Invalid or expired token.") {
                toast.warning("Please login to continue", { theme: dark ? "dark" : "light" });
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
            toast.warning("Please login to continue", { theme: dark ? "dark" : "light" });
            router.push(`/auth?mode=login&redirect=${encodeURIComponent(pathname)}`);
            return;
        } if (id) {
            fetchBlog(id);
        }
    }, [id]);

    if (loading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen bg-background text-foreground flex items-center justify-center"
            >
                <p>Loading blog post...</p>
            </motion.div>
        );
    }

    if (!blog) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen bg-background text-foreground flex items-center justify-center"
            >
                <p>Blog post not found</p>
            </motion.div>
        );
    }

    // Sanitize and render markdown
    const htmlContent = DOMPurify.sanitize(marked.parse(blog.content || ""));

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen bg-background text-foreground"
        >
            <Head>
                <title>{blog.title} | Chip Sphere</title>
            </Head>

            <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
                <motion.button
                    variants={itemVariants}
                    onClick={() => router.back()}
                    className="flex items-center text-primary/80 cursor-pointer mb-6 hover:text-primary"
                    whileHover={{ x: -3 }}
                >
                    ← Back to Blogs
                </motion.button>

                <motion.div variants={itemVariants} className="mb-8">
                    <motion.span
                        variants={itemVariants}
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-accent text-white mb-4 ${blog.type === 'Career' ? 'bg-purple-500' :
                            blog.type === 'Technical' ? 'bg-green-600' : 'bg-blue-500'
                            }`}
                    >
                        {blog.type}
                    </motion.span>
                    <motion.h1 variants={itemVariants} className="text-3xl font-bold mb-4">
                        {blog.title}
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-muted-foreground mb-4">
                        {blog.description}
                    </motion.p>
                    <motion.div variants={itemVariants} className="flex items-center text-muted-foreground mb-6">
                        <span>By {blog.author?.name || "Unknown Author"}</span>
                        <span className="mx-2">•</span>
                        <span>
                            {new Date(blog.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{blog.durationRead} min read</span>
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden"
                    whileHover={{ scale: 1.01 }}
                >
                    <img
                        src={blog.image || '/default-blog-image.jpg'}
                        alt={blog.title}
                        className="object-cover w-full h-full"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                    />
                </motion.div>

                <motion.article
                    variants={containerVariants}
                    className="prose prose-invert max-w-none [&_*]:text-foreground"
                >
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                </motion.article>
            </main>
        </motion.div>
    );
}