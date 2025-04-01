export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  price: number;
  rating: number;
  genre: string;
  synopsis: string;
  releaseDate: string;
  isFree: boolean;
  sampleChapters: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  images?: ChapterImage[];
}

export interface ChapterImage {
  url: string;
  caption: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  subscription: 'free' | 'premium';
  readingList: string[];
  bookmarks: Bookmark[];
  readingProgress: ReadingProgress[];
  groups: string[];
  annotations: Annotation[];
}

export interface Bookmark {
  bookId: string;
  chapterId: string;
  position: number;
  note?: string;
}

export interface ReadingProgress {
  bookId: string;
  progress: number;
  lastRead: string;
}

export interface Annotation {
  id: string;
  bookId: string;
  chapterId: string;
  text: string;
  highlight: string;
  position: number;
  createdAt: string;
  isPrivate: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
  likes: number;
  replies: Reply[];
}

export interface Reply {
  id: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
  likes: number;
}

export interface DiscussionGroup {
  id: string;
  name: string;
  bookId: string;
  description: string;
  createdBy: string;
  createdAt: string;
  members: string[];
  discussions: Discussion[];
}

export interface Discussion {
  id: string;
  title: string;
  content: string;
  userId: string;
  userName: string;
  createdAt: string;
  comments: Comment[];
}