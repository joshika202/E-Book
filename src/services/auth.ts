import { supabase } from '../config/supabase';

export const authService = {
  async signUp(email: string, password: string, name: string) {
    const { data: auth, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) throw signUpError;

    if (auth.user) {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert([{ id: auth.user.id, name }]);

      if (profileError) throw profileError;
    }

    return auth;
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
};