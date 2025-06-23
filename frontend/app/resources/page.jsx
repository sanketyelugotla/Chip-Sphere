'use client';
import { getResources } from '@/utils/resources';
import React, { useState, useEffect } from 'react';
import ResourceCard from '@/components/ResourceCard';
import Loading from '../loading';

export default function Resources() {
  const [resources, setResources] = useState(null);
  const [categories, setCategories] = useState([]);
  const [fileTypes, setFileTypes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedFileType, setSelectedFileType] = useState("All Types");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await getResources();
        setResources(data);

        // Extract unique categories and file types
        const uniqueCategories = Array.from(new Set(data.map(r => r.typeOfMaterial))).filter(Boolean);
        const uniqueFileTypes = Array.from(new Set(data.map(r => r.typeOfFile))).filter(Boolean);

        setCategories(uniqueCategories);
        setFileTypes(uniqueFileTypes);
      } catch (err) {
        console.error(err);
        if (err.message === 'Network Error') {
          setError("⚠️ Network Error: Please check your internet connection or try again later.");
        } else {
          setError(`⚠️ ${err.message}`);
        }
      }
    };
    fetchResources();
  }, []);

  // Loading state
  if (!resources && !error) {
    return <Loading />;
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 text-red-500 font-semibold bg-red-100 rounded-md max-w-screen-md mx-auto mt-6">
        {error}
      </div>
    );
  }

  // Filter resources
  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === "All Categories" || resource.typeOfMaterial === selectedCategory;
    const matchesFileType = selectedFileType === "All Types" || resource.typeOfFile === selectedFileType;
    const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesFileType && matchesSearch;
  });

  return (
    <div className="bg-background min-h-screen">
      {/* Header - Matching Blogs page styling */}
      <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 px-4 sm:px-10 md:px-16 lg:px-20 py-10">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-4xl font-bold">Resources</h1>
          <p className="text-muted-foreground mt-2">
            Access a wide range of study materials, lecture notes, question papers and more to enhance your learning experience.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-10 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full p-3 rounded-md border border-border bg-background text-foreground shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <select
            className="w-full p-3 rounded-md border border-border bg-background text-foreground shadow-sm"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>All Categories</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            className="w-full p-3 rounded-md border border-border bg-background text-foreground shadow-sm"
            value={selectedFileType}
            onChange={(e) => setSelectedFileType(e.target.value)}
          >
            <option>All Types</option>
            {fileTypes.map((type, idx) => (
              <option key={idx} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <ResourceCard
              key={index}
              resource={resource}
            />
          ))}
        </div>
      </div>
    </div>
  );
}