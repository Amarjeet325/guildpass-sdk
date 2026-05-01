import { AccessRequirement } from '../types/common';

export type TokenBalanceParams = {
  walletAddress: string;
  contractAddress: string;
};

export type RoleRequirementParams = {
  walletAddress: string;
  requirement: AccessRequirement;
};
