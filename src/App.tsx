import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Categories from './pages/Categories';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import BookDetails from './pages/BookDetails';
import FAQ from './pages/FAQ';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Premium from './pages/Premium';
import Community from './pages/Community';
import GroupDetails from './pages/GroupDetails';
import DiscussionDetails from './pages/DiscussionDetails';
import ReadingView from './pages/ReadingView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="book/:id" element={<BookDetails />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="register" element={<Register />} />
          <Route path="premium" element={<Premium />} />
          <Route path="community" element={<Community />} />
          <Route path="group/:id" element={<GroupDetails />} />
          <Route path="discussion/:groupId/:discussionId" element={<DiscussionDetails />} />
          <Route path="read/:bookId/:chapterId" element={<ReadingView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;