import { Link } from 'react-router-dom';
import PublicNavbar from '@/components/layout/PublicNavbar';
import PublicFooter from '@/components/layout/PublicFooter';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      {/* Hero Section */}
      <section id="home" className="relative bg-cover bg-center min-h-screen flex items-center" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://readdy.ai/api/search-image?query=beautiful%20modern%20church%20interior%20with%20warm%20natural%20lighting%20streaming%20through%20stained%20glass%20windows%2C%20wooden%20pews%20arranged%20in%20rows%2C%20peaceful%20and%20welcoming%20atmosphere%20with%20contemporary%20architectural%20design%2C%20soft%20golden%20hour%20lighting%20creating%20reverent%20ambiance%20perfect%20for%20worship%20and%20community%20gathering&width=1920&height=1080&seq=hero1&orientation=landscape')`
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Bibleway Fellowship Tabernacle
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Join us in worship, fellowship, and service as we grow together in faith and love. 
              Everyone is welcome in God's house.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold cursor-pointer whitespace-nowrap">
                Join Us
              </Link>
              <a href="#services" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all cursor-pointer whitespace-nowrap">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">ABOUT</h2>
              <div className="h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-blue-600 first-letter:mr-2 first-letter:float-left">
                We are honored that you are visiting our website. We are a non-denominational Bible believing church. Our mission is to spread the Gospel of Jesus Christ to all the world. We believe in an End-Time Message as foretold in <span className="font-semibold text-gray-900">Malachi 4:5-6, Rev. 10:7, and Luke 17:30</span>, and delivered in our day by Rev William Marrion Branham.
              </p>
              
              <div className="border-l-4 border-blue-600 pl-6 py-2 bg-blue-50 rounded-r-lg">
                <p className="italic">
                  At Bibleway Fellowship Tabernacle, our mission is to help establish a personal relationship between you and your Maker. We believe that if we do our part, then we can expect to see the exceeding abundantly above all that we could ever ask or think of.
                </p>
              </div>
              
              <p>
                Our doors are open to anyone regardless of what denomination they belong to. Come, let us worship His majesty. Let us kneel before the LORD our God and our maker.
              </p>
              
              <div className="pt-6 border-t border-gray-200">
                <p className="text-base text-gray-600">
                  Please use this site to access information regarding upcoming meetings and click the menu links for further information about our church. We look forward to hearing from you and answering any questions you might have.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/about" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Learn More About Us
            </Link>
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
                      5, Ali-Asekun Street,<br />
                      Olojojo Bus Stop,<br />
                      Oworonsoki,<br />
                      Lagos, Nigeria.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="ri-mail-line text-green-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
                    <p className="text-gray-600">
                      biblewayft@gmail.com
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
                      Wednesdays @ 5:30pm<br />
                      Sundays @ 8:30am
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.0876!2d3.3792!3d6.5244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzEnMjcuOCJOIDPCsDIyJzQ1LjEiRQ!5e0!3m2!1sen!2sng!4v1234567890"
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
            <a href="#contact" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all cursor-pointer whitespace-nowrap">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
