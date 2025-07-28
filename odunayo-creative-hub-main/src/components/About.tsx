import { Card } from "@/components/ui/card";
import { Code2, Palette, Rocket, Users } from "lucide-react";


const About = () => {
  const highlights = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and efficient code following best practices."
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Creating beautiful, intuitive interfaces that users love to interact with."
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Optimizing applications for speed, responsiveness, and excellent user experience."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working effectively with teams and communicating technical concepts clearly."
    }
  ];

  return (
    <section id="about" className="py-20 px-4 relative overflow-hidden">
      {/* Beautiful 2D animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="floating-particles"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full animate-float blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-purple rounded-full animate-float blur-2xl" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-accent-cyan rounded-full animate-float blur-xl" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-accent-green rounded-full animate-float blur-2xl" style={{animationDelay: '2s'}}></div>
      </div>
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm a passionate full-stack developer with a keen eye for design and a love for creating 
            digital solutions that make a difference. With expertise in modern web technologies, 
            I bring ideas to life through code.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((item, index) => (
            <Card 
              key={index} 
              className="p-6 text-center hover:scale-105 transition-all duration-300 shadow-card hover:shadow-glow animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <item.icon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-in-up">
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
            or sharing knowledge with the developer community. I believe in continuous learning and staying 
            updated with the latest industry trends to deliver cutting-edge solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;