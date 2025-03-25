import React from "react";
import { Modal, Button } from "react-bootstrap";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useAtom } from "jotai";
import { showLoginModalAtom } from "../atoms/authAtoms";
import axios from "axios";


const GOOGLE_CLIENT_ID = "40830695159-61crq03ajlt13c4r1ftiahn31as19q6f.apps.googleusercontent.com";

const LoginModal = () => {
    const [showLoginModal, setShowLoginModal] = useAtom(showLoginModalAtom);

  const handleSuccess = async (response) => {
    const token = response.credential
    try {
        const res =  await axios.post("http://localhost:5000/api/auth/google-login", { token });
     
         localStorage.setItem("token", response.credential); 
        
         setShowLoginModal(false); // Close modal
        console.log("User authenticated:", res.data.user);
      } catch (error) {
        console.error("Google Login Failed:", error);
      }
  };

  const handleFailure = (error) => {
    console.log("Google Login Failed:", error);
  };            

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Modal show={ showLoginModal} onHide={() => setShowLoginModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </GoogleOAuthProvider>
  );
};

export default LoginModal;
