import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Tailwind CSS"],
      color: "bg-blue-500/10 text-blue-400"
    },
    {
      title: "Backend Development", 
      skills: ["Node.js", "Express.js", "REST APIs", "Database Design"],
      color: "bg-green-500/10 text-green-400"
    },
    {
      title: "Tools & Technologies",
      skills: ["Git & GitHub", "VS Code", "npm/yarn", "Webpack", "Vite"],
      color: "bg-purple-500/10 text-purple-400"
    },
    {
      title: "Soft Skills",
      skills: ["Problem Solving", "Team Collaboration", "Project Management", "Communication"],
      color: "bg-orange-500/10 text-orange-400"
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-secondary/30 relative overflow-hidden">
      {/* Beautiful 2D animated background for skills */}
      <div className="absolute inset-0 opacity-15">
        <div className="floating-particles"></div>
        {/* Dynamic skill-themed animations */}
        <div className="absolute top-10 left-1/4 w-48 h-48 bg-blue-500 rounded-full animate-float blur-2xl" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-1/3 right-10 w-64 h-64 bg-green-500 rounded-full animate-float blur-3xl" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-10 w-56 h-56 bg-purple-500 rounded-full animate-float blur-2xl" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-orange-500 rounded-full animate-float blur-3xl" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-cyan-500 rounded-full animate-float blur-xl" style={{animationDelay: '1.5s'}}></div>
      </div>
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Skills & Expertise</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit of technologies and skills I use to build exceptional digital experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <Card 
              key={index}
              className="p-6 hover:scale-105 transition-all duration-300 shadow-card hover:shadow-glow animate-scale-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-primary">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <Badge 
                    key={skillIndex}
                    variant="secondary"
                    className={`${category.color} hover:scale-110 transition-transform cursor-pointer`}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in-up">
          <p className="text-lg text-muted-foreground">
            Always learning and expanding my skill set to stay current with industry trends.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;