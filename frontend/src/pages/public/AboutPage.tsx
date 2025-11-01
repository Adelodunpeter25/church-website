import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600" style={{ fontFamily: "Pacifico, serif" }}>
                Bibleway
              </Link>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Home</Link>
                <Link to="/about" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">About</Link>
                <a href="/#services" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Services</a>
                <Link to="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Contact</Link>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login" className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium">
                Login
              </Link>
              <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Sign Up
              </Link>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-blue-600 p-2">
                <i className={isMenuOpen ? "ri-close-line" : "ri-menu-line"}></i>
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Home</Link>
              <Link to="/about" className="block px-3 py-2 text-gray-900 hover:text-blue-600">About</Link>
              <a href="/#services" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Services</a>
              <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Contact</Link>
              <Link to="/login" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Login</Link>
              <Link to="/signup" className="block px-3 py-2 bg-blue-600 text-white rounded-lg">Sign Up</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Our Church</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Building a community of faith, hope, and love since our founding
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-blue-50 rounded-xl p-8">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                <i className="ri-eye-line text-white text-2xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                To be a thriving community of believers who are passionate about knowing God, 
                growing in faith, and making disciples who transform the world through the love of Christ.
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-8">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
                <i className="ri-compass-line text-white text-2xl"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                To glorify God by making disciples of Jesus Christ through worship, fellowship, 
                biblical teaching, and compassionate service to our community and the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do as a church community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-book-open-line text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Biblical Truth</h3>
              <p className="text-gray-600">
                We believe the Bible is God's inspired Word and the foundation for all we believe and practice.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-heart-line text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Authentic Community</h3>
              <p className="text-gray-600">
                We value genuine relationships where people can be real, grow together, and support one another.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-hand-heart-line text-purple-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Compassionate Service</h3>
              <p className="text-gray-600">
                We demonstrate Christ's love through acts of service and generosity to those in need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
          </div>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-6">
              Our church began with a small group of believers who shared a vision for creating a 
              welcoming community where people could encounter God's love and grow in their faith. 
              What started as a handful of families meeting in a living room has grown into a vibrant 
              congregation serving our community.
            </p>
            <p className="mb-6">
              Throughout our journey, we've remained committed to our core mission: making disciples 
              of Jesus Christ. We believe that the church is not just a building, but a family of 
              believers united by faith and called to make a difference in the world.
            </p>
            <p>
              Today, we continue to grow and evolve, always seeking to be faithful to God's calling 
              while meeting the needs of our community. We invite you to become part of our story 
              and discover how God is working in and through our church family.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            We'd love to meet you and help you take your next step in faith.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold">
              Get Started
            </Link>
            <a href="/#contact" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="text-2xl font-bold text-blue-400 mb-4" style={{ fontFamily: "Pacifico, serif" }}>
                Bibleway
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Building a community of faith, hope, and love. Join us as we grow together in our relationship with God and serve others.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
                <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
                <li><a href="/#services" className="text-gray-300 hover:text-white">Services</a></li>
                <li><a href="/#events" className="text-gray-300 hover:text-white">Events</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <i className="ri-map-pin-line mr-2"></i>
                  123 Faith Street, CC 12345
                </li>
                <li className="flex items-center">
                  <i className="ri-phone-line mr-2"></i>
                  (555) 123-PRAY
                </li>
                <li className="flex items-center">
                  <i className="ri-mail-line mr-2"></i>
                  info@ourchurch.com
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2025 Our Church Community. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
