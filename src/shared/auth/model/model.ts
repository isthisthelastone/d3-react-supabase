import { useMutation } from '@tanstack/react-query';
import { AuthError } from '@supabase/supabase-js';
import { supabaseClient as supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';

interface UserCreds {
  email: string;
  password: string;
}

export const useSignUp = ({ email, password }: UserCreds) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      console.log('Sign up successful!');
      navigate('/dashboard');
      // You can add additional logic here, like redirecting the user
    },
    onError: (error: AuthError) => {
      console.error('Error during sign up:', error.message);
      // You can add additional error handling here, like showing a toast notification
    },
  });
};

export const useSignIn = ({ email, password }: UserCreds) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      console.log('Sign in successful!');
      navigate('/dashboard');
      // You can add additional logic here, like redirecting the user
    },
    onError: (error: AuthError) => {
      console.error('Error during sign in:', error.message);
      // You can add additional error handling here, like showing a toast notification
    },
  });
};
