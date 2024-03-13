import "./footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <h1 className="footer__title">Furaha Moses</h1>
        <ul className="footer__list">
          <li>
            <a href="#about" className="footer__link">
              About
            </a>
          </li>
          <li>
            <a href="#portfolio" className="footer__link">
              Projects
            </a>
          </li>
          <li>
            <a href="#home" className="footer__link">
              Home
            </a>
          </li>
        </ul>

        <div className="footer__social">
          <a
            href="https://www.linkedin.com/in/furaha-moses-a13917275/"
            className="footer__social-icon"
            target="_blank"
            rel="noreferrer"
          >
            <i className="bx bxl-linkedin"></i>
          </a>
          <a
            href="mailto:furahamoses41@gmail.com"
            className="footer__social-icon"
            target="_blank"
            rel="noreferrer"
          >
            <i className="bx bxs-envelope"></i>
          </a>

          <a
            href="https://github.com/Furaha123"
            className="footer__social-icon"
            target="_blank"
            rel="noreferrer"
          >
            <i className="bx bxl-github"></i>
          </a>
        </div>

        <span className="footer__copy">&#169; Furaha MOses 2023</span>
      </div>
    </footer>
  );
};

export default Footer;
