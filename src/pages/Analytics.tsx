import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, Users, Clock, Download, Calendar } from "lucide-react";
import { mockAnalyticsData } from "@/lib/mockData";

const Analytics = () => {
  const { requestsByStatus, requestsByPriority, monthlyTrends, teamPerformance } = mockAnalyticsData;

  const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
    <Card className="glass-card p-6 hover-scale">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-black text-sm mb-1">{title}</p>
          <p className="text-2xl font-bold text-black counter-animate">{value}</p>
          {change && (
            <p className={`text-sm flex items-center gap-1 mt-1 ${
              change > 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              <TrendingUp className="w-3 h-3" />
              {change > 0 ? '+' : ''}{change}%
            </p>
          )}
        </div>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
    </Card>
  );

  const ChartCard = ({ title, children, description }: any) => (
    <Card className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-black">{title}</h3>
          {description && <p className="text-black/70 text-sm">{description}</p>}
        </div>
        <Button variant="outline" size="sm" className="border-white/30 text-black hover:bg-white/10">
          <Download className="w-4 h-4" />
        </Button>
      </div>
      {children}
    </Card>
  );

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-black mb-2">Analytics & Reports</h1>
              <p className="text-black/70">Monitor service request performance and trends</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-white/30 text-black hover:bg-white/10">
                <Calendar className="w-4 h-4 mr-2" />
                Last 30 Days
              </Button>
              <Button className="btn-gradient">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Requests"
            value="847"
            change={12}
            icon={BarChart3}
            color="text-primary"
          />
          <StatCard
            title="Resolution Rate"
            value="94.2%"
            change={2.1}
            icon={TrendingUp}
            color="text-green-400"
          />
          <StatCard
            title="Avg Resolution Time"
            value="2.8h"
            change={-15}
            icon={Clock}
            color="text-blue-400"
          />
          <StatCard
            title="Customer Satisfaction"
            value="4.7/5"
            change={3.2}
            icon={Users}
            color="text-yellow-400"
          />
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 mb-8">
            <TabsTrigger value="overview" className="text-black data-[state=active]:bg-primary">Overview</TabsTrigger>
            <TabsTrigger value="requests" className="text-black data-[state=active]:bg-primary">Requests</TabsTrigger>
            <TabsTrigger value="team" className="text-black data-[state=active]:bg-primary">Team Performance</TabsTrigger>
            <TabsTrigger value="trends" className="text-black data-[state=active]:bg-primary">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Requests by Status */}
              <ChartCard
                title="Requests by Status"
                description="Current distribution of request statuses"
              >
                <div className="space-y-4">
                  {requestsByStatus.map((item, index) => (
                    <div 
                      key={item.name} 
                      className="flex items-center justify-between slide-in-right"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-black">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-black font-medium">{item.value}</span>
                        <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-1000"
                            style={{ 
                              backgroundColor: item.color,
                              width: `${(item.value / Math.max(...requestsByStatus.map(i => i.value))) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>

              {/* Requests by Priority */}
              <ChartCard
                title="Requests by Priority"
                description="Priority level distribution"
              >
                <div className="space-y-4">
                  {requestsByPriority.map((item, index) => (
                    <div 
                      key={item.name} 
                      className="flex items-center justify-between slide-in-right"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-black">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-black font-medium">{item.value}</span>
                        <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-1000"
                            style={{ 
                              backgroundColor: item.color,
                              width: `${(item.value / Math.max(...requestsByPriority.map(i => i.value))) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>
          </TabsContent>

          <TabsContent value="requests">
            <ChartCard
              title="Monthly Request Trends"
              description="Request volume and resolution trends over time"
            >
              <div className="space-y-6">
                {monthlyTrends.map((month, index) => (
                  <div 
                    key={month.month} 
                    className="slide-in-right"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-black font-medium">{month.month}</span>
                      <div className="flex gap-4 text-sm">
                        <span className="text-blue-400">Requests: {month.requests}</span>
                        <span className="text-green-400">Resolved: {month.resolved}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 h-8 bg-white/5 rounded-lg overflow-hidden">
                      <div 
                        className="bg-blue-500 transition-all duration-1000"
                        style={{ width: `${(month.requests / 120) * 100}%` }}
                      />
                      <div 
                        className="bg-green-500 transition-all duration-1000"
                        style={{ width: `${(month.resolved / 120) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ChartCard>
          </TabsContent>

          <TabsContent value="team">
            <ChartCard
              title="Team Performance"
              description="Individual agent performance metrics"
            >
              <div className="space-y-6">
                {teamPerformance.map((member, index) => (
                  <Card 
                    key={member.name} 
                    className="bg-white/5 p-4 slide-in-right"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-black font-medium">{member.name}</h4>
                          <p className="text-black/70 text-sm">IT Support Agent</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex gap-6">
                          <div>
                            <p className="text-black/70 text-xs">Resolved</p>
                            <p className="text-black font-semibold">{member.resolved}</p>
                          </div>
                          <div>
                            <p className="text-black/70 text-xs">Avg Time</p>
                            <p className="text-black font-semibold">{member.avgTime}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-1000"
                          style={{ width: `${(member.resolved / 40) * 100}%` }}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ChartCard>
          </TabsContent>

          <TabsContent value="trends">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ChartCard
                title="Response Time Trends"
                description="Average response times by category"
              >
                <div className="space-y-4">
                  {['Account Access', 'Hardware', 'Software', 'Network'].map((category, index) => {
                    const times = ['45m', '2.1h', '1.3h', '3.2h'];
                    const colors = ['bg-green-500', 'bg-yellow-500', 'bg-blue-500', 'bg-red-500'];
                    return (
                      <div 
                        key={category} 
                        className="flex items-center justify-between slide-in-right"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <span className="text-black">{category}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-black/70 text-sm">{times[index]}</span>
                          <div className={`w-2 h-2 rounded-full ${colors[index]}`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ChartCard>

              <ChartCard
                title="Customer Satisfaction"
                description="Satisfaction scores by service type"
              >
                <div className="space-y-4">
                  {['Password Reset', 'Software Install', 'Hardware Request', 'Network Access'].map((service, index) => {
                    const scores = [4.9, 4.6, 4.5, 4.7];
                    return (
                      <div 
                        key={service} 
                        className="flex items-center justify-between slide-in-right"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <span className="text-black">{service}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400 font-medium">{scores[index]}/5</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full mx-0.5 ${
                                  i < Math.floor(scores[index]) ? 'bg-yellow-400' : 'bg-white/20'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ChartCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
