import { getBlogPostBySlug } from "@/lib/data/blog-supabase";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="container mx-auto py-12 px-4 max-w-3xl">
            <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
            </Link>

            <div className="aspect-[21/9] w-full overflow-hidden rounded-2xl mb-8 bg-muted">
                <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <header className="mb-8 text-center">
                <div className="flex justify-center gap-2 mb-4">
                    {post.tags.map(tag => (
                        <span key={tag} className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary uppercase tracking-wide">
                            {tag}
                        </span>
                    ))}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900 leading-tight">
                    {post.title}
                </h1>
                <div className="flex items-center justify-center text-sm text-muted-foreground gap-4">
                    <span className="font-medium text-foreground">{post.author}</span>
                    <span>•</span>
                    <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </time>
                </div>
            </header>

            <div className="prose prose-lg prose-red mx-auto dark:prose-invert">
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            <div className="mt-16 pt-8 border-t text-center">
                <p className="text-muted-foreground mb-4">Enjoyed this article? Share it with a friend.</p>
                <div className="flex justify-center gap-4">
                    {/* Social Share Mockups */}
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">Share on Facebook</button>
                    <button className="px-4 py-2 bg-sky-500 text-white rounded-md text-sm font-medium hover:bg-sky-600">Share on Twitter</button>
                </div>
            </div>
        </article>
    );
}
