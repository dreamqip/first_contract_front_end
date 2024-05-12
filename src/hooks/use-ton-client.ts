import { TonClient } from '@ton/ton';
import { useAsync } from './use-async';

export function useTonClient() {
  return useAsync(async () => {
    return new TonClient({
      endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
      apiKey:
        'f74efb2e18c48a02c6c9b3dc9fd1cdf832f3b556434d8392d5bc42db2fdbdc26',
    });
  });
}
