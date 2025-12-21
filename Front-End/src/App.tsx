// import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
// import CartPage from "./CartPage.tsx";
import SellPage from "./pages/SellPage.tsx";
import DiscussionPage from "./pages/DiscussionPage.tsx"
import TextbookInfoPage from "./pages/TextbookInfoPage.tsx";
import ChatPage from "./pages/ChatPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";

//Allows users to search for a specific textbook with the help of a dynamic 
//list that changes the closer the user is to a textbook's name.

function App() {
  // const [cartItems, setCartItems] = useState<Textbook[]>([]);

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

  //   setCartItems([]);
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

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
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

        {/* CommentPage route might be redundant now, but keeping for safety for a moment */}


        <Route path="/Chat" element={<ChatPage />} />

        <Route path="/Login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
