'use client';

import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { marked } from 'marked';
import DOMPurify from 'dompurify';  // Make sure to `npm install dompurify`
import React, { useState, useEffect } from 'react';
import { getProject } from '@/utils/projects';
import Cookies from 'js-cookie';

export default function BlogDetailPage({ params }) {
  const { id } = React.use(params);  // Properly get the blog ID
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProject = async (id) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        router.push('/auth?mode=login')
      }
      const data = await getProject(id, token);  // Ensure you're passing as object if needed
      setProject(data);
    } catch (error) {
      console.error("Failed to fetch blog:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProject(id);
    }
  }, [id]);  // Ensure it runs when ID changes

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p>Loading project</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p>project not found</p>
      </div>
    );
  }

  // Sanitize and render markdown
  const htmlContent = DOMPurify.sanitize(marked.parse(project.content || ""));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Head>
        <title>{project.title} | Chip Sphere</title>
      </Head>

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-primary/80 cursor-pointer mb-6 hover:text-primary"
        >
          ← Back to Projects
        </button>

        <div className="mb-8">
          {/* <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-accent text-white mb-4  ${blog.type === 'Career' ? 'bg-purple-500' :
            blog.type === 'Technical' ? 'bg-green-600' : 'bg-blue-500'}`}>
            {blog.type}
          </span> */}
          <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
          <p className="text-muted-foreground mb-4">{project.description}</p>
          <div className="flex items-center text-muted-foreground mb-6">
            {/* <span>By {blog.author?.name || "Unknown Author"}</span> */}
            <span className="mx-2">•</span>
            <span>{new Date(project.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</span>

            <span className="mx-2">•</span>
            {/* <span>{blog.durationRead} min read</span> */}
          </div>
        </div>

        <article className="prose prose-invert max-w-none  [&_*]:text-foreground">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </article>
      </main >
    </div >
  );
}
