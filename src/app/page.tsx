"use client";

import Link from 'next/link';
import { PaidLink } from "@/components/PaidLink";
import { SiteNav } from "@/components/SiteNav";
import { useState } from 'react';

export default function Home() {
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null);
  const [articleContent, setArticleContent] = useState<Record<string, string>>({});

  const handleArticleClick = async (index: number) => {
    if (expandedArticle === index) {
      setExpandedArticle(null);
      return;
    }
    
    // Fetch content if we don't have it yet
    if (!articleContent[`a${index + 1}`]) {
      const response = await fetch('/api/paywall/content');
      const content = await response.json();
      setArticleContent(prev => ({ ...prev, ...content }));
    }
    
    setExpandedArticle(index);
  };

  const headlines = [
    {
      category: "Science",
      title: "Dogs Understand 85% of Human Facial Expressions, Study Finds",
      author: "Dr. Sarah Woofington",
      timeAgo: "3 hours ago",
      excerpt: "Dr. Sarah Woofington's team at Canine University conducted a three-year study with over 1,000 dogs, revealing remarkable abilities to detect even subtle microexpressions that humans might miss."
    },
    {
      category: "Local News",
      title: "Dog Park Introduces Revolutionary 'Bark Hour' Concept",
      author: "John Barker",
      timeAgo: "5 hours ago",
      excerpt: "The innovative program features artisanal dog treats, craft coffee, and supervised play groups, with over 500 regular participants since its launch last month."
    },
    {
      category: "Technology",
      title: "PawCloud Raises $50M for Dog Translation Device",
      author: "Tech Insider",
      timeAgo: "1 day ago",
      excerpt: "The wearable AI-powered technology shows 89% accuracy in identifying dog emotions and needs, with pre-orders exceeding 50,000 units."
    },
    {
      category: "Entertainment",
      title: "Golden Retriever 'Max' Lands Leading Hollywood Role",
      author: "Entertainment Weekly",
      timeAgo: "2 days ago",
      excerpt: "Four-year-old Max will star in 'Paws of Destiny,' a $150 million production featuring groundbreaking CGI technology to enhance canine performances."
    },
    {
      category: "Health",
      title: "Memory Foam Beds Improve Dog Joint Health",
      author: "Veterinary Times",
      timeAgo: "3 days ago",
      excerpt: "18-month study with 200 dogs shows 40% improvement in joint health, with senior dogs showing increased activity levels and reduced need for pain medication."
    }
  ];
  
  const sideNews = [
    "Dogs Decode Human Emotions Better Than Previously Thought",
    "Gourmet Treats Meet Coffee: Bark Hour's Success Story",
    "AI Translation Device Could Bridge Human-Dog Communication Gap",
    "From Dog Park to Hollywood: Max's Rising Star",
    "Veterinarians Recommend Premium Bedding for Pet Health"
  ];
  


  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4">
          {/* Main header */}
          <div className="py-6 text-center">
            <div className="text-6xl mb-2">🐕</div>
            <h1 className="text-7xl text-black font-chomsky">The Woofington Post</h1>
            <p className="mt-2 text-black font-chomsky">Democracy Dies in Barkness</p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main news section */}
          <div className="lg:col-span-2">
            {headlines.map((article, index) => (
              <div key={index} className={`${index > 0 ? 'border-t pt-6 mt-6' : ''}`}>
                <span className="text-blue-600 font-bold text-sm">{article.category}</span>
                <h2 className="text-3xl font-serif font-bold mt-2 text-black">
                  {article.title}
                </h2>
                <div className="bg-gray-100 h-48 w-full mt-4 flex items-center justify-center text-4xl">
                  🐕
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  By {article.author} | {article.timeAgo}
                </div>
                <PaidLink articleId={`a${index + 1}`}>
                  <p className="mt-2 text-black">{article.excerpt}</p>
                </PaidLink>
              </div>
            ))}
          </div>

          {/* Side news */}
          <div className="border-l pl-8">
            <h3 className="text-lg font-bold mb-4 text-black">Trending</h3>
            {sideNews.map((news, index) => (
              <div key={index} className="mb-4 pb-4 border-b last:border-b-0">
                <span className="text-2xl font-bold text-gray-300 mr-4">{index + 1}</span>
                <a href="#" className="hover:text-blue-600 text-black">{news}</a>
              </div>
            ))}

            <div className="mt-8 p-4 bg-gray-50 rounded">
              <h4 className="font-bold mb-2 text-black">Today's Forecast</h4>
              <div className="text-center">
                <div className="text-4xl mb-2">☀️</div>
                <p className="text-black">Perfect for walkies!</p>
                <p className="text-sm text-black">High: 72°F Low: 58°F</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-12 py-8">
        <div className="container mx-auto px-4">
          {/* Footer content grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About section */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-black">About The Woofington Post</h4>
              <p className="text-gray-600">Fetching the truth since 2024. The most trusted name in canine journalism.</p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-black">Pawpular Sections</h4>
              <ul className="space-y-2">
                <li><Link href="/treats" className="text-gray-600 hover:text-blue-600">Treat Reviews</Link></li>
                <li><Link href="/walkies" className="text-gray-600 hover:text-blue-600">Best Walking Routes</Link></li>
                <li><Link href="/training" className="text-gray-600 hover:text-blue-600">Training Tips</Link></li>
                <li><Link href="/breeds" className="text-gray-600 hover:text-blue-600">Breed Profiles</Link></li>
              </ul>
            </div>

            {/* Subscribe section */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-black">Join the Pack</h4>
              <p className="text-gray-600 mb-4">Subscribe to our daily bark digest 🐾</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-black">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-3xl hover:text-blue-600">🐾</a>
                <a href="#" className="text-3xl hover:text-blue-600">🦮</a>
                <a href="#" className="text-3xl hover:text-blue-600">🦴</a>
              </div>
            </div>
          </div>

          {/* Bottom footer */}
          <div className="mt-8 pt-8 border-t text-center text-gray-600">
            <p>© 2024 The Woofington Post. All Rights Pawserved. 🐕</p>
            <p className="mt-2 text-sm">
              <Link href="/terms" className="hover:text-blue-600">Terms of Service</Link>
              {' • '}
              <Link href="/privacy" className="hover:text-blue-600">Privacy Pawlicy</Link>
              {' • '}
              <Link href="/cookies" className="hover:text-blue-600">Cookie Settings</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
