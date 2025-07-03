'use client';

import ResourceCard from '@/components/ResourceCard';
import { getResources } from '@/services/resources';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from '../loading';
import { toast } from 'react-toastify';

export default function Resources() {
  const [resources, setResources] = useState(null);
  const [categories, setCategories] = useState([]);
  const [fileTypes, setFileTypes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all categories");
  const [selectedFileType, setSelectedFileType] = useState("all types");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const token = Cookies.get("token");
  const pathname = usePathname();

  // Format labels (e.g., "lecture-notes" -> "Lecture Notes")
  const formatLabel = (str) =>
    str.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await getResources(token);
        const resources = data.resources;
        setResources(resources);

        const uniqueCategories = Array.from(
          new Set(resources.map(r => r.typeOfMaterial?.toLowerCase().trim()))
        ).filter(Boolean);

        const uniqueFileTypes = Array.from(
          new Set(resources.map(r => r.typeOfFile?.toLowerCase().trim()))
        ).filter(Boolean);

        setCategories(uniqueCategories);
        setFileTypes(uniqueFileTypes);
      } catch (err) {
        console.error(err);
        if (err.message === 'Network Error') {
          setError("⚠️ Network Error: Please check your internet connection or try again later.");
        } else if (err.message === "Invalid or expired token.") {
          toast.warning("Please login to continue");
          router.push(`/auth?mode=login&redirect=${encodeURIComponent(pathname)}`);
        } else {
          setError(`⚠️ ${err.message}`);
        }
      }
    };
    fetchResources();
  }, []);

  if (!resources && !error) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="p-6 text-red-500 font-semibold bg-red-100 rounded-md max-w-screen-md mx-auto mt-6">
        {error}
      </div>
    );
  }
  console.log(selectedCategory)
  const filteredResources = resources.filter(resource => {
    const categoryMatch =
      selectedCategory === "all categories" ||
      resource.typeOfMaterial?.toLowerCase().trim() === selectedCategory.toLowerCase().trim();

    const typeMatch =
      selectedFileType === "all types" ||
      resource.typeOfFile?.toLowerCase().trim() === selectedFileType.toLowerCase().trim();

    const searchMatch =
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && typeMatch && searchMatch;
  });
  console.log(filteredResources)
  // filteredResources.map((res) => {
  //   if (res.typeOfMaterial == selectedCategory) {
  //     console.log(res)
  //   }
  // })

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 px-4 sm:px-10 md:px-16 lg:px-20 py-10">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-4xl font-bold">Resources</h1>
          <p className="text-muted-foreground mt-2">
            Access a wide range of study materials, lecture notes, question papers and more to enhance your learning experience.
          </p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Search */}
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full p-3 rounded-md border border-border bg-background text-foreground shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Filters */}
          <div className="grid grid-cols-2 gap-4">
            {/* Category Dropdown */}
            <select
              className="w-full p-3 pr-8 rounded-md border border-border bg-background text-foreground shadow-sm"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all categories">All Categories</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {formatLabel(cat)}
                </option>
              ))}
            </select>

            {/* File Type Dropdown */}
            <select
              className="w-full p-3 pr-8 rounded-md border border-border bg-background text-foreground shadow-sm"
              value={selectedFileType}
              onChange={(e) => setSelectedFileType(e.target.value)}
            >
              <option value="all types">All Types</option>
              {fileTypes.map((type, idx) => (
                <option key={idx} value={type}>
                  {formatLabel(type)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource._id} resource={resource} />
          ))}
        </div>
      </div>
    </div>
  );
}
