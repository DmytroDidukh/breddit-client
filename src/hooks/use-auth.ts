import React from 'react';

import { AuthContext } from '@/app/auth-provider';

export const useAuth = () => React.useContext(AuthContext);
