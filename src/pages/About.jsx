import React, { useEffect, useRef } from "react";
import "../styles/About.css";
import aboutHero from "../assets/about-page.png";
import member1 from "../assets/team/sardor-ashurov.png"
import member2 from "../assets/team/ivan-perelygin.jpg"
import { 
  FaShieldAlt, 
  FaPalette, 
  FaHeadset, 
  FaRocket, 
  FaFacebookF, 
  FaLinkedinIn,
  FaPlay,
  FaArrowRight,
  FaAward,
  FaUsers,
  FaGlobeAmericas,
  FaIndustry,
  FaLeaf
} from "react-icons/fa";
import { HiCheckBadge } from "react-icons/hi2";
import { MdEmail } from "react-icons/md";
import useReveal from "../hooks/useReveal";

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = "", prefix = "" }) {
  const [count, setCount] = React.useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(progress * end);
            setCount(current);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          animate();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={countRef}>{prefix}{count}{suffix}</span>;
}

export default function About() {
  useReveal();

  const achievements = [
    { number: 20, suffix: "+", label: "Years of Excellence", icon: <FaAward /> },
    { number: 1500, suffix: "+", label: "Projects Completed", icon: <FaIndustry /> },
    { number: 250, suffix: "+", label: "Team Members", icon: <FaUsers /> },
    { number: 45, suffix: "+", label: "Countries Served", icon: <FaGlobeAmericas /> }
  ];

  const team = [
    {
      name: "Sardor Ashurov",
      role: "Managing Partner",
      img: member1,
      email: "sardor@alcoponusa.com",
      linkedin: "https://www.linkedin.com/in/sardor-ashurov/",
      facebook: "#",
      bio: "Leading ALCOPON's vision with 15+ years in composite materials industry."
    },
    {
      name: "Ivan Perelygin",
      role: "Managing Partner",
      img: member2,
      email: "ivan@alcoponusa.com",
      linkedin: "#",
      facebook: "#",
      bio: "Expert in aluminum composite technology and manufacturing processes."
    }
  ];

  const values = [
    { 
      icon: <HiCheckBadge />, 
      title: "Quality First", 
      text: "Every panel undergoes rigorous testing with premium cores, smooth surfaces, and comprehensive warranty coverage.",
      color: "green"
    },
    { 
      icon: <FaShieldAlt />, 
      title: "Safety & Compliance", 
      text: "Fire-rated panels tested to international standards with certified systems and comprehensive documentation.",
      color: "blue"
    },
    { 
      icon: <FaHeadset />, 
      title: "Customer Partnership", 
      text: "From initial samples to ongoing technical support, we're with you every step of the project journey.",
      color: "gold"
    },
    { 
      icon: <FaRocket />, 
      title: "Innovation Drive", 
      text: "State-of-the-art equipment and expanding finish libraries to inspire breakthrough architectural design.",
      color: "charcoal"
    },
    { 
      icon: <FaPalette />, 
      title: "Design Freedom", 
      text: "Extensive palettes including solids, metallics, wood grains, and stone effects for unlimited creativity.",
      color: "green"
    },
    { 
      icon: <FaLeaf />, 
      title: "Sustainable Choice", 
      text: "Produced with environmentally responsible processes and recyclable materials, supporting green building goals.",
      color: "emerald"
    }
  ];

  const journey = [
    { 
      year: "2003", 
      title: "Foundation Years",
      text: "Founded ALCOPON with our first state-of-the-art production line, establishing quality standards that define us today.",
      milestone: "First Production Line"
    },
    { 
      year: "2010", 
      title: "Safety Innovation", 
      text: "Expanded capacity and launched our first fire-rated ACP line, setting new industry benchmarks for safety.",
      milestone: "FR-ACP Launch"
    },
    { 
      year: "2018", 
      title: "Global Expansion", 
      text: "Opened international sales offices across three continents to serve our growing global client base.",
      milestone: "International Offices"
    },
    { 
      year: "2025", 
      title: "Digital Future", 
      text: "Introduced revolutionary finishes and launched our comprehensive digital specification platform.",
      milestone: "Digital Platform"
    },
  ];

  const certifications = [
    { name: "ISO 9001:2015", description: "Quality Management" },
    { name: "ISO 14001", description: "Environmental Management" },
    { name: "ASTM E84", description: "Fire Safety Standards" },
    { name: "CE Marking", description: "European Conformity" }
  ];

  return (
    <main className="aboutpage">
      {/* Enhanced Hero Banner */}
      <section className="about-hero">
        <div className="about-hero-bg">
          <img src={aboutHero} alt="ALCOPON About" />
          <div className="about-hero-overlay"></div>
        </div>
        <div className="container">
          <div className="about-hero-content reveal fade-up">
            <div className="hero-badge">
              <FaAward />
              <span>Since 2003 • Industry Leaders</span>
            </div>
            <h1 className="about-hero-title">
              Crafting Excellence in 
              <span className="gradient-text"> Aluminum Composites</span>
            </h1>
            <p className="about-hero-subtitle">
              Two decades of innovation, quality, and partnership in architectural materials. 
              Trusted by industry leaders worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Achievements Stats */}
      <section className="achievements-section">
        <div className="container">
          <div className="achievements-grid reveal fade-up">
            {achievements.map((achievement, index) => (
              <div key={index} className={`achievement-card delay-${index + 1}`}>
                <div className="achievement-icon">
                  {achievement.icon}
                </div>
                <div className="achievement-number">
                  <AnimatedCounter end={achievement.number} suffix={achievement.suffix} />
                </div>
                <div className="achievement-label">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        {/* Enhanced Intro Section */}
        <section className="about-intro reveal fade-left">
          <div className="about-intro-content">
            <div className="section-tag">Our Story</div>
            <h2 className="about-intro-title">
              Engineering the Future of 
              <span className="gradient-text">Architecture</span>
            </h2>
            <p className="about-intro-text">
              For over two decades, ALCOPON has stood at the forefront of aluminum composite 
              panel innovation. We've transformed from a local manufacturer into a global 
              leader, trusted by architects, contractors, and developers worldwide.
            </p>
            <p className="about-intro-text">
              Our philosophy centers on three fundamental pillars: <strong>uncompromising quality</strong>, 
              <strong>regulatory compliance</strong>, and <strong>responsive partnership</strong>. 
              Every project benefits from our meticulous planning around lead times, duty optimization, 
              and protective packaging.
            </p>
            <div className="about-intro-features">
              <div className="intro-feature">
                <HiCheckBadge />
                <span>Quality Certified Manufacturing</span>
              </div>
              <div className="intro-feature">
                <FaShieldAlt />
                <span>Global Safety Standards</span>
              </div>
              <div className="intro-feature">
                <FaRocket />
                <span>Continuous Innovation</span>
              </div>
            </div>
          </div>
          <div className="about-intro-media">
            <img
              src="https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=1300&auto=format&fit=crop"
              alt="ALCOPON modern manufacturing facility"
            />
            <div className="media-overlay">
              <div className="play-button">
                <FaPlay />
              </div>
              <span>Watch Our Story</span>
            </div>
          </div>
        </section>

        {/* Enhanced Values Section */}
        <section className="about-values reveal fade-up">
          <div className="section-header">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">
              The principles that guide every decision and drive our commitment to excellence
            </p>
          </div>
          <div className="values-grid stagger">
            {values.map((value, index) => (
              <div key={value.title} className={`value-card reveal zoom-in delay-${index + 1} ${value.color}`}>
                <div className="value-icon">
                  {value.icon}
                </div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.text}</p>
                <div className="card-shimmer"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Journey Timeline */}
        <section className="about-journey reveal fade-right">
          <div className="section-header">
            <h2 className="section-title">Our Journey</h2>
            <p className="section-subtitle">
              Milestones that shaped our evolution from startup to industry leader
            </p>
          </div>
          <div className="journey-timeline">
            {journey.map((milestone, index) => (
              <div key={milestone.year} className={`timeline-item reveal bounce-in delay-${index + 1}`}>
                <div className="timeline-dot">
                  <span className="timeline-year">{milestone.year}</span>
                </div>
                <div className="timeline-content">
                  <div className="timeline-milestone">{milestone.milestone}</div>
                  <h4 className="timeline-title">{milestone.title}</h4>
                  <p className="timeline-description">{milestone.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section className="certifications-section reveal fade-up">
          <div className="section-header">
            <h2 className="section-title">Certifications & Standards</h2>
            <p className="section-subtitle">
              Committed to the highest industry standards and regulatory compliance
            </p>
          </div>
          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <div key={cert.name} className={`certification-card delay-${index + 1}`}>
                <div className="cert-badge">
                  <FaAward />
                </div>
                <h4>{cert.name}</h4>
                <p>{cert.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Team Section */}
        <section className="about-team reveal fade-left">
          <div className="section-header">
            <h2 className="section-title">Leadership Team</h2>
            <p className="section-subtitle">
              Meet the visionaries driving ALCOPON's continued success and innovation
            </p>
          </div>
          <div className="team-grid stagger">
            {team.map((member, index) => (
              <div key={member.name} className={`team-card reveal zoom-in delay-${index + 1}`}>
                <div className="team-image">
                  <img src={member.img} alt={member.name} />
                  <div className="team-overlay">
                    <div className="team-social">
                      <a href={`mailto:${member.email}`} aria-label="Email">
                        <MdEmail />
                      </a>
                      <a href={member.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                        <FaLinkedinIn />
                      </a>
                      <a href={member.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                        <FaFacebookF />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="team-content">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Enhanced CTA Section */}
      <section className="about-cta-section">
        <div className="container">
          <div className="about-cta-content reveal fade-up">
            <h2 className="cta-title">Ready to Partner With Excellence?</h2>
            <p className="cta-subtitle">
              Join the growing list of architects, contractors, and developers who trust 
              ALCOPON for their most demanding projects. Let's create something extraordinary together.
            </p>
            <div className="cta-buttons">
              <a href="/contact" className="btn btn-primary">
                <span>Start a Project</span>
                <FaArrowRight />
              </a>
              <a href="/products" className="btn btn-ghost">
                <span>View Products</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </ main>
  );
}