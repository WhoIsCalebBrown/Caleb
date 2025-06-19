import {useEffect, useState} from 'react';
import {Calendar, ChevronDown, Github, GraduationCap, MapPin, Menu, X, Code, Server, Database} from 'lucide-react';

// Matrix Digital Rain Component
const MatrixRain = ({ columnIndex }: { columnIndex: number }) => {
  const [visibleChars, setVisibleChars] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const codeStrings = [
    'if(user.isActive){return data;}else{throw error;}',
    'function getData(){const result=api.fetch();if(result.success){return result.data;}else{console.error("Failed");}}',
    'const user={name:"developer",skills:["js","ts"],active:true};',
    'if(skills.includes("react")){buildComponent();}else if(backend){createAPI();}',
    'try{const data=await fetch();process(data);}catch(err){handleError(err);}',
    'for(let i=0;i<items.length;i++){if(items[i].valid){processItem(items[i]);}}',
    'const fetchData=async()=>{const response=await api.get("/data");return response.json();};',
    'switch(type){case"user":return handleUser();case"admin":return handleAdmin();default:return null;}'
  ];
  
  const currentString = codeStrings[columnIndex % codeStrings.length];
  const maxChars = 60; // Increased to fill more of the screen
  
  useEffect(() => {
    const typeInterval = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
    }, 120);
    
    return () => clearInterval(typeInterval);
  }, []);
  
  useEffect(() => {
    const chars = [];
    const startIndex = Math.max(0, currentIndex - maxChars);
    
    for (let i = startIndex; i < currentIndex; i++) {
      const char = currentString[i % currentString.length];
      chars.push(char === ' ' ? '·' : char);
    }
    
    setVisibleChars(chars);
  }, [currentIndex, currentString, maxChars]);
  
  return (
    <div className="matrix-column h-screen flex flex-col justify-start pt-4 overflow-hidden">
      <div className="flex flex-col text-green-400 text-lg font-mono font-bold leading-5">
        {visibleChars.map((char, index) => {
          const isRecent = index >= visibleChars.length - 5;
          const isCurrent = index === visibleChars.length - 1;
          const fadeOpacity = Math.max(0.3, 1 - (visibleChars.length - index - 1) * 0.02);
          
          return (
            <div 
              key={`${columnIndex}-${currentIndex - visibleChars.length + index}`}
              className={`matrix-char-vertical ${
                isCurrent 
                  ? 'matrix-char-current' 
                  : isRecent 
                    ? 'matrix-char-recent' 
                    : ''
              }`}
              style={{
                opacity: fadeOpacity
              }}
            >
              {char}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  
  // Typewriter effect state
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const titles = [
    'Full-Stack Developer',
    'Laravel Expert',
    'TypeScript Enthusiast',
    'React Developer',
    'Vue.js Builder',
    'GraphQL Architect',
    'Linux Power User',
    'Docker Container Pro',
    'API Designer',
    'Database Optimizer',
    'Code Quality Advocate',
    'Problem Solver'
  ];

  // Smooth scrolling and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = titles[currentIndex];
      
      if (isDeleting) {
        setCurrentText(current.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
        }
      } else {
        setCurrentText(current.substring(0, currentText.length + 1));
        
        if (currentText === current) {
          setTimeout(() => setIsDeleting(true), 2000); // Pause before deleting
        }
      }
    }, isDeleting ? 50 : 100); // Faster deletion than typing

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, titles]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
            }
          });
        },
        { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const skills = [
    { name: 'Laravel', category: 'Backend', icon: '⚡', color: 'from-red-500 to-red-600' },
    { name: 'TypeScript', category: 'Programming', icon: '📘', color: 'from-blue-500 to-blue-600' },
    { name: 'JavaScript', category: 'Programming', icon: '💛', color: 'from-yellow-500 to-yellow-600' },
    { name: 'NestJS', category: 'Backend', icon: '🏗️', color: 'from-rose-500 to-pink-600' },
    { name: 'GraphQL', category: 'API', icon: '🔗', color: 'from-purple-500 to-purple-600' },
    { name: 'Apollo', category: 'GraphQL', icon: '🚀', color: 'from-indigo-500 to-indigo-600' },
    { name: 'Hasura', category: 'Backend', icon: '⚡', color: 'from-cyan-500 to-cyan-600' },
    { name: 'React', category: 'Frontend', icon: '⚛️', color: 'from-cyan-400 to-blue-500' },
    { name: 'Vue.js', category: 'Frontend', icon: '💚', color: 'from-green-500 to-emerald-600' },
    { name: 'Linux/Arch', category: 'Systems', icon: '🐧', color: 'from-slate-500 to-slate-600' },
    { name: 'Docker', category: 'DevOps', icon: '🐳', color: 'from-blue-400 to-blue-600' },
    { name: 'PostgreSQL', category: 'Database', icon: '🐘', color: 'from-blue-600 to-indigo-700' }
  ];

  const experiences = [
    {
      title: 'Software Developer',
      company: 'Vehikl',
      location: 'Remote, Ontario',
      period: '2022 - Present',
      responsibilities: [
        'Develop and maintain web applications using Laravel, TypeScript, and modern JavaScript frameworks',
        'Work with diverse technology stacks including Hasura, GraphQL, Apollo, and NestJS',
        'Collaborate with cross-functional teams using pair programming and mob programming practices',
        'Build scalable backend APIs and responsive frontend interfaces',
        'Contribute to code reviews and maintain high code quality standards'
      ]
    },
    {
      title: 'Video Editor',
      company: 'BrickHouse Cinematics',
      location: 'London, Ontario',
      period: '2021 - 2022',
      responsibilities: [
        'Film Editing via After Effects, Premiere Pro, and Photoshop',
        'Maintaining 100\'s of hours of footage for high profile companies',
        'Maintaining my own schedule and project deadlines',
        'Developed strong attention to detail and creative problem-solving skills'
      ]
    },
    {
      title: 'Video Content Producer',
      company: 'Vitalis Extraction Technologies',
      location: 'Kelowna, BC',
      period: '2019 - 2021',
      responsibilities: [
        'Film, produce and edit a wide range of video content',
        'Run and operate a podcast',
        'Host and manage workplace LMS',
        'Maintenance of Film gear and equipment',
        'Developed project management and technical troubleshooting skills'
      ]
    }
  ];

  const projects = [
    {
      title: 'GameShelf',
      description: 'A comprehensive video game aggregator and library management system. Built with Laravel backend and React frontend, integrating IGDB API for rich game metadata, user reviews, and personalized recommendations.',
      tech: ['Laravel', 'React', 'IGDB API', 'PostgreSQL', 'Redis'],
      status: 'Personal Project',
      icon: <Code className="w-6 h-6" />
    },
    {
      title: 'Homelab Infrastructure Suite',
      description: 'Self-hosted Unraid server ecosystem featuring Tailscale VPN, complete *arr stack (Sonarr, Radarr, Prowlarr), Jellyfin media server, local Ollama AI models, and automated backup solutions with monitoring dashboards.',
      tech: ['Unraid', 'Docker', 'Tailscale', 'Sonarr', 'Radarr', 'Ollama', 'Grafana'],
      status: 'Personal Project',
      icon: <Server className="w-6 h-6" />
    },
    {
      title: 'Real-Time Chat Platform',
      description: 'Enterprise-grade messaging application built with NestJS and Hasura, featuring GraphQL subscriptions, file sharing, message encryption, and role-based access control for team collaboration.',
      tech: ['NestJS', 'Hasura', 'GraphQL', 'WebSockets', 'PostgreSQL'],
      status: 'Professional Work',
      icon: <Database className="w-6 h-6" />
    },
    {
      title: 'E-Commerce Analytics Dashboard',
      description: 'Modernized legacy e-commerce platform with Vue.js frontend and Laravel API backend. Implemented real-time analytics, inventory management, and automated reporting with 40% performance improvement.',
      tech: ['Laravel', 'Vue.js', 'MySQL', 'Redis', 'Elasticsearch'],
      status: 'Professional Work',
      icon: <Code className="w-6 h-6" />
    },
    {
      title: 'AI-Powered Development Assistant',
      description: 'Local development tool leveraging self-hosted Ollama models for code review, documentation generation, and automated testing suggestions. Integrated with VSCode and JetBrains IDEs.',
      tech: ['Python', 'Ollama', 'FastAPI', 'TypeScript', 'VSCode Extension'],
      status: 'Personal Project',
      icon: <Server className="w-6 h-6" />
    },
    {
      title: 'Multi-Tenant SaaS Platform',
      description: 'Scalable Laravel-based SaaS application with tenant isolation, subscription management, and real-time notifications. Supports multiple databases and custom domain routing.',
      tech: ['Laravel', 'TypeScript', 'PostgreSQL', 'Redis', 'Stripe API'],
      status: 'Professional Work',
      icon: <Database className="w-6 h-6" />
    }
  ];

  return (
      <div className="min-h-screen bg-gray-950 text-white">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-gray-950/80 backdrop-blur-xl z-50 border-b border-gray-800/50">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
            <div className="flex justify-between items-center h-16">
              <div className="text-xl font-bold text-white">
                Caleb Brown
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8">
                {['home', 'about', 'experience', 'skills', 'projects', 'contact'].map((section) => (
                    <button
                        key={section}
                        onClick={() => scrollToSection(section)}
                        className={`capitalize transition-all duration-200 hover:text-blue-400 ${
                            activeSection === section ? 'text-blue-400 font-medium' : 'text-gray-300'
                        }`}
                    >
                      {section}
                    </button>
                ))}
              </div>

              {/* Mobile menu button */}
              <button
                  className="md:hidden text-gray-300 hover:text-white"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden py-4 border-t border-gray-800">
                  {['home', 'about', 'experience', 'skills', 'projects', 'contact'].map((section) => (
                      <button
                          key={section}
                          onClick={() => scrollToSection(section)}
                          className="block w-full text-left py-3 px-4 capitalize hover:text-blue-400 hover:bg-gray-800/50 rounded-lg mx-2 transition-all"
                      >
                        {section}
                      </button>
                  ))}
                </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-gray-950"></div>
          
          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[
              { x: 10, y: 20 }, { x: 85, y: 15 }, { x: 25, y: 60 }, { x: 70, y: 80 }, 
              { x: 45, y: 30 }, { x: 15, y: 75 }, { x: 90, y: 45 }, { x: 35, y: 85 },
              { x: 60, y: 25 }, { x: 5, y: 50 }, { x: 80, y: 70 }, { x: 50, y: 10 },
              { x: 20, y: 90 }, { x: 75, y: 35 }, { x: 40, y: 65 }
            ].map((pos, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-blue-400/60 rounded-full animate-float-big"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${4 + (i % 4)}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Geometric Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-blue-500/40 rounded-full animate-spin-slow animate-drift"></div>
            <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-purple-500/40 rounded-full animate-spin-reverse animate-drift-reverse"></div>
            <div className="absolute top-1/2 right-1/3 w-16 h-16 border border-cyan-500/40 rotate-45 animate-pulse-slow animate-float-big"></div>
            <div className="absolute bottom-1/4 left-1/3 w-20 h-20 border border-indigo-500/40 animate-bounce-slow animate-drift"></div>
          </div>
          
          {/* Traveling Elements */}
          <div className="absolute inset-0">
            <div className="absolute w-3 h-3 bg-green-400/50 rounded-full animate-travel-horizontal"></div>
            <div className="absolute w-3 h-3 bg-purple-400/50 rounded-full animate-travel-vertical"></div>
            <div className="absolute w-3 h-3 bg-cyan-400/50 rounded-full animate-travel-diagonal"></div>
          </div>
          
          {/* Matrix Code Rain - Left Side */}
          <div className="absolute inset-0 opacity-40">
            {[...Array(3)].map((_, i) => (
              <div
                key={`left-${i}`}
                className="absolute font-mono h-full"
                style={{
                  left: `${5 + i * 8}%`,
                  animationDelay: `${i * 1.5}s`,
                }}
              >
                <MatrixRain columnIndex={i} />
              </div>
            ))}
          </div>
          
          {/* Matrix Code Rain - Right Side */}
          <div className="absolute inset-0 opacity-40">
            {[...Array(3)].map((_, i) => (
              <div
                key={`right-${i}`}
                className="absolute font-mono h-full"
                style={{
                  right: `${5 + i * 8}%`,
                  animationDelay: `${(i + 3) * 1.5}s`,
                }}
              >
                <MatrixRain columnIndex={i + 3} />
              </div>
            ))}
          </div>
          
          <div className="text-center z-10 px-6 max-w-6xl mx-auto">
            <div className="mb-12">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                Caleb Brown
              </h1>
              <h2 className="text-2xl md:text-3xl text-gray-300 mb-8 h-12 flex items-center justify-center">
                <span className="typewriter">
                  {currentText}
                  <span className="cursor">|</span>
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Professional software developer with expertise in modern web technologies. 
                Passionate about Linux, self-hosted infrastructure, and bringing creative solutions to complex problems.
                Former video production professional turned tech enthusiast.
              </p>
            </div>

            <div className="flex justify-center space-x-6 mb-16">
              <a href="https://github.com/WhoIsCalebBrown" target="_blank" rel="noopener noreferrer"
                 className="p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all transform hover:scale-105 hover:shadow-lg">
                <Github size={24} />
              </a>
            </div>

            <button
                onClick={() => scrollToSection('about')}
                className="animate-bounce-gentle text-gray-400 hover:text-white transition-colors"
            >
              <ChevronDown size={32} />
            </button>
          </div>

          {/* Seamless Gradient Transition to About Section */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-gray-950/50 to-gray-950 pointer-events-none z-20"></div>
        </section>

        {/* About Section */}
        <section id="about" className={`py-24 px-6 lg:px-12 transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-screen-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-white">
              About Me
            </h2>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-blue-400">Full-Stack Developer & Creative Technologist</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  I'm a passionate software developer with 2+ years of professional experience at Vehikl, a leading software consultancy. 
                  I specialize in building modern web applications using Laravel, TypeScript, and cutting-edge technologies like GraphQL, 
                  Hasura, and NestJS. My unique background in video production brings a creative perspective and meticulous attention 
                  to detail to every project I work on.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  As a Linux enthusiast running Arch Linux as my daily driver, I'm deeply passionate about open-source technologies 
                  and system administration. I've built my own Unraid server infrastructure, hosting containerized services including 
                  a local Ollama LLM for AI development and experimentation.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  My development environment includes JetBrains IDEs and VSCode, and I'm always exploring new technologies to enhance 
                  my development workflow and contribute to innovative solutions.
                </p>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
                <h3 className="text-xl font-semibold mb-8 text-white">Technical Expertise</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Full-Stack Web Development', color: 'bg-blue-500' },
                    { name: 'Modern PHP & Laravel', color: 'bg-red-500' },
                    { name: 'TypeScript & JavaScript', color: 'bg-yellow-500' },
                    { name: 'GraphQL & API Design', color: 'bg-purple-500' },
                    { name: 'Linux System Administration', color: 'bg-green-500' },
                    { name: 'Self-Hosted Infrastructure', color: 'bg-indigo-500' }
                  ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span className="text-gray-300">{item.name}</span>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className={`py-24 px-6 lg:px-12 bg-gray-900/30 transition-all duration-1000 ${isVisible.experience ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-screen-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-white">
              Experience
            </h2>

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                  <div key={index} className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-all">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-semibold text-white mb-2">{exp.title}</h3>
                        <p className="text-xl text-blue-400">{exp.company}</p>
                      </div>
                      <div className="flex flex-col lg:items-end mt-4 lg:mt-0">
                        <div className="flex items-center text-gray-400 mb-2">
                          <Calendar size={16} className="mr-2" />
                          {exp.period}
                        </div>
                        <div className="flex items-center text-gray-400">
                          <MapPin size={16} className="mr-2" />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {exp.responsibilities.map((resp, respIndex) => (
                          <li key={respIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
                            <span className="text-gray-300 leading-relaxed">{resp}</span>
                          </li>
                      ))}
                    </ul>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className={`py-24 px-6 lg:px-12 transition-all duration-1000 ${isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-screen-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-white">
              Skills & Technologies
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
              {skills.map((skill, index) => (
                  <div key={index} className="group bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all hover:transform hover:scale-105">
                    <div className="flex items-center">
                      <span className="text-2xl mr-4">{skill.icon}</span>
                      <div>
                        <h3 className="font-semibold text-white">{skill.name}</h3>
                        <p className="text-sm text-gray-400">{skill.category}</p>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="py-24 px-6 lg:px-12 bg-gray-900/30">
          <div className="max-w-screen-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-white">
              Education
            </h2>

            <div className="space-y-8 max-w-4xl mx-auto">
              {/* Software Engineering Technologies */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
                <div className="flex items-start space-x-6">
                  <div className="p-4 bg-blue-600/20 rounded-xl">
                    <GraduationCap size={32} className="text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-2">Software Engineering Technologies</h3>
                    <p className="text-xl text-blue-400 mb-3">Conestoga College | Waterloo, ON</p>
                    <p className="text-gray-400 mb-4">2021 - 2024</p>
                    <p className="text-gray-300 leading-relaxed">
                      Software Engineering Technology at Conestoga extends beyond programming. Course areas include
                      software quality, project management, computer security and business intelligence.
                    </p>
                  </div>
                </div>
              </div>

              {/* Marketing Diploma */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
                <div className="flex items-start space-x-6">
                  <div className="p-4 bg-green-600/20 rounded-xl">
                    <GraduationCap size={32} className="text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-2">Business – Marketing</h3>
                    <p className="text-xl text-green-400 mb-3">George Brown College | Toronto, ON</p>
                    <p className="text-gray-400 mb-4">2020 - 2021</p>
                    <p className="text-gray-300 leading-relaxed">
                      Comprehensive marketing program focusing on digital marketing strategies, consumer behavior, 
                      brand management, and market research. Gained hands-on experience with industry-standard tools 
                      and developed skills in campaign development, social media marketing, and data analytics.
                    </p>
                  </div>
                </div>
              </div>

              {/* Film Production Diploma */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
                <div className="flex items-start space-x-6">
                  <div className="p-4 bg-purple-600/20 rounded-xl">
                    <GraduationCap size={32} className="text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-2">Film Production Diploma</h3>
                    <p className="text-xl text-purple-400 mb-3">Toronto Film School | Toronto, ON</p>
                    <p className="text-gray-400 mb-4">2018 - 2019</p>
                    <p className="text-gray-300 leading-relaxed">
                      Intensive hands-on program covering all aspects of film production including writing, directing, 
                      cinematography, editing, and post-production. Worked with industry-grade equipment and learned 
                      from working filmmakers. Developed strong project management skills and creative problem-solving abilities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className={`py-24 px-6 lg:px-12 transition-all duration-1000 ${isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-screen-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-white">
              Projects
            </h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                  <div key={index} className="group bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-all hover:transform hover:scale-105 flex flex-col h-full">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-blue-600/20 rounded-lg text-blue-400">
                        {project.icon}
                      </div>
                      <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                    </div>
                    <p className="text-gray-300 mb-6 leading-relaxed flex-grow">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, techIndex) => (
                          <span key={techIndex} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700 hover:bg-gray-700 hover:border-gray-600 hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer">
                            {tech}
                          </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-blue-400 text-sm font-medium">{project.status}</span>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={`py-24 px-6 lg:px-12 bg-gray-900/30 transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-20 text-white">
              Get In Touch
            </h2>

            <p className="text-xl text-gray-300 mb-16 leading-relaxed">
              I'm always interested in discussing new opportunities and connecting with fellow developers.
              Let's talk about technology, projects, or potential collaborations!
            </p>

            <div className="grid md:grid-cols-1 gap-8 mb-16 max-w-md mx-auto">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 hover:border-gray-700 transition-all">
                <MapPin className="text-blue-400 mb-4 mx-auto" size={32} />
                <h3 className="font-semibold mb-3 text-white">Location</h3>
                <p className="text-gray-300">Ontario, Canada</p>
              </div>
            </div>

            <div className="flex justify-center space-x-6">
              <a href="https://github.com/WhoIsCalebBrown" target="_blank" rel="noopener noreferrer"
                 className="flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 px-8 py-4 rounded-xl transition-all transform hover:scale-105">
                <Github size={20} />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 lg:px-12 border-t border-gray-800">
          <div className="max-w-screen-2xl mx-auto text-center">
            <p className="text-gray-400">
              © 2025 Caleb Brown. Designed with passion for the future of technology.
            </p>
          </div>
        </footer>
      </div>
  );
};

export default Portfolio;