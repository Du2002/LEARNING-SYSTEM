import {
  Anchor,
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  
} from '@mantine/core';
import classes from '@/styles/AuthenticationImage.module.css';
import { studentLogin } from '../../../util/api/student.api';
import { useState } from 'react';
import useAuth from '../../../util/api/context/AuthContext';
import { useRouter } from 'next/router';

export default function Login() {


  const [email,setEmail]= useState("")
  const [password,setPassword]= useState("")

  const [isLoading,setIsLoading] = useState(false)
  const [error,setError] = useState(null)
 
  const router = useRouter()
  const {setUser} = useAuth()
  async function Submit() {
    setError(null)
    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    setIsLoading(true)
    try {
      const res = await studentLogin(email, password)
      if (!res || !res.token) {
        setError(res?.message || "Invalid email or password")
        setIsLoading(false)
        return
      }

      localStorage.setItem("token", res.token)
      setUser({email, token: res.token, role: "student"})
      router.push("/courses/")
    } catch (err) {
      setError(err?.message || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form}>
        <Title order={2} className={classes.title}>
          Welcome back to LMS!
        </Title> 

        <TextInput label="Email" placeholder="hello@gmail.com" size="md" radius="md"     
        onChange={(e)=>setEmail(e.target.value)} value={email}/>

       
        <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" radius="md" required
        onChange={(e)=>setPassword(e.target.value)} value={password}  />

        <Checkbox label="Keep me logged in" mt="xl" size="md" />

         
          <Button fullWidth mt="xl" size="md" radius="md" onClick={Submit} loading = {isLoading}>
            Login
          </Button>
      
       
        <Text ta="center" mt="md">
          Don&apos;t have an account?{' '}
          <Anchor href="/student/signup" fw={500}>
            Sign up
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}