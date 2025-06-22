'use client';

import { useRouter } from 'next/navigation';  // Changed from 'next/router'
import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

export default function BlogDetailPage({ params }) {  // Get params from props
    const router = useRouter();
    const { id } = React.use(params);  // Get id from params instead of router.query
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchBlog = async () => {
                setLoading(true);
                try {
                    const mockBlog = {
                        id,
                        title: 'The Future of VLSI Design in 2025',
                        author: 'Dr. Sarah Chen',
                        date: 'May 15, 2023',
                        readTime: '8 min read',
                        category: 'Featured',
                        content: `
              <h2 class="text-xl font-semibold mb-4">Introduction</h2>
              <p class="mb-4">The VLSI industry is undergoing rapid transformation as we approach 2025...</p>
              <h2 class="text-xl font-semibold mb-4">Emerging Technologies</h2>
              <p class="mb-4">3D IC technology is becoming mainstream, enabling higher performance...</p>
            `,
                    };
                    setBlog(mockBlog);
                } catch (error) {
                    console.error('Error fetching blog:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchBlog();
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

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Head>
                <title>{blog.title} | Chip Sphere</title>
            </Head>


            {/* Main Content */}
            <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-primary mb-6 hover:underline"
                >
                    ← Back to Blogs
                </button>

                {/* Blog Header */}
                <div className="mb-8">
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-accent text-accent-foreground mb-4">
                        {blog.category}
                    </span>
                    <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
                    <div className="flex items-center text-muted-foreground mb-6">
                        <span>By {blog.author}</span>
                        <span className="mx-2">•</span>
                        <span>{blog.date}</span>
                        <span className="mx-2">•</span>
                        <span>{blog.readTime}</span>
                    </div>
                </div>

                {/* Blog Content */}
                <article className="prose prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </article>
            </main>
        </div>
    );
}