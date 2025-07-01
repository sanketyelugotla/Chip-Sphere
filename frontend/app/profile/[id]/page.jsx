"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";
import Loading from "./Loading";
import { Pencil } from "lucide-react";
import { getSavedResources } from "@/services/user";

export default function ProfilePage() {
  const router = useRouter();
  const token = Cookies.get("token");
  const { user } = useUser();
  const [quizProgress, setQuizProgress] = useState(0);
  const [resource, setResource] = useState([]);

  useEffect(() => {
    const fetchSavedResources = async () => {
      try {
        const resources = await getSavedResources(token);
        setResource(resources);
      } catch (error) {
        console.error("Error fetching saved resources:", error);
      }
    };
    if (token) {
      fetchSavedResources();
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      router.push("/auth?mode=login");
    }
    const timer = setTimeout(() => {
      setQuizProgress(80);
    }, 300);
    return () => clearTimeout(timer);
  }, [token]);

  if (!token || !user) {
    return <Loading />;
  }

  const quickActions = [
    { label: "Attempt a Quiz", path: "/quizzes" },
    { label: "Learning Resources", path: "/resources" },
    { label: "Read Blogs", path: "/blogs" },
    { label: "View Project", path: "/projects" },
  ];

  return (
    <div className="min-h-screen bg-background max-w-screen-xl mx-auto p-4 my-4 md:my-8 flex flex-col gap-4">
      <div className="flex w-full gap-4 flex-wrap md:flex-nowrap">
        {/* Profile Info */}
        <div className="relative flex flex-col flex-1/2 border-2 border-border rounded-lg p-4 bg-container-background">
          <button className="absolute top-4 right-4 bg-muted p-2 rounded-md hover:bg-background transition">
            <Pencil className="w-5 h-5 text-muted-foreground" />
          </button>

          <div className="flex items-center gap-4 m-5">
            <Image
              src={user.image || "/logo_dark.png"}
              alt="user"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div className="flex flex-col m-2">
              <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
              <p className="text-sm font-medium text-muted-foreground max-w-45 md:w-full truncate">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 px-5 pb-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">
                Education
              </label>
              <div className="bg-muted border border-border px-3 py-2 rounded-md text-sm text-foreground">
                {user.education || "Education"}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">
                Institution
              </label>
              <div className="bg-muted border border-border px-3 py-2 rounded-md text-sm text-foreground">
                {user.institution || "Institution"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Items & Quick Actions Section */}
      <div className="flex flex-col md:flex-row gap-4 border border-border rounded-lg bg-container-background p-4 mt-4">
        {/* Quick Actions */}
        <div className="md:w-1/3 border border-border rounded-lg p-4 bg-background">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Quick Actions
          </h2>
          <ul className="flex flex-col gap-3">
            {quickActions.map(({ label, path }, index) => (
              <button
                key={index}
                onClick={() => router.push(path)}
                className="w-full cursor-pointer border-border border-2 rounded-md px-4 py-2 text-sm text-foreground bg-background hover:bg-secondary transition text-left"
              >
                {label}
              </button>
            ))}
          </ul>
        </div>

        {/* Saved Items */}
        <div className="md:w-2/3 border border-border rounded-lg p-4 bg-background">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Saved Items
          </h2>
          {resource.length === 0 ? (
            <p className="text-muted-foreground">No saved resources.</p>
          ) : (
            <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-2">
              {resource.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-background border-2 hover:bg-secondary transition border-border p-4 rounded-md text-sm text-foreground"
                >
                  <h3 className="font-medium text-base mb-2">
                    {item.resource?.name || "Untitled"}
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    Saved on: {new Date(item.savedAt).toLocaleDateString()}
                  </p>
                  <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                    {item.resource?.description || "No description"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
