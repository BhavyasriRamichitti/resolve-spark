import { useState } from "react";
import { BarChart3, Clock, CheckCircle, AlertTriangle, Users, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockServiceRequests, mockAnalyticsData, getStatusColor, getPriorityColor } from "@/lib/mockData";

const Dashboard = () => {
  const [requests] = useState(mockServiceRequests);
  
  const stats = {
    total: requests.length,
    open: requests.filter(r => r.status === 'open').length,
    inProgress: requests.filter(r => r.status === 'in_progress').length,
    resolved: requests.filter(r => r.status === 'resolved').length,
    critical: requests.filter(r => r.priority === 'critical').length
  };

  const recentRequests = requests.slice(0, 5);

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-white/70">Monitor and manage service requests</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="glass-card p-6 hover-scale">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-black/70 text-sm">Total Requests</p>
                <p className="text-2xl font-bold text-black counter-animate">{stats.total}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
          </Card>
          
          <Card className="glass-card p-6 hover-scale">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-black/70 text-sm">Open</p>
                <p className="text-2xl font-bold text-blue-400 counter-animate">{stats.open}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-400" />
            </div>
          </Card>
          
          <Card className="glass-card p-6 hover-scale">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-black/70 text-sm">In Progress</p>
                <p className="text-2xl font-bold text-yellow-400 counter-animate">{stats.inProgress}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-400" />
            </div>
          </Card>
          
          <Card className="glass-card p-6 hover-scale">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-black/70 text-sm">Resolved</p>
                <p className="text-2xl font-bold text-green-400 counter-animate">{stats.resolved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </Card>
          
          <Card className="glass-card p-6 hover-scale">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-black/70 text-sm">Critical</p>
                <p className="text-2xl font-bold text-red-400 counter-animate">{stats.critical}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
          </Card>
          
          <Card className="glass-card p-6 hover-scale">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-black/70 text-sm">Team Size</p>
                <p className="text-2xl font-bold text-purple-400 counter-animate">12</p>
              </div>
              <Users className="w-8 h-8 text-purple-400" />
            </div>
          </Card>
        </div>

        {/* Recent Requests */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-black">Recent Requests</h2>
              <Button variant="outline" className="border-white/30 text-black hover:bg-white/10">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentRequests.map((request, index) => (
                <div 
                  key={request.id} 
                  className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 slide-in-right"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-black mb-1">{request.title}</h3>
                      <p className="text-black/70 text-sm mb-2">{request.description}</p>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs text-black ${getPriorityColor(request.priority)}`}>
                          {request.priority}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs text-black ${getStatusColor(request.status)}`}>
                          {request.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-black/70 text-xs">Assigned to</p>
                      <p className="text-black text-sm font-medium">{request.assignedTo}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="glass-card p-6">
            <h2 className="text-xl font-semibold text-black mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Button className="btn-gradient h-20 flex-col gap-2">
                <Clock className="w-6 h-6" />
                New Request
              </Button>
              <Button variant="outline" className="border-white/30 text-black hover:bg-white/10 h-20 flex-col gap-2">
                <BarChart3 className="w-6 h-6" />
                Analytics
              </Button>
              <Button variant="outline" className="border-white/30 text-black hover:bg-white/10 h-20 flex-col gap-2">
                <Users className="w-6 h-6" />
                Users
              </Button>
              <Button variant="outline" className="border-white/30 text-black hover:bg-white/10 h-20 flex-col gap-2">
                <CheckCircle className="w-6 h-6" />
                Catalog
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
