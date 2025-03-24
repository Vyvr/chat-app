import styles from "../../page.module.css";

import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Box, Button, Input } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { registerUser } from "@/store/auth/authSlice";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/toast";

interface FormData {
  nickname: string;
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const toast = useToast();

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: FormData) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      toast({
        title: "Registration Successful",
        description: "You can now log in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <h1>Register form</h1>

      <FormControl isInvalid={!!errors.nickname}>
        <FormLabel>Nickname</FormLabel>
        <Input
          className={styles.inputField}
          type="text"
          placeholder="Nickname"
          {...register("nickname", { required: "Nickname is required" })}
        />
        <FormErrorMessage>{errors.nickname?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.email}>
        <FormLabel>Email</FormLabel>
        <Input
          className={styles.inputField}
          type="text"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" },
          })}
        />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.password}>
        <FormLabel>Password</FormLabel>
        <Input
          className={styles.inputField}
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
              message:
                "Password must contain at least 1 uppercase and 1 lowercase letter",
            },
          })}
        />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>

      <Button colorScheme="teal" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default RegisterForm;
