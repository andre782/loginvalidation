import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useFormik } from "formik"; 
import { useState } from "react"
import * as yup from "yup";

function App()  {
  const [showPassword, setShowPassword] = useState(false)

  const registerUser = () => {
    alert("submit form!");
    // alert(formik.values.password);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: registerUser,
    validationSchema: yup.object().shape({
      username: yup.string().required().min(3).max(50),
      email: yup.string().required("email wajib di isi").email(),
      password: yup.string().required().matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+])[A-Za-z\d!@#$%^&*()-_=+]{8,}$/,
        "kata sandi harus ada huruf besar angka dan karakter spesial"
      ),
    }),
  });

  const handleForm = (event) => {
    const { target } = event
    formik.setFieldValue(target.name, target.value)    

    // formik.setFieldValue()
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container>
      <Heading>Login</Heading>
      <Box padding="4" border="1px solid lightgray" bosderRadius="4px" mt="8">
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing="3">
            <FormControl isInvalid={formik.errors.username}>
              <FormLabel>Username</FormLabel>
              <Input onChange={handleForm} type="text" name="username"/>
              <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.errors.email}>
              <FormLabel>Email</FormLabel>
              <Input onChange={handleForm} type="email" name="email"/>
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.errors.password}>
              <FormLabel>Password</FormLabel>
              <Input onChange={handleForm} type={showPassword ? "text" : "password"} name="password"/>
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>
            <Button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? "Sembunyikan" : "Tampilkan"}
            </Button>
            <Button type="submit" colorScheme="purple">
              Register Acount
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  )
}

export default App