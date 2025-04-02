import React, { useState } from 'react';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Industry Insights',
    'Business Tips',
    'E-commerce Trends',
    'Success Stories',
    'Technology',
    'News & Updates'
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'The Rise of E-commerce in Kenya',
      excerpt: 'Explore how online shopping is transforming the retail landscape in Kenya and creating new opportunities for businesses.',
      category: 'Industry Insights',
      author: 'John Doe',
      date: 'March 28, 2024',
      image: '/images/blog/ecommerce-kenya.jpg',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Starting Your Online Business: A Complete Guide',
      excerpt: 'Learn everything you need to know about launching and growing your online business in Kenya.',
      category: 'Business Tips',
      author: 'Jane Smith',
      date: 'March 25, 2024',
      image: '/images/blog/online-business.jpg',
      readTime: '8 min read'
    },
    {
      id: 3,
      title: 'Top Trending Products in 2024',
      excerpt: 'Discover the most popular products that are flying off the virtual shelves this year.',
      category: 'E-commerce Trends',
      author: 'David Wilson',
      date: 'March 22, 2024',
      image: '/images/blog/trending-products.jpg',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'Securing Your Online Shopping Experience',
      excerpt: 'Essential tips and best practices for safe online shopping and protecting your personal information.',
      category: 'Technology',
      author: 'Sarah Johnson',
      date: 'March 20, 2024',
      image: '/images/blog/online-security.jpg',
      readTime: '7 min read'
    }
  ];

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">KartHub Blog</h1>
          <p className="text-xl text-gray-600">
            Stay updated with the latest trends, tips, and insights in e-commerce.
          </p>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x225';
                  }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{post.author}</p>
                      <p className="text-sm text-gray-500">{post.date}</p>
                    </div>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-600 mb-6">
              Get the latest blog posts and e-commerce insights delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog; 