import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaHome, FaHeart, FaUser, FaStar, FaArrowRight, FaMapMarkerAlt, FaMoneyBillWave, FaRulerCombined } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import logo from './images/image.png'
import { GiHouseKeys } from 'react-icons/gi';

const Home = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/dashboard');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const hoverEffect = {
    scale: 1.03,
    transition: { duration: 0.3 }
  };

  const bounceEffect = {
    y: [0, -10, 0],
    transition: { duration: 1.5, repeat: Infinity }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
   <div className="font-sans text-gray-800 leading-relaxed h-screen overflow-y-auto overflow-x-hidden">

      {/* Floating Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 py-3 px-6"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center cursor-pointer"
            onClick={() => window.scrollTo(0, 0)}
          >
           <img
  src={logo} // Replace with your actual logo path
  alt="RoomRadar Logo"
  className="h-10 w-auto object-contain"
/>

          </motion.div>
          <div className="hidden md:flex space-x-8">
            <motion.a 
              whileHover={{ scale: 1.05, color: '#4f46e5' }}
              className="font-medium text-gray-700 hover:text-indigo-600 transition-colors"
              href="#features"
            >
              Features
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05, color: '#4f46e5' }}
              className="font-medium text-gray-700 hover:text-indigo-600 transition-colors"
              href="#how-it-works"
            >
              How It Works
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05, color: '#4f46e5' }}
              className="font-medium text-gray-700 hover:text-indigo-600 transition-colors"
              href="#testimonials"
            >
              Testimonials
            </motion.a>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#4338ca' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium shadow-md"
          >
            Get Started
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-20 px-4 bg-gradient-to-br from-indigo-50 to-purple-50 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-100 opacity-20 blur-xl"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-indigo-100 opacity-20 blur-xl"></div>
          <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-pink-100 opacity-15 blur-xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <motion.h1 
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight"
              >
                Find Your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Perfect Space</span>
              </motion.h1>
              <motion.p 
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl"
              >
                Discover rooms, apartments, and shared spaces that match your lifestyle and budget.
              </motion.p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button 
                    onClick={handleSearch}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-full shadow-lg flex items-center justify-center w-full sm:w-auto"
                  >
                    <FaSearch className="mr-3" /> Start Searching
                  </button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button  onClick={handleSearch}
                    className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-8 rounded-full shadow-md border border-gray-200 flex items-center justify-center w-full sm:w-auto"
                  >
                    <FaUser className="mr-3 text-indigo-600" /> List Your Property
                  </button>
                </motion.div>
              </div>

              <div className="mt-12 flex flex-wrap gap-6">
                {[
                  { icon: <FaMapMarkerAlt className="text-indigo-600" />, text: '10,000+ Locations' },
                  { icon: <IoIosPeople className="text-purple-600 text-xl" />, text: '50,000+ Happy Users' },
                  { icon: <GiHouseKeys className="text-pink-600" />, text: '30,000+ Listings' }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ y: -3 }}
                    className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm"
                  >
                    <span className="mr-2">{item.icon}</span>
                    <span className="font-medium text-gray-700">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 flex justify-center">
              <motion.div
                animate={bounceEffect}
                className="relative"
              >
                <div className="w-80 h-80 md:w-96 md:h-96 bg-white rounded-2xl shadow-xl overflow-hidden border-8 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                    alt="Beautiful apartment"
                    className="w-full h-full object-cover"
                  />
                </div>``
                <motion.div 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 w-64"
                >
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <FaUser className="text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Sarah Johnson</h4>
                      <p className="text-sm text-gray-500">Found her perfect home</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">"Found my dream apartment in just 3 days!"</p>
                </motion.div>
                
                <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 w-56"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">$1,200/mo</span>
                    <div className="flex items-center text-yellow-400">
                      <FaStar />
                      <span className="ml-1 text-gray-700">4.9</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaMapMarkerAlt className="mr-1 text-indigo-500" />
                    <span>Downtown, NYC</span>
                  </div>
                  <div className="mt-2 flex justify-between text-xs">
                    <span className="flex items-center"><FaRulerCombined className="mr-1" /> 850 sqft</span>
                    <span className="flex items-center"><FaMoneyBillWave className="mr-1" /> Utilities included</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        id="features"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Why Choose <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">RoomRadar</span>
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              We've revolutionized the way people find their perfect living spaces
            </motion.p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaSearch className="text-3xl text-indigo-600" />,
                title: "Smart Search",
                description: "Our advanced filters help you find exactly what you're looking for in seconds.",
                color: "indigo"
              },
              {
                icon: <FaHeart className="text-3xl text-pink-600" />,
                title: "Verified Listings",
                description: "Every property is personally verified to ensure accuracy and quality.",
                color: "pink"
              },
              {
                icon: <FaUser className="text-3xl text-purple-600" />,
                title: "Roommate Matching",
                description: "Our compatibility algorithm helps you find the perfect roommate.",
                color: "purple"
              },
              {
                icon: <FaMoneyBillWave className="text-3xl text-green-600" />,
                title: "Transparent Pricing",
                description: "No hidden fees. See exactly what you'll pay upfront.",
                color: "green"
              },
              {
                icon: <FaMapMarkerAlt className="text-3xl text-blue-600" />,
                title: "Neighborhood Insights",
                description: "Get detailed information about the area before you commit.",
                color: "blue"
              },
              {
                icon: <GiHouseKeys className="text-3xl text-yellow-600" />,
                title: "Virtual Tours",
                description: "Explore properties from the comfort of your current home.",
                color: "yellow"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
                className={`bg-white p-8 rounded-xl border border-gray-100 hover:border-${feature.color}-200 transition-all`}
              >
                <div className={`w-16 h-16 rounded-full bg-${feature.color}-50 flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section 
        id="how-it-works"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How RoomRadar Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find your perfect home in just a few simple steps
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Timeline */}
            <div className="hidden lg:block absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-indigo-400 to-purple-400 transform -translate-x-1/2"></div>
            
            <div className="space-y-16 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
              {[
                {
                  icon: <FaHome className="text-2xl text-white" />,
                  title: "1. List or Find",
                  description: "Post your available space or browse thousands of listings in your desired area.",
                  color: "indigo"
                },
                {
                  icon: <FaHeart className="text-2xl text-white" />,
                  title: "2. Connect",
                  description: "Message potential roommates or landlords and schedule viewings.",
                  color: "purple",
                  center: true
                },
                {
                  icon: <GiHouseKeys className="text-2xl text-white" />,
                  title: "3. Move In",
                  description: "Finalize agreements and move into your perfect space hassle-free.",
                  color: "pink"
                }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  whileHover={hoverEffect}
                  className={`relative bg-white p-8 rounded-xl shadow-md border border-gray-100 ${step.center ? "lg:transform lg:translate-y-10" : ""}`}
                >
                  <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-${step.color}-600 flex items-center justify-center shadow-lg`}>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center mt-6">{step.title}</h3>
                  <p className="text-gray-600 text-center">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-20 text-center"
          >
            <button 
              onClick={handleSearch}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-full shadow-lg inline-flex items-center"
            >
              Get Started Now <FaArrowRight className="ml-2" />
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section 
        id="testimonials"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 bg-indigo-600 text-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ y: -20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            What Our Users Say
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Found my perfect roommate and apartment in just one week! RoomRadar made the process so easy.",
                author: "Sarah J., New York",
                rating: 5,
                avatar: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                quote: "As a landlord, I've never filled vacancies so quickly. The quality of applicants is excellent.",
                author: "Michael T., Chicago",
                rating: 5,
                avatar: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                quote: "The roommate matching algorithm is spot on. I'm living with my best friend thanks to RoomRadar!",
                author: "Emily R., Austin",
                rating: 5,
                avatar: "https://randomuser.me/api/portraits/women/68.jpg"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-sm border border-white border-opacity-20"
              >
                <div className="flex text-yellow-300 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="text-lg mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    className="w-12 h-12 rounded-full mr-4 border-2 border-white"
                  />
                  <p className="font-semibold">{testimonial.author}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 px-4 bg-gradient-to-r from-indigo-700 to-purple-700 text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ y: -10 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to Find Your Perfect Space?
          </motion.h2>
          <motion.p 
            initial={{ y: 10 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            className="text-xl mb-8 opacity-90"
          >
            Join thousands of happy users who found their ideal living situation with RoomRadar.
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button 
              onClick={handleSearch}
              className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold py-4 px-10 rounded-full shadow-lg flex items-center mx-auto text-lg"
            >
              Get Started <FaArrowRight className="ml-3" />
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gray-900 text-gray-300 py-16 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-indigo-600 w-8 h-8 rounded-md flex items-center justify-center mr-2">
                  <GiHouseKeys className="text-white text-lg" />
                </div>
                <span className="text-xl font-bold text-white">RoomRadar</span>
              </div>
              <p className="mb-6">Making housing searches simple, fast, and reliable since 2023.</p>
              <div className="flex space-x-4">
                {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social, index) => (
                  <motion.a 
                    key={index}
                    whileHover={{ y: -3, color: '#ffffff' }}
                    href="#"
                    className="text-gray-400 hover:text-white"
                  >
                    {social}
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg text-white mb-6">For Renters</h3>
              <ul className="space-y-3">
                {['Browse Listings',  'Renter Resources'].map((item, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                  >
                    <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg text-white mb-6">For Landlords</h3>
              <ul className="space-y-3">
                {['List Your Property', 'Pricing', 'Screening Tools', 'Landlord Resources'].map((item, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                  >
                    <a href="/dashboard" className="hover:text-white transition-colors">{item}</a>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div>
  <h3 className="font-bold text-lg text-white mb-6">Company</h3>
  <ul className="space-y-3">
    {[
      { name: 'About Us', path: '/about' },
      // { name: 'Careers', path: '/careers' },
      // { name: 'Contact', path: '/contact' },
      // { name: 'Press', path: '/press' },
      // { name: 'Blog', path: '/blog' }  
    ].map((item, index) => (
      <motion.li 
        key={index}
        whileHover={{ x: 5 }}
      >
        <Link 
          to={item.path} 
          className="hover:text-white transition-colors"
        >
          {item.name}
        </Link>
      </motion.li>
    ))}
  </ul>
</div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} RoomRadar. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Home;