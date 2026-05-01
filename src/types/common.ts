export type Address = string;

export type AccessRequirement = {
  type: 'TOKEN' | 'NFT' | 'ROLE' | 'WHITELIST';
  address?: Address;
  id?: string;
  minAmount?: string;
};
