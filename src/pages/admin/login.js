 
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
import Link from "next/link";

export default function AdminLogin() {
	return (
		<>
			<div className="background">
				<Container size={420} >
					<Title ta="center" className={classes.title}>
						Admin Login
					</Title>

					<Paper withBorder shadow="sm" p={22} mt={30} radius="md">
						<TextInput
							label="Admin Email"
							placeholder="admin@yourdomain.com"
							required
							radius="md"
						/>
						<PasswordInput
							label="Password"
							placeholder="Your password"
							required
							mt="md"
							radius="md"
						/>

						<Link href={"/admin/dashboard"}>
							<Button fullWidth mt="xl" radius="md">
								Sign in
							</Button>
						</Link>
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