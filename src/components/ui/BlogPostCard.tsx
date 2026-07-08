import { Link } from '@/lib/router';
import { Calendar, Clock } from 'lucide-react';
import type { BlogPost } from '../../lib/blog';
import { formatDate } from '../../lib/blog';

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link to={`/blog/${post.slug}`} className="block h-full">
      <div className="
        relative p-6 rounded-2xl h-full
        bg-midnight/60 backdrop-blur-sm
        border border-white/10
        hover:border-neon-cyan/30
        hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
        transition-all duration-300
        group
      ">
        <div className="relative z-10">
          {/* Category */}
          <span className="
            inline-block px-3 py-1 text-xs rounded-full mb-4
            bg-brand-pink/10 text-brand-pink
            border border-brand-pink/20
          ">
            {post.category}
          </span>

          <h3 className="text-lg font-semibold text-text-primary mb-3 group-hover:text-white transition-colors leading-snug">
            {post.title}
          </h3>

          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-text-muted text-xs">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.readingTime}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
