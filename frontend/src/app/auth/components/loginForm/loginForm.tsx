import { useForm } from "react-hook-form";
import styles from "../../page.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { loginUser } from "@/store/auth/authSlice";
import { useToast } from "@chakra-ui/toast";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Button, Input } from "@chakra-ui/react";

interface FormData {
  nickname: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: FormData) => {
    try {
      await dispatch(loginUser(data)).unwrap();

      toast({
        title: "Login Successful",
        description: "Enjoy your chats :)",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error?.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <h1>Login form</h1>

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

      <FormControl isInvalid={!!errors.password}>
        <FormLabel>Password</FormLabel>
        <Input
          className={styles.inputField}
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
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

export default LoginForm;
