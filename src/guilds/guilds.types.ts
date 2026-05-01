export type GetGuildParams = {
  guildId: string;
};

export type Guild = {
  id: string;
  name: string;
  description?: string;
  ownerAddress: string;
  contractAddress?: string;
  chainId: number;
};

export type GuildConfig = {
  id: string;
  theme?: string;
  logoUrl?: string;
  bannerUrl?: string;
  socialLinks?: Record<string, string>;
};
