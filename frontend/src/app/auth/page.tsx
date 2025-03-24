"use client";
import styles from "./page.module.css";
import { AppDispatch, RootState } from "@/store/store";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RegisterForm from "./components/registerForm/registerForm";
import LoginForm from "./components/loginForm/loginForm";

export const AuthPage: React.FC = () => {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch<AppDispatch>();

  const [showRegister, setShowRegister] = useState(false); // 🔥 Toggle state

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/chat");
    }
  }, [isAuthenticated, router]);

  return (
    <div className={styles.authWrapper}>
      {showRegister ? <RegisterForm /> : <LoginForm />}

      <Button
        onClick={() => setShowRegister(!showRegister)}
        colorScheme="teal"
        mt={5}
      >
        {showRegister
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </Button>
    </div>
  );
};

export default AuthPage;
