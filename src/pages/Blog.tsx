import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  featured_image: string;
  status: 'draft' | 'published' | 'archived';
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    if (slug) {
      loadSinglePost(slug);
    } else {
      loadPosts();
    }
  }, [slug]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadSinglePost = async (postSlug: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', postSlug)
        .eq('status', 'published')
        .single();

      if (error) throw error;
      setPosts(data ? [data] : []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading blog posts...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400">Error loading blog posts: {error}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900">
      <Header />
      
      <main className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Blog Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Olynk Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Insights, updates, and stories about AI-powered inventory management
            </p>
          </div>

          {/* Blog Posts */}
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                {slug ? 'Blog post not found' : 'No blog posts published yet'}
              </div>
              {!slug && (
                <Link
                  to="/"
                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
                >
                  ← Back to Home
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <article key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  {/* Featured Image */}
                  {post.featured_image && (
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}

                  <div className="p-8">
                    {/* Post Meta */}
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <span>{post.author}</span>
                      <span className="mx-2">•</span>
                      <span>{formatDate(post.published_at || post.created_at)}</span>
                    </div>

                    {/* Post Title */}
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {slug ? post.title : (
                        <Link
                          to={`/blog/${post.slug}`}
                          className="hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        >
                          {post.title}
                        </Link>
                      )}
                    </h2>

                    {/* Post Excerpt */}
                    {!slug && post.excerpt && (
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Post Content */}
                    {slug && (
                      <div className="prose prose-lg dark:prose-invert max-w-none">
                        <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                          {post.content}
                        </div>
                      </div>
                    )}

                    {/* Read More Link */}
                    {!slug && (
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
                      >
                        Read more
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )}

                    {/* Back to Blog Link */}
                    {slug && (
                      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                        <Link
                          to="/blog"
                          className="inline-flex items-center text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
                        >
                          <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          Back to Blog
                        </Link>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Newsletter Signup */}
          {!slug && posts.length > 0 && (
            <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Stay Updated
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Get the latest insights on AI-powered inventory management delivered to your inbox.
                </p>
                <div className="max-w-md mx-auto">
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-r-md font-medium transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog; 