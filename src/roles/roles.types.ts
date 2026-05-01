import { AccessRequirement } from '../types/common';

export type GetRolesParams = {
  guildId: string;
};

export type GetUserRolesParams = {
  walletAddress: string;
  guildId: string;
};

export type GuildRole = {
  id: string;
  name: string;
  description?: string;
  requirements?: AccessRequirement[];
};
