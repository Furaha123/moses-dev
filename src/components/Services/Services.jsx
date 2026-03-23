import { useState } from "react";
import "./services.css";

const Services = () => {
  const [toggleState, setToggleState] = useState(0);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <section className="services section" id="services">
      <h2 className="section__title">Services</h2>
      <span className="section__subtitle">What I Offer</span>

      <div className="services__container container grid">

        {/* Full Stack Development */}
        <div className="services__content">
          <div>
            <i className="uil uil-arrow services__icon"></i>
            <h3 className="services__title">
              Full Stack <br /> Developer
            </h3>
          </div>
          <button className="services__button" onClick={() => toggleTab(1)}>
            View More{" "}
            <i className="uil uil-arrow-right services__button-icon"></i>
          </button>
          <div className={toggleState === 1 ? "services__modal active-modal" : "services__modal"}>
            <div className="services__modal-content">
              <button className="uil uil-times services__modal-close" onClick={() => toggleTab(0)}></button>
              <h3 className="services__modal-title">Full Stack Developer</h3>
              <p className="services__modal-description">
                3+ years of experience building scalable web applications with Angular, React.js, Node.js, and NestJS.
              </p>
              <ul className="services__modal-services grid">
                <li className="services__modal-service">
                  <i className="uil uil-check-circle services__modal-icon"></i>
                  <p className="services__modal-info">Angular & React.js front-end development</p>
                </li>
                <li className="services__modal-service">
                  <i className="uil uil-check-circle services__modal-icon"></i>
                  <p className="services__modal-info">Node.js & NestJS backend APIs</p>
                </li>
                <li className="services__modal-service">
                  <i className="uil uil-check-circle services__modal-icon"></i>
                  <p className="services__modal-info">RESTful & GraphQL API design</p>
                </li>
                <li className="services__modal-service">
                  <i className="uil uil-check-circle services__modal-icon"></i>
                  <p className="services__modal-info">Microservices architecture</p>
                </li>
                <li className="services__modal-service">
                  <i className="uil uil-check-circle services__modal-icon"></i>
                  <p className="services__modal-info">PostgreSQL schema design & optimization</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cloud & DevOps */}
        <div className="services__content">
          <div>
            <i className="uil uil-cloud services__icon"></i>
            <h3 className="services__title">
              Cloud & <br /> DevOps
            </h3>
          </div>
          <button className="services__button" onClick={() => toggleTab(2)}>
            View More{" "}
            <i className="uil uil-arrow-right services__button-icon"></i>
          </button>
          <div className={toggleState === 2 ? "services__modal active-modal" : "services__modal"}>
            <div className="services__modal-content">
              <button className="uil uil-times services__modal-close" onClick={() => toggleTab(0)}></button>
              <h3 className="services__modal-title">Cloud & DevOps Engineer</h3>
              <p className="services__modal-description">
                AWS Certified Cloud Practitioner with hands-on experience in cloud infrastructure and CI/CD automation.
              </p>
              <ul className="services__modal-services grid">
                <li className="services__modal-service">
                  <i className="uil uil-check-circle services__modal-icon"></i>
                  <p className="services__modal-info">AWS (IAM, S3, Lambda, EC2, CloudWatch)</p>
                </li>
                <li className="services__modal-service">
                  <i className="uil uil-check-circle services__modal-icon"></i>
                  <p className="services__modal-info">Infrastructure as Code with Terraform</p>
                </li>
                <li className="services__modal-service">
                  <i className="uil uil-check-circle services__modal-icon"></i>
                  <p className="services__modal-info">CI/CD pipelines with Jenkins & GitHub</p>
                </li>
                <li className="services__modal-service">
                  <i className="uil uil-check-circle services__modal-icon"></i>
                  <p className="services__modal-info">Docker containerization</p>
                </li>
                <li className="services__modal-service">
                  <i className="uil uil-check-circle services__modal-icon"></i>
                  <p className="services__modal-info">Azure App Services & Firebase deployment</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Design */}
        <div className="services__content">
          <div>
            <i className="uil uil-web-grid services__icon"></i>
            <h3 className="services__title">
              Product <br /> Designer
            </h3>
          </div>
          <button className="services__button" onClick={() => toggleTab(3)}>
            View More{" "}
            <i className="uil uil-arrow-right services__button-icon"></i>
          </button>
          <div className={toggleState === 3 ? "services__modal active-modal" : "services__modal"}>
            <div className="services__modal-content">
              <button className="uil uil-times services__modal-close" onClick={() => toggleTab(0)}></button>
              <h3 className="services__modal-title">Product Designer</h3>
              <p className="services__modal-description">
                Designing intuitive user interfaces and digital products with a focus on user experience and brand consistency.
              </p>
              <ul className="services__modal-services grid">
                <li className="services__modal-service">
                  <i className="uil uil-check-circle services__modal-icon"></i>
                  <p className="services__modal-info">UI/UX design with Figma</p>
                </li>
                <li className="services__modal-service">
                  <i className="uil uil-check-circle services__modal-icon"></i>
                  <p className="services__modal-info">Responsive & pixel-perfect interfaces</p>
                </li>
                <li className="services__modal-service">
                  <i className="uil uil-check-circle services__modal-icon"></i>
                  <p className="services__modal-info">Design systems & component libraries</p>
                </li>
                <li className="services__modal-service">
                  <i className="uil uil-check-circle services__modal-icon"></i>
                  <p className="services__modal-info">Wireframing & product mockups</p>
                </li>
                <li className="services__modal-service">
                  <i className="uil uil-check-circle services__modal-icon"></i>
                  <p className="services__modal-info">Brand identity & UX interactions</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;
