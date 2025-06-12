import { useEffect, useRef, useState } from "react";
import './ThreeDotsDropdown.css';

type SectionItem = {
  label?: React.ReactNode;
  className?: string;
  items: (Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'children'> & {
    label: React.ReactNode;
  })[];
}

const ThreeDotsDropdown = ({ sections }: { sections: SectionItem[] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="mobile-header__menu" ref={menuRef}>
      <button 
        className="mobile-header__menu-button"
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <div className="mobile-header__dots">
          <span className="mobile-header__dot"></span>
          <span className="mobile-header__dot"></span>
          <span className="mobile-header__dot"></span>
        </div>
      </button>
      
      {isMenuOpen && (
        <div className="mobile-header__dropdown">
          {/* User Section */}
          {sections.map((section, index) => (
            <div className={`${section.className ?? ''} mobile-header__section`} key={index}>
              {section.label && <div className="mobile-header__section-title">{section.label}</div>}
              {section.items.map(({ label, onClick, className, ...item }, index) => (
                <button
                  key={index}
                  className={`${className ?? ''} mobile-header__dropdown-item`}
                  onClick={e => {
                    onClick?.(e);
                    setIsMenuOpen(false);
                  }}
                  {...item}
                >
                  {label}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThreeDotsDropdown;