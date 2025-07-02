'use client';
import { getBlogs } from '@/services/blog';
import { CiUser } from 'react-icons/ci';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import BlogCard from '@/components/blogCard';
import Loading from '../loading';
import { toast } from 'react-toastify';
import FeaturedBlogCard from '@/components/FeaturedBlogCard';

export default function Blogs() {
  const [blogs, setBlogs] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [error, setError] = useState(null); // 🔥 Error state
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getBlogs();
        setBlogs(data);
        const uniqueCategories = Array.from(new Set(data.map(q => q.type))).filter(Boolean);
        setCategories(uniqueCategories);
      } catch (err) {
        if (err.message === 'Network Error') {
          toast.error(err.message)
          setError("⚠️ Network Error: Please check your internet connection or try again later.");
        } else {
          toast.error(err.message)
          setError(`⚠️ ${err.message}`);
        }
      }
    };
    getData();
  }, []);

  // Loading state
  if (!blogs && !error) {
    return (
      <div className="p-6">
        <Loading />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 text-red-500 font-semibold bg-red-100 rounded-md max-w-screen-md mx-auto mt-6">
        {error}
      </div>
    );
  }

  // Filter blogs by category
  const filteredBlogs = blogs?.filter(blog => {
    const matchesCategory = selectedCategory === "All Categories" || blog.type === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 px-4 sm:px-10 md:px-16 lg:px-20 py-10">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-4xl font-bold">Blogs</h1>
          <p className="text-muted-foreground mt-2">
            Stay updated with the latest news, industry trends, interview experiences, and technical insights in
            the field of VLSI and engineering.
          </p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-10 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full sm:w-3/4 p-3 rounded-md border border-border bg-background text-foreground shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="w-full sm:w-1/4 p-3 rounded-md border border-border bg-background text-foreground shadow-sm"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>All Categories</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Featured Blog */}
        {/* <div className="flex flex-col lg:flex-row border border-border rounded-lg overflow-hidden shadow-sm bg-container-background mb-10"> */}
        {filteredBlogs.map((blog, index) => {
          console.log(blog); // Moved inside the function body
          return blog.isFeatured && (
            <FeaturedBlogCard key={index} blog={blog} />
          )
        })}

        {/* </div> */}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog, index) => {
            console.log(blog); // Moved inside the function body
            return !blog.isFeatured && (
              <BlogCard key={index} blog={blog} />
            )
          })}

        </div>
      </div>
    </div>
  );
}
