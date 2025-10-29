


import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600" style={{ fontFamily: "Pacifico, serif" }}>
                logo
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a to="#home" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium cursor-pointer">Home</a>
                <a to="#about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium cursor-pointer">About</a>
                <a to="#services" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium cursor-pointer">Services</a>
                <a to="#events" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium cursor-pointer">Events</a>
                <a to="#contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium cursor-pointer">Contact</a>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link to="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer whitespace-nowrap">
                Member Login
              </Link>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 p-2 cursor-pointer"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className={isMenuOpen ? "ri-close-line" : "ri-menu-line"}></i>
                </div>
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a to="#home" className="block px-3 py-2 text-gray-900 hover:text-blue-600 cursor-pointer">Home</a>
              <a to="#about" className="block px-3 py-2 text-gray-700 hover:text-blue-600 cursor-pointer">About</a>
              <a to="#services" className="block px-3 py-2 text-gray-700 hover:text-blue-600 cursor-pointer">Services</a>
              <a to="#events" className="block px-3 py-2 text-gray-700 hover:text-blue-600 cursor-pointer">Events</a>
              <a to="#contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600 cursor-pointer">Contact</a>
              <Link to="/dashboard" className="block px-3 py-2 bg-blue-600 text-white rounded-lg cursor-pointer whitespace-nowrap">
                Member Login
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative bg-cover bg-center min-h-screen flex items-center" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://readdy.ai/api/search-image?query=beautiful%20modern%20church%20interior%20with%20warm%20natural%20lighting%20streaming%20through%20stained%20glass%20windows%2C%20wooden%20pews%20arranged%20in%20rows%2C%20peaceful%20and%20welcoming%20atmosphere%20with%20contemporary%20architectural%20design%2C%20soft%20golden%20hour%20lighting%20creating%20reverent%20ambiance%20perfect%20for%20worship%20and%20community%20gathering&width=1920&height=1080&seq=hero1&orientation=landscape')`
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Our Church Community
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Join us in worship, fellowship, and service as we grow together in faith and love. 
              Everyone is welcome in God's house.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold cursor-pointer whitespace-nowrap">
                Join Our Community
              </Link>
              <a to="#services" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all cursor-pointer whitespace-nowrap">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Our Church</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are a vibrant community of believers committed to loving God, loving people, and making disciples.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-heart-line text-blue-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Love & Compassion</h3>
              <p className="text-gray-600">
                We believe in showing Christ's love through our actions, caring for one another and our community with open hearts.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-group-line text-green-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community</h3>
              <p className="text-gray-600">
                Our church family welcomes everyone. We grow together through fellowship, support, and shared experiences in faith.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-hand-heart-line text-purple-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Service</h3>
              <p className="text-gray-600">
                We serve our local and global communities, reaching out to help those in need and spread God's love everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Worship Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join us for inspiring worship, meaningful fellowship, and spiritual growth throughout the week.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-sun-line text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Sunday Morning Service</h3>
                    <p className="text-gray-600 mb-2">Join us every Sunday at 10:00 AM for inspiring worship, biblical teaching, and community fellowship.</p>
                    <p className="text-sm text-blue-600 font-medium">Sundays • 10:00 AM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-moon-line text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Evening Prayer Service</h3>
                    <p className="text-gray-600 mb-2">A more intimate gathering focused on prayer, reflection, and spiritual growth.</p>
                    <p className="text-sm text-green-600 font-medium">Wednesdays • 7:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-book-open-line text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Bible Study</h3>
                    <p className="text-gray-600 mb-2">Dive deeper into God's Word with our interactive Bible study sessions and small group discussions.</p>
                    <p className="text-sm text-purple-600 font-medium">Fridays • 6:30 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://readdy.ai/api/search-image?query=modern%20church%20worship%20service%20with%20congregation%20singing%20hymns%2C%20raised%20hands%20in%20praise%2C%20beautiful%20sanctuary%20with%20contemporary%20lighting%20and%20stage%20setup%2C%20diverse%20community%20gathered%20in%20worship%2C%20peaceful%20and%20joyful%20atmosphere%20filled%20with%20spiritual%20reverence%20and%20unity&width=800&height=600&seq=worship1&orientation=landscape"
                alt="Worship Service"
                className="rounded-lg shadow-xl object-top object-cover w-full h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join us for special events, community outreach, and fellowship opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://readdy.ai/api/search-image?query=church%20youth%20retreat%20outdoor%20activities%20with%20young%20people%20gathered%20around%20campfire%2C%20beautiful%20natural%20setting%20with%20mountains%20and%20trees%2C%20happy%20teenagers%20and%20young%20adults%20engaging%20in%20fellowship%20and%20spiritual%20activities%2C%20warm%20golden%20hour%20lighting%20creating%20sense%20of%20community%20and%20joy&width=400&height=250&seq=youth1&orientation=landscape"
                alt="Youth Retreat"
                className="w-full h-48 object-top object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-blue-600 text-sm font-medium mb-2">
                  <i className="ri-calendar-line mr-2"></i>
                  March 15-17, 2024
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Youth Spring Retreat</h3>
                <p className="text-gray-600 mb-4">A weekend getaway for teenagers to grow in faith, build friendships, and have fun.</p>
                <button className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer whitespace-nowrap">
                  Learn More <i className="ri-arrow-right-line ml-1"></i>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://readdy.ai/api/search-image?query=community%20food%20drive%20event%20with%20church%20volunteers%20organizing%20canned%20goods%20and%20food%20donations%2C%20diverse%20group%20of%20people%20helping%20to%20sort%20and%20distribute%20food%20to%20families%20in%20need%2C%20warm%20indoor%20church%20setting%20with%20tables%20full%20of%20donated%20items%2C%20spirit%20of%20giving%20and%20community%20service&width=400&height=250&seq=fooddrive1&orientation=landscape"
                alt="Community Outreach"
                className="w-full h-48 object-top object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-green-600 text-sm font-medium mb-2">
                  <i className="ri-calendar-line mr-2"></i>
                  March 22, 2024
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Food Drive</h3>
                <p className="text-gray-600 mb-4">Help us serve our local community by collecting and distributing food to families in need.</p>
                <button className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer whitespace-nowrap">
                  Learn More <i className="ri-arrow-right-line ml-1"></i>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://readdy.ai/api/search-image?query=easter%20celebration%20service%20in%20beautiful%20church%20sanctuary%20decorated%20with%20white%20lilies%20and%20spring%20flowers%2C%20elegant%20altar%20setup%20with%20cross%20and%20candles%2C%20congregation%20dressed%20in%20their%20finest%20attire%20celebrating%20resurrection%2C%20peaceful%20and%20reverent%20atmosphere%20filled%20with%20joy%20and%20hope&width=400&height=250&seq=easter1&orientation=landscape"
                alt="Easter Service"
                className="w-full h-48 object-top object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-purple-600 text-sm font-medium mb-2">
                  <i className="ri-calendar-line mr-2"></i>
                  March 31, 2024
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Easter Celebration</h3>
                <p className="text-gray-600 mb-4">Celebrate the resurrection of Jesus Christ with special worship and community breakfast.</p>
                <button className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer whitespace-nowrap">
                  Learn More <i className="ri-arrow-right-line ml-1"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Visit Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We'd love to meet you! Come as you are and experience the warmth of our church family.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-map-pin-line text-blue-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Location</h3>
                    <p className="text-gray-600">
                      123 Faith Street<br />
                      Community City, CC 12345<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-phone-line text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Contact</h3>
                    <p className="text-gray-600">
                      Phone: (555) 123-PRAY<br />
                      Email: info@ourchurch.com<br />
                      Office Hours: Mon-Fri, 9AM-5PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-time-line text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Service Times</h3>
                    <p className="text-gray-600">
                      Sunday Morning: 10:00 AM<br />
                      Wednesday Evening: 7:00 PM<br />
                      Friday Bible Study: 6:30 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.123456789!2d-74.0060!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjEiTiA3NMKwMDAnMjEuNiJX!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Church Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Take the next step in your faith journey. Connect with us today and become part of our church family.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/dashboard" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold cursor-pointer whitespace-nowrap">
              Member Login
            </Link>
            <a to="#contact" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all cursor-pointer whitespace-nowrap">
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
                logo
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Building a community of faith, hope, and love. Join us as we grow together in our relationship with God and serve others.
              </p>
              <div className="flex space-x-4">
                <a to="#" className="text-gray-400 hover:text-white cursor-pointer">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-facebook-fill"></i>
                  </div>
                </a>
                <a to="#" className="text-gray-400 hover:text-white cursor-pointer">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-twitter-fill"></i>
                  </div>
                </a>
                <a to="#" className="text-gray-400 hover:text-white cursor-pointer">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-instagram-line"></i>
                  </div>
                </a>
                <a to="#" className="text-gray-400 hover:text-white cursor-pointer">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-youtube-fill"></i>
                  </div>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a to="#about" className="text-gray-300 hover:text-white cursor-pointer">About Us</a></li>
                <li><a to="#services" className="text-gray-300 hover:text-white cursor-pointer">Services</a></li>
                <li><a to="#events" className="text-gray-300 hover:text-white cursor-pointer">Events</a></li>
                <li><Link to="/dashboard" className="text-gray-300 hover:text-white cursor-pointer">Member Portal</Link></li>
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
            <p>&copy; 2024 Our Church Community. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
