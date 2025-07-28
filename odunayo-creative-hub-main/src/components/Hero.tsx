import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Hero = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data } = await supabase.from('admin_settings').select('*');
      const settingsMap = data?.reduce((acc: any, item: any) => {
        acc[item.setting_key] = item.setting_value;
        return acc;
      }, {}) || {};
      setSettings(settingsMap);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleDownloadCV = () => {
    if (settings.cv_download_url) {
      window.open(settings.cv_download_url, '_blank');
    }
  };

  const handleGetInTouch = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center gradient-hero relative overflow-hidden">
      {/* Enhanced floating particles and orbs */}
      <div className="floating-particles"></div>
      
      {/* Dynamic floating orbs with gradient backgrounds */}
      <div className="floating-orb w-80 h-80 top-20 left-10"></div>
      <div className="floating-orb w-96 h-96 top-40 right-20"></div>
      <div className="floating-orb w-64 h-64 bottom-32 left-1/3"></div>
      <div className="floating-orb w-72 h-72 top-1/4 right-1/3"></div>
      <div className="floating-orb w-56 h-56 bottom-20 right-10"></div>
      
      {/* Additional particle effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-2 h-2 bg-primary rounded-full animate-float"></div>
        <div className="absolute top-20 right-40 w-1 h-1 bg-accent-purple rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-accent-cyan rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-60 right-20 w-2 h-2 bg-accent-green rounded-full animate-float" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-primary rounded-full animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="text-center animate-fade-in-up">
          {/* Profile Picture */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <img
                src="/lovable-uploads/ea314607-b0b3-4a75-b176-25df43b3471e.png"
                alt={settings.hero_title || "Odunayo Adufe"}
                className="w-48 h-48 rounded-full object-cover object-top border-4 border-primary shadow-glow animate-pulse-glow"
                style={{ objectPosition: "center 20%" }}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 animate-pulse"></div>
            </div>
          </div>

          {/* Main Content */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animated-text">
            {settings.hero_title || "Odunayo Adufe"}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            {settings.hero_subtitle || "Full-Stack Developer & UI/UX Designer"}
          </p>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {settings.hero_description || "Crafting exceptional digital experiences with modern technologies. Specialized in React, TypeScript, and scalable web applications."}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="gradient-primary hover:scale-105 transition-transform" onClick={handleGetInTouch}>
              <Mail className="w-5 h-5 mr-2" />
              Get In Touch
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="hover:scale-105 transition-transform"
              onClick={handleDownloadCV}
              disabled={!settings.cv_download_url}
            >
              <Download className="w-5 h-5 mr-2" />
              Download CV
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <ArrowDown className="w-8 h-8 mx-auto text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;