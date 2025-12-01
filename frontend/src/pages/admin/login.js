import {
	Button,
	Container,
	Paper,
	PasswordInput,
	TextInput,
	Title,
} from "@mantine/core";
import classes from "@/styles/common.module.css";
import { useState } from 'react';
import { adminLogin } from '../../../util/api/admin.api';
import { useRouter } from 'next/router';
import useAuth from '../../../util/api/context/AuthContext';

export default function AdminLogin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();
	const { setUser } = useAuth();

	async function Submit() {
		if (!email || !password) {
			alert("Please enter both email and password");
			return;
		}
		setIsLoading(true);
		try {
			const res = await adminLogin(email, password);
			console.log(res);

			if (res && res.token) {
				// Store token in localStorage
				localStorage.setItem("token", res.token);
				
				// Set user in AuthContext
				setUser({ email: email, token: res.token, role: "admin" });
				
				// Navigate to dashboard
				router.push("/admin/dashboard");
			} else {
				alert("Invalid credentials or login failed");
			}
		} catch (err) {
			console.error("Login error:", err);
			alert("An error occurred during login");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<>
			<div 
				className="background" 
				style={{
					background: "linear-gradient(135deg, rgba(160, 171, 177, 1) 30%,rgba(89, 142, 170, 1) 70%)", 
					minHeight: "100vh",
					width: "100vw", 
					padding: "20px"
				}}
			>
				<Container size={420}>
					<Title ta="center" className={classes.title}>
						Admin Login
					</Title>

					<Paper withBorder shadow="sm" p={22} mt={30} radius="md">
						<TextInput
							label="Email"
							placeholder="admin@yourdomain.com"
							type="email"
							required
							radius="md"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
						<PasswordInput
							label="Password"
							placeholder="Your password"
							required
							mt="md"
							radius="md"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>

						<Button 
							fullWidth 
							mt="xl" 
							radius="md" 
							onClick={Submit} 
							loading={isLoading}
						>
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
				body {
					margin: 0;
				}
			`}</style>
		</>
	);
}