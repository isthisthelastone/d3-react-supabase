import { useState } from 'react';

import { useSignIn, useSignUp } from '../../../shared/auth/model';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUpMutation = useSignUp({ email, password });
  const signInMutation = useSignIn({ email, password });

  const handleSignUp = () => {
    signUpMutation.mutate();
  };

  const handleSignIn = () => {
    signInMutation.mutate();
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={handleSignUp} disabled={signUpMutation.isPending}>
        {signUpMutation.isPending ? 'Signing Up...' : 'Sign Up'}
      </button>
      <button onClick={handleSignIn} disabled={signInMutation.isPending}>
        {signInMutation.isPending ? 'Signing In...' : 'Sign In'}
      </button>
      {signUpMutation.isError && (
        <p>Sign Up Error: {signUpMutation.error.message}</p>
      )}
      {signInMutation.isError && (
        <p>Sign In Error: {signInMutation.error.message}</p>
      )}
    </div>
  );
};

export default Auth;
