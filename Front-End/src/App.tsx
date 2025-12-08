import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
// import CartPage from "./CartPage.tsx";
import SellPage from "./pages/SellPage.tsx";
import DiscussionPage from "./DiscussionPage.tsx"
import TextbookInfoPage from "./pages/TextbookInfoPage.tsx";
import CommentPage from "./CommentPage.tsx";
import ChatPage from "./pages/ChatPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";


// type CommentsByPost = {
//   [title: string]: string[];
// };

//Allows users to search for a specific textbook with the help of a dynamic 
//list that changes the closer the user is to a textbook's name.

function App() {
  // const [cartItems, setCartItems] = useState<Textbook[]>([]);

//   const [commentsByPost, setCommentsByPost] = useState<CommentsByPost>({
//     "Best textbook for studying art history?": [
//       `I love seeing a person getting interested in art history! A good textbook that I 
// recommend is "Gardner's Art Through the Ages by Helen Gardner". This book does a great 
// job at describing different art forms and eras of art throughout history.`,
//       `I hear that "Art: A Brief History by Marilyn Stokstad" is a pretty good textbook for 
// getting a rough idea of art throughout history. You can probably find it on this site at 
// a decent price.`,
//     ],
//   });

  //Lets users add textbooks to the cart.
  // const addTextbook = (newBook: Textbook) => {
  //   setTextbooks((prev) => [...prev, newBook]);
  // };

  //Prevents users from adding the same textbook to the cart.
  // const addToCart = (book: Textbook) => {
  //   setCartItems((prev) => {
  //     const alreadyInCart = prev.some((item) => item.title === book.title);
  //     if (alreadyInCart) {
  //       return prev;
  //     }
  //     return [...prev, book];
  //   });
  // };

  //Turns the price string with an actual number/value.
  // const parsePrice = (price: string): number => {
  //   const numeric = parseFloat(price.replace(/[^0-9.]/g, ""));
  //   return isNaN(numeric) ? 0 : numeric;
  // };

  //Calculates the total price the user must pay with all textbooks considered.
  // const cartTotal = cartItems.reduce(
  //   (sum, item) => sum + parsePrice(item.price),
  //   0
  // );

  // const clearCart = () => {
  //   setCartItems([]);
  // };

  //Lets users add comments in the Comment page under a specific discussion.
  // const addComment = (postTitle: string, comment: string) => {
  //   setCommentsByPost((prev) => ({
  //     ...prev,
  //     [postTitle]: [...(prev[postTitle] || []), comment],
  //   }));
  // };

  // Dummy textbook card used to show what the textbook cards look like.
  // const staticTextbook: Textbook = {
  //   id: 0,
  //   title: "Calculus by Ron Larson and Bruce Edwards",
  //   author: "Ron Larson, Bruce Edwards",
  //   seller: "John Doe",
  //   subject: "Math",
  //   course_num: "MTH 2003",
  //   condition: "Used",
  //   price: 60.00,
  //   image_url: Mathtextbook,
  //   status: "Unsold",
  //   description:
  //     "This book is a good refresher for important calculus concepts for a beginner-intermediate course. I mostly used the textbook for practice problems, so I barely touched it. The condition is used, but the actual condition is near pristine.",
  // };
  // const allTextbooks: Textbook[] = [staticTextbook, ...textbooks];
  
  const [commentsByPost, setCommentsByPost] = useState<{ [title: string]: string[] }>({});

  // This function will be passed to CommentPage so it can add new comments
  const addComment = (postTitle: string, comment: string) => {
    setCommentsByPost((prev) => ({
      ...prev,
      [postTitle]: [...(prev[postTitle] || []), comment],
    }));
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<HomePage/>}
        />
        {/*Routes to all the other pages in the website.*/}
        {/* <Route
          path="/Cart"
          element={
            <CartPage
              cartItems={cartItems}
              total={cartTotal}
              clearCart={clearCart}
            />
          }
        /> */}
        <Route path="/sell" element={<SellPage />} />
        <Route path="/Discussion" element={<DiscussionPage />} />

        <Route
          path="/TextbookInfo/:id"
          element={<TextbookInfoPage />}
        />

        <Route
          path="/Comment"
          element={
            <CommentPage
              commentsByPost={commentsByPost}
              addComment={addComment}
            />
          }
        />

        <Route path="/Chat" element={<ChatPage />} />

        <Route path="/Login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
