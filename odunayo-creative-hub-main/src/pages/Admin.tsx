import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus, Eye, ExternalLink, Github, Linkedin, Twitter, Instagram, Facebook, Youtube, MessageCircle, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authKey, setAuthKey] = useState('');
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [editingSkill, setEditingSkill] = useState<any>(null);
  const [editingSocial, setEditingSocial] = useState<any>(null);
  const { toast } = useToast();

  const ADMIN_KEY = "Ayomide2006l";

  useEffect(() => {
    const savedAuth = localStorage.getItem('admin_authenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const socialIcons = {
    Github: Github,
    Linkedin: Linkedin,
    Twitter: Twitter,
    Instagram: Instagram,
    Facebook: Facebook,
    Youtube: Youtube,
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

      // Fetch projects
      const { data: projectsData } = await supabase.from('portfolio_projects').select('*').order('order_index');
      setProjects(projectsData || []);

      // Fetch skills
      const { data: skillsData } = await supabase.from('skills').select('*').order('order_index');
      setSkills(skillsData || []);

      // Fetch social links
      const { data: socialData } = await supabase.from('social_media_links').select('*').order('order_index');
      setSocialLinks(socialData || []);

      // Fetch messages
      const { data: messagesData } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
      setMessages(messagesData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const updateSetting = async (key: string, value: string) => {
    try {
      await supabase.from('admin_settings').upsert({ setting_key: key, setting_value: value });
      setSettings(prev => ({ ...prev, [key]: value }));
      toast({ title: "Setting updated successfully" });
    } catch (error) {
      toast({ title: "Error updating setting", variant: "destructive" });
    }
  };

  const saveProject = async (project: any) => {
    try {
      if (project.id) {
        await supabase.from('portfolio_projects').update(project).eq('id', project.id);
      } else {
        await supabase.from('portfolio_projects').insert(project);
      }
      setEditingProject(null);
      fetchData();
      toast({ title: "Project saved successfully" });
    } catch (error) {
      toast({ title: "Error saving project", variant: "destructive" });
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await supabase.from('portfolio_projects').delete().eq('id', id);
      fetchData();
      toast({ title: "Project deleted successfully" });
    } catch (error) {
      toast({ title: "Error deleting project", variant: "destructive" });
    }
  };

  const saveSkill = async (skill: any) => {
    try {
      if (skill.id) {
        await supabase.from('skills').update(skill).eq('id', skill.id);
      } else {
        await supabase.from('skills').insert(skill);
      }
      setEditingSkill(null);
      fetchData();
      toast({ title: "Skill saved successfully" });
    } catch (error) {
      toast({ title: "Error saving skill", variant: "destructive" });
    }
  };

  const deleteSkill = async (id: string) => {
    try {
      await supabase.from('skills').delete().eq('id', id);
      fetchData();
      toast({ title: "Skill deleted successfully" });
    } catch (error) {
      toast({ title: "Error deleting skill", variant: "destructive" });
    }
  };

  const saveSocialLink = async (social: any) => {
    try {
      if (social.id) {
        await supabase.from('social_media_links').update(social).eq('id', social.id);
      } else {
        await supabase.from('social_media_links').insert(social);
      }
      setEditingSocial(null);
      fetchData();
      toast({ title: "Social link saved successfully" });
    } catch (error) {
      toast({ title: "Error saving social link", variant: "destructive" });
    }
  };

  const deleteSocialLink = async (id: string) => {
    try {
      await supabase.from('social_media_links').delete().eq('id', id);
      fetchData();
      toast({ title: "Social link deleted successfully" });
    } catch (error) {
      toast({ title: "Error deleting social link", variant: "destructive" });
    }
  };

  const markMessageAsRead = async (id: string) => {
    try {
      await supabase.from('contact_messages').update({ read: true }).eq('id', id);
      fetchData();
    } catch (error) {
      toast({ title: "Error updating message", variant: "destructive" });
    }
  };

  const handleLogin = () => {
    if (authKey === ADMIN_KEY) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
      setAuthKey('');
      toast({ title: "Access granted!" });
    } else {
      toast({ title: "Invalid access key", variant: "destructive" });
      setAuthKey('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
    toast({ title: "Logged out successfully" });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Admin Access Required</CardTitle>
            <CardDescription>Enter the access key to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Enter access key"
              value={authKey}
              onChange={(e) => setAuthKey(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <Button onClick={handleLogin} className="w-full">
              Access Admin Panel
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Panel</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
        
        <Tabs defaultValue="settings" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Update your portfolio information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Contact Email</label>
                  <Input
                    value={settings.contact_email || ''}
                    onChange={(e) => updateSetting('contact_email', e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <Input
                    value={settings.contact_phone || ''}
                    onChange={(e) => updateSetting('contact_phone', e.target.value)}
                    placeholder="+234 xxx xxx xxxx"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <Input
                    value={settings.contact_location || ''}
                    onChange={(e) => updateSetting('contact_location', e.target.value)}
                    placeholder="Lagos, Nigeria"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CV Download URL</label>
                  <Input
                    value={settings.cv_download_url || ''}
                    onChange={(e) => updateSetting('cv_download_url', e.target.value)}
                    placeholder="https://example.com/cv.pdf"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Hero Title</label>
                  <Input
                    value={settings.hero_title || ''}
                    onChange={(e) => updateSetting('hero_title', e.target.value)}
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Hero Subtitle</label>
                  <Input
                    value={settings.hero_subtitle || ''}
                    onChange={(e) => updateSetting('hero_subtitle', e.target.value)}
                    placeholder="Your Title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Hero Description</label>
                  <Textarea
                    value={settings.hero_description || ''}
                    onChange={(e) => updateSetting('hero_description', e.target.value)}
                    placeholder="Brief description about yourself"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Portfolio Projects</h2>
              <Button onClick={() => setEditingProject({})}>
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>

            {editingProject && (
              <Card>
                <CardHeader>
                  <CardTitle>{editingProject.id ? 'Edit Project' : 'Add New Project'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Project Title"
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                  />
                  <Textarea
                    placeholder="Project Description"
                    value={editingProject.description || ''}
                    onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                  />
                  <Input
                    placeholder="Image URL"
                    value={editingProject.image_url || ''}
                    onChange={(e) => setEditingProject({...editingProject, image_url: e.target.value})}
                  />
                  <Input
                    placeholder="Live URL"
                    value={editingProject.live_url || ''}
                    onChange={(e) => setEditingProject({...editingProject, live_url: e.target.value})}
                  />
                  <Input
                    placeholder="GitHub URL"
                    value={editingProject.github_url || ''}
                    onChange={(e) => setEditingProject({...editingProject, github_url: e.target.value})}
                  />
                  <Input
                    placeholder="Technologies (comma separated)"
                    value={editingProject.technologies?.join(', ') || ''}
                    onChange={(e) => setEditingProject({...editingProject, technologies: e.target.value.split(', ')})}
                  />
                  <div className="flex gap-2">
                    <Button onClick={() => saveProject(editingProject)}>Save</Button>
                    <Button variant="outline" onClick={() => setEditingProject(null)}>Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  {project.image_url && (
                    <img src={project.image_url} alt={project.title} className="w-full h-48 object-cover" />
                  )}
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies?.map((tech: string, index: number) => (
                        <Badge key={index} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => setEditingProject(project)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteProject(project.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      {project.live_url && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Skills</h2>
              <Button onClick={() => setEditingSkill({})}>
                <Plus className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
            </div>

            {editingSkill && (
              <Card>
                <CardHeader>
                  <CardTitle>{editingSkill.id ? 'Edit Skill' : 'Add New Skill'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Skill Name"
                    value={editingSkill.name || ''}
                    onChange={(e) => setEditingSkill({...editingSkill, name: e.target.value})}
                  />
                  <Input
                    placeholder="Icon Name (Lucide icon)"
                    value={editingSkill.icon_name || ''}
                    onChange={(e) => setEditingSkill({...editingSkill, icon_name: e.target.value})}
                  />
                  <Input
                    type="number"
                    placeholder="Proficiency (1-100)"
                    value={editingSkill.proficiency || ''}
                    onChange={(e) => setEditingSkill({...editingSkill, proficiency: parseInt(e.target.value)})}
                  />
                  <Input
                    placeholder="Category"
                    value={editingSkill.category || ''}
                    onChange={(e) => setEditingSkill({...editingSkill, category: e.target.value})}
                  />
                  <div className="flex gap-2">
                    <Button onClick={() => saveSkill(editingSkill)}>Save</Button>
                    <Button variant="outline" onClick={() => setEditingSkill(null)}>Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.map((skill) => (
                <Card key={skill.id}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{skill.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">Proficiency: {skill.proficiency}%</p>
                    <p className="text-sm text-muted-foreground mb-4">Category: {skill.category}</p>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => setEditingSkill(skill)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteSkill(skill.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Social Media Tab */}
          <TabsContent value="social" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Social Media Links</h2>
              <Button onClick={() => setEditingSocial({})}>
                <Plus className="w-4 h-4 mr-2" />
                Add Social Link
              </Button>
            </div>

            {editingSocial && (
              <Card>
                <CardHeader>
                  <CardTitle>{editingSocial.id ? 'Edit Social Link' : 'Add New Social Link'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Platform</label>
                    <select
                      className="w-full p-2 border rounded"
                      value={editingSocial.platform || ''}
                      onChange={(e) => setEditingSocial({...editingSocial, platform: e.target.value, icon_name: e.target.value})}
                    >
                      <option value="">Select Platform</option>
                      {Object.keys(socialIcons).map((platform) => (
                        <option key={platform} value={platform}>{platform}</option>
                      ))}
                    </select>
                  </div>
                  <Input
                    placeholder="URL"
                    value={editingSocial.url || ''}
                    onChange={(e) => setEditingSocial({...editingSocial, url: e.target.value})}
                  />
                  <div className="flex gap-2">
                    <Button onClick={() => saveSocialLink(editingSocial)}>Save</Button>
                    <Button variant="outline" onClick={() => setEditingSocial(null)}>Cancel</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {socialLinks.map((social) => {
                const IconComponent = socialIcons[social.icon_name as keyof typeof socialIcons];
                return (
                  <Card key={social.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {IconComponent && <IconComponent className="w-5 h-5" />}
                        <h3 className="font-semibold">{social.platform}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 truncate">{social.url}</p>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => setEditingSocial(social)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteSocialLink(social.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <h2 className="text-2xl font-bold">Contact Messages</h2>
            <div className="space-y-4">
              {messages.map((message) => (
                <Card key={message.id} className={message.read ? 'opacity-75' : ''}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{message.first_name} {message.last_name}</h3>
                      <div className="flex gap-2">
                        {!message.read && (
                          <Button size="sm" onClick={() => markMessageAsRead(message.id)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                        )}
                        <Badge variant={message.read ? 'secondary' : 'default'}>
                          {message.read ? 'Read' : 'Unread'}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{message.email}</p>
                    <p className="text-sm font-medium mb-2">{message.subject}</p>
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(message.created_at).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;