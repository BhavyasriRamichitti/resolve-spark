import { useState } from "react";
import { Search, Filter, Clock, User, MessageSquare, Paperclip, CheckCircle2, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockServiceRequests, getStatusColor, getPriorityColor } from "@/lib/mockData";

const RequestTracking = () => {
  const [requests] = useState(mockServiceRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(requests[0]);

  const filteredRequests = requests.filter(request =>
    request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTimelineSteps = (status: string) => {
    const steps = [
      { label: "Request Submitted", completed: true, timestamp: "2024-01-15 10:30" },
      { label: "Assigned to Agent", completed: true, timestamp: "2024-01-15 11:00" },
      { label: "In Progress", completed: status !== 'open', timestamp: status !== 'open' ? "2024-01-15 14:20" : null },
      { label: "Resolved", completed: status === 'resolved' || status === 'closed', timestamp: status === 'resolved' || status === 'closed' ? "2024-01-15 16:30" : null },
      { label: "Closed", completed: status === 'closed', timestamp: status === 'closed' ? "2024-01-15 17:00" : null }
    ];
    return steps;
  };

  const mockComments = [
    {
      id: 1,
      user: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612c95e?w=150",
      message: "I've received your request and will begin working on this immediately. I'll need to reset your password and verify your identity first.",
      timestamp: "2024-01-15 11:15",
      isInternal: false
    },
    {
      id: 2,
      user: "John Doe",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      message: "Thanks! I'm available for identity verification anytime today. My direct number is ext. 1234.",
      timestamp: "2024-01-15 11:45",
      isInternal: false
    },
    {
      id: 3,
      user: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612c95e?w=150",
      message: "Identity verified successfully. Password has been reset and new credentials have been sent to your backup email address.",
      timestamp: "2024-01-15 14:20",
      isInternal: false
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Request Tracking</h1>
          <p className="text-white/70">Track the progress of your service requests</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Requests List */}
          <div className="lg:col-span-1">
            <Card className="glass-card p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                  <Input
                    placeholder="Search requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {filteredRequests.map((request, index) => (
                  <Card
                    key={request.id}
                    className={`p-4 cursor-pointer transition-all duration-300 hover:bg-white/10 slide-in-right ${
                      selectedRequest?.id === request.id ? 'bg-white/10 border-primary' : 'bg-white/5 border-white/10'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => setSelectedRequest(request)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-white text-sm">{request.title}</h3>
                      <Badge className={`text-xs text-white ${getStatusColor(request.status)}`}>
                        {request.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-white/70 text-xs mb-3 line-clamp-2">{request.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge className={`text-xs text-white ${getPriorityColor(request.priority)}`}>
                        {request.priority}
                      </Badge>
                      <span className="text-white/50 text-xs">#{request.id}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>

          {/* Request Details */}
          <div className="lg:col-span-2">
            {selectedRequest && (
              <Card className="glass-card p-6">
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-semibold text-white mb-2">{selectedRequest.title}</h2>
                      <p className="text-white/70">Request #{selectedRequest.id}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-white ${getPriorityColor(selectedRequest.priority)}`}>
                        {selectedRequest.priority}
                      </Badge>
                      <Badge className={`text-white ${getStatusColor(selectedRequest.status)}`}>
                        {selectedRequest.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-white/70" />
                        <span className="text-white/70 text-sm">Requester</span>
                      </div>
                      <p className="text-white font-medium">{selectedRequest.requester}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-white/70" />
                        <span className="text-white/70 text-sm">Assigned To</span>
                      </div>
                      <p className="text-white font-medium">{selectedRequest.assignedTo}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-white/70" />
                        <span className="text-white/70 text-sm">Due Date</span>
                      </div>
                      <p className="text-white font-medium">
                        {new Date(selectedRequest.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="timeline" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-white/10">
                    <TabsTrigger value="timeline" className="text-white data-[state=active]:bg-primary">Timeline</TabsTrigger>
                    <TabsTrigger value="details" className="text-white data-[state=active]:bg-primary">Details</TabsTrigger>
                    <TabsTrigger value="attachments" className="text-white data-[state=active]:bg-primary">Files</TabsTrigger>
                  </TabsList>

                  <TabsContent value="timeline" className="mt-6">
                    <div className="space-y-6">
                      {/* Timeline */}
                      <div className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/20"></div>
                        {getTimelineSteps(selectedRequest.status).map((step, index) => (
                          <div key={index} className="relative flex items-center mb-8">
                            <div className={`absolute left-0 w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                              step.completed 
                                ? 'bg-primary border-primary' 
                                : 'bg-white/10 border-white/30'
                            }`}>
                              {step.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                            </div>
                            <div className="ml-12">
                              <p className={`font-medium ${step.completed ? 'text-white' : 'text-white/50'}`}>
                                {step.label}
                              </p>
                              {step.timestamp && (
                                <p className="text-white/50 text-sm">{step.timestamp}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Comments */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                          <MessageSquare className="w-5 h-5" />
                          Communications
                        </h3>
                        {mockComments.map((comment) => (
                          <div key={comment.id} className="bg-white/5 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <img 
                                src={comment.avatar} 
                                alt={comment.user}
                                className="w-8 h-8 rounded-full"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <p className="font-medium text-white">{comment.user}</p>
                                  <span className="text-white/50 text-sm">{comment.timestamp}</span>
                                </div>
                                <p className="text-white/80">{comment.message}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="details" className="mt-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-white font-medium mb-2">Description</h3>
                        <p className="text-white/80 bg-white/5 rounded-lg p-4">{selectedRequest.description}</p>
                      </div>
                      <div>
                        <h3 className="text-white font-medium mb-2">Category</h3>
                        <p className="text-white/80">{selectedRequest.category}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-white font-medium mb-2">Created</h3>
                          <p className="text-white/80">{new Date(selectedRequest.createdAt).toLocaleString()}</p>
                        </div>
                        <div>
                          <h3 className="text-white font-medium mb-2">Last Updated</h3>
                          <p className="text-white/80">{new Date(selectedRequest.updatedAt).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="attachments" className="mt-6">
                    <div className="text-center py-8">
                      <Paperclip className="w-12 h-12 text-white/30 mx-auto mb-4" />
                      <p className="text-white/70">No attachments for this request</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestTracking;