import { useState } from "react";
import { Search, Filter, Star, Clock, TrendingUp, Monitor, Key, Download, Wifi, Mail, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockServiceCatalog } from "@/lib/mockData";

const ServiceCatalog = () => {
  const [services] = useState(mockServiceCatalog);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  

  const categories = [
    { value: "all", label: "All Services" },
    { value: "Account Access", label: "Account Access" },
    { value: "Software", label: "Software" },
    { value: "Hardware", label: "Hardware" },
    { value: "Network", label: "Network" },
    { value: "Email", label: "Email" },
    { value: "Training", label: "Training" }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Key': return <Key className="w-6 h-6" />;
      case 'Download': return <Download className="w-6 h-6" />;
      case 'Monitor': return <Monitor className="w-6 h-6" />;
      case 'Wifi': return <Wifi className="w-6 h-6" />;
      case 'Mail': return <Mail className="w-6 h-6" />;
      case 'Shield': return <Shield className="w-6 h-6" />;
      default: return <Star className="w-6 h-6" />;
    }
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    return matchesSearch && matchesCategory && service.isActive;
  });

  const popularServices = services
    .filter(service => service.isActive)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 3);

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Service Catalog</h1>
          <p className="text-white/70">Browse and request IT services</p>
        </div>

        {/* Search and Filters */}
        <Card className="glass-card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white/10 border border-white/20 text-white rounded-md px-3 py-2"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value} className="bg-slate-800">
                    {category.label}
                  </option>
                ))}
              </select>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/10 mb-8">
            <TabsTrigger value="all" className="text-white data-[state=active]:bg-primary">All Services</TabsTrigger>
            <TabsTrigger value="popular" className="text-white data-[state=active]:bg-primary">Popular</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service, index) => (
                <Card
                  key={service.id}
                  className="glass-card p-6 hover-scale group cursor-pointer slide-in-right"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-primary/20 rounded-lg text-primary">
                      {getIcon(service.icon)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white/70 text-sm">{service.popularity}%</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-white/70 text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="border-white/30 text-white">
                      {service.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-white/70 text-sm">
                      <Clock className="w-4 h-4" />
                      {service.estimatedTime}
                    </div>
                  </div>

                  <Button className="w-full btn-gradient group-hover:scale-105 transition-transform">
                    Request Service
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="popular">
            {/* Popular Services */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-white">Most Requested Services</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {popularServices.map((service, index) => (
                  <Card
                    key={service.id}
                    className="glass-card p-6 hover-scale group cursor-pointer slide-in-right"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="text-center">
                      <div className="p-4 bg-primary/20 rounded-full text-primary mx-auto mb-4 w-fit">
                        {getIcon(service.icon)}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {service.name}
                      </h3>
                      <p className="text-white/70 mb-4">
                        {service.description}
                      </p>
                      
                      <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-white font-semibold">{service.popularity}%</span>
                          </div>
                          <span className="text-white/50 text-xs">Popularity</span>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Clock className="w-4 h-4 text-blue-400" />
                            <span className="text-white font-semibold">{service.estimatedTime}</span>
                          </div>
                          <span className="text-white/50 text-xs">Est. Time</span>
                        </div>
                      </div>

                      <Button className="w-full btn-gradient group-hover:scale-105 transition-transform">
                        Request Now
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Service Categories Overview */}
              <Card className="glass-card p-6 mt-8">
                <h3 className="text-xl font-semibold text-white mb-6">Service Categories</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories.slice(1).map((category, index) => {
                    const categoryCount = services.filter(s => s.category === category.value && s.isActive).length;
                    return (
                      <div
                        key={category.value}
                        className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer slide-in-right"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <h4 className="font-medium text-white mb-2">{category.label}</h4>
                        <p className="text-white/70 text-sm">{categoryCount} services</p>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ServiceCatalog;
