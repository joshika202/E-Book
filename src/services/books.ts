import { supabase } from '../config/supabase';
import { Book } from '../types';

export const bookService = {
  async getBooks() {
    const { data, error } = await supabase
      .from('books')
      .select('*');
    if (error) throw error;
    return data as Book[];
  },

  async getBookById(id: string) {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Book;
  },

  async updateReadingProgress(userId: string, bookId: string, chapterId: string, progress: number) {
    const { error } = await supabase
      .from('reading_progress')
      .upsert({
        user_id: userId,
        book_id: bookId,
        chapter_id: chapterId,
        progress
      });
    if (error) throw error;
  }
};