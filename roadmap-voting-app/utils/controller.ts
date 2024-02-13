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
    if (signInresponse.error) throw signInresponse.error;
    return { data: signInresponse.data, userId: signInresponse.data.user.id };
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
    if (signUpResponse.error) throw signUpResponse.error;
    const user = signUpResponse.data.user ? signUpResponse.data.user : null;
    return { data: signUpResponse.data, user, userID: user ? user.id : null };
}

export const insertUserToSupabase = async (userId: string, username: string, email: string) => {
    const { error } = await supabase
        .from('userstable')
        .insert([{ id: userId, name: username, email: email }]);
    return { error };
}

export const getExistingVote = async (postId: string, userId: string) => {
    const existingVote = await supabase
        .from('votes')
        .select('*')
        .eq('postid', postId)
        .eq('userid', userId)
        .single();
    return existingVote.data;
}

export const updateVote = async (postId: string, userId: string, type: string) => {
    const response = await supabase
        .from('votes')
        .update({ type, updatedat: new Date() })
        .eq('postid', postId)
        .eq('userid', userId);

    if (response.error) {
        throw response.error;
    }
    // return response;
}

export const addVote = async (id:string, postId: string, userId: string, type: string) => {
    const response = await supabase
        .from('votes')
        .insert([{ id: id, postid: postId, userid: userId, type: type }]);
    if (response.error) {
        throw response.error;
    }
    // return response;
}