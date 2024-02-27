import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Text,
  InputRightElement,
  InputLeftElement,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { IoArrowBackSharp } from "react-icons/io5";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

export default function FormLogin() {
  const [showPassword, setShow] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push, query } = useRouter();
  const callbackUrl = query.callbackUrl || "/";

  const handleClick = () => setShow(!showPassword);
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
        callbackUrl,
      });
      if (!res.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError(res.error);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  }

  function handleInputForm(e, field) {
    setForm({ ...form, [field]: e.target.value });
  }

  return (
    <>
      <Card w="360px" px="24px">
        <CardHeader>
          <Text fontSize="48px" fontWeight="extrabold" color="leal.primary">
            LEAL
          </Text>
          <Text fontSize="32px" fontWeight="extrabold">
            #LEALBitFun
          </Text>
        </CardHeader>
        <CardBody>
          {isSubmit ? (
            <>
              <Box
                display="flex"
                alignItems="center"
                gap="2"
                h="40px"
                _hover={{
                  cursor: "pointer",
                  w: "80px",
                  py: "4px",
                  px: "10px",
                  borderRadius: "10px",
                  bg: "leal.primary",
                  textColor: "white",
                }}
                onClick={() => setSubmit(!isSubmit)}
              >
                <IoArrowBackSharp size="15px" />
                <Text fontWeight="medium" fontSize="14px">
                  Back
                </Text>
              </Box>
              <FormControl mt="20px" isRequired>
                {error ? (
                  <Text
                    color="red"
                    fontWeight="bold"
                    fontSize="16px"
                    textAlign="center"
                    mb="2px"
                  >
                    Check your password or email
                  </Text>
                ) : (
                  ""
                )}

                <FormLabel fontWeight="bold" textAlign="start">
                  Enter your password
                </FormLabel>
                <InputGroup size="md" mt="10px">
                  <Input
                    pr="4.5rem"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    focusBorderColor="leal.primary"
                    onChange={(e) => handleInputForm(e, "password")}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Text
                  textAlign="end"
                  mt="8px"
                  color="gray"
                  fontWeight="semibold"
                  fontSize="14px"
                  _hover={{ cursor: "pointer" }}
                >
                  Lupa password
                </Text>
                <Box display="flex" justifyContent="center">
                  <Button
                    isLoading={isLoading ? true : false}
                    loadingText={isLoading ? "Loading" : ""}
                    variant="solid"
                    mt="50px"
                    borderRadius="30px"
                    px="60px"
                    py="8px"
                    textColor="white"
                    bg="leal.primary"
                    _hover={{ bg: "orange" }}
                    w="134px"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Box>
              </FormControl>
            </>
          ) : (
            <>
              <FormControl
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                isRequired
              >
                <FormLabel fontWeight="bold" textAlign="start">
                  Email
                </FormLabel>
                <InputGroup mt="10px">
                  <InputLeftElement>
                    <MdEmail size="20px" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="email"
                    _active="purple"
                    focusBorderColor="leal.primary"
                    value={form.email}
                    onChange={(e) => handleInputForm(e, "email")}
                    required
                  ></Input>
                </InputGroup>
                <Button
                  variant="solid"
                  mt="20px"
                  borderRadius="30px"
                  px="60px"
                  py="8px"
                  textColor="white"
                  bg="leal.primary"
                  _hover={{ bg: "orange" }}
                  w="134px"
                  onClick={() => setSubmit(!isSubmit)}
                >
                  Log In
                </Button>
              </FormControl>
              <Box
                mt="20px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="2"
              >
                <Flex mt={5}>
                  <Text fontWeight="medium">Dont have an account?</Text>
                  <Text
                    ml="4px"
                    fontWeight="bold"
                    color="leal.primary"
                    _hover={{ cursor: "pointer" }}
                  >
                    Register Now
                  </Text>
                </Flex>
                <Text
                  fontWeight="semibold"
                  color="gray"
                  textAlign="center"
                  mt="10px"
                  fontSize="12px"
                  opacity="1"
                >
                  Or Register With
                </Text>
                <Box
                  w="98px"
                  h="72px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="20px"
                  mt="10px"
                  _hover={{ cursor: "pointer", borderColor: "leal.primary" }}
                >
                  <FcGoogle size="40px" />
                </Box>
              </Box>
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
}
