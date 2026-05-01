import { describe, it, expect } from 'vitest';
import { GuildPassClient } from '../src/client/GuildPassClient';

describe('GuildPassClient', () => {
  it('should initialise with provided config', () => {
    const config = {
      apiUrl: 'https://test-api.com',
      chainId: 137,
      apiKey: 'test-key',
    };
    const client = new GuildPassClient(config);
    
    expect(client.getConfig().apiUrl).toBe('https://test-api.com');
    expect(client.getConfig().chainId).toBe(137);
    expect(client.getConfig().apiKey).toBe('test-key');
  });

  it('should use default values for optional config', () => {
    const client = new GuildPassClient({ apiUrl: 'https://test-api.com' });
    
    expect(client.getConfig().timeoutMs).toBe(10000);
    expect(client.getConfig().chainId).toBe(1);
  });

  it('should expose all required services', () => {
    const client = new GuildPassClient({ apiUrl: 'https://test-api.com' });
    
    expect(client.access).toBeDefined();
    expect(client.membership).toBeDefined();
    expect(client.roles).toBeDefined();
    expect(client.guilds).toBeDefined();
    expect(client.contracts).toBeDefined();
  });
});
