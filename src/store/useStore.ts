import { create } from 'zustand';
import type { Book, User, DiscussionGroup, Annotation, Comment, Discussion, Reply } from '../types';
import { supabase } from '../config/supabase';

interface Store {
  user: User | null;
  books: Book[];
  filteredBooks: Book[];
  discussionGroups: DiscussionGroup[];
  filters: {
    genre: string;
    priceRange: string;
    rating: number;
    sortBy: string;
  };
  
  // Auth
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
  
  // Book management
  setUser: (user: User | null) => void;
  setBooks: (books: Book[]) => void;
  setFilteredBooks: (books: Book[]) => void;
  updateFilters: (filters: Partial<Store['filters']>) => void; // Add missing interface
  addToReadingList: (bookId: string) => void;
  fetchBooks: () => Promise<void>;
  
  // Community features
  getGroupsByUser: () => DiscussionGroup[];
  getGroupsByBook: (bookId: string) => DiscussionGroup[];
  createGroup: (name: string, bookId: string, description: string) => Promise<void>;
  joinGroup: (groupId: string) => void;
  leaveGroup: (groupId: string) => void;
  createDiscussion: (groupId: string, title: string, content: string) => void;
  addComment: (groupId: string, discussionId: string, text: string) => void;
  addReply: (groupId: string, discussionId: string, commentId: string, text: string) => void;
  likeComment: (groupId: string, discussionId: string, commentId: string) => void;
  
  // Annotations
  addAnnotation: (bookId: string, chapterId: string, text: string, highlight: string, position: number, isPrivate: boolean) => void;
  getAnnotationsByBook: (bookId: string) => Annotation[];
  getPublicAnnotationsByBook: (bookId: string) => Annotation[];
  deleteAnnotation: (annotationId: string) => void;
}

// Remove the duplicate useAppStore export and fix the interface implementations

interface Store {
  user: User | null;
  books: Book[];
  filteredBooks: Book[];
  discussionGroups: DiscussionGroup[];
  filters: {
    genre: string;
    priceRange: string;
    rating: number;
    sortBy: string;
  };
  
  // Auth
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
  
  // Book management
  setUser: (user: User | null) => void;
  setBooks: (books: Book[]) => void;
  setFilteredBooks: (books: Book[]) => void;
  updateFilters: (filters: Partial<Store['filters']>) => void; // Add missing interface
  addToReadingList: (bookId: string) => void;
  fetchBooks: () => Promise<void>;
  
  // Community features
  getGroupsByUser: () => DiscussionGroup[];
  getGroupsByBook: (bookId: string) => DiscussionGroup[];
  createGroup: (name: string, bookId: string, description: string) => Promise<void>;
  joinGroup: (groupId: string) => void;
  leaveGroup: (groupId: string) => void;
  createDiscussion: (groupId: string, title: string, content: string) => void;
  addComment: (groupId: string, discussionId: string, text: string) => void;
  addReply: (groupId: string, discussionId: string, commentId: string, text: string) => void;
  likeComment: (groupId: string, discussionId: string, commentId: string) => void;
  
  // Annotations
  addAnnotation: (bookId: string, chapterId: string, text: string, highlight: string, position: number, isPrivate: boolean) => void;
  getAnnotationsByBook: (bookId: string) => Annotation[];
  getPublicAnnotationsByBook: (bookId: string) => Annotation[];
  deleteAnnotation: (annotationId: string) => void;
}

export const useStore = create<Store>((set, get) => ({
  user: null,
  books: [],
  filteredBooks: [],
  discussionGroups: [],
  filters: {
    genre: 'all',
    priceRange: 'all',
    rating: 0,
    sortBy: 'popularity',
  },

  // Update fetchBooks to get data from Supabase
  fetchBooks: async () => {
    try {
      const { data, error } = await supabase
        .from('books')
        .select(`
          *,
          sample_chapters (
            id,
            title,
            content,
            images (
              url,
              caption
            )
          )
        `);
      if (error) throw error;
      set({ books: data, filteredBooks: data });
    } catch (error) {
      console.error('Fetch books error:', error);
      throw error;
    }
  },

  // Update discussion group methods to use Supabase
  createGroup: async (name, bookId, description) => {
    try {
      const { user } = get();
      if (!user) throw new Error('User not authenticated');
      
      const { data: group, error } = await supabase
        .from('discussion_groups')
        .insert([{
          name,
          book_id: bookId,
          description,
          created_by: user.id
        }])
        .select()
        .single();
        
      if (error) throw error;

      const { error: memberError } = await supabase
        .from('group_members')
        .insert([{
          group_id: group.id,
          user_id: user.id
        }]);
        
      if (memberError) throw memberError;

      set((state) => ({
        discussionGroups: [...state.discussionGroups, group]
      }));
    } catch (error) {
      console.error('Create group error:', error);
      throw error;
    }
  },

  fetchDiscussionGroups: async () => {
    try {
      const { data, error } = await supabase
        .from('discussion_groups')
        .select(`
          *,
          members:group_members(user_id),
          discussions (
            id,
            title,
            content,
            user_id,
            created_at,
            comments (
              id,
              user_id,
              text,
              created_at,
              likes,
              replies (*)
            )
          )
        `);
      if (error) throw error;
      set({ discussionGroups: data });
    } catch (error) {
      console.error('Fetch discussion groups error:', error);
      throw error;
    }
  },

  // Update other methods to use Supabase
  createDiscussion: async (groupId, title, content) => {
    try {
      const { user } = get();
      if (!user) throw new Error('User not authenticated');

      const { data: discussion, error } = await supabase
        .from('discussions')
        .insert([{
          group_id: groupId,
          title,
          content,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        discussionGroups: state.discussionGroups.map(group =>
          group.id === groupId
            ? { ...group, discussions: [...group.discussions, discussion] }
            : group
        )
      }));
    } catch (error) {
      console.error('Create discussion error:', error);
      throw error;
    }
  },

  addToReadingList: async (bookId) => {
    try {
      const { user } = get();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('reading_list')
        .insert([{ user_id: user.id, book_id: bookId }]);
      if (error) throw error;

      set((state) => ({
        user: {
          ...state.user!,
          readingList: [...state.user!.readingList, bookId]
        }
      }));
    } catch (error) {
      console.error('Add to reading list error:', error);
      throw error;
    }
  },

  // Community features
  createGroup: async (name: string, bookId: string, description: string) => {
    try {
      const { user } = get();
      if (!user) throw new Error('User not authenticated');
      
      const { data: group, error } = await supabase
        .from('discussion_groups')
        .insert([{
          name,
          book_id: bookId,
          description,
          created_by: user.id
        }])
        .select()
        .single();
        
      if (error) throw error;

      const { error: memberError } = await supabase
        .from('group_members')
        .insert([{ group_id: group.id, user_id: user.id }]);
        
      if (memberError) throw memberError;

      set((state) => ({
        discussionGroups: [...state.discussionGroups, group]
      }));
    } catch (error) {
      console.error('Create group error:', error);
      throw error;
    }
  },

  joinGroup: async (groupId) => {
    try {
      const { user } = get();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('group_members')
        .insert([{ group_id: groupId, user_id: user.id }]);
      if (error) throw error;

      set((state) => ({
        discussionGroups: state.discussionGroups.map(group =>
          group.id === groupId
            ? { ...group, members: [...group.members, user.id] }
            : group
        )
      }));
    } catch (error) {
      console.error('Join group error:', error);
      throw error;
    }
  },

  leaveGroup: async (groupId) => {
    try {
      const { user } = get();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('group_members')
        .delete()
        .match({ group_id: groupId, user_id: user.id });
      if (error) throw error;

      set((state) => ({
        discussionGroups: state.discussionGroups.map(group =>
          group.id === groupId
            ? { ...group, members: group.members.filter(id => id !== user.id) }
            : group
        )
      }));
    } catch (error) {
      console.error('Leave group error:', error);
      throw error;
    }
  },

  createDiscussion: async (groupId, title, content) => {
    try {
      const { user } = get();
      if (!user) throw new Error('User not authenticated');

      const { data: discussion, error } = await supabase
        .from('discussions')
        .insert([{
          group_id: groupId,
          title,
          content,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        discussionGroups: state.discussionGroups.map(group =>
          group.id === groupId
            ? { ...group, discussions: [...group.discussions, discussion] }
            : group
        )
      }));
    } catch (error) {
      console.error('Create discussion error:', error);
      throw error;
    }
  },

  addComment: async (groupId, discussionId, text) => {
    try {
      const { user } = get();
      if (!user) throw new Error('User not authenticated');

      const { data: comment, error } = await supabase
        .from('comments')
        .insert([{
          discussion_id: discussionId,
          user_id: user.id,
          text
        }])
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        discussionGroups: state.discussionGroups.map(group =>
          group.id === groupId
            ? {
                ...group,
                discussions: group.discussions.map(discussion =>
                  discussion.id === discussionId
                    ? { ...discussion, comments: [...discussion.comments, comment] }
                    : discussion
                )
              }
            : group
        )
      }));
    } catch (error) {
      console.error('Add comment error:', error);
      throw error;
    }
  },

  addReply: async (groupId, discussionId, commentId, text) => {
    try {
      const { user } = get();
      if (!user) throw new Error('User not authenticated');

      const { data: comment, error } = await supabase
        .from('comments')
        .insert([{
          discussion_id: discussionId,
          user_id: user.id,
          text
        }])
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        discussionGroups: state.discussionGroups.map(group =>
          group.id === groupId
            ? {
                ...group,
                discussions: group.discussions.map(discussion =>
                  discussion.id === discussionId
                    ? { ...discussion, comments: [...discussion.comments, comment] }
                    : discussion
                )
              }
            : group
        )
      }));
    } catch (error) {
      console.error('Add reply error:', error);
      throw error;
    }
  },

  likeComment: async (groupId, discussionId, commentId) => {
    try {
      const { user } = get();
      if (!user) throw new Error('User not authenticated');

      const { data: comment, error } = await supabase
        .from('comments')
        .insert([{
          discussion_id: discussionId,
          user_id: user.id,
          likes: user.id
        }])
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        discussionGroups: state.discussionGroups.map(group =>
          group.id === groupId
            ? {
                ...group,
                discussions: group.discussions.map(discussion =>
                  discussion.id === discussionId
                    ? { ...discussion, comments: [...discussion.comments, comment] }
                    : discussion
                )
              }
            : group
        )
      }));
    } catch (error) {
      console.error('Like comment error:', error);
      throw error;
    }
  },

  // Annotations
  addAnnotation: async (bookId, chapterId, text, highlight, position, isPrivate) => {
    try {
      const { user } = get();
      if (!user) throw new Error('User not authenticated');

      const { data: annotation, error } = await supabase
        .from('annotations')
        .insert([{
          book_id: bookId,
          chapter_id: chapterId,
          user_id: user.id,
          text,
          highlight,
          position,
          is_private: isPrivate
        }])
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        user: {
          ...state.user!,
          annotations: [...state.user!.annotations, annotation]
        }
      }));
    } catch (error) {
      console.error('Add annotation error:', error);
      throw error;
    }
  },

  getAnnotationsByBook: (bookId: string): Annotation[] => {
    try {
      const { user } = get();
      if (!user) return [];

      const { data, error } = await supabase
        .from('annotations')
        .select('*')
        .eq('book_id', bookId)
        .eq('user_id', user.id);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get annotations error:', error);
      return [];
    }
  },

  deleteAnnotation: async (annotationId) => {
    try {
      const { user } = get();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('annotations')
        .delete()
        .match({ id: annotationId, user_id: user.id });

      if (error) throw error;

      set((state) => ({
        user: {
          ...state.user!,
          annotations: state.user!.annotations.filter(a => a.id !== annotationId)
        }
      }));
    } catch (error) {
      console.error('Delete annotation error:', error);
      throw error;
    }
  }
}));

