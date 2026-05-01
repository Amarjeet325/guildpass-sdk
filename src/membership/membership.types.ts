export type MembershipParams = {
  walletAddress: string;
  guildId: string;
};

export type Membership = {
  walletAddress: string;
  guildId: string;
  isActive: boolean;
  roles: string[];
  joinedAt?: string;
  expiresAt?: string;
};
