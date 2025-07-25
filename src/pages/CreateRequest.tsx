import { useState } from "react";
import { ArrowLeft, Upload, Send, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const CreateRequest = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: '',
    description: '',
    department: '',
    urgency: ''
  });

  const categories = [
    'Account Access',
    'Hardware',
    'Software',
    'Network',
    'Email',
    'Security',
    'Training'
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'text-green-400' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-400' },
    { value: 'high', label: 'High', color: 'text-orange-400' },
    { value: 'critical', label: 'Critical', color: 'text-red-400' }
  ];

  const handleSubmit = () => {
    toast({
      title: "Request Submitted",
      description: "Your service request has been submitted successfully. You'll receive updates via email.",
    });
    // Reset form
    setFormData({
      title: '',
      category: '',
      priority: '',
      description: '',
      department: '',
      urgency: ''
    });
    setStep(1);
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="text-black hover:bg-white/10 mb-4" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-4xl font-bold text-black mb-2">Create Service Request</h1>
          <p className="text-black/70">Submit a new service request to our support team</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step >= stepNumber 
                    ? 'bg-primary text-black' 
                    : 'bg-white/10 text-black/50'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-20 h-1 mx-2 transition-all duration-300 ${
                    step > stepNumber ? 'bg-primary' : 'bg-white/10'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <p className="text-black/70">
              Step {step} of 3: {
                step === 1 ? 'Basic Information' :
                step === 2 ? 'Request Details' : 'Review & Submit'
              }
            </p>
          </div>
        </div>

        <Card className="glass-card p-8">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6 slide-in-right">
              <h2 className="text-2xl font-semibold text-black mb-6">Basic Information</h2>
              
              <div>
                <Label htmlFor="title" className="text-black mb-2 block">Request Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Brief description of your request"
                  className="bg-white/10 border-white/20 text-black placeholder:text-black/50"
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-black mb-2 block">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-black">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority" className="text-black mb-2 block">Priority *</Label>
                <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-black">
                    <SelectValue placeholder="Select priority level" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority.value} value={priority.value}>
                        <span className={priority.color}>{priority.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="department" className="text-black mb-2 block">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  placeholder="Your department"
                  className="bg-white/10 border-white/20 text-black placeholder:text-black/50"
                />
              </div>
            </div>
          )}

          {/* Step 2: Request Details */}
          {step === 2 && (
            <div className="space-y-6 slide-in-right">
              <h2 className="text-2xl font-semibold text-black mb-6">Request Details</h2>
              
              <div>
                <Label htmlFor="description" className="text-black mb-2 block">Detailed Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Provide a detailed description of your request, including any error messages or specific requirements..."
                  className="bg-white/10 border-white/20 text-black placeholder:text-black/50 min-h-[120px]"
                />
              </div>

              <div>
                <Label className="text-black mb-2 block">Attachments</Label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-white/40 transition-colors">
                  <Upload className="w-12 h-12 text-black/50 mx-auto mb-4" />
                  <p className="text-black/70 mb-2">Drag and drop files here, or click to browse</p>
                  <p className="text-black/50 text-sm">Supported formats: PDF, DOC, DOCX, PNG, JPG (Max 10MB)</p>
                  <Button variant="outline" className="border-white/30 text-black hover:bg-white/10 mt-4">
                    Choose Files
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="urgency" className="text-black mb-2 block">Business Impact</Label>
                <Select value={formData.urgency} onValueChange={(value) => setFormData({...formData, urgency: value})}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-black">
                    <SelectValue placeholder="How does this impact your work?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blocking">Completely blocking my work</SelectItem>
                    <SelectItem value="slowing">Slowing down my productivity</SelectItem>
                    <SelectItem value="minor">Minor inconvenience</SelectItem>
                    <SelectItem value="enhancement">Enhancement request</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 3: Review & Submit */}
          {step === 3 && (
            <div className="space-y-6 slide-in-right">
              <h2 className="text-2xl font-semibold text-black mb-6">Review & Submit</h2>
              
              <div className="bg-white/5 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-black/70 text-sm">Title</Label>
                    <p className="text-black">{formData.title || 'Not specified'}</p>
                  </div>
                  <div>
                    <Label className="text-black/70 text-sm">Category</Label>
                    <p className="text-black">{formData.category || 'Not specified'}</p>
                  </div>
                  <div>
                    <Label className="text-black/70 text-sm">Priority</Label>
                    <p className="text-black capitalize">{formData.priority || 'Not specified'}</p>
                  </div>
                  <div>
                    <Label className="text-black/70 text-sm">Department</Label>
                    <p className="text-black">{formData.department || 'Not specified'}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-black/70 text-sm">Description</Label>
                  <p className="text-black">{formData.description || 'Not specified'}</p>
                </div>
                <div>
                  <Label className="text-black/70 text-sm">Business Impact</Label>
                  <p className="text-black">{formData.urgency || 'Not specified'}</p>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-blue-400 font-medium">What happens next?</p>
                  <p className="text-black/70 text-sm mt-1">
                    Your request will be reviewed and assigned to the appropriate team member. 
                    You'll receive email updates as your request progresses.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={step === 1}
              className="border-white/30 text-black hover:bg-white/10 disabled:opacity-50"
            >
              Previous
            </Button>
            
            {step < 3 ? (
              <Button 
                onClick={nextStep}
                disabled={
                  (step === 1 && (!formData.title || !formData.category || !formData.priority)) ||
                  (step === 2 && !formData.description)
                }
                className="btn-gradient disabled:opacity-50"
              >
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="btn-gradient">
                <Send className="w-4 h-4 mr-2" />
                Submit Request
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateRequest;
