export type UserRole = "non-member" | "member" | "staff" | "president";

export interface User {
  id: string;
  name: string;
  walletAddress: string;
  role: UserRole;
  joinDate?: string;
  avatar?: string;
}

export interface Ticket {
  id: string;
  sender: string;
  recipient: string;
  status: "sent" | "returned" | "confirmed" | "rejected";
  message: string;
  createdAt: string;
  returnedAt?: string;
  confirmedAt?: string;
}

// Mock data
export const initialUsers: User[] = [
  {
    id: "1",
    name: "Park Minho",
    walletAddress: "0x1234...5678",
    role: "president",
    joinDate: "2023-01-15",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Park",
  },
  {
    id: "2",
    name: "Kim Jiyeon",
    walletAddress: "0x2345...6789",
    role: "staff",
    joinDate: "2023-02-10",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kim",
  },
  {
    id: "3",
    name: "Lee Junho",
    walletAddress: "0x3456...7890",
    role: "member",
    joinDate: "2023-03-22",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lee",
  },
  {
    id: "4",
    name: "Choi Soomin",
    walletAddress: "0x4567...8901",
    role: "member",
    joinDate: "2023-05-05",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Choi",
  },
  {
    id: "5",
    name: "Jung Hyesoo",
    walletAddress: "0x5678...9012",
    role: "non-member",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jung",
  },
  {
    id: "6",
    name: "Kang Donghyun",
    walletAddress: "0x6789...0123",
    role: "non-member",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kang",
  },
];

export const initialTickets: Ticket[] = [
  {
    id: "1",
    sender: "0x1234...5678",
    recipient: "0x3456...7890",
    status: "sent",
    message: "Please review club event proposal",
    createdAt: "2025-05-01T10:30:00Z",
  },
  {
    id: "2",
    sender: "0x1234...5678",
    recipient: "0x2345...6789",
    status: "returned",
    message: "Monthly budget approval",
    createdAt: "2025-04-28T14:15:00Z",
    returnedAt: "2025-04-29T09:20:00Z",
  },
  {
    id: "3",
    sender: "0x1234...5678",
    recipient: "0x4567...8901",
    status: "confirmed",
    message: "New member orientation materials",
    createdAt: "2025-04-25T11:45:00Z",
    returnedAt: "2025-04-26T16:30:00Z",
    confirmedAt: "2025-04-27T10:10:00Z",
  },
];
