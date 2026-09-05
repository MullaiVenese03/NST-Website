import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Sparkles } from "lucide-react";
import TopNav from "../components/TopNav";
import FooterSection from "../components/FooterSection";
import ScrollToTop from "../components/ScrollToTop";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { SeoHead } from "../../seo/SeoHead";
import { BLOGS_SEO } from "../../seo/pageMeta";
import { PAGE_BREADCRUMBS, pageBreadcrumbJsonLd } from "../utils/pageBreadcrumbs";
import { enableSmoothScroll, resetScrollBehavior, scrollToTopInstant } from "../utils/scroll";
import { BLOG_POSTS, type BlogCategory } from "../data/blogsData";
import { BlogCard } from "../components/BlogCard";

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("All Articles");

  useEffect(() => {
    scrollToTopInstant();
    enableSmoothScroll();
    return () => {
      resetScrollBehavior();
    };
  }, []);

  const categories: BlogCategory[] = [
    "All Articles",
    "Cybersecurity",
    "Cloud & Web",
    "Engineering",
  ];

  const filteredPosts =
    activeCategory === "All Articles"
      ? BLOG_POSTS
      : BLOG_POSTS.filter(
        (post) =>
          post.category === activeCategory ||
          (activeCategory === "Cybersecurity" && post.category.includes("Cybersecurity"))
      );

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      <SeoHead meta={BLOGS_SEO} structuredData={pageBreadcrumbJsonLd(PAGE_BREADCRUMBS.blogs)} />
      <TopNav />

      <main id="main-content" className="w-full max-w-full min-w-0 pt-24 sm:pt-28 pb-16">
        {/* Atmospheric Hero Section */}
        <section className="w-full max-w-full min-w-0 bg-gradient-to-b from-[#F0F4FA]/80 via-white to-[#F8FAFE] pt-6 sm:pt-8 pb-8 sm:pb-10 px-4 sm:px-8 md:px-14 lg:px-20 border-b border-slate-100 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-1/4 w-96 h-96 bg-[#015AAA]/5 rounded-full blur-3xl pointer-events-none -z-10"
          />

          <div className="w-full max-w-full lg:max-w-[1360px] mx-auto min-w-0">
            <Breadcrumbs className="mb-4 text-left" items={[...PAGE_BREADCRUMBS.blogs]} />

            <div className="w-full max-w-full min-w-0 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-2">
              <div className="w-full max-w-full lg:max-w-2xl min-w-0">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#015AAA]/8 border border-[#015AAA]/15 text-[#015AAA] text-xs font-bold tracking-wide uppercase mb-3 shadow-xs">
                  <Sparkles size={12} />
                  <span>NebulaSafeTech Insights</span>
                </div>

                <h1 className="nst-h1 font-heading text-slate-900 text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight m-0 mb-2.5 leading-[1.18] break-words">
                  Technology &amp; Cybersecurity Insights
                </h1>
                <p className="text-sm sm:text-base text-slate-600 font-body leading-relaxed m-0 break-words">
                  Authoritative security research, autonomous AI agent protection, and resilient engineering blueprints from NebulaSafeTech.
                </p>
              </div>

              {/* Segmented Filter Navigation with Counts */}
              <div
                role="tablist"
                aria-label="Blog categories"
                className="w-full max-w-full min-w-0 box-border flex flex-wrap items-center gap-1.5 rounded-2xl p-1.5 bg-slate-100/90 backdrop-blur-md border border-slate-200/80 shadow-xs lg:w-auto lg:max-w-none lg:inline-flex lg:self-auto"
              >
                {categories.map((cat) => {
                  const isActive = activeCategory === cat;
                  const count =
                    cat === "All Articles"
                      ? BLOG_POSTS.length
                      : BLOG_POSTS.filter(
                        (post) =>
                          post.category === cat ||
                          (cat === "Cybersecurity" && post.category.includes("Cybersecurity"))
                      ).length;

                  return (
                    <button
                      key={cat}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 sm:px-3.5 py-1.5 rounded-xl cursor-pointer border-none outline-none transition-all duration-200 text-xs font-semibold inline-flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap max-w-full ${isActive
                          ? "bg-[#015AAA] text-white shadow-sm ring-1 ring-[#015AAA]/30 font-bold"
                          : "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-white/80"
                        }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-medium leading-none ${isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-200/80 text-slate-500"
                          }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Blogs Grid Section */}
        <section className="w-full px-4 sm:px-8 md:px-14 lg:px-20 py-8 sm:py-12 bg-[#F8FAFE]">
          <div className="max-w-[1360px] mx-auto">
            {/* Status indicator bar */}
            <div className="flex items-center justify-between gap-4 mb-6 pb-2 text-xs text-slate-500">
              <div className="flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>
                  Showing <strong className="text-slate-900 font-semibold">{filteredPosts.length}</strong>{" "}
                  {filteredPosts.length === 1 ? "article" : "articles"}
                </span>
              </div>
              <span className="text-slate-400 hidden sm:inline text-[11px] font-medium">
                Peer-reviewed engineering research
              </span>
            </div>

            <AnimatePresence mode="wait">
              {filteredPosts.length > 0 ? (
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
                >
                  {filteredPosts.map((post, index) => (
                    <BlogCard key={post.id} post={post} index={index} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center py-20 gap-3 text-center bg-white rounded-2xl border border-slate-200/80 shadow-xs p-8"
                >
                  <div className="w-12 h-12 rounded-full bg-[#015AAA]/10 text-[#015AAA] flex items-center justify-center mb-1">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="nst-h4 text-slate-900 m-0 text-base font-bold">
                    No articles in this category yet
                  </h3>
                  <p className="text-xs text-slate-500 m-0 max-w-sm">
                    Our engineering team is actively curating articles. Check back soon or explore other categories.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveCategory("All Articles")}
                    className="mt-2 text-xs font-bold text-[#015AAA] hover:underline cursor-pointer border-none bg-transparent"
                  >
                    View All Articles →
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <FooterSection />
      <ScrollToTop />
    </div>
  );
}
