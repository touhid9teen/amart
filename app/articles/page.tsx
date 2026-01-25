"use client";

import { Calendar, Folder } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { articles } from "../_components/article-section"; // Import shared data
import Footer from "../_components/Footer";

export default function ArticlesPage() {
  // Using the same dummy data for now, but in a real app this would specific page content
  // We can duplicate the array to show "all" articles (e.g. 6 items)
  const allArticles = [...articles, ...articles]; 

  return (
    <>
    
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-8 text-center uppercase">
          All Articles
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allArticles.map((article, index) => (
             <div key={`${article.id}-${index}`} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Folder className="w-3.5 h-3.5" />
                  <span>{article.category}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#7fad39] transition-colors">
                <Link href={`/articles/${article.slug}`}>
                  {article.title}
                </Link>
              </h3>

              <Link
                href={`/articles/${article.slug}`}
                className="text-gray-500 text-sm font-medium uppercase hover:text-[#7fad39] transition-colors inline-flex items-center gap-1 group/link"
              >
                Read more
                <span className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all">→</span>
              </Link>
            </div>
          ))}
        </div>
      </main>

      {/* <Footer /> */}
    </>
  );
}
