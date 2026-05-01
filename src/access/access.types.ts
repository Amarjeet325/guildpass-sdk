export type AccessCheckParams = {
  walletAddress: string;
  guildId: string;
  resourceId: string;
};

export type RoleAccessCheckParams = {
  walletAddress: string;
  guildId: string;
  roleId: string;
};

export type AccessCheckResult = {
  hasAccess: boolean;
  walletAddress: string;
  guildId: string;
  resourceId: string;
  requiredRoles: string[];
  matchedRoles: string[];
  reason?: string;
};
