import { useState } from "react";
import { Menu, X, Home, BarChart3, Settings, Users, FileText, Plus, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Requests", href: "/requests", icon: FileText },
    { name: "Create Request", href: "/create-request", icon: Plus },
    { name: "Service Catalog", href: "/service-catalog", icon: Package },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Users", href: "/users", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  ServiceFlow
                </h1>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <SignedIn>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
                        active 
                          ? 'text-white bg-white/10' 
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </SignedIn>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <SignInButton>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Sign In
                </Button>
              </SignInButton>
              <Button className="btn-gradient">
                Get Started
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10"
                  }
                }}
              />
            </SignedIn>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white/10"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-card border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <SignedIn>
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center gap-2 ${
                      active 
                        ? 'text-white bg-white/10' 
                        : 'text-white/80 hover:text-white'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </SignedIn>
            <div className="pt-4 flex flex-col space-y-2">
              <SignedOut>
                <SignInButton>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    Sign In
                  </Button>
                </SignInButton>
                <Button className="btn-gradient">
                  Get Started
                </Button>
              </SignedOut>
              <SignedIn>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10"
                    }
                  }}
                />
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;