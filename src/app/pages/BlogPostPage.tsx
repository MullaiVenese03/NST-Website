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
import { BlogSocialShare } from "../components/BlogSocialShare";
import { BlogSidebar } from "../components/BlogSidebar";
import { BlogCta } from "../components/BlogCta";
import { BlogCard } from "../components/BlogCard";
import { SeoHead } from "../../seo/SeoHead";
import { SITE_ORIGIN, ORG_NAME, defaultOgImageUrl, absoluteUrl } from "../../seo/seoConfig";
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
        <main className="flex-1 pt-32 pb-20 px-6 text-center max-w-2xl mx-auto flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-[#015AAA]/10 text-[#015AAA] flex items-center justify-center mb-3">
            <BookOpen size={28} />
          </div>
          <h1 className="nst-h3 text-slate-900 mb-2">Article Not Found</h1>
          <p className="nst-body text-slate-600 mb-6 text-sm">
            The article you are looking for does not exist or has been moved.
          </p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#015AAA] text-white font-semibold text-xs sm:text-sm no-underline hover:bg-[#013566] transition-colors"
          >
            <ArrowLeft size={15} />
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
        : defaultOgImageUrl(),
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
  const blogOgImage = featuredImg ? absoluteUrl(featuredImg.src) : defaultOgImageUrl();
  const blogOgAlt = featuredImg?.alt || `${post.title} | ${ORG_NAME}`;
  const blogOgWidth = featuredImg?.width || 1200;
  const blogOgHeight = featuredImg?.height || 630;
  const blogOgType = blogOgImage.endsWith(".png")
    ? "image/png"
    : blogOgImage.endsWith(".webp")
    ? "image/webp"
    : "image/jpeg";

  return (
    <div className="w-full min-h-screen bg-white overflow-x-clip">
      <SeoHead
        meta={pageMeta}
        ogImage={blogOgImage}
        ogImageWidth={blogOgWidth}
        ogImageHeight={blogOgHeight}
        ogImageAlt={blogOgAlt}
        ogImageType={blogOgType}
        structuredData={structuredData}
      />
      <TopNav />

      <main id="main-content" className="pt-24 sm:pt-28 pb-16">
        {/* ================================================================= */}
        {/* ARTICLE HEADER / HERO AREA (Compact, Informative)                 */}
        {/* Flow: Breadcrumb -> Category -> H1 -> Meta -> Featured Image     */}
        {/* ================================================================= */}
        <header className="w-full bg-gradient-to-b from-[#F8FAFE] via-[#F8FAFE] to-white pt-6 sm:pt-8 pb-8 sm:pb-10 px-4 sm:px-8 md:px-14 lg:px-20 border-b border-slate-100">
          <div className="max-w-5xl mx-auto">
            {/* 1. Breadcrumb */}
            <Breadcrumbs items={breadcrumbItems} className="mb-4" />

            {/* 2. Category Pill */}
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block font-bold text-[#015AAA] bg-[#015AAA]/10 px-3 py-0.5 rounded-full border border-[#015AAA]/20 text-xs">
                {post.category}
              </span>
            </div>

            {/* 3. Primary Article H1 Title */}
            <h1 className="nst-h1 font-heading text-slate-900 mb-4 max-w-4xl text-2xl sm:text-3xl lg:text-[34px] font-extrabold leading-[1.22] tracking-tight">
              {post.title}
            </h1>

            {/* 4. Author + Date + Reading Time Row */}
            <div className="flex flex-wrap items-center gap-y-2.5 gap-x-5 text-slate-600 nst-ui text-xs sm:text-sm pt-4 border-t border-slate-200/70">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#015AAA] text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0 border border-slate-200">
                  {post.author.avatar ? (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
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
                  <span className="font-bold text-slate-900 leading-tight">
                    {post.author.name}
                  </span>
                  <span className="ml-1.5 text-[10px] font-semibold text-[#015AAA] bg-[#015AAA]/10 px-2 py-0.5 rounded-full">
                    NebulaSafeTech
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                <Calendar size={13} className="text-[#015AAA]" />
                <span>Published: {post.date}</span>
                {post.updatedDate && post.updatedDate !== post.date ? (
                  <span className="ml-1 text-slate-400">
                    (Updated: {post.updatedDate})
                  </span>
                ) : null}
              </div>

              <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                <Clock size={13} className="text-[#015AAA]" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* 5. Featured Hero Image - Complete uncropped presentation */}
            <div className="relative mt-6 sm:mt-8 rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 bg-slate-950 aspect-[16/9] w-full flex items-center justify-center">
              {post.mediaSlug ? (
                <ResponsivePicture
                  slug={post.mediaSlug}
                  alt={featuredImg?.alt || post.title}
                  priority
                  pictureClassName="w-full h-full flex items-center justify-center"
                  className="w-full h-full object-contain object-center block"
                  sizes="(max-width: 1024px) 100vw, 1100px"
                />
              ) : featuredImg ? (
                <picture className="w-full h-full flex items-center justify-center">
                  {featuredImg.webpSrc && (
                    <source type="image/webp" srcSet={featuredImg.webpSrc} />
                  )}
                  <img
                    src={featuredImg.src}
                    alt={featuredImg.alt}
                    width={featuredImg.width}
                    height={featuredImg.height}
                    loading="eager"
                    decoding="sync"
                    className="w-full h-full object-contain object-center block"
                  />
                </picture>
              ) : null}
            </div>
          </div>
        </header>

        {/* ================================================================= */}
        {/* MAIN CONTENT AREA: [Social] [Article] [Sidebar]                   */}
        {/* ================================================================= */}
        <section className="w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 py-8 sm:py-10">
          <div className="max-w-[1360px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
              {/* ───────────────────────────────────────────────────────────── */}
              {/* LEFT COLUMN: SOCIAL SHARING (Desktop XL only)                 */}
              {/* ───────────────────────────────────────────────────────────── */}
              <aside
                aria-label="Social sharing dock"
                className="hidden xl:flex xl:col-span-1 justify-center sticky top-28 self-start"
              >
                <BlogSocialShare
                  url={articleCanonicalPath}
                  title={post.title}
                  description={post.excerpt}
                  layout="vertical"
                />
              </aside>

              {/* ───────────────────────────────────────────────────────────── */}
              {/* CENTER COLUMN: ARTICLE CONTENT                                */}
              {/* ───────────────────────────────────────────────────────────── */}
              <article className="col-span-1 lg:col-span-8 xl:col-span-8 min-w-0 max-w-[760px] w-full mx-auto">
                {/* Mobile / Tablet Social Share Bar */}
                <div className="xl:hidden mb-5 pb-3 border-b border-slate-100">
                  <BlogSocialShare
                    url={articleCanonicalPath}
                    title={post.title}
                    description={post.excerpt}
                    layout="horizontal"
                  />
                </div>

                {/* Mobile Table of Contents (Collapsible, non-trapping) */}
                {tocItems.length > 0 && (
                  <div className="lg:hidden mb-6">
                    <BlogTableOfContents items={tocItems} mode="mobile-only" />
                  </div>
                )}

                {/* Main Article Content Blocks (Full Markdown Content) */}
                <BlogArticleContent post={post} />
              </article>

              {/* ───────────────────────────────────────────────────────────── */}
              {/* RIGHT COLUMN: STICKY SIDEBAR (Tablet & Desktop lg+)          */}
              {/* Note: No outer overflow-y-auto so page scroll is never trapped */}
              {/* ───────────────────────────────────────────────────────────── */}
              <aside
                aria-label="Article navigation and sidebar"
                className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-28 self-start"
              >
                <BlogSidebar
                  post={post}
                  tocItems={tocItems}
                  relatedPosts={relatedPosts}
                />
              </aside>
            </div>

            {/* =============================================================== */}
            {/* BELOW ARTICLE STRUCTURED CONTENT                                */}
            {/* Flow: CTA -> Author -> Related Articles                         */}
            {/* =============================================================== */}
            <div className="w-full max-w-4xl mx-auto space-y-10 pt-10 mt-10 border-t border-slate-200">
              {/* 1. Compact Editorial Article CTA */}
              {post.cta && (
                <div id="article-cta" className="scroll-mt-28 w-full">
                  <BlogCta cta={post.cta} />
                </div>
              )}

              {/* 2. Compact Author Profile Card */}
              <section
                aria-label="About the author"
                className="p-5 sm:p-6 rounded-2xl bg-slate-50/90 border border-slate-200/70 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 shadow-xs w-full"
              >
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 border border-slate-200 bg-[#015AAA] text-white flex items-center justify-center font-bold text-lg">
                  {post.author.avatar ? (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
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

                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-heading text-slate-900 m-0 text-base sm:text-lg font-bold">
                      Written by {post.author.name}
                    </h3>
                    <span className="text-[11px] text-[#015AAA] font-semibold bg-[#015AAA]/10 px-2.5 py-0.5 rounded-full border border-[#015AAA]/20">
                      {post.author.role}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 font-medium m-0">
                    NebulaSafeTech Defender &amp; Cybersecurity Author
                  </p>

                  {post.author.bio && (
                    <p className="text-xs sm:text-sm text-slate-600 font-body leading-relaxed m-0">
                      {post.author.bio}
                    </p>
                  )}

                  {post.author.profileUrl && (
                    <div className="pt-1">
                      <a
                        href={post.author.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#015AAA] hover:underline"
                      >
                        <span>Connect with {post.author.name} on LinkedIn</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* RELATED ARTICLES SECTION                                          */}
        {/* ================================================================= */}
        {relatedPosts.length > 0 && (
          <section className="w-full bg-[#F8FAFE] py-12 sm:py-14 px-4 sm:px-8 md:px-14 lg:px-20 border-t border-slate-100">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
                <div>
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#015AAA] mb-1">
                    Explore Further
                  </span>
                  <h2 className="nst-h3 font-heading text-slate-900 text-xl sm:text-2xl font-bold tracking-tight m-0">
                    Related Articles &amp; Insights
                  </h2>
                </div>
                <Link
                  to="/blogs"
                  className="text-xs sm:text-sm font-bold text-[#015AAA] hover:text-[#013566] inline-flex items-center gap-1 hover:underline no-underline"
                >
                  <span>View all blogs</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {relatedPosts.map((rPost, idx) => (
                  <BlogCard key={rPost.id} post={rPost} index={idx} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <FooterSection />
      <ScrollToTop />
    </div>
  );
}
