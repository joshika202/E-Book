import { Book } from '../types';

export const books: Book[] = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    price: 14.99,
    rating: 4.5,
    genre: "Fiction",
    synopsis: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    releaseDate: "2020-08-13",
    isFree: false,
    sampleChapters: [
      {
        id: "1-1",
        title: "Chapter 1: The Library",
        content: "Mrs. Elm made her first move. A knight hopping over the row of white pawns. 'When did you first realize you loved chess?' Nora asked her. Mrs. Elm smiled..."
      }
    ]
  },
  {
    id: "2",
    title: "Dune",
    author: "Frank Herbert",
    coverUrl: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    price: 12.99,
    rating: 4.8,
    genre: "Science Fiction",
    synopsis: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange.",
    releaseDate: "1965-08-01",
    isFree: false,
    sampleChapters: [
      {
        id: "2-1",
        title: "Chapter 1: The Beginning",
        content: "A beginning is the time for taking the most delicate care that the balances are correct. This every sister of the Bene Gesserit knows..."
      }
    ]
  },
  {
    id: "3",
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    coverUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    price: 9.99,
    rating: 4.7,
    genre: "Self-Help",
    synopsis: "Think and Grow Rich has been called the 'Granddaddy of All Motivational Literature.' It was the first book to boldly ask, 'What makes a winner?'",
    releaseDate: "1937-01-01",
    isFree: true,
    sampleChapters: [
      {
        id: "3-1",
        title: "Chapter 1: Thoughts Are Things",
        content: "TRULY, thoughts are things, and powerful things at that, when they are mixed with definiteness of purpose, persistence, and a burning desire..."
      }
    ]
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    price: 0,
    rating: 4.9,
    genre: "Romance",
    synopsis: "Pride and Prejudice follows the turbulent relationship between Elizabeth Bennet, the daughter of a country gentleman, and Fitzwilliam Darcy, a rich aristocratic landowner.",
    releaseDate: "1813-01-28",
    isFree: true,
    sampleChapters: [
      {
        id: "4-1",
        title: "Chapter 1",
        content: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife..."
      }
    ]
  },
  {
    id: "5",
    title: "The Da Vinci Code",
    author: "Dan Brown",
    coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    price: 11.99,
    rating: 4.2,
    genre: "Mystery",
    synopsis: "While in Paris, Harvard symbologist Robert Langdon is awakened by a phone call in the dead of the night. The elderly curator of the Louvre has been murdered inside the museum.",
    releaseDate: "2003-03-18",
    isFree: false,
    sampleChapters: [
      {
        id: "5-1",
        title: "Prologue",
        content: "Louvre Museum, Paris 10:46 PM. The renowned curator Jacques Saunière staggered through the vaulted archway of the museum's Grand Gallery..."
      }
    ]
  },
  {
    id: "6",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    coverUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    price: 15.99,
    rating: 4.6,
    genre: "Science",
    synopsis: "A landmark volume in science writing by one of the great minds of our time, Stephen Hawking's book explores such profound questions as: How did the universe begin—and what made its start possible?",
    releaseDate: "1988-01-01",
    isFree: false,
    sampleChapters: [
      {
        id: "6-1",
        title: "Chapter 1: Our Picture of the Universe",
        content: "A well-known scientist once gave a public lecture on astronomy. He described how the earth orbits around the sun and how the sun, in turn, orbits around the center of a vast collection of stars called our galaxy..."
      }
    ]
  }
];