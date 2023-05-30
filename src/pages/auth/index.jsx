import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tooltip,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import React from "react";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuthLayout from "layouts/auth/Default";
// Assets
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { headers } from "../../../next.config";
import { Router, useRouter } from "next/router";

export default function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const toast = useToast();
  const router = useRouter();
  const [signInForm, setSignInForm] = React.useState({
    email: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = React.useState({
    name: "",
    email: "",
    password: "",
    confirm_pwd: "",
  });
  const [show, setShow] = React.useState({
    password: false,
    confirm_pwd: false,
  });
  const [tabIndex, setTabIndex] = React.useState(0);
  const [loading, setLoading] = React.useState({
    signin: false,
    register: false,
  });
  const [error, setError] = React.useState("sdsdsdsdss");

  const handleChangeSignIn = (e) => {
    const { name, value } = e.target;

    setSignInForm({ ...signInForm, [name]: value });
    console.log(signInForm);
  };

  const handleChangeRegister = (e) => {
    setError("");
    const { name, value } = e.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const handleClickPass = () => setShow({ ...show, password: !show.password });

  const handleClickConfirm = () =>
    setShow({ ...show, confirm_pwd: !show.confirm_pwd });

  const handleSignIn = async (e) => {
    // SEND SIGN IN  CREDENTIALS TO THE BACKEND
    e.preventDefault();
    setLoading({ ...loading, signin: true });
    try {
      const res = await fetch(
        `https://site-listener.vercel.app/api/auth?email=${signInForm.email}&password=${signInForm.password}`,
        {
          method: "GET",
        }
      );
      const resData = await res.json();

      console.log(resData);

      if (res && resData) {
        setLoading({ ...loading, signin: false });
        if (resData.user) {
          toast({
            title: "Welcome Back.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          window.localStorage.setItem("user", JSON.stringify(resData.user)); //Save user information on localstorage
          setSignInForm({
            email: "",
            password: "",
          });
          router.push("/admin/default");
        } else {
          toast({
            title: resData.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    } catch (error) {
      setLoading({ ...loading, signin: false });
      toast({
        title: "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log(error);
    }
    return;
  };

  const handleRegister = async (e) => {
    // SEND REGISTER CREDENTIALS TO THE BACKEND
    e.preventDefault();
    setLoading({ ...loading, register: true });
    try {
      const res = await fetch("https://site-listener.vercel.app/api/auth", {
        body: JSON.stringify({
          username: registerForm.name,
          email: registerForm.email,
          password: registerForm.confirm_pwd,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const resData = await res.json();

      if (res && resData) {
        setLoading({ ...loading, register: false });
        setTabIndex("0");
        toast({
          title: "Account created.",
          description: "Please sign in",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
        setRegisterForm({
          name: "",
          email: "",
          password: "",
          confirm_pwd: "",
        });
      }
    } catch (error) {
      setLoading({ ...loading, register: false });
      toast({
        title: "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log(error);
    }
    return;
  };

  React.useEffect(() => {
    // PASSWORD VALIDATION
    if (
      registerForm["password"] !== "" &&
      registerForm["confirm_pwd"] !== "" &&
      registerForm["password"] !== registerForm["confirm_pwd"]
    ) {
      setError("Passwords doesn't match");
      return;
    }
  }, [registerForm]);

  return (
    <DefaultAuthLayout illustrationBackground={"/img/auth/auth.png"}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Tabs
          onChange={(index) => setTabIndex(index)}
          index={tabIndex}
          isFitted
          colorScheme="messenger"
          isLazy
        >
          <TabList>
            <Tab>Sign In</Tab>
            <Tab>Sign Up</Tab>
          </TabList>

          <TabPanels>
            {/* SING IN PANEL */}
            <TabPanel>
              <Box me="auto">
                <Heading color={textColor} fontSize="36px" my="10px">
                  Sign In
                </Heading>
                <Text
                  mb="30px"
                  ms="4px"
                  color={textColorSecondary}
                  fontWeight="400"
                  fontSize="md"
                >
                  Enter your email and password to sign in!
                </Text>
              </Box>
              <Flex
                zIndex="2"
                direction="column"
                w={{ base: "100%", md: "420px" }}
                maxW="100%"
                background="transparent"
                borderRadius="15px"
                mx={{ base: "auto", lg: "unset" }}
                me="auto"
                mb={{ base: "20px", md: "auto" }}
              >
                <form onSubmit={handleSignIn}>
                  <FormControl>
                    <FormLabel
                      display="flex"
                      ms="4px"
                      fontSize="sm"
                      fontWeight="500"
                      color={textColor}
                      mb="8px"
                    >
                      Email<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <Input
                      isRequired={true}
                      variant="auth"
                      fontSize="sm"
                      ms={{ base: "0px", md: "0px" }}
                      type="email"
                      placeholder="mail@sitepatrol.com"
                      mb="24px"
                      fontWeight="500"
                      size="lg"
                      name="email"
                      value={signInForm.email}
                      onChange={handleChangeSignIn}
                    />
                    <FormLabel
                      ms="4px"
                      fontSize="sm"
                      fontWeight="500"
                      color={textColor}
                      display="flex"
                    >
                      Password<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <InputGroup size="md">
                      <Input
                        isRequired={true}
                        fontSize="sm"
                        placeholder="password"
                        mb="24px"
                        sx={{
                          position: "relative",
                        }}
                        size="lg"
                        type={show.password ? "text" : "password"}
                        variant="auth"
                        name="password"
                        value={signInForm.password}
                        onChange={(e) => handleChangeSignIn(e)}
                      />
                      <InputRightElement
                        display="flex"
                        alignItems="center"
                        mt="4px"
                      >
                        <Tooltip
                          label={
                            show.password ? "Hide password!" : "Show password!"
                          }
                          shouldWrapChildren
                          mt="3"
                        >
                          <Icon
                            color={textColorSecondary}
                            _hover={{ cursor: "pointer" }}
                            as={
                              show.password
                                ? RiEyeCloseLine
                                : MdOutlineRemoveRedEye
                            }
                            onClick={handleClickPass}
                          />
                        </Tooltip>
                      </InputRightElement>
                    </InputGroup>
                    <Flex
                      justifyContent="space-between"
                      align="center"
                      mb="24px"
                    >
                      <FormControl display="flex" alignItems="center">
                        <Checkbox
                          id="remember-login"
                          colorScheme="brandScheme"
                          me="10px"
                        />
                        <FormLabel
                          htmlFor="remember-login"
                          mb="0"
                          fontWeight="normal"
                          color={textColor}
                          fontSize="sm"
                        >
                          Keep me logged in
                        </FormLabel>
                      </FormControl>
                      <Box>
                        <Text
                          color={textColorBrand}
                          fontSize="sm"
                          w="124px"
                          fontWeight="500"
                        >
                          Forgot password?
                        </Text>
                      </Box>
                    </Flex>
                    <Button
                      fontSize="sm"
                      variant="brand"
                      fontWeight="500"
                      w="100%"
                      h="50"
                      mb="24px"
                      isLoading={loading.signin}
                      type="submit"
                    >
                      Sign In
                    </Button>
                  </FormControl>
                </form>
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="start"
                  maxW="100%"
                  mt="0px"
                >
                  <Box
                    color={textColorDetails}
                    fontWeight="400"
                    fontSize="14px"
                  >
                    Not registered yet?
                    <div onClick={() => setTabIndex(1)}>
                      <Text
                        color={textColorBrand}
                        as="span"
                        _hover={{ cursor: "pointer" }}
                        ms="5px"
                        fontWeight="500"
                      >
                        Create an Account
                      </Text>
                    </div>
                  </Box>
                </Flex>
              </Flex>
            </TabPanel>

            {/* SING UP PANEL */}
            <TabPanel>
              <Box me="auto">
                <Heading color={textColor} fontSize="36px" my="10px">
                  Sign Up
                </Heading>
                <Text
                  mb="30px"
                  ms="4px"
                  color={textColorSecondary}
                  fontWeight="400"
                  fontSize="md"
                >
                  Enter your name, email and password to sign up!
                </Text>
              </Box>
              <Flex
                zIndex="2"
                direction="column"
                w={{ base: "100%", md: "420px" }}
                maxW="100%"
                background="transparent"
                borderRadius="15px"
                mx={{ base: "auto", lg: "unset" }}
                me="auto"
                mb={{ base: "20px", md: "auto" }}
              >
                <form onSubmit={handleRegister}>
                  <FormControl>
                    <FormLabel
                      display="flex"
                      ms="4px"
                      fontSize="sm"
                      fontWeight="500"
                      color={textColor}
                      mb="8px"
                    >
                      Full Name <Text color={brandStars}>*</Text>
                    </FormLabel>
                    <Input
                      isRequired={true}
                      variant="auth"
                      fontSize="sm"
                      ms={{ base: "0px", md: "0px" }}
                      type="text"
                      placeholder="John Doe"
                      mb="24px"
                      fontWeight="500"
                      size="lg"
                      name="name"
                      id="name"
                      value={registerForm.name}
                      onChange={handleChangeRegister}
                    />
                    <FormLabel
                      display="flex"
                      ms="4px"
                      fontSize="sm"
                      fontWeight="500"
                      color={textColor}
                      mb="8px"
                    >
                      Email<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <Input
                      isRequired={true}
                      variant="auth"
                      fontSize="sm"
                      ms={{ base: "0px", md: "0px" }}
                      type="email"
                      placeholder="mail@sitepatrol.com"
                      mb="24px"
                      fontWeight="500"
                      size="lg"
                      name="email"
                      id="email"
                      value={registerForm.email}
                      onChange={handleChangeRegister}
                    />
                    <FormLabel
                      ms="4px"
                      fontSize="sm"
                      fontWeight="500"
                      color={textColor}
                      display="flex"
                    >
                      Password<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <InputGroup size="md">
                      <Input
                        isRequired={true}
                        fontSize="sm"
                        placeholder="Min. 8 characters"
                        mb="24px"
                        size="lg"
                        minLength={8}
                        name="password"
                        type={show.password ? "text" : "password"}
                        variant="auth"
                        id="password"
                        value={registerForm.password}
                        onChange={handleChangeRegister}
                      />
                      <InputRightElement
                        display="flex"
                        alignItems="center"
                        mt="4px"
                      >
                        <Tooltip
                          label={
                            show.password ? "Hide password!" : "Show password!"
                          }
                          shouldWrapChildren
                          mt="3"
                        >
                          <Icon
                            color={textColorSecondary}
                            _hover={{ cursor: "pointer" }}
                            as={
                              show.password
                                ? RiEyeCloseLine
                                : MdOutlineRemoveRedEye
                            }
                            onClick={handleClickPass}
                          />
                        </Tooltip>
                      </InputRightElement>
                    </InputGroup>

                    <FormLabel
                      ms="4px"
                      fontSize="sm"
                      fontWeight="500"
                      color={textColor}
                      display="flex"
                    >
                      Confirm Password <Text color={brandStars}>*</Text>
                    </FormLabel>
                    <InputGroup size="md">
                      <Input
                        isRequired={true}
                        fontSize="sm"
                        placeholder="Min. 8 characters"
                        mb="24px"
                        size="lg"
                        minLength={8}
                        name="confirm_pwd"
                        type={show.confirm_pwd ? "text" : "password"}
                        variant="auth"
                        id="confirm_pwd"
                        value={registerForm.confirm_pwd}
                        onChange={handleChangeRegister}
                      />
                      <InputRightElement
                        display="flex"
                        alignItems="center"
                        mt="4px"
                      >
                        <Tooltip
                          label={
                            show.confirm_pwd
                              ? "Hide password!"
                              : "Show password!"
                          }
                          shouldWrapChildren
                          mt="3"
                        >
                          <Icon
                            color={textColorSecondary}
                            _hover={{ cursor: "pointer" }}
                            as={
                              show.confirm_pwd
                                ? RiEyeCloseLine
                                : MdOutlineRemoveRedEye
                            }
                            onClick={handleClickConfirm}
                          />
                        </Tooltip>
                      </InputRightElement>
                    </InputGroup>
                    {error !== "" && (
                      <Text color="red" textAlign={"center"} pb={2}>
                        {error}
                      </Text>
                    )}
                    <Button
                      fontSize="sm"
                      variant="brand"
                      fontWeight="500"
                      w="100%"
                      h="50"
                      mb="24px"
                      isLoading={loading.register}
                      type="submit"
                    >
                      Sign Up
                    </Button>
                  </FormControl>
                </form>
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="start"
                  maxW="100%"
                  mt="0px"
                >
                  <Box
                    color={textColorDetails}
                    fontWeight="400"
                    fontSize="14px"
                  >
                    Already have an account?
                    <div onClick={() => setTabIndex(0)}>
                      <Text
                        color={textColorBrand}
                        as="span"
                        ms="5px"
                        _hover={{ cursor: "pointer" }}
                        fontWeight="500"
                      >
                        Log in
                      </Text>
                    </div>
                  </Box>
                </Flex>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
        {/* //TODO: A TAB TO TOGGLE BETWEEN SIGN UP AND LOGIN IN */}
      </Flex>
    </DefaultAuthLayout>
  );
}
