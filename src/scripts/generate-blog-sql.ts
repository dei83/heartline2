
import { blogPosts } from '../data/blog';
import { pillarPosts } from '../data/blog/seed-pillars';

function escapeSql(str: string) {
    if (!str) return '';
    return str.replace(/'/g, "''");
}

function generateSql() {
    const allPosts = [...pillarPosts, ...blogPosts];

    console.log(`-- Generated Blog Post Seed SQL (Total: ${allPosts.length} posts)`);
    console.log(`-- Run this in Supabase SQL Editor\n`);

    console.log(`insert into public.posts (title, slug, excerpt, content, cover_image, author, tags, published, published_at)`);
    console.log(`values`);

    const values = allPosts.map((post, index) => {
        const title = escapeSql(post.title);
        const slug = escapeSql(post.slug);
        const excerpt = escapeSql(post.excerpt || '');
        const content = escapeSql(post.content || '');
        const coverImage = escapeSql(post.coverImage || '');
        const author = escapeSql(post.author || 'Heartline Editorial');

        // Handle tags: PostgreSQL array literal format: ARRAY['tag1', 'tag2']
        const tagsArray = post.tags ? post.tags.map(t => `'${escapeSql(t)}'`).join(', ') : '';
        const tagsSql = `ARRAY[${tagsArray}]`;

        const publishedAt = post.publishedAt ? `'${post.publishedAt}'` : 'now()';

        return `(
  '${title}',
  '${slug}',
  '${excerpt}',
  '${content}',
  '${coverImage}',
  '${author}',
  ${tagsSql},
  true,
  ${publishedAt}
)`;
    });

    console.log(values.join(',\n'));

    console.log(`
on conflict (slug) do update set
  title = excluded.title,
  content = excluded.content,
  excerpt = excluded.excerpt,
  cover_image = excluded.cover_image,
  tags = excluded.tags,
  author = excluded.author,
  published = excluded.published;

-- Verify the insertion
select count(*) as total_posts from public.posts;
select title, slug, tags from public.posts order by created_at desc;
`);
}

generateSql();
