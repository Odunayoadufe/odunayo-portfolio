import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram, Facebook, Youtube, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";


const Contact = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const socialIcons: Record<string, any> = {
    Github,
    Linkedin, 
    Twitter,
    Instagram,
    Facebook,
    Youtube,
    WhatsApp: MessageCircle,
    Email: MessageCircle
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch settings
      const { data: settingsData } = await supabase.from('admin_settings').select('*');
      const settingsMap = settingsData?.reduce((acc: any, item: any) => {
        acc[item.setting_key] = item.setting_value;
        return acc;
      }, {}) || {};
      setSettings(settingsMap);

      // Fetch social links
      const { data: socialData } = await supabase.from('social_media_links').select('*').eq('active', true).order('order_index');
      setSocialLinks(socialData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('contact_messages').insert([formData]);
      
      if (error) throw error;

      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });

      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: settings.contact_email || "odunayo.adufe@example.com",
      href: `mailto:${settings.contact_email || "odunayo.adufe@example.com"}`
    },
    {
      icon: Phone,
      title: "Phone",
      value: settings.contact_phone || "+234 xxx xxx xxxx",
      href: `tel:${settings.contact_phone || "+234xxxxxxxxx"}`
    },
    {
      icon: MapPin,
      title: "Location",
      value: settings.contact_location || "Lagos, Nigeria",
      href: "#"
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-secondary/30 relative overflow-hidden">
      {/* Beautiful 2D animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="floating-particles"></div>
        <div className="absolute top-10 left-10 w-96 h-96 bg-primary rounded-full animate-float blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent-purple rounded-full animate-float blur-2xl" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-cyan rounded-full animate-float blur-xl" style={{animationDelay: '4s'}}></div>
      </div>
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to start your next project? Let's work together to create something amazing.
            I'm always open to discussing new opportunities and interesting projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-card hover:shadow-glow transition-all duration-300 animate-scale-in">
            <CardHeader>
              <CardTitle className="text-2xl">Send Me a Message</CardTitle>
              <CardDescription>
                Fill out the form below and I'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    name="first_name"
                    placeholder="First Name" 
                    value={formData.first_name}
                    onChange={handleInputChange}
                    required
                  />
                  <Input 
                    name="last_name"
                    placeholder="Last Name" 
                    value={formData.last_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Input 
                  name="email"
                  placeholder="Email Address" 
                  type="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Input 
                  name="subject"
                  placeholder="Subject" 
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
                <Textarea 
                  name="message"
                  placeholder="Your Message" 
                  className="min-h-[120px]"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
                <Button 
                  type="submit"
                  className="w-full gradient-primary hover:scale-105 transition-transform"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8 animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <div>
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <a 
                        href={item.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6">Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = socialIcons[social.icon_name] || MessageCircle;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 hover:scale-110 transition-all duration-300"
                      aria-label={social.platform}
                    >
                      <IconComponent className="w-6 h-6 text-primary" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
              <h4 className="font-semibold mb-2">Let's Collaborate!</h4>
              <p className="text-muted-foreground">
                I'm always interested in new projects and opportunities. 
                Whether you need a website, web application, or just want to say hello, 
                don't hesitate to reach out.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;