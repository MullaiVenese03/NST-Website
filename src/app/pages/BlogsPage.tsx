import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen } from "lucide-react";
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

  const categories: BlogCategory[] = ["All Articles", "Cybersecurity", "Cloud & Web", "Engineering"];

  const filteredPosts =
    activeCategory === "All Articles"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === activeCategory);

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      <SeoHead meta={BLOGS_SEO} structuredData={pageBreadcrumbJsonLd(PAGE_BREADCRUMBS.blogs)} />
      <TopNav />

      <main id="main-content" className="pt-28 pb-20">
        {/* Blogs Hero */}
        <section className="w-full bg-white py-12 px-4 sm:px-8 md:px-14 lg:px-20 border-b border-slate-100">
          <div className="max-w-[1440px] mx-auto text-center flex flex-col items-center">
            <Breadcrumbs className="mb-6 text-left self-start" items={[...PAGE_BREADCRUMBS.blogs]} />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-4 bg-[#015AAA]/10 border border-[#015AAA]/20"
            >
              <BookOpen size={15} className="text-[#015AAA]" />
              <span className="nst-eyebrow text-[#015AAA]">
                Insights &amp; Articles
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="nst-h1 text-slate-900 mb-4"
            >
              Technology &amp; Cybersecurity Blogs
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="nst-body text-slate-500 max-w-2xl mb-10 text-center"
            >
              Stay informed with expert insights, technical tutorials, VAPT frameworks, secure cloud architecture, and cybersecurity best practices from NebulaSafeTech engineers.
            </motion.p>

            {/* Filter Pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center justify-center gap-2 flex-wrap rounded-full p-1.5 bg-slate-100 border border-slate-200"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-5 py-2.5 rounded-full cursor-pointer border-none outline-none transition-all duration-200 nst-ui font-semibold text-xs sm:text-sm"
                  style={{
                    background: activeCategory === cat ? "#015AAA" : "transparent",
                    color: activeCategory === cat ? "#ffffff" : "#25507f",
                    boxShadow: activeCategory === cat ? "0 4px 12px rgba(1,90,170,0.15)" : "none",
                  }}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Blogs Grid */}
        <section className="w-full px-4 sm:px-8 md:px-14 lg:px-20 py-16 bg-[#F8FAFE]">
          <div className="max-w-[1440px] mx-auto">
            <AnimatePresence mode="wait">
              {filteredPosts.length > 0 ? (
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredPosts.map((post, index) => (
                    <BlogCard key={post.id} post={post} index={index} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center py-20 gap-4 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#015AAA]/10 text-[#015AAA] flex items-center justify-center mb-2">
                    <BookOpen size={28} />
                  </div>
                  <h3 className="nst-h3 text-slate-900 m-0">No articles in this category yet</h3>
                  <p className="nst-body text-slate-500 m-0 max-w-md">
                    Our engineering team is actively curating articles. Check back soon or explore other categories.
                  </p>
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
