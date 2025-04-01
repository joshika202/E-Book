import { supabase } from '../config/supabase';

export const groupService = {
  async createGroup(name: string, description: string, bookId: string, userId: string) {
    const { data: group, error: groupError } = await supabase
      .from('discussion_groups')
      .insert([{ name, description, book_id: bookId }])
      .select()
      .single();

    if (groupError) throw groupError;

    const { error: memberError } = await supabase
      .from('group_members')
      .insert([{ group_id: group.id, user_id: userId }]);

    if (memberError) throw memberError;

    return group;
  },

  async getGroups() {
    const { data, error } = await supabase
      .from('discussion_groups')
      .select(`
        *,
        books (*),
        group_members (user_id)
      `);
    if (error) throw error;
    return data;
  },

  async joinGroup(groupId: string, userId: string) {
    const { error } = await supabase
      .from('group_members')
      .insert([{ group_id: groupId, user_id: userId }]);
    if (error) throw error;
  }
};