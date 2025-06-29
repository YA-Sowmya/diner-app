import React, { useRef, useState, useEffect, useCallback } from "react";
import { supabase } from "./supabaseClient";
import './App.css'
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import ReservationForm from "./components/ReservationForm";
import SpecialItems from "./components/SpecialItems";
import Testimonials from "./components/Testimonials";
import About from "./components/About";
import ReservationList from "./components/ReservationList";
import CheckoutForm from "./components/CheckoutForm"
import Menu from "./components/Menu";
import Login from "./components/LoginForm";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import useCart from "./hooks/useCart";
import { useToast } from './context/ToastContext';




function App() {
  const homeRef = useRef();
  const aboutRef = useRef();
  const toast = useToast();
  const [user, setUser] = useState(null);
  const [activeView, setActiveView] = useState("home");
  const [reservations, setReservations] = useState([]);

  const {
    items: cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    cartCount,
  } = useCart(user);

  const scrollTo = (ref) => {
    setActiveView("home");
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener?.subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    if (activeView === "menu") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeView]);

  const fetchReservations = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: true });

    if (error) {
      console.error("Fetch error:", error.message);
    } else {
      console.log("Fetched reservations:", data);
      setReservations(data);
    }
  }, [user]);

  useEffect(() => {
    if (user && activeView === "reservations") {
      fetchReservations();
    }
  }, [user, activeView, fetchReservations]);

  const handleDeleteReservation = async (id) => {
    const { error } = await supabase
      .from('reservations')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Delete error:", error.message);
    } else {
      fetchReservations();
      toast("Cancelled!");
    }
  };
const handleCheckoutSuccess = () => {
  setActiveView("home");
  
};
  return (
    <div className="font-body bg-white text-gray-800">
      <Navbar
        isLoggedIn={!!user}
        cartItems={cartItems}
        cartCount={cartCount}
        onCart={() => setActiveView('cart')}
        onHome={() => scrollTo(homeRef)}
        onAbout={() => scrollTo(aboutRef)}
        onLogin={() => setActiveView("login")}
        onLogout={async () => {
          await supabase.auth.signOut();
          setUser(null);
          setActiveView("home");
          toast("Logged out successfully");
        }}
        onOrder={() => setActiveView("menu")}
        onReservation={() => setActiveView("reservations")}
      />

      <main>
        {activeView === "home" && (
          <>
            <section ref={homeRef}>
              <Banner onReserve={() => user ? setActiveView("reservationForm") : setActiveView("login")} />
            </section>
            <SpecialItems
              onViewMenu={() => setActiveView("menu")}
              cart={cartItems}
              onAdd={addToCart}
              onIncrement={addToCart}
              onDecrement={removeFromCart}
              user={user}
            />
            <Testimonials />
            <section ref={aboutRef}><About /></section>
          </>
        )}

        {activeView === "login" && <Login onClose={() => setActiveView("home")} />}
        {activeView === "menu" && (
          <Menu
            onBack={() => setActiveView("home")}
            cart={cartItems}
            onAdd={addToCart}
            onIncrement={addToCart}
            onDecrement={removeFromCart}
            user={user}
          />
        )}
        {activeView === "reservations" && (
          <ReservationList
            user={user}
            reservations={reservations}
            onReserve={() => {
              if (user) setActiveView("reservationForm");
              else setActiveView("login");
            }}
            onBack={() => setActiveView("home")}
            onDelete={handleDeleteReservation}
          />
        )}
        {activeView === "reservationForm" && <ReservationForm user={user} onClose={() => setActiveView("home")} />}
        {activeView === 'cart' && (
          <Cart
            items={cartItems}
            onBack={() => setActiveView('home')}
            onIncrease={(id) => {
              const item = cartItems.find((i) => i.id === id);
              if (item) addToCart(item);
            }}
            onDecrease={(id) => removeFromCart(id)}
            onRemove={(id) => removeFromCart(id, true)}
            onCheckout={() => user ? setActiveView("checkout") : setActiveView("login")}
          />
        )}
        {activeView === "checkout" && (
  <CheckoutForm
    user={user}
    cartItems={cartItems}
    clearCart={clearCart}
    onBack={() => setActiveView("cart")}
    onSuccess={handleCheckoutSuccess}
  />
)}
      </main>

      <Footer
        onHome={() => scrollTo(homeRef)}
        onAbout={() => scrollTo(aboutRef)}
        onOrder={() => setActiveView("menu")}
        onReservation={() => setActiveView("reservations")}
      />
    </div>
  );
}

export default App;
