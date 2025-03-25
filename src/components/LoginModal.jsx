import React from "react";
import { Modal, Button } from "react-bootstrap";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useAtom } from "jotai";
import { showLoginModalAtom } from "../atoms/authAtoms";
import axios from "axios";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const API_URL = import.meta.env.VITE_API_URL;

const LoginModal = () => {
  const [showLoginModal, setShowLoginModal] = useAtom(showLoginModalAtom);

  const handleSuccess = async (response) => {
    const token = response.credential;
    try {
      const res = await axios.post(`${API_URL}/api/auth/google-login`, { token });

      localStorage.setItem("token", token); // Save token

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
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
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
