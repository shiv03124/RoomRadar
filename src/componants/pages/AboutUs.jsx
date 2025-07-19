import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaBuilding, FaUsers, FaBullseye, FaHandshake, FaMapMarkerAlt, FaChartLine, FaArrowRight } from 'react-icons/fa';
import { GiHouseKeys } from 'react-icons/gi';
// import teamMembers from '../data/team'; // You'll create this data file

const AboutUs = () => {
  // Animation variants
  const navigate= useNavigate()
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

   const handleSearch = () => {
    navigate('/dashboard');
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

  return (
    <div className="font-sans text-gray-800 eading-relaxed h-screen overflow-y-auto">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-32 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-white"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-white"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            About RoomRadar
          </motion.h1>
          <motion.p 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Revolutionizing the way people find their perfect living spaces since 2023
          </motion.p>
        </div>
      </motion.section>

      {/* Our Story */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              variants={itemVariants}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="text-indigo-600">Story</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                RoomRadar was born out of frustration with the traditional housing search process. 
                Our founders, a group of recent graduates, struggled to find affordable, quality 
                housing in competitive markets.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                What started as a college project in 2020 has grown into a platform serving 
                over 100,000 users across 50+ cities. We've helped students, young professionals, 
                and families find their perfect spaces while building meaningful connections.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "100K+", label: "Happy Users" },
                  { value: "30K+", label: "Listings" },
                  { value: "50+", label: "Cities" },
                  { value: "98%", label: "Satisfaction Rate" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={hoverEffect}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-100"
                  >
                    <p className="text-2xl font-bold text-indigo-600">{stat.value}</p>
                    <p className="text-gray-600">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="lg:w-1/2"
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Team working together" 
                  className="rounded-xl shadow-xl w-full"
                />
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg w-64"
                >
                  <GiHouseKeys className="text-4xl text-indigo-600 mb-3" />
                  <p className="font-semibold">Founded in 2023</p>
                  <p className="text-gray-600 text-sm">By a team passionate about solving housing challenges</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Our Mission */}
      <motion.section 
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-indigo-600">Mission</span> & Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to making housing searches transparent, efficient, and human-centered
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaBuilding className="text-3xl text-indigo-600" />,
                title: "Quality Housing",
                description: "We verify every listing to ensure our users only see legitimate, quality options."
              },
              {
                icon: <FaUsers className="text-3xl text-purple-600" />,
                title: "Community Focus",
                description: "Building connections between roommates and neighbors is at our core."
              },
              {
                icon: <FaBullseye className="text-3xl text-pink-600" />,
                title: "Transparency",
                description: "No hidden fees, no surprises - just honest information you can trust."
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={hoverEffect}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Our Team */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4 bg-white"
      >
        {/* <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our <span className="text-indigo-600">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate people behind RoomRadar's success
            </p>
          </motion.div> */}
          
          {/* <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-indigo-600 mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                  <div className="flex mt-4 space-x-3">
                    {member.socials.map((social, i) => (
                      <a 
                        key={i}
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-indigo-600"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div> */}
        {/* </div> */}
      </motion.section>

      {/* Our Impact */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-yellow-300">Impact</span>
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              How we're changing the housing search experience
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaMapMarkerAlt className="text-3xl" />,
                title: "Wide Coverage",
                description: "Active in 50+ cities across 3 countries and expanding"
              },
              {
                icon: <FaChartLine className="text-3xl" />,
                title: "Time Saved",
                description: "Users find housing 60% faster than traditional methods"
              },
              {
                icon: <FaHandshake className="text-3xl" />,
                title: "Strong Community",
                description: "Over 10,000 successful roommate matches made"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={hoverEffect}
                className="bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-sm border border-white border-opacity-20 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="opacity-90">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 bg-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join the RoomRadar Community?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Whether you're looking for a place or have one to share, we've got you covered.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-10 rounded-full shadow-lg flex items-center mx-auto text-lg" onClick={handleSearch}>
              Get Started <FaArrowRight className="ml-3" />
            </button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUs;