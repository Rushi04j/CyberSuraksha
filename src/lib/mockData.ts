import { User, Complaint, Role } from './types';

// Export types from here as well for backward compatibility if needed, 
// but generally we should use @/lib/types
export type { User, Complaint, Role };

// Mock Users
export const MOCK_USERS: Record<string, User> = {
  'user-1': {
    id: 'user-1',
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    role: 'citizen',
    phone: '9876543210',
  },
  'police-1': {
    id: 'police-1',
    name: 'Inspector Vikram Singh',
    email: 'vikram@police.gov.in',
    role: 'police',
    jurisdiction: 'Mumbai Cyber Cell',
  },
};

// Mock Complaints
let mockComplaints: Complaint[] = [
  {
    id: 'cmp-1001',
    userId: 'user-1',
    title: 'Phishing Email regarding Lottery',
    description: 'I received an email claiming I won a lottery and asking for bank details. I did not click the link.',
    category: 'Financial Fraud',
    urgency: 'Low',
    status: 'Pending',
    location: 'Andheri, Mumbai',
    incidentDate: '2025-12-15T10:00:00Z',
    createdAt: '2025-12-15T10:30:00Z',
  },
  {
    id: 'cmp-1002',
    userId: 'user-1',
    title: 'Instagram Account Hacked',
    description: 'Someone accessed my account and is posting fake crypto schemes.',
    category: 'Identity Theft',
    urgency: 'Medium',
    status: 'In Progress',
    location: 'Mumbai',
    incidentDate: '2025-12-10T14:20:00Z',
    createdAt: '2025-12-11T09:15:00Z',
    policeNotes: 'Tracking IP address of the login.',
  },
];

// Helpers to simulate API calls
export const mockApi = {
  login: async (role: Role): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (role === 'police') resolve(MOCK_USERS['police-1']);
        else resolve(MOCK_USERS['user-1']);
      }, 800); // Simulate network delay
    });
  },

  getComplaints: async (userId?: string, role?: Role): Promise<Complaint[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Safety check for mockComplaints
        if (!mockComplaints) {
          console.error("mockComplaints is undefined!");
          mockComplaints = [];
        }

        if (role === 'police') {
          resolve([...mockComplaints]); // Police sees all
        } else {
          resolve(mockComplaints.filter((c) => c.userId === userId));
        }
      }, 500);
    });
  },

  createComplaint: async (complaint: Omit<Complaint, 'id' | 'createdAt' | 'status'>): Promise<Complaint> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newComplaint: Complaint = {
          ...complaint,
          id: `cmp-${Math.floor(Math.random() * 10000)}`,
          createdAt: new Date().toISOString(),
          status: 'Pending',
        };
        mockComplaints = [newComplaint, ...mockComplaints];
        resolve(newComplaint);
      }, 800);
    });
  },

  updateStatus: async (id: string, status: Complaint['status']): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockComplaints = mockComplaints.map((c) =>
          c.id === id ? { ...c, status } : c
        );
        resolve();
      }, 500);
    });
  },
};
