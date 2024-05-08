import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAsync<T>(fn: () => Promise<T>, deps: any[] = []): T | undefined {
    const [state, setState] = React.useState<T | undefined>(undefined);

    React.useEffect(() => {
        const run = async () => {
            const result = await fn();
            setState(result);
        };

        run();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return state;
}
