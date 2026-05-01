import { GuildPassClientConfig } from './sdkConfig';

export const DEFAULT_CONFIG: Partial<GuildPassClientConfig> = {
  apiUrl: 'https://api.guildpass.xyz',
  chainId: 1, // Ethereum Mainnet
  timeoutMs: 10000, // 10 seconds
};