export const useAppStore = create((set, get) => ({
  user: null,
  books: [],
  filteredBooks: [],
  discussionGroups: [],

  setUser: (user: User | null) => set({ user }),
  setFilteredBooks: (books: Book[]) => set({ filteredBooks: books }),

  signIn: async (email: string, password: string) => {
    try {
      // TODO: Implement actual auth service
      // Temporary mock implementation
      const user = {
        id: '1',
        email,
        name: 'Test User',
        readingList: [],
        groups: [],
        annotations: []
      };
      set({ user: user as User });
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  },

  signUp: async (email, password, name) => {
    try {
      await authService.signUp(email, password, name);
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  },

  fetchBooks: async () => {
    try {
      const books = await bookService.getBooks();
      set({ books, filteredBooks: books });
    } catch (error) {
      console.error('Fetch books error:', error);
      throw error;
    }
  },

  addToReadingList: (bookId) => 
    set((state) => {
      if (!state.user) return state;
      return {
        user: {
          ...state.user,
          readingList: [...state.user.readingList, bookId],
        },
      };
    }),

  createGroup: async (name, bookId, description) => {
    try {
      const { user } = get();
      if (!user) throw new Error('User not authenticated');
      
      const group = await groupService.createGroup(name, description, bookId, user.id);
      set((state) => ({
        discussionGroups: [...state.discussionGroups, group]
      }));
    } catch (error) {
      console.error('Create group error:', error);
      throw error;
    }
  },

  leaveGroup: (groupId) =>
    set((state) => {
      if (!state.user) return state;
      
      const updatedGroups = state.discussionGroups.map(group => {
        if (group.id === groupId) {
          return {
            ...group,
            members: group.members.filter(id => id !== state.user!.id)
          };
        }
        return group;
      });
      
      return {
        discussionGroups: updatedGroups,
        user: {
          ...state.user,
          groups: state.user.groups.filter(id => id !== groupId)
        }
      };
    }),

  getGroupsByUser: () => {
    const { user, discussionGroups } = get();
    if (!user) return [];
    return discussionGroups.filter(group => group.members.includes(user.id));
  },

  getGroupsByBook: (bookId) => {
    const { discussionGroups } = get();
    return discussionGroups.filter(group => group.bookId === bookId);
  }
}));