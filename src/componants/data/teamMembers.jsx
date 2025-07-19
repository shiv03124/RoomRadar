import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const teamMembers = [
  {
    name: "Alex Johnson",
    position: "CEO & Founder",
    bio: "Visionary leader passionate about solving housing challenges through technology.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    socials: [
      { icon: <FaTwitter />, url: "#" },
      { icon: <FaLinkedin />, url: "#" }
    ]
  },
  {
    name: "Sarah Williams",
    position: "CTO",
    bio: "Tech enthusiast building scalable solutions for seamless user experiences.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    socials: [
      { icon: <FaTwitter />, url: "#" },
      { icon: <FaGithub />, url: "#" }
    ]
  },
  {
    name: "Michael Chen",
    position: "Head of Product",
    bio: "Designing intuitive interfaces that make housing searches effortless.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    socials: [
      { icon: <FaLinkedin />, url: "#" }
    ]
  },
  {
    name: "Emily Rodriguez",
    position: "Community Manager",
    bio: "Building relationships and ensuring every user feels at home with RoomRadar.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    socials: [
      { icon: <FaTwitter />, url: "#" },
      { icon: <FaLinkedin />, url: "#" }
    ]
  }
];

export default teamMembers;