import { useState } from "react";
import { projectsData, projectsNav } from "./Data";
import WorkItems from "./WorkItems";

const Works = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  const filtered =
    activeFilter === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  const totalPages = Math.ceil(filtered.length / projectsPerPage);
  const visibleProjects = filtered.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const handleFilter = (name) => {
    setActiveFilter(name);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="work__filters">
        {projectsNav.map((item, index) => (
          <span
            className={`work__item ${activeFilter === item.name ? "active-work" : ""}`}
            key={index}
            onClick={() => handleFilter(item.name)}
          >
            {item.name}
          </span>
        ))}
      </div>

      <div className="work__container container grid">
        {visibleProjects.map((item) => (
          <WorkItems item={item} key={item.id} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <span
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default Works;
