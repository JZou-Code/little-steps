import {createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); 
  const [showSignupModal, setShowSignupModal] = useState(false); 

  const openSignupModal = () => {
    setShowSignupModal(true);
    setShowLoginModal(false); 
  }; 

  const closeSignupModal = () => setShowSignupModal(false); 

  useEffect(()=>{
    const storedUser = localStorage.getItem('user');
    if(storedUser){
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []); 

  const openLoginModal = () => setShowLoginModal(true); 
  const closeLoginModal = () => setShowLoginModal(false); 

  const login = (name) => {
    const newUser = {name};
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser)); 
  }; 

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    showLoginModal,
    openLoginModal,
    closeLoginModal,
    showSignupModal,
    openSignupModal,
    closeSignupModal
  }; 

  return <AuthContext.Provider value= {value}>{children}</AuthContext.Provider>
}; 

