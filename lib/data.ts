export interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  category: string;
  bio: string;
  roninAddress: string;
  totalReceived: string;
  tipCount: number;
  socialLinks: {
    twitter?: string;
    github?: string;
    website?: string;
  };
}

export const creators: Creator[] = [
  {
    id: "1",
    name: "Jati Negara",
    username: "jatinegara",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jati",
    category: "Developer",
    bio: "Full-stack developer building awesome things on Ronin. Open source enthusiast.",
    roninAddress: "0x1234567890abcdef1234567890abcdef12345678",
    totalReceived: "1250.5",
    tipCount: 89,
    socialLinks: {
      twitter: "jatinegara",
      github: "jatinegara",
    },
  },
  {
    id: "2",
    name: "Sarah Chen",
    username: "sarahcreates",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    category: "Creator",
    bio: "Digital artist and content creator. Creating art that inspires.",
    roninAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    totalReceived: "3420.75",
    tipCount: 156,
    socialLinks: {
      twitter: "sarahcreates",
      website: "https://sarahchen.art",
    },
  },
  {
    id: "3",
    name: "Devin Martinez",
    username: "devindev",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=devin",
    category: "Developer",
    bio: "Blockchain developer specializing in smart contracts and DeFi.",
    roninAddress: "0x9876543210fedcba9876543210fedcba98765432",
    totalReceived: "890.25",
    tipCount: 45,
    socialLinks: {
      github: "devindev",
      twitter: "devindev",
    },
  },
  {
    id: "4",
    name: "Maya Putri",
    username: "mayaputri",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maya",
    category: "Educator",
    bio: "Teaching programming to the next generation of Indonesian developers.",
    roninAddress: "0xfedcba9876543210fedcba9876543210fedcba98",
    totalReceived: "2100.0",
    tipCount: 112,
    socialLinks: {
      twitter: "mayaputri",
      website: "https://mayaputri.edu",
    },
  },
  {
    id: "5",
    name: "Alex Turner",
    username: "alexturns",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    category: "Creator",
    bio: "Game designer and streamer. Building games that bring joy.",
    roninAddress: "0x5678901234abcdef5678901234abcdef56789012",
    totalReceived: "567.8",
    tipCount: 34,
    socialLinks: {
      twitter: "alexturns",
    },
  },
  {
    id: "6",
    name: "Rizki Ahmad",
    username: "rizkiahmad",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rizki",
    category: "Developer",
    bio: "Backend engineer with a passion for scalable systems.",
    roninAddress: "0xabcdef0123456789abcdef0123456789abcdef01",
    totalReceived: "780.5",
    tipCount: 28,
    socialLinks: {
      github: "rizkiahmad",
    },
  },
  {
    id: "7",
    name: "Emma Wilson",
    username: "emmawilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
    category: "Writer",
    bio: "Technical writer documenting the Web3 ecosystem.",
    roninAddress: "0x1230abcdef5678901230abcdef5678901230abcd",
    totalReceived: "445.25",
    tipCount: 67,
    socialLinks: {
      twitter: "emmawilson",
      website: "https://emmawilson.dev",
    },
  },
  {
    id: "8",
    name: "Budi Santoso",
    username: "budisantoso",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=budi",
    category: "Gamer",
    bio: "Pro gamer and esports coach. Building the future of gaming in Indonesia.",
    roninAddress: "0xfedcba9876543210fedcba9876543210fedcba99",
    totalReceived: "1890.0",
    tipCount: 95,
    socialLinks: {
      twitter: "budisantoso",
    },
  },
];

export const categories = [
  "All",
  "Developer",
  "Creator",
  "Educator",
  "Writer",
  "Gamer",
];