import {
	Card,
	Group,
	Text,
	Title,
	Divider,
	Box,
	Button,
	Avatar,
	FileInput,
	TextInput,
	PasswordInput,
	Stack,
	Loader,
	Center,
} from "@mantine/core";

import { useEffect, useState } from "react";
import { studentProfile, updateStudentProfile } from "../../../util/api/student.api";
import useAuth from "../../../util/api/context/AuthContext";
import { IconUpload } from "@tabler/icons-react";

export default function Profile() {
	const [profileData, setProfileData] = useState({ 
		fullname: "",
		username: "",
		email: "",
		password: "",
		profilePicture: ""
	});

	const [isEditing, setIsEditing] = useState(false);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [editForm, setEditForm] = useState({
		fullname: "",
		username: "",
		email: "",
		password: "",
		profilePicture: ""
	});

	const { user } = useAuth();

	useEffect(() => {
		async function getData() {
			try {
				setLoading(true);
				const res = await studentProfile(user.token);
				if (res && res.rest) {
					setProfileData(res.rest);
					setEditForm(res.rest);
				}
			} catch (error) {
				console.error("Error loading profile:", error);
			} finally {
				setLoading(false);
			}
		}
		getData();
	}, []);

	const handleFileChange = (file) => {
		if (file) {
			if (file.size > 1024 * 1024) {
				alert("File size should be less than 1MB");
				return;
			}

			const reader = new FileReader();
			reader.onloadend = () => {
				setEditForm(prev => ({ ...prev, profilePicture: reader.result }));
			};
			reader.readAsDataURL(file);
		}
	};

	const handleInputChange = (field, value) => {
		setEditForm(prev => ({ ...prev, [field]: value }));
	};

	const handleSave = async () => {
		try {
			setSaving(true);
			const res = await updateStudentProfile(user.token, editForm);
			
			if (res && !res.error) {
				setProfileData(editForm);
				setIsEditing(false);
				alert("Profile updated successfully!");
			} else {
				alert("Failed to update profile. Please try again.");
			}
		} catch (error) {
			console.error("Error saving profile:", error);
			alert("Error updating profile");
		} finally {
			setSaving(false);
		}
	};

	const handleCancel = () => {
		setEditForm(profileData);
		setIsEditing(false);
	};

	if (loading) {
		return (
			<div 
				style={{
					background: "linear-gradient(135deg, #f7e7c8ff 0%, #f4ddc1ff 100%)", 
					minHeight: "100vh",
					width: "100vw"
				}}
			>
				<Center style={{ minHeight: "100vh" }}>
					<Loader size="lg" />
				</Center>
			</div>
		);
	}

	return (
		<div 
			style={{
				background: "linear-gradient(135deg, #f7e7c8ff 0%, #f4ddc1ff 100%)", 
				minHeight: "100vh",
				width: "100vw", 
				padding: "20px"
			}}
		>
			<Box maw={500} mx="auto" my={40}>
				<Card shadow="md" padding="xl" radius="md" withBorder>
					<Group position="apart" mb="md">
						<Title order={2}>Student Profile</Title>
						{!isEditing && (
							<Button onClick={() => setIsEditing(true)} variant="light">
								Edit
							</Button>
						)}
					</Group>
					
					<Divider mb="md" />

					{/* Profile Picture */}
					<Group position="center" mb="lg">
						<Avatar
							src={isEditing ? editForm.profilePicture : profileData.profilePicture}
							size={120}
							radius={120}
							alt="Profile Picture"
						/>
					</Group>

					{isEditing ? (
						// Edit Mode
						<Stack spacing="md">
							<FileInput
								label="Profile Picture"
								placeholder="Upload profile picture"
								icon={<IconUpload size={14} />}
								accept="image/*"
								onChange={handleFileChange}
							/>

							<TextInput
								label="Full Name"
								value={editForm.fullname}
								onChange={(e) => handleInputChange('fullname', e.target.value)}
								required
							/>

							<TextInput
								label="Username"
								value={editForm.username}
								onChange={(e) => handleInputChange('username', e.target.value)}
								required
							/>

							<TextInput
								label="Email"
								type="email"
								value={editForm.email}
								onChange={(e) => handleInputChange('email', e.target.value)}
								required
							/>

							<PasswordInput
								label="Password"
								value={editForm.password || ""}
								onChange={(e) => handleInputChange('password', e.target.value)}
								placeholder="Leave empty to keep current password"
							/>

							<Group position="right" mt="md">
								<Button 
									variant="default" 
									onClick={handleCancel}
									disabled={saving}
								>
									Cancel
								</Button>
								<Button 
									onClick={handleSave}
									loading={saving}
								>
									Save Changes
								</Button>
							</Group>
						</Stack>
					) : (
						// View Mode
						<Group direction="column" spacing={8} mb="lg">
							<Text>
								<Text span fw={500}>
									Full Name:
								</Text>{" "}
								{profileData.fullname || "Not set"}
							</Text>
							
							<Text>
								<Text span fw={500}>
									Username:
								</Text>{" "}
								{profileData.username || "Not set"}
							</Text>

							<Text>
								<Text span fw={500}>
									Email:
								</Text>{" "}
								{profileData.email || "Not set"}
							</Text>

							<Text>
								<Text span fw={500}>
									Password:
								</Text>{" "}
								{profileData.password ? "••••••••" : "Not set"}
							</Text>
						</Group>
					)}
				</Card>
			</Box>
		</div>
	);
}