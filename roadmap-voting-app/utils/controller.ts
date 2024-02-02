import { supabase } from '../lib/supabaseClient';

export const getPosts = async () => {
    const { data, error } = await supabase.from('posts').select('*');
    return { data, error };
}

export const getVotes = async (postId: string) => {
    const { data, error } = await supabase
        .from('votes')
        .select('*')
        .eq('postid', postId);
    return { data, error };
}

export const signInWithSupabase = async (email: string, password: string) => {
    const signInresponse = await supabase.auth.signInWithPassword({ email, password });
    return signInresponse;
}

export const getUserFromSupabase = async (userId: string) => {
    const { data, error } = await supabase
        .from('userstable')
        .select('*')
        .eq('id', userId)
        .single();
    return { data, error };
}

export const signUpWithSupabase = async (email: string, password: string) => {
    const signUpResponse = await supabase.auth.signUp({ email, password });
    return signUpResponse;
}

export const insertUserToSupabase = async (userId: string, username: string, email: string) => {
    const { error } = await supabase
        .from('userstable')
        .insert([{ id: userId, name: username, email: email }]);
    return { error };
}
