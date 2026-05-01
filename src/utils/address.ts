/**
 * Normalises an Ethereum address to lowercase.
 * 
 * @param address The address to normalise
 * @returns The lowercased address
 */
export const normaliseAddress = (address: string): string => {
  return address.toLowerCase().trim();
};

/**
 * Checks if two addresses are equal, regardless of case.
 * 
 * @param addr1 First address
 * @param addr2 Second address
 * @returns True if they are the same address
 */
export const areAddressesEqual = (addr1: string, addr2: string): boolean => {
  return normaliseAddress(addr1) === normaliseAddress(addr2);
};

/**
 * Shortens an address for display (e.g. 0x1234...5678).
 * 
 * @param address The address to shorten
 * @param chars Number of characters to show at start and end
 * @returns The shortened address
 */
export const shortenAddress = (address: string, chars = 4): string => {
  if (!address || address.length < chars * 2 + 2) return address;
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
};
