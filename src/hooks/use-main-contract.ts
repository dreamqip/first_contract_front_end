import { address, toNano } from '@ton/core';
import React from 'react';
import { Main } from '../contracts/main.contract';
import { useAsync } from './use-async';
import { useTonClient } from './use-ton-client';
import { useTonConnect } from './use-ton-connect';

type ContractData = {
    counter: number;
    latestAddress: string;
    ownerAddress: string;
};

async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useMainContract() {
    const [contractData, setContractData] = React.useState<ContractData | null>(null);

    const client = useTonClient();
    const { sender } = useTonConnect();

    const contract = useAsync(async () => {
        if (!client) return;

        const contract = new Main(address('EQAf9NsFLC4BOS8n0b1PPvUNzJa8yDMvidyfVCHsqF54RMKp'));

        return client.open(contract);
    }, [client]);

    const contractBalance = useAsync(async () => {
        if (!contract) return;

        return contract.getContractBalance();
    });

    React.useEffect(() => {
        async function getValue() {
            if (!contract) return;

            setContractData(null);

            const { counter, latestAddress, ownerAddress } = await contract.getContractData();
            setContractData({
                counter,
                latestAddress: latestAddress.toString(),
                ownerAddress: ownerAddress.toString(),
            });

            await sleep(5000);
            getValue();
        }

        getValue();
    }, [contract]);

    const increment = () => {
        return contract?.sendIncrement(sender, toNano('0.05'));
    };

    return {
        contractAddress: contract?.address.toString(),
        contractBalance,
        increment,
        ...contractData,
    };
}
