import {
  Box,
  Button,
  Divider,
  Heading,
  Input,
  VStack,
  Text,
  FormControl,
  FormErrorMessage,
  Link,
} from "@chakra-ui/react";
import { FaGooglePlusG } from "react-icons/fa";
import React, { useContext, useState } from "react";
import { auth, db, googleAuthProvider } from "../firebase-config";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import utilConfig from "../util-config";
import authContext from "../auth-context";

const cookies = new Cookies();

const Register = () => {
  const [userExists, setUserExists] = useState(false);
  const navigate = useNavigate();

  const authCtx = useContext(authContext)

  const formSchema = yup.object().shape({
    fullName: yup.string().required("Please enter your Full Name"),
    email: yup.string().email().required("Please enter your email"),
    password: yup.string().min(8).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords do not match")
      .required("Please confirm your password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  // SIGN UP LOGIC WITH EMAIL AND PASSWORD
  const onRegister = async (data) => {
    console.log(data);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      authCtx.setUserName(data.fullName)
      cookies.set("auth-token", result.user.refreshToken);
      navigate("/createroom");
    } catch (err) {
      const errorCode = err.code;
      if (errorCode === "auth/email-already-in-use") {
        console.log("User already exists with this email");
        // Show custom error message here
        setUserExists(true);
      } else {
        console.log(err);
      }
    }
  };

  const onSignUpWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      console.log(result);
      cookies.set("auth-token", result.user.refreshToken);
      navigate("/createroom");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      style={{ minHeight: "100vh" }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        textAlign="center"
        shadow="2xl"
        padding={8}
        minW={{ base: "350px", sm: "400px" }}
      >
        <Heading mb={8} size="lg">
          Register
        </Heading>
        <form onSubmit={handleSubmit(onRegister)}>
          <VStack spacing={5}>
            <FormControl isInvalid={errors.fullName}>
              <Input
                variant="flushed"
                placeholder="Full Name"
                {...register("fullName")}
              />
              <FormErrorMessage>{errors.fullName?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email || userExists}>
              <Input
                variant="flushed"
                placeholder="Email address"
                type="email"
                {...register("email")}
              />
              <FormErrorMessage>
                {errors.email?.message || (userExists && "User already exists")}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <Input
                variant="flushed"
                placeholder="Password"
                type="password"
                {...register("password")}
              />
              <FormErrorMessage>
                {errors.password?.message.charAt(0).toUpperCase() +
                  errors.password?.message.slice(1)}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.confirmPassword}>
              <Input
                variant="flushed"
                placeholder="Confirm Password"
                type="password"
                {...register("confirmPassword")}
              />
              <FormErrorMessage>
                {errors.confirmPassword?.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              colorScheme={utilConfig.colorScheme}
              width="full"
            >
              Register
            </Button>
          </VStack>
        </form>
        <Divider my={5} />
        <VStack spacing={5}>
          <Button onClick={onSignUpWithGoogle} colorScheme="red" width="full">
            <FaGooglePlusG size={30} />
            <Text ml={3}>Login with Google</Text>
          </Button>
          <Text>
            Already have an account ?{" "}
            <Text color="green" as={RouterLink} to="/">
              Login
            </Text>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default Register;
