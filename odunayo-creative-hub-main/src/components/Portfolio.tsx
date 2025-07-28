import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";


const Portfolio = () => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('order_index');
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  return (
    <section id="portfolio" className="py-20 px-4 relative overflow-hidden">
      {/* Beautiful 2D animated background for portfolio */}
      <div className="absolute inset-0 opacity-10">
        <div className="floating-particles"></div>
        <div className="absolute top-1/4 left-1/6 w-80 h-80 bg-primary rounded-full animate-float blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-accent-purple rounded-full animate-float blur-2xl" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-2/3 left-1/3 w-64 h-64 bg-accent-cyan rounded-full animate-float blur-xl" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/6 right-1/3 w-72 h-72 bg-accent-green rounded-full animate-float blur-2xl" style={{animationDelay: '3s'}}></div>
      </div>
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">My Work</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Here are some of the projects I've worked on. Each one represents a unique challenge 
            and showcases different aspects of my development skills.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="group overflow-hidden hover:scale-105 transition-all duration-300 shadow-card hover:shadow-glow animate-scale-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image_url || "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80"} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  {project.live_url && (
                    <Button size="sm" variant="secondary" asChild>
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {project.github_url && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge 
                      key={techIndex}
                      variant="secondary"
                      className="text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in-up">
          <Button variant="outline" size="lg" className="hover:scale-105 transition-transform">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;