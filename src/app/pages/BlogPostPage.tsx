import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { Calendar, Clock, ArrowLeft, BookOpen, ExternalLink } from "lucide-react";
import TopNav from "../components/TopNav";
import FooterSection from "../components/FooterSection";
import ScrollToTop from "../components/ScrollToTop";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ResponsivePicture } from "../components/ResponsivePicture";
import { BlogTableOfContents } from "../components/BlogTableOfContents";
import { BlogArticleContent } from "../components/BlogArticleContent";
import { BlogCta } from "../components/BlogCta";
import { BlogCard } from "../components/BlogCard";
import { SeoHead } from "../../seo/SeoHead";
import { SITE_ORIGIN, ORG_NAME } from "../../seo/seoConfig";
import { blogPostingSchema } from "../../seo/schemas/blogSchema";
import { faqPageSchema, breadcrumbListSchema } from "../../seo/schemas/faqSchema";
import { enableSmoothScroll, resetScrollBehavior, scrollToTopInstant } from "../utils/scroll";
import { getBlogPostBySlug, getRelatedBlogPosts, getPostToc } from "../data/blogsData";
import type { PageSeo } from "../../seo/pageMeta";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  useEffect(() => {
    scrollToTopInstant();
    enableSmoothScroll();
    return () => {
      resetScrollBehavior();
    };
  }, [slug]);

  if (!post) {
    const notFoundMeta: PageSeo = {
      title: `Article Not Found | ${ORG_NAME}`,
      description:
        "The requested blog article could not be found. Explore our latest technology and cybersecurity guides.",
      keywords: ["cybersecurity blog", "NebulaSafeTech"],
      canonicalPath: "/blogs",
    };

    return (
      <div className="min-h-screen bg-white flex flex-col">
        <SeoHead meta={notFoundMeta} noindex />
        <TopNav />
        <main className="flex-1 pt-36 pb-20 px-6 text-center max-w-2xl mx-auto flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-[#015AAA]/10 text-[#015AAA] flex items-center justify-center mb-4">
            <BookOpen size={32} />
          </div>
          <h1 className="nst-h2 text-slate-900 mb-2">Article Not Found</h1>
          <p className="nst-body text-slate-600 mb-6">
            The article you are looking for does not exist or has been moved.
          </p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#015AAA] text-white font-semibold text-sm no-underline hover:bg-[#013566] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to all blogs
          </Link>
        </main>
        <FooterSection />
        <ScrollToTop />
      </div>
    );
  }

  const articleCanonicalPath = `/blog/${post.slug}`;
  const pageMeta: PageSeo = {
    title: `${post.seoTitle || post.title} | ${ORG_NAME}`,
    description: post.metaDescription,
    keywords: [
      post.primaryKeyword || "cybersecurity",
      ...(post.secondaryKeywords || []),
      "NebulaSafeTech blog",
    ],
    canonicalPath: articleCanonicalPath,
    ogType: "article",
  };

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogs" },
    { name: post.title, path: articleCanonicalPath },
  ];

  const tocItems = getPostToc(post);

  const structuredData = [
    blogPostingSchema({
      title: post.title,
      headline: post.seoTitle || post.title,
      description: post.metaDescription,
      url: `${SITE_ORIGIN}${articleCanonicalPath}`,
      image: post.featuredImage
        ? `${SITE_ORIGIN}${post.featuredImage.src}`
        : `${SITE_ORIGIN}/media/blogs/${post.slug}.jpg`,
      datePublished: post.publishedIsoDate,
      dateModified: post.updatedIsoDate || post.publishedIsoDate,
      author: {
        name: post.author.name,
        role: post.author.role,
        url: post.author.profileUrl,
      },
    }),
    breadcrumbListSchema(breadcrumbItems, SITE_ORIGIN),
    ...(post.faqs && post.faqs.length > 0 ? [faqPageSchema(post.faqs)] : []),
  ];

  const relatedPosts = getRelatedBlogPosts(post.slug, 3);
  const featuredImg = post.featuredImage;

  return (
    <div className="w-full min-h-screen bg-white overflow-x-clip">
      <SeoHead
        meta={pageMeta}
        ogImage={featuredImg?.src || `/media/blogs/${post.slug}.jpg`}
        structuredData={structuredData}
      />
      <TopNav />

      <main id="main-content" className="pt-28 pb-20">
        {/* Article Header & Hero Banner */}
        <header className="w-full bg-[#F8FAFE] py-10 px-4 sm:px-8 md:px-14 lg:px-20 border-b border-slate-100">
          <div className="max-w-5xl mx-auto">
            <Breadcrumbs items={breadcrumbItems} className="mb-6" />

            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block nst-meta font-bold text-[#015AAA] bg-[#015AAA]/10 px-3.5 py-1 rounded-full border border-[#015AAA]/20">
                {post.category}
              </span>
            </div>

            <h1 className="nst-h1 text-slate-900 mb-6 max-w-4xl text-2xl sm:text-3xl lg:text-4xl leading-tight">
              {post.title}
            </h1>

            {/* Header Meta Row */}
            <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-slate-600 nst-ui text-sm pt-4 border-t border-slate-200/60">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#015AAA] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0 border border-slate-200">
                  {post.author.avatar ? (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>
                      {post.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 leading-tight">
                      {post.author.name}
                    </span>
                    <span className="text-[11px] font-semibold text-[#015AAA] bg-[#015AAA]/10 px-2 py-0.5 rounded-full">
                      NebulaSafeTech
                    </span>
                  </div>
                  <span className="block text-xs text-slate-500">{post.author.role}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-slate-500">
                <Calendar size={15} className="text-[#015AAA]" />
                <span>Published: {post.date}</span>
                {post.updatedDate && post.updatedDate !== post.date ? (
                  <span className="ml-1 text-slate-400">
                    (Updated: {post.updatedDate})
                  </span>
                ) : null}
              </div>

              <div className="flex items-center gap-1.5 text-slate-500">
                <Clock size={15} className="text-[#015AAA]" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Article & Sidebar Container */}
        <section className="w-full px-4 sm:px-8 md:px-14 lg:px-20 py-12">
          <div className="max-w-7xl mx-auto space-y-16">
            {/* 2-Column Layout: Left Sticky TOC | Right Main Article */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Sticky Table of Contents */}
              {tocItems.length > 0 ? (
                <aside className="hidden lg:block lg:col-span-3 sticky top-6 self-start">
                  <BlogTableOfContents items={tocItems} />
                </aside>
              ) : null}

              {/* Right Column: Article Content */}
              <article
                className={`${tocItems.length > 0 ? "lg:col-span-8" : "lg:col-span-12"} min-w-0 max-w-4xl mx-auto w-full`}
              >
                {/* Featured Image */}
                {post.mediaSlug ? (
                  <div className="mb-10 rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-slate-100 aspect-[16/9] w-full">
                    <ResponsivePicture
                      slug={post.mediaSlug}
                      alt={featuredImg?.alt || post.title}
                      priority
                      className="w-full h-full object-cover"
                      sizes="(max-width: 1024px) 100vw, 800px"
                    />
                  </div>
                ) : featuredImg ? (
                  <div className="mb-10 rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-slate-100 aspect-[16/9] w-full">
                    <picture>
                      {featuredImg.webpSrc ? (
                        <source type="image/webp" srcSet={featuredImg.webpSrc} />
                      ) : null}
                      <img
                        src={featuredImg.src}
                        alt={featuredImg.alt}
                        width={featuredImg.width}
                        height={featuredImg.height}
                        loading="eager"
                        decoding="sync"
                        className="w-full h-full object-cover"
                      />
                    </picture>
                  </div>
                ) : null}

                {/* Mobile Table of Contents (Shown on screens < lg) */}
                {tocItems.length > 0 ? (
                  <div className="lg:hidden mb-8">
                    <BlogTableOfContents items={tocItems} />
                  </div>
                ) : null}

                {/* Article Content Component */}
                <BlogArticleContent post={post} />
              </article>
            </div>

            {/* Bottom Full-Width Cards Container */}
            <div className="w-full space-y-10 pt-10 border-t border-slate-200">
              {/* 1. Author Bio Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start gap-6 shadow-xs w-full">
                <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-[#015AAA]/20 shadow-sm bg-[#015AAA]">
                  {post.author.avatar ? (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full text-white flex items-center justify-center font-bold text-2xl">
                      {post.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="nst-h3 text-slate-900 m-0 text-xl font-bold">
                      Written by {post.author.name}
                    </h2>
                    <span className="text-xs text-[#015AAA] font-semibold bg-[#015AAA]/10 px-3 py-0.5 rounded-full border border-[#015AAA]/20">
                      {post.author.role}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 font-medium m-0">
                    NebulaSafeTech Defender &amp; Engineering Author
                  </p>

                  {post.author.bio ? (
                    <p className="nst-small text-slate-700 m-0 text-base leading-relaxed">
                      {post.author.bio}
                    </p>
                  ) : null}

                  {post.author.profileUrl ? (
                    <div className="pt-2">
                      <a
                        href={post.author.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-[#015AAA] hover:underline"
                      >
                        Connect with {post.author.name} on LinkedIn
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* 2. Full-Width NebulaSafeTech Services Card */}
              {post.cta ? (
                <div id="continue-learning" className="scroll-mt-28 w-full">
                  <BlogCta cta={post.cta} />
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* Related Articles Section (Gracefully renders ONLY when real related posts exist) */}
        {relatedPosts.length > 0 ? (
          <section className="w-full bg-[#F8FAFE] py-16 px-4 sm:px-8 md:px-14 lg:px-20 border-t border-slate-100">
            <div className="max-w-6xl mx-auto">
              <h2 className="nst-h3 text-slate-900 mb-8 text-xl font-bold">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((rPost, idx) => (
                  <BlogCard key={rPost.id} post={rPost} index={idx} />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <FooterSection />
      <ScrollToTop />
    </div>
  );
}
