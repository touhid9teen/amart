"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Folder } from "lucide-react";

export const articles = [
  {
    id: 1,
    title: "Right way to preserve the fruits & other organics",
    image: "/article-1.png",
    date: "12th Jan 2024",
    category: "Health",
    slug: "preserve-fruits-organics-1",
    excerpt: "Learn the best techniques to keep your organic fruits fresh for longer...",
  },
  {
    id: 2,
    title: "Right way to preserve the fruits & other organics",
    image: "/article-2.png",
    date: "12th Jan 2024",
    category: "Health",
    slug: "preserve-fruits-organics-2",
    excerpt: "Discover traditional methods of preserving seasonal produce...",
  },
  {
    id: 3,
    title: "Right way to preserve the fruits & other organics",
    image: "/article-3.png",
    date: "12th Jan 2024",
    category: "Health",
    slug: "preserve-fruits-organics-3",
    excerpt: "Organize your pantry effectively with these simple storage hacks...",
  },
];

export default function ArticleSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Our Latest Articles
          </h2>
          <Link
            href="/articles"
            className="bg-[#7fad39] hover:bg-[#7fad39]/90 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded uppercase transition-colors"
          >
            VIEW ALL
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((article) => (
            <div key={article.id} className="group">
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
      </div>
    </section>
  );
}
