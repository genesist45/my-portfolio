import { ArrowRight, ExternalLink, Github } from "lucide-react";
import premioImg from "../assets/example.jpg";

const projects = [
  {
    id: 1,
    title: "Premio Registration System",
    description: "Online registration system for Premio Motorcycles & Parts Corporation. Features user-friendly dashboard for managing motorcycle applications and real-time status tracking.",
    image: premioImg,
    tags: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Calculator App",
    description: "testing...",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 400'%3E%3Crect width='300' height='400' fill='%23202124'/%3E%3Crect x='20' y='20' width='260' height='80' rx='8' fill='%23313337'/%3E%3Ctext x='250' y='70' font-family='monospace' font-size='32' fill='%23ffffff' text-anchor='end'%3E0%3C/text%3E%3Cg transform='translate(20, 120)'%3E%3Crect x='0' y='0' width='60' height='60' rx='4' fill='%23616161' /%3E%3Ctext x='30' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3EC%3C/text%3E%3Crect x='66' y='0' width='60' height='60' rx='4' fill='%23616161'/%3E%3Ctext x='96' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E±%3C/text%3E%3Crect x='132' y='0' width='60' height='60' rx='4' fill='%23616161'/%3E%3Ctext x='162' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E%25%3C/text%3E%3Crect x='198' y='0' width='60' height='60' rx='4' fill='%2347a647'/%3E%3Ctext x='228' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E÷%3C/text%3E%3C/g%3E%3Cg transform='translate(20, 186)'%3E%3Crect x='0' y='0' width='60' height='60' rx='4' fill='%23424242'/%3E%3Ctext x='30' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E7%3C/text%3E%3Crect x='66' y='0' width='60' height='60' rx='4' fill='%23424242'/%3E%3Ctext x='96' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E8%3C/text%3E%3Crect x='132' y='0' width='60' height='60' rx='4' fill='%23424242'/%3E%3Ctext x='162' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E9%3C/text%3E%3Crect x='198' y='0' width='60' height='60' rx='4' fill='%2347a647'/%3E%3Ctext x='228' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E×%3C/text%3E%3C/g%3E%3Cg transform='translate(20, 252)'%3E%3Crect x='0' y='0' width='60' height='60' rx='4' fill='%23424242'/%3E%3Ctext x='30' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E4%3C/text%3E%3Crect x='66' y='0' width='60' height='60' rx='4' fill='%23424242'/%3E%3Ctext x='96' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E5%3C/text%3E%3Crect x='132' y='0' width='60' height='60' rx='4' fill='%23424242'/%3E%3Ctext x='162' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E6%3C/text%3E%3Crect x='198' y='0' width='60' height='60' rx='4' fill='%2347a647'/%3E%3Ctext x='228' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E-%3C/text%3E%3C/g%3E%3Cg transform='translate(20, 318)'%3E%3Crect x='0' y='0' width='60' height='60' rx='4' fill='%23424242'/%3E%3Ctext x='30' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E1%3C/text%3E%3Crect x='66' y='0' width='60' height='60' rx='4' fill='%23424242'/%3E%3Ctext x='96' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E2%3C/text%3E%3Crect x='132' y='0' width='60' height='60' rx='4' fill='%23424242'/%3E%3Ctext x='162' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E3%3C/text%3E%3Crect x='198' y='0' width='60' height='60' rx='4' fill='%2347a647'/%3E%3Ctext x='228' y='38' font-family='sans-serif' font-size='24' fill='white' text-anchor='middle'%3E+%3C/text%3E%3C/g%3E%3C/svg%3E",
    tags: ["HTML", "CSS", "JavaScript"],
    demoUrl: "#",
    githubUrl: "#",
  }
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={`${project.id}-${tagIndex}`}
                      className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
