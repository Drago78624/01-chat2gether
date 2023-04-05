import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import utilConfig from "../util-config";
import { GrLogin } from "react-icons/gr";
import { FaGooglePlusG } from "react-icons/fa";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../firebase-config";
import Cookies from "universal-cookie";

const cookies = new Cookies()

const Login = () => {
  const [wrongPass, setWrongPass] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  const formSchema = yup.object().shape({
    email: yup.string().email().required("Please enter your email"),
    password: yup.string().min(8).required(),
  });
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onLogin = async (data) => {
    try {
      const result = await signInWithEmailAndPassword(auth, data.email, data.password);
      cookies.set("auth-token", result.user.refreshToken);
      navigate("/createroom");
    } catch (err) {
      const errorCode = err.code;
      if (errorCode === "auth/wrong-password") {
        console.log("wrong password");
        setWrongPass(true);
      } else if (errorCode === "auth/user-not-found") {
        console.log("user does not exist");
        setUserNotFound(true);
      } else {
        console.log(err);
      }
    }
  };

  const onLogInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      cookies.set("auth-token", result.user.refreshToken)
      navigate("/createroom")
      console.log(result)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
    if (cookies.get("auth-token")) {
      navigate("/createroom");
    }
  }, [])

  return (
    <Box
      style={{ minHeight: "100vh" }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box shadow="2xl" padding={8} minW={{ base: "350px", sm: "400px" }}>
        <Heading textAlign="center" mb={10}>
          Login
        </Heading>
        <form onSubmit={handleSubmit(onLogin)}>
          <VStack spacing={6}>
            <FormControl isInvalid={errors.email || userNotFound}>
              <Input
                variant="flushed"
                placeholder="Email Address"
                type="email"
                {...register("email")}
              />
              <FormErrorMessage>
                {errors.email?.message ||
                  (userNotFound && "User does not exist")}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password || wrongPass}>
              <Input
                variant="flushed"
                placeholder="Password"
                type="password"
                {...register("password")}
              />
              <FormErrorMessage>
                {errors.password?.message.charAt(0).toUpperCase() +
                  errors.password?.message.slice(1) ||
                  (wrongPass && "Bad email or password")}
              </FormErrorMessage>
            </FormControl>
            <Box width="full">
              <Button
                type="submit"
                colorScheme={utilConfig.colorScheme}
                width="full"
                onClick={onLogin}
              >
                <Text mr={2}>Login</Text>
                <GrLogin fontSize={18} />
              </Button>
              <Divider my={5} />
              <Button onClick={onLogInWithGoogle} mb={5} width="full" colorScheme="red">
                <FaGooglePlusG fontSize={24} />{" "}
                <Text ml={2}>Login with Google</Text>
              </Button>
              <Text>
                Don't have an account ?{" "}
                <Text color="green" as={RouterLink} to="/register">
                  Create account
                </Text>
              </Text>
            </Box>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
