import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Link } from '@/lib/router';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose-custom">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Handle internal links with React Router
          a: ({ href, children, ...props }) => {
            if (href?.startsWith('/')) {
              return <Link to={href} className="text-neon-cyan hover:text-neon-purple transition-colors underline">{children}</Link>;
            }
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon-cyan hover:text-neon-purple transition-colors underline"
                {...props}
              >
                {children}
              </a>
            );
          },
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-text-primary mt-12 mb-4">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-text-primary mt-8 mb-3">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="text-text-secondary leading-relaxed mb-6">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-6 space-y-2 mb-6 text-text-secondary">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 space-y-2 mb-6 text-text-secondary">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">{children}</li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-text-primary">{children}</strong>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-brand-pink/50 pl-6 py-2 my-6 italic text-text-secondary">
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-white/5 text-brand-pink px-1.5 py-0.5 rounded text-sm font-mono">
                  {children}
                </code>
              );
            }
            return (
              <code className={`${className} text-sm`} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-void/80 border border-white/10 rounded-xl p-4 overflow-x-auto mb-6 text-sm">
              {children}
            </pre>
          ),
          hr: () => (
            <hr className="border-white/10 my-10" />
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="text-left py-3 px-4 text-text-primary font-semibold border-b border-white/10">{children}</th>
          ),
          td: ({ children }) => (
            <td className="py-3 px-4 text-text-secondary border-b border-white/5">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
