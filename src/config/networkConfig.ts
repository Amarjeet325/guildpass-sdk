export type NetworkConfig = {
  chainId: number;
  name: string;
  rpcUrl?: string;
  explorerUrl?: string;
};

export const SUPPORTED_NETWORKS: Record<number, NetworkConfig> = {
  1: {
    chainId: 1,
    name: 'Ethereum Mainnet',
    explorerUrl: 'https://etherscan.io',
  },
  10: {
    chainId: 10,
    name: 'Optimism',
    explorerUrl: 'https://optimistic.etherscan.io',
  },
  137: {
    chainId: 137,
    name: 'Polygon',
    explorerUrl: 'https://polygonscan.com',
  },
  8453: {
    chainId: 8453,
    name: 'Base',
    explorerUrl: 'https://basescan.org',
  },
  42161: {
    chainId: 42161,
    name: 'Arbitrum One',
    explorerUrl: 'https://arbiscan.io',
  },
};
