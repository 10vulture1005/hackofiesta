"use client";
import { useState, useEffect } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount with a small delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { name: "Menu", link: "#menu" },
    { name: "About Us", link: "#about" },
    { name: "Sponsor", link: "#sponsor" },
    { name: "Team", link: "#team" },
    { name: "Gallery", link: "#gallery" },
  ];

  return (
    <>
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .header-animate {
          animation: fadeInDown 0.6s ease-out;
        }

        .logo-animate {
          animation: slideIn 0.8s ease-out;
        }

        .nav-item-animate {
          animation: fadeInDown 0.6s ease-out backwards;
        }

        .mobile-nav-item {
          animation: slideIn 0.4s ease-out backwards;
        }

        .hover-block {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-block-active {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>

      <header
        className={`absolute top-0 left-0 right-0 z-50 bg-linear-to-b from-black/50 to-transparent backdrop-blur-sm ${
          isVisible ? "header-animate" : "opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a
              href="#"
              className={`text-2xl md:text-3xl font-bold text-white tracking-tight hover:scale-105 transition-transform duration-300 ${
                isVisible ? "logo-animate" : ""
              }`}
            >
              HACKOFIESTA
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item, idx) => (
                <a
                  key={`nav-${idx}`}
                  href={item.link}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative text-white/90 hover:text-white font-medium py-2 px-4 nav-item-animate"
                  style={{
                    animationDelay: `${0.2 + idx * 0.1}s`,
                  }}
                >
                  <span className="relative z-10 transition-all duration-300">
                    {item.name}
                  </span>
                  <span
                    className={`absolute inset-0 bg-white/20 rounded-lg hover-block ${
                      hoveredIndex === idx
                        ? "scale-100 opacity-100"
                        : "scale-75 opacity-0"
                    }`}
                  />
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-md transition-all duration-200 hover:scale-110 active:scale-95"
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${
                  isMobileMenuOpen ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              isMobileMenuOpen
                ? "max-h-96 opacity-100 mt-4"
                : "max-h-0 opacity-0"
            }`}
          >
            <nav className="flex flex-col space-y-4 py-4 bg-black/30 backdrop-blur-md rounded-lg px-4">
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-nav-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-white/90 hover:text-white font-medium py-2 hover:pl-4 transition-all duration-300 border-l-2 border-transparent hover:border-white ${
                    isMobileMenuOpen ? "mobile-nav-item" : ""
                  }`}
                  style={{
                    animationDelay: `${idx * 0.1}s`,
                  }}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
