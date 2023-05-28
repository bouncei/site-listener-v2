import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tooltip,
  FormErrorMessage,
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

export default function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [signInForm, setSignInForm] = React.useState({
    email: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = React.useState({
    name: "",
    email: "",
    password: "",
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
    return;
  };

  const handleChangeRegister = (e) => {
    const { name, value } = e.target;
    setError("");

    return;
  };
  const handleClickPass = () => setShow({ ...show, password: !show.password });

  const handleClickConfirm = () =>
    setShow({ ...show, confirm_pwd: !show.confirm_pwd });

  const handleSignIn = (e) => {
    e.preventDefault();

    return;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    return;
  };

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
                        sx={{
                          position: "relative",
                        }}
                        size="lg"
                        type={show.password ? "text" : "password"}
                        variant="auth"
                        minLength={8}
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
                      <Link href="/auth/forgot-password">
                        <a>
                          <Text
                            color={textColorBrand}
                            fontSize="sm"
                            w="124px"
                            fontWeight="500"
                          >
                            Forgot password?
                          </Text>
                        </a>
                      </Link>
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
                  <Text
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
                  </Text>
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
                        type={show.password ? "text" : "password"}
                        variant="auth"
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
                        type={show.confirm_pwd ? "text" : "password"}
                        variant="auth"
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
                  <Text
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
                  </Text>
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
