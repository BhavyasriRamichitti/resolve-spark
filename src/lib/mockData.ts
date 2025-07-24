// Mock data for the Service Request Management System

export interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  requester: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent' | 'user';
  department: string;
  avatar: string;
  status: 'active' | 'inactive';
}

export interface ServiceCatalogItem {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  estimatedTime: string;
  popularity: number;
  isActive: boolean;
}

export const mockServiceRequests: ServiceRequest[] = [
  {
    id: '1',
    title: 'Password Reset Required',
    description: 'Unable to login to company email account',
    category: 'Account Access',
    priority: 'medium',
    status: 'open',
    requester: 'John Doe',
    assignedTo: 'Sarah Johnson',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    dueDate: '2024-01-17T17:00:00Z'
  },
  {
    id: '2',
    title: 'New Employee Laptop Setup',
    description: 'Setup laptop and software for new marketing team member',
    category: 'Hardware',
    priority: 'high',
    status: 'in_progress',
    requester: 'Mike Chen',
    assignedTo: 'Alex Rodriguez',
    createdAt: '2024-01-14T09:15:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
    dueDate: '2024-01-16T12:00:00Z'
  },
  {
    id: '3',
    title: 'Software License Renewal',
    description: 'Adobe Creative Suite license needs renewal',
    category: 'Software',
    priority: 'low',
    status: 'resolved',
    requester: 'Emily Davis',
    assignedTo: 'Sarah Johnson',
    createdAt: '2024-01-12T14:45:00Z',
    updatedAt: '2024-01-15T16:30:00Z',
    dueDate: '2024-01-20T17:00:00Z'
  },
  {
    id: '4',
    title: 'Network Connection Issues',
    description: 'Intermittent connectivity problems in conference room B',
    category: 'Network',
    priority: 'critical',
    status: 'in_progress',
    requester: 'Robert Wilson',
    assignedTo: 'Alex Rodriguez',
    createdAt: '2024-01-15T11:20:00Z',
    updatedAt: '2024-01-15T15:45:00Z',
    dueDate: '2024-01-15T18:00:00Z'
  },
  {
    id: '5',
    title: 'Printer Maintenance',
    description: 'Monthly maintenance for office printers',
    category: 'Hardware',
    priority: 'low',
    status: 'closed',
    requester: 'Lisa Anderson',
    assignedTo: 'Mike Thompson',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-13T16:00:00Z',
    dueDate: '2024-01-15T17:00:00Z'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'admin',
    department: 'IT Support',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612c95e?w=150',
    status: 'active'
  },
  {
    id: '2',
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@company.com',
    role: 'agent',
    department: 'IT Support',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    status: 'active'
  },
  {
    id: '3',
    name: 'Mike Thompson',
    email: 'mike.thompson@company.com',
    role: 'agent',
    department: 'IT Support',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    status: 'active'
  },
  {
    id: '4',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'user',
    department: 'Marketing',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    status: 'active'
  },
  {
    id: '5',
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    role: 'user',
    department: 'Design',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    status: 'active'
  }
];

export const mockServiceCatalog: ServiceCatalogItem[] = [
  {
    id: '1',
    name: 'Password Reset',
    description: 'Reset your account password or unlock your account',
    category: 'Account Access',
    icon: 'Key',
    estimatedTime: '15 minutes',
    popularity: 95,
    isActive: true
  },
  {
    id: '2',
    name: 'Software Installation',
    description: 'Install approved software on your workstation',
    category: 'Software',
    icon: 'Download',
    estimatedTime: '30 minutes',
    popularity: 87,
    isActive: true
  },
  {
    id: '3',
    name: 'Hardware Request',
    description: 'Request new hardware or replacement equipment',
    category: 'Hardware',
    icon: 'Monitor',
    estimatedTime: '2-3 days',
    popularity: 76,
    isActive: true
  },
  {
    id: '4',
    name: 'Network Access',
    description: 'Request access to network resources or VPN',
    category: 'Network',
    icon: 'Wifi',
    estimatedTime: '1 hour',
    popularity: 82,
    isActive: true
  },
  {
    id: '5',
    name: 'Email Setup',
    description: 'Configure email on your device or create new mailbox',
    category: 'Email',
    icon: 'Mail',
    estimatedTime: '20 minutes',
    popularity: 69,
    isActive: true
  },
  {
    id: '6',
    name: 'Security Training',
    description: 'Complete mandatory security awareness training',
    category: 'Training',
    icon: 'Shield',
    estimatedTime: '45 minutes',
    popularity: 43,
    isActive: true
  }
];

export const mockAnalyticsData = {
  requestsByStatus: [
    { name: 'Open', value: 24, color: '#3b82f6' },
    { name: 'In Progress', value: 18, color: '#f59e0b' },
    { name: 'Resolved', value: 42, color: '#10b981' },
    { name: 'Closed', value: 16, color: '#6b7280' }
  ],
  requestsByPriority: [
    { name: 'Critical', value: 8, color: '#ef4444' },
    { name: 'High', value: 15, color: '#f97316' },
    { name: 'Medium', value: 45, color: '#eab308' },
    { name: 'Low', value: 32, color: '#22c55e' }
  ],
  monthlyTrends: [
    { month: 'Jan', requests: 89, resolved: 84 },
    { month: 'Feb', requests: 95, resolved: 91 },
    { month: 'Mar', requests: 102, resolved: 98 },
    { month: 'Apr', requests: 87, resolved: 85 },
    { month: 'May', requests: 91, resolved: 89 },
    { month: 'Jun', requests: 105, resolved: 102 }
  ],
  teamPerformance: [
    { name: 'Sarah Johnson', resolved: 34, avgTime: '2.5h' },
    { name: 'Alex Rodriguez', resolved: 28, avgTime: '3.1h' },
    { name: 'Mike Thompson', resolved: 22, avgTime: '2.8h' }
  ]
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical': return 'bg-red-500';
    case 'high': return 'bg-orange-500';
    case 'medium': return 'bg-yellow-500';
    case 'low': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'open': return 'bg-blue-500';
    case 'in_progress': return 'bg-yellow-500';
    case 'resolved': return 'bg-green-500';
    case 'closed': return 'bg-gray-500';
    default: return 'bg-gray-500';
  }
};