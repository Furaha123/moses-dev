import Backend from "./Backend"
import CloudDevOps from "./CloudDevOps"
import "./skills.css"

const Skills = () => {
  return (
    <section className="skills section" id="skills">
        <h2 className="section__title">Skills</h2>
        <span className="section__subtitle">My Technical level</span>

        <div className="skills__container container grid">
            <Backend/>
            <CloudDevOps/>
        </div>
    </section>
  )
}

export default Skills
