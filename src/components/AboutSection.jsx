import { Book, Code, Palette, GraduationCap } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      {" "}
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary">Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold flex items-center gap-2">
              I'm an aspiring web developer currently pursuing in studying at Tagoloan Community College.
            </h3>

            <p className="text-muted-foreground">
              I'm a passionate Information Technology student currently learning the foundations 
              of web development and software design. While I'm still at the beginning of my 
              journey, I'm excited to explore and grow in this ever-evolving tech industry.
            </p>

            <p className="text-muted-foreground">
              I enjoy learning new tools, solving small problems with code, and gradually 
              building projects that help sharpen my skills.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#contact" className="cosmic-button">
                Get In Touch
              </a>

              <a
                href="#projects"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                View My Work
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Web Development</h4>
                  <p className="text-muted-foreground">
                    Learning to build responsive websites and web applications using 
                    beginner-friendly frameworks like HTML, CSS, JavaScript, PHP, and Laravel.
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">UI/UX Design</h4>
                  <p className="text-muted-foreground">
                    Starting to understand how to design clean, user-friendly interfaces 
                    and improve the user experience in simple projects.
                  </p>
                </div>
              </div>
            </div>

            <div className="gradient-border p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Book className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-lg">Continuous Learning</h4>
                  <p className="text-muted-foreground">
                    Actively learning tools like Git, GitHub, and MySQL, and practicing 
                    version control and collaboration for real-world development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
