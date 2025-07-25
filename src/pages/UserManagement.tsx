import { useState } from "react";
import { Search, Filter, Plus, Edit, Trash2, UserCheck, UserX, Shield, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockUsers } from "@/lib/mockData";

const UserManagement = () => {
  const [users] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  const roles = [
    { value: "all", label: "All Roles", color: "bg-gray-500" },
    { value: "admin", label: "Admin", color: "bg-red-500" },
    { value: "agent", label: "Agent", color: "bg-blue-500" },
    { value: "user", label: "User", color: "bg-green-500" }
  ];

  const getRoleColor = (role: string) => {
    const roleConfig = roles.find(r => r.value === role);
    return roleConfig?.color || "bg-gray-500";
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    admins: users.filter(u => u.role === 'admin').length,
    agents: users.filter(u => u.role === 'agent').length,
    regularUsers: users.filter(u => u.role === 'user').length
  };

  const departments = [...new Set(users.map(u => u.department))];

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">User Management</h1>
              <p className="text-white/70">Manage users, roles, and permissions</p>
            </div>
            <Button className="btn-gradient">
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="glass-card p-6 hover-scale">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-black/70 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-black counter-animate">{userStats.total}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </Card>
          
          <Card className="glass-card p-6 hover-scale">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-black/70 text-sm">Active</p>
                <p className="text-2xl font-bold text-green-400 counter-animate">{userStats.active}</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-400" />
            </div>
          </Card>
          
          <Card className="glass-card p-6 hover-scale">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-black/70 text-sm">Admins</p>
                <p className="text-2xl font-bold text-red-400 counter-animate">{userStats.admins}</p>
              </div>
              <Shield className="w-8 h-8 text-red-400" />
            </div>
          </Card>
          
          <Card className="glass-card p-6 hover-scale">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-black/70 text-sm">Agents</p>
                <p className="text-2xl font-bold text-blue-400 counter-animate">{userStats.agents}</p>
              </div>
              <UserCheck className="w-8 h-8 text-blue-400" />
            </div>
          </Card>
          
          <Card className="glass-card p-6 hover-scale">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-black/70 text-sm">Users</p>
                <p className="text-2xl font-bold text-purple-400 counter-animate">{userStats.regularUsers}</p>
              </div>
              <Users className="w-8 h-8 text-purple-400" />
            </div>
          </Card>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/10 mb-8">
            <TabsTrigger value="users" className="text-black data-[state=active]:bg-primary">All Users</TabsTrigger>
            <TabsTrigger value="roles" className="text-black data-[state=active]:bg-primary">Roles & Permissions</TabsTrigger>
            <TabsTrigger value="departments" className="text-black data-[state=active]:bg-primary">Departments</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            {/* Search and Filters */}
            <Card className="glass-card p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/50 w-4 h-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-black placeholder:text-black/50"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="bg-white/10 border border-white/20 text-black rounded-md px-3 py-2"
                  >
                    {roles.map((role) => (
                      <option key={role.value} value={role.value} className="bg-slate-800">
                        {role.label}
                      </option>
                    ))}
                  </select>
                  <Button variant="outline" className="border-white/30 text-black hover:bg-white/10">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Users Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user, index) => (
                <Card
                  key={user.id}
                  className="glass-card p-6 hover-scale slide-in-right"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-black">{user.name}</h3>
                        <p className="text-black/70 text-sm">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="text-black hover:bg-white/10">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-black hover:bg-white/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-black/70 text-sm">Role</span>
                      <Badge className={`text-black ${getRoleColor(user.role)} capitalize`}>
                        {user.role}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-black/70 text-sm">Department</span>
                      <span className="text-black text-sm">{user.department}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-black/70 text-sm">Status</span>
                      <div className="flex items-center gap-2">
                        {user.status === 'active' ? (
                          <UserCheck className="w-4 h-4 text-green-400" />
                        ) : (
                          <UserX className="w-4 h-4 text-red-400" />
                        )}
                        <span className={`text-sm ${user.status === 'active' ? 'text-green-400' : 'text-red-400'}`}>
                          {user.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <Button variant="outline" className="w-full border-white/30 text-black hover:bg-white/10">
                      View Profile
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="roles">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {roles.slice(1).map((role, index) => (
                <Card
                  key={role.value}
                  className="glass-card p-6 slide-in-right"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 ${role.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Shield className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-xl font-semibold text-black mb-2">{role.label}</h3>
                    <p className="text-black/70 text-sm">
                      {role.value === 'admin' && 'Full system access and user management'}
                      {role.value === 'agent' && 'Handle requests and manage tickets'}
                      {role.value === 'user' && 'Submit and track service requests'}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-black">Permissions</h4>
                    <div className="space-y-2">
                      {role.value === 'admin' && [
                        'User Management',
                        'System Configuration',
                        'Analytics Access',
                        'Report Generation'
                      ].map((permission) => (
                        <div key={permission} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full" />
                          <span className="text-black/80 text-sm">{permission}</span>
                        </div>
                      ))}
                      
                      {role.value === 'agent' && [
                        'Request Management',
                        'Ticket Assignment',
                        'Customer Communication',
                        'Basic Reporting'
                      ].map((permission) => (
                        <div key={permission} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full" />
                          <span className="text-black/80 text-sm">{permission}</span>
                        </div>
                      ))}
                      
                      {role.value === 'user' && [
                        'Submit Requests',
                        'Track Progress',
                        'Upload Attachments',
                        'View History'
                      ].map((permission) => (
                        <div key={permission} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full" />
                          <span className="text-black/80 text-sm">{permission}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-black/70 text-sm">Users with this role</span>
                      <span className="text-black font-medium">
                        {users.filter(u => u.role === role.value).length}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="departments">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((department, index) => {
                const deptUsers = users.filter(u => u.department === department);
                return (
                  <Card
                    key={department}
                    className="glass-card p-6 hover-scale slide-in-right"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-black">{department}</h3>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-black/70 text-sm">Total Users</span>
                        <span className="text-black font-medium">{deptUsers.length}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-black/70 text-sm">Active</span>
                        <span className="text-green-400 font-medium">
                          {deptUsers.filter(u => u.status === 'active').length}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-black/70 text-sm">Admins</span>
                        <span className="text-red-400 font-medium">
                          {deptUsers.filter(u => u.role === 'admin').length}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-black/70 text-sm">Agents</span>
                        <span className="text-blue-400 font-medium">
                          {deptUsers.filter(u => u.role === 'agent').length}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10">
                      <Button variant="outline" className="w-full border-white/30 text-black hover:bg-white/10">
                        Manage Department
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserManagement;
