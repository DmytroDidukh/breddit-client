import { mapExchange } from '@urql/core';
import { redirect } from 'next/navigation';
import { Exchange } from 'urql';

import { Routes } from '@/consts';
import { isServerSide } from '@/utils';

function createErrorExchange(): Exchange {
    return mapExchange({
        onError: (error) => {
            if (error?.message.includes('Unauthenticated')) {
                if (!isServerSide()) {
                    console.log('AUTH ERROR, REDIRECTING');
                    redirect(Routes.SIGN_IN);
                } else {
                    console.log('SERVER SIDE, NO REDIRECT');
                }
            }
        },
    });
}

export { createErrorExchange };
