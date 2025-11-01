import { Link } from 'react-router-dom';
import PublicNavbar from '@/components/layout/PublicNavbar';
import PublicFooter from '@/components/layout/PublicFooter';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Our Church</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Building a community of faith, hope, and love since our founding
          </p>
        </div>
      </section>

      {/* Our Leadership */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">OUR LEADERSHIP</h2>
              <div className="h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-blue-600 first-letter:mr-2 first-letter:float-left">
                  Since 1984, hundreds of people have darkened our doors and met with Christ through the gospel. In this ever-changing world, we have an Anchor that still holds and always will – <span className="font-semibold text-gray-900">Jesus Christ, the same, yesterday, today and forever</span>. While He leads, we have no fear.
                </p>
                
                <p>
                  There is no telling what God can do with a yielded vessel. He found a yielded vessel in our pastor, <span className="font-semibold text-gray-900">Brother Niyi Adelodun</span>, and since 1984, God has led us safely through him.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-8 text-white flex flex-col justify-center">
              <p className="text-xl italic mb-6 leading-relaxed">
                "But in the days of the voice of the seventh angel, when he shall begin to sound, the mystery of God should be finished, as he hath declared to His servants the prophets"
              </p>
              <p className="text-sm font-semibold opacity-90">
                - Revelation 10:7<br />
                King James Version
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brief History */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">BRIEF HISTORY OF OUR CHURCH</h2>
              <div className="h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                Bibleway Fellowship Tabernacle is a church situated in the heartland of Lagos, on a parcel of land bordering the watery expanse of the Atlantic Ocean.
              </p>
              
              <p>
                The modest looking building has nothing to speak for it as far as architectural designs go, but everything if Truth is the issue under deliberation.
              </p>
              
              <p>
                The Church started out as a house fellowship in 1984 when our pastor and his family had the light of the Present Truth (Malachi 4:5-6, Rev 10:7, Luke 17:30) or Message of The Hour (as it is fondly called) flash their way.
              </p>
              
              <p>
                The Message was nothing like what they had previously known. It was peculiar, odd, and unusual yet something about it resonated in their hearts.
              </p>
              
              <p>
                Their contact with it was the typical "on the road to Damascus experience". It resulted in the falling off of their religious scales; the casting away of long held church theories and traditions that had no firm root in the Bible.
              </p>
              
              <p>
                They saw with great shock and alarm that their cherished faith stood on a shaky ecclesiastical foundation. Suddenly it became apparent that the established churches had forsaken the truth and simplicity of God, while flirting with modernity and civilization.
              </p>
              
              <p>
                Their all-consuming desire to acquire wealth and build a network of churches proved not to be so God-inspired. Shocking as it may seem, God is not as much interested in quantity of believers as much as He is in their quality. The installation of women at the pulpit and other positions of leadership where men were present ran headlong against the Bible. There are of course as many of these evils as there are denominations but it is not this writer's desire to make a catalogue of them here and now.
              </p>
              
              <p>
                That Christianity in every Age gets steeped in a mess is historically evident and clear but to each of the mess generated, God responds with a Message!
              </p>
              
              <p>
                To be sure, the Bible (the book from which churches derive their doctrines) is a spiritual book, which ought to be read with spiritual eyes. The Message became for them the viewing lens, which helped with focusing: adjusting out the blur in the vision. No longer, for instance, was God seen as an inexplicable three-yet-one-person sandwich. In breathtaking clarity, He coalesced into the same oneness in which the old Jewish prophets portrayed Him.
              </p>
              
              <p>
                Also the intractable task of reconciling the teachings of the 39 books of the first half of the Bible (Old Testament) and those of the teachings of the 27 books of it's second half (New Testament) became possible. The seals (symbols) that veiled the meanings of such notoriously difficult books of the Bible as Genesis, Daniel and Revelation got broken and it's awesome contents fell out in plain view before their wondering eyes.
              </p>
              
              <p>
                Full of zeal, they swung into unhesitating action: converting a portion of their small compound to a place for worship. They pooled together meager resources and bought the most basic of church paraphernalia: improvising along the way as they advanced: using crude materials to make music and benches for sitting etc
              </p>
              
              <p>
                Overtime, a trickle of people joined the new group. It was a simple Message so it attracted the very simple. Everyone had to relearn the abandoned concepts of humility, equality and oneness. Whatever privileged status you held in the secular world didn't make you anymore special than the next man without it. All males were simply addressed as "brother" and females "sister". Leadership meant servitude. The Ministers fed and served the Laity.
              </p>
              
              <p>
                The breakthrough of anyone into position and authority was leveraged as a key for opening doors for others. A rich brother's or sister's automobile was used as everyone's transport. It was a one for all and all for one setting: everyone cared and everyone shared. So growth was the only natural progression in this synergistic environment.
              </p>
              
              <p>
                Bibleway Fellowship Tabernacle remained a very small group for many years until when the young men and women started intermarrying, thereby widening the size of their families and consequently the church, with the birth of new babies. Some brought in relatives and friends but too often, they saw them draw back, pulled away like Lot by the world's glamour. So at no time in the church's history did the assembly burst at its seams with a large crowd.
              </p>
              
              <p className="font-semibold text-gray-900">
                Historically, Truth has NEVER been a great attractant of crowds! Falsehood has and continues to do so.
              </p>
              
              <p>
                The church continues to manifest growth, but not so much in numbers as it is in Revelation. This website is just a tool: to record, witness, announce, and declare the living works of a living God in the midst of His Bride for the Hour.
              </p>
              
              <p className="text-blue-600 font-semibold">
                God bless you and shalom!
              </p>
            </div>
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
            <Link to="/contact" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
