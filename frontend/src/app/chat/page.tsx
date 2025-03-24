"use client";

import React from "react";
import { Button } from "@chakra-ui/react";
import { logout } from "@/store/auth/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import RequireAuth from "@/components/auth/requireAuth";

const ChatPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <RequireAuth>
    <div>
      <div>Chat page!</div>
      <Button onClick={() => dispatch(logout())}>Log Out</Button>
    </div>
    </RequireAuth>
  );
};

export default ChatPage;
