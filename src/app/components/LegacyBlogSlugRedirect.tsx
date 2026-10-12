import { lazy } from "react";
import { useParams, Navigate } from "react-router";
import { getBlogPostBySlug } from "../data/blogsData";

const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

export default function LegacyBlogSlugRedirect() {
  const { slug } = useParams<{ slug: string }>();
  if (slug && getBlogPostBySlug(slug)) {
    return <Navigate to={`/blogs/${slug}`} replace />;
  }
  return <NotFoundPage />;
}
