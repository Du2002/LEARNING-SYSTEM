
import {
	Card,
	Group,
	Text,
	Title,
	Divider,
	Box,
} from "@mantine/core";

import { useEffect, useState } from "react";
import { studentProfile } from "../../../util/api/student.api";
import useAuth from "../../../util/api/context/AuthContext";

const studentData = {
	fullname: "John Doe",
	username: "johndoe123",
	email:"john@email.com",
};

export default function Profile() {
	const [profileDta,setProfileDta] = useState({ 
		fullname: "",
	    username: "",
		email:"",
		 
	})

	const {user} = useAuth()
	 


	useEffect(()=>{
		async function getData() {
			const res = await studentProfile(user.token)
			if(res){ 
			  res.rest && setProfileDta(res.rest)
			}
		}
		getData()
	},  [ ])


	return (
	    <div 
		style={
			{ background: "linear-gradient(135deg, #f7e7c8ff 0%, #f4ddc1ff 100%)", minHeight: "100vh",width: "100vw", padding: "20px" }
			}>
		 <Box maw={500} mx="auto" my={40}>
			<Card shadow="md" padding="xl" radius="md" withBorder>
				<Title order={2} mb="md" align="center">
					Student Profile
				</Title>
				<Divider mb="md" />
				<Group direction="column" spacing={8} mb="lg">
					<Text>
						<Text span fw={500}>
							Fullname:
						</Text>{" "}
						{profileDta.fullname || ""}
					</Text>
					<Text>
						<Text span fw={500}>
							Username:
						</Text>{" "}
						{profileDta.username || ""}
					</Text>
					<Text>
						<Text span fw={500}>
							Email:
						</Text>{" "}
						{profileDta.email || ""}
					</Text>
				</Group>
				 
			</Card>
		</Box>
	</div>
	);
}