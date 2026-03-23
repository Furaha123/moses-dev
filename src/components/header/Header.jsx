import { useState, useEffect } from "react";
import "./header.css";

const navLinks = [
  { href: "#home",      label: "Home",       icon: "uil-estate",       id: "home" },
  { href: "#about",     label: "About",      icon: "uil-user",         id: "about" },
  { href: "#skills",    label: "Skills",     icon: "uil-user",         id: "skills" },
  { href: "#services",  label: "Services",   icon: "uil-briefcase-alt",id: "services" },
  { href: "#portfolio", label: "Portfolio",  icon: "uil-scenery",      id: "portfolio" },
  { href: "#contact",   label: "Contact Me", icon: "uil-message",      id: "contact" },
  { href: "#comments",  label: "Comments",   icon: "uil-comment-alt",  id: "comments" },
];

const Header = () => {
  const [Toggle, showMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [darkTheme, setDarkTheme] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkTheme) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  }, [darkTheme]);

  useEffect(() => {
    const observers = [];
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header className="header">
      <nav className="nav container">
        <a href="#home" className="nav__logo">Moses Furaha</a>

        {Toggle && <div className="nav__overlay" onClick={() => showMenu(false)}></div>}

        <div className={Toggle ? "nav__menu show-menu" : "nav__menu"}>
          <ul className="nav__list grid">
            {navLinks.map(({ href, label, icon, id }) => (
              <li className="nav__item" key={id}>
                <a
                  href={href}
                  className={`nav__link ${activeSection === id ? "active-link" : ""}`}
                  onClick={() => showMenu(false)}
                >
                  <i className={`uil ${icon} nav__icon`}></i> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav__dark">
          <i
            className={darkTheme ? "uil uil-sun change-theme" : "uil uil-moon change-theme"}
            onClick={() => setDarkTheme(!darkTheme)}
          ></i>
        </div>

        <div className="nav__toggle" onClick={() => showMenu(!Toggle)}>
          <i className={Toggle ? "uil uil-times" : "uil uil-bars"}></i>
        </div>
      </nav>
    </header>
  );
};

export default Header;
