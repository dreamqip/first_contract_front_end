import { address, toNano } from '@ton/core';
import React from 'react';
import { Main } from '../contracts/main.contract';
import { useAsync } from './use-async';
import { useTonClient } from './use-ton-client';
import { useTonConnect } from './use-ton-connect';

type ContractData = {
  counter: number;
  balance: bigint;
  latestAddress: string;
  ownerAddress: string;
};

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useMainContract() {
  const [contractData, setContractData] = React.useState<ContractData | null>(
    null
  );

  const client = useTonClient();
  const { sender } = useTonConnect();

  const contract = useAsync(async () => {
    if (!client) return;

    const contract = new Main(
      address('EQAf9NsFLC4BOS8n0b1PPvUNzJa8yDMvidyfVCHsqF54RMKp')
    );

    return client.open(contract);
  }, [client]);

  const contractBalance = useAsync(async () => {
    if (!contract) return;

    return contract.getContractBalance();
  }, [contract]);

  React.useEffect(() => {
    async function getValue() {
      if (!contract) return;

      setContractData(null);

      const { counter, latestAddress, ownerAddress } =
        await contract.getContractData();
      const balance = contractBalance;
      setContractData({
        counter,
        latestAddress: latestAddress.toString(),
        ownerAddress: ownerAddress.toString(),
        balance: balance ?? BigInt(0),
      });

      await sleep(5000);
      getValue();
    }

    getValue();
  }, [contract, contractBalance]);

  const increment = () => {
    return contract?.sendIncrement(sender, toNano(String(0.009)));
  };

  const deposit = (amount: number) => {
    return contract?.sendDeposit(sender, toNano(amount));
  };

  const withdraw = (amount: number) => {
    return contract?.sendWithdrawalRequest(
      sender,
      toNano(String(0.009)),
      toNano(amount)
    );
  };

  return {
    contractAddress: contract?.address.toString(),
    increment,
    deposit,
    withdraw,
    ...contractData,
  };
}
