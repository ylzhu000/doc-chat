import supabase from './supabase';
import { TLogin } from '../types';

export const signIn = async ({ email, password }: TLogin) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (!data.user) return null;
  console.log(data);

  if (error) {
    throw new Error(error.message);
  }

  return data.user;
};
