import Link from "next/link";
import { getBlogPosts } from "@/lib/data/blog-supabase";

export default async function BlogIndexPage() {
    const posts = await getBlogPosts();

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h1 className="text-4xl font-bold tracking-tight mb-4 text-primary-900">Heartline Blog</h1>
                <p className="text-lg text-muted-foreground">
                    Tips, guides, and stories about building better relationships and communicating with intention.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="group block h-full">
                        <article className="flex flex-col h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/20">
                            <div className="aspect-[16/9] w-full overflow-hidden bg-muted relative">
                                <img
                                    src={post.coverImage}
                                    alt={post.title}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-col flex-1 p-6">
                                <div className="flex gap-2 mb-3">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="text-xs font-medium px-2 py-1 rounded-full bg-primary/5 text-primary">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-4 border-t">
                                    <span>{post.author}</span>
                                    <time dateTime={post.publishedAt}>
                                        {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </time>
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    );
}
