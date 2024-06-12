import { User } from './User';
import { JWTState } from './JWTState';

export interface AuthState {
  user: User;
  isAuthenticated: boolean;
  token: JWTState | undefined;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}
