 
import {
	Anchor,
	Button,
	Checkbox,
	Container,
	Group,
	Paper,
	PasswordInput,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import classes from "@/styles/common.module.css";
import { useState } from 'react';
import { adminLogin } from '../../../util/api/admin.api';
import { useRouter } from 'next/router';

export default function AdminLogin() {
	
	  const [username,setUsername]= useState("")
	  const [password,setPassword]= useState("")
	
	  const [isLoading, setIsLoading] = useState(false);

	  const router = useRouter()

	  async function Submit() {
		if (!username || !password) {
		  alert("Please enter both username and password");
		  return;
		}
		setIsLoading(true);
		try {
		    const res = await adminLogin(username, password);
			console.log(res);
			router.push("/admin/dashboard");
		} catch (err) {
		  console.error("Login error:", err);
		  alert("An error occurred during login");
		} finally {
		  setIsLoading(false);
		}
	  }


	return (
		<>
			<div className="background" style={
			{ background: "linear-gradient(135deg, #bedef0ff 0%, #c7cef0ff 100%)", minHeight: "100vh",width: "100vw", padding: "20px" }
			}>
				<Container size={420} >
					<Title ta="center" className={classes.title}>
						Admin Login
					</Title>

					<Paper withBorder shadow="sm" p={22} mt={30} radius="md">
						<TextInput
							label="Username"
							placeholder="admin@yourdomain.com"
							required
							radius="md"
							onChange={(e)=>setUsername(e.target.value)} value={username}
						/>
						<PasswordInput
							label="Password"
							placeholder="Your password"
							required
							mt="md"
							radius="md"
							onChange={(e)=>setPassword(e.target.value)} value={password} 
						/>

					 
							<Button fullWidth mt="xl" radius="md" onClick={Submit} loading = {isLoading}>
								Sign in
							</Button>
					</Paper>
				</Container>
			</div>

			<style>{`
				.background {
					min-height: 100vh;
					width: 100%;
					align-items: center; 
					background-color: #faedcd;
				}
				/* ensure no default body margin shows a gap on some browsers */
				body {
					margin: 0;
				}
			`}</style>
		</>
	);
}