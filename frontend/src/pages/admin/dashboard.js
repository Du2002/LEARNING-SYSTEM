import React, { useState, useEffect } from "react";
import { IconPlus, IconEdit, IconTrash, IconFileTypePdf, IconUpload } from "@tabler/icons-react";
import {
	Container,
	Title,
	Button,
	Group,
	Table,
	Modal,
	TextInput,
	Textarea,
	PasswordInput,
	ActionIcon,
	Stack,
	Box,
	Divider,
	Badge,
	ScrollArea,
	Loader,
	Center,
	Alert,
	FileInput,
	Text,
	Progress,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import {
	getAllCourses,
	createCourse,
	updateCourse,
	deleteCourse,
	getAllStudents,
	getAllAdmins,
	adminRegister,
	deleteAdmin,
} from "../../../util/api/admin.api";
import { uploadPDF, deletePDF } from "../../../util/api/upload.api";
import useAuth from "../../../util/api/context/AuthContext";
import { useRouter } from "next/router";

// Course Form Component with PDF Upload
function CourseForm({ initial, onSubmit, onCancel, saving }) {
	const { user } = useAuth();
	const [title, setTitle] = useState(initial?.title || "");
	const [subtitle, setSubtitle] = useState(initial?.subtitle || "");
	const [description, setDescription] = useState(initial?.description || "");
	const [modules, setModules] = useState(initial?.modules || []);
	const [modTitle, setModTitle] = useState("");
	const [modDesc, setModDesc] = useState("");
	const [modPdf, setModPdf] = useState(null);
	const [uploading, setUploading] = useState(false);

	const addModule = async () => {
		if (!modTitle || !modDesc) {
			alert("Please enter module title and description");
			return;
		}

		let pdfUrl = "";
		let downloadUrl = "";
		let pdfPublicId = "";

		// Upload PDF if selected
		if (modPdf) {
			setUploading(true);
			const token = user.token || localStorage.getItem("token");
			const uploadRes = await uploadPDF(token, modPdf);
			setUploading(false);

			console.log("Upload Response:", uploadRes); // Debug

			if (uploadRes && uploadRes.success) {
				pdfUrl = uploadRes.pdfUrl;
				downloadUrl = uploadRes.downloadUrl || uploadRes.pdfUrl;
				pdfPublicId = uploadRes.pdfPublicId;
			} else {
				alert("Failed to upload PDF: " + (uploadRes.msg || "Unknown error"));
				return;
			}
		}

		setModules([
			...modules, 
			{ 
				title: modTitle, 
				description: modDesc,
				pdfUrl: pdfUrl,
				downloadUrl: downloadUrl,
				pdfPublicId: pdfPublicId
			}
		]);
		
		setModTitle("");
		setModDesc("");
		setModPdf(null);
	};

	const removeModule = async (idx) => {
		const module = modules[idx];
		
		// Delete PDF from Cloudinary if exists
		if (module.pdfPublicId) {
			const token = user.token || localStorage.getItem("token");
			await deletePDF(token, module.pdfPublicId);
		}

		setModules(modules.filter((_, i) => i !== idx));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title || !subtitle || !description) return;
		onSubmit({ title, subtitle, description, modules });
	};

	return (
		<form onSubmit={handleSubmit}>
			<Stack>
				<TextInput
					label="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
				<TextInput
					label="Subtitle"
					value={subtitle}
					onChange={(e) => setSubtitle(e.target.value)}
					required
				/>
				<Textarea
					label="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					minRows={3}
					required
				/>
				
				<Divider label="Add Module" />
				
				<TextInput
					label="Module Title"
					placeholder="Enter module title"
					value={modTitle}
					onChange={(e) => setModTitle(e.target.value)}
				/>
				<Textarea
					label="Module Description"
					placeholder="Enter module description"
					value={modDesc}
					onChange={(e) => setModDesc(e.target.value)}
					minRows={2}
				/>
				<FileInput
					label="Module PDF (Optional)"
					placeholder="Upload PDF file"
					accept="application/pdf"
					icon={<IconFileTypePdf size={14} />}
					value={modPdf}
					onChange={setModPdf}
				/>
				<Button 
					onClick={addModule} 
					variant="light"
					loading={uploading}
					leftIcon={<IconPlus size={16} />}
				>
					{uploading ? "Uploading PDF..." : "Add Module"}
				</Button>

				{uploading && <Progress value={100} animate />}

				<Divider label="Modules List" />
				
				<Stack spacing="xs">
					{modules.length === 0 ? (
						<Text size="sm" color="dimmed">No modules added yet</Text>
					) : (
						modules.map((mod, idx) => (
							<Box
								key={idx}
								p="sm"
								style={{
									border: "1px solid #e0e0e0",
									borderRadius: 8,
									background: "#f9f9f9"
								}}
							>
								<Group position="apart">
									<Box style={{ flex: 1 }}>
										<Text weight={600}>{mod.title}</Text>
										<Text size="sm" color="dimmed">{mod.description}</Text>
										{mod.pdfUrl && (
											<Badge 
												leftSection={<IconFileTypePdf size={14} />}
												color="red"
												variant="light"
												mt={4}
											>
												PDF Attached
											</Badge>
										)}
									</Box>
									<ActionIcon
										color="red"
										onClick={() => removeModule(idx)}
										disabled={uploading}
									>
										<IconTrash size={18} />
									</ActionIcon>
								</Group>
							</Box>
						))
					)}
				</Stack>

				<Group position="right" mt="md">
					<Button variant="default" onClick={onCancel} disabled={saving}>
						Cancel
					</Button>
					<Button type="submit" loading={saving}>
						{initial ? "Update" : "Create"} Course
					</Button>
				</Group>
			</Stack>
		</form>
	);
}

// Admin Form Component (unchanged)
function AdminForm({ onSubmit, onCancel, saving }) {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!username || !email || !password) return;
		onSubmit({ username, email, password });
	};

	return (
		<form onSubmit={handleSubmit}>
			<Stack>
				<TextInput
					label="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<TextInput
					label="Email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<PasswordInput
					label="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<Group position="right" mt="md">
					<Button variant="default" onClick={onCancel} disabled={saving}>
						Cancel
					</Button>
					<Button type="submit" loading={saving}>
						Add Admin
					</Button>
				</Group>
			</Stack>
		</form>
	);
}

export default function AdminDashboard() {
	const router = useRouter();
	const { user } = useAuth();

	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");

	const [courses, setCourses] = useState([]);
	const [students, setStudents] = useState([]);
	const [admins, setAdmins] = useState([]);

	const [courseModal, setCourseModal] = useState(false);
	const [adminModal, setAdminModal] = useState(false);
	const [editCourseIdx, setEditCourseIdx] = useState(null);

	useEffect(() => {
		const token = user.token || localStorage.getItem("token");
		if (!token) {
			router.push("/admin/login");
			return;
		}
		loadAllData(token);
	}, []);

	const loadAllData = async (token) => {
		try {
			setLoading(true);
			setError("");

			const [coursesRes, studentsRes, adminsRes] = await Promise.all([
				getAllCourses(token),
				getAllStudents(token),
				getAllAdmins(token),
			]);

			if (coursesRes && !coursesRes.error) {
				setCourses(coursesRes.courses || []);
			}
			if (studentsRes && !studentsRes.error) {
				setStudents(studentsRes.students || []);
			}
			if (adminsRes && !adminsRes.error) {
				setAdmins(adminsRes.admins || []);
			}
		} catch (error) {
			console.error("Error loading data:", error);
			setError("Failed to load dashboard data");
		} finally {
			setLoading(false);
		}
	};

	const getToken = () => user.token || localStorage.getItem("token");

	const handleAddCourse = async (courseData) => {
		try {
			setSaving(true);
			const token = getToken();
			const res = await createCourse(token, courseData);

			if (res && !res.error) {
				setCourses([...courses, res.course]);
				setCourseModal(false);
				alert("Course created successfully!");
			} else {
				alert("Failed to create course");
			}
		} catch (error) {
			console.error("Error creating course:", error);
			alert("Error creating course");
		} finally {
			setSaving(false);
		}
	};

	const handleEditCourse = async (courseData) => {
		try {
			setSaving(true);
			const token = getToken();
			const courseId = courses[editCourseIdx]._id;
			const res = await updateCourse(token, courseId, courseData);

			if (res && !res.error) {
				setCourses(courses.map((c, idx) => idx === editCourseIdx ? res.course : c));
				setEditCourseIdx(null);
				setCourseModal(false);
				alert("Course updated successfully!");
			} else {
				alert("Failed to update course");
			}
		} catch (error) {
			console.error("Error updating course:", error);
			alert("Error updating course");
		} finally {
			setSaving(false);
		}
	};

	const handleDeleteCourse = async (idx) => {
		if (!confirm("Are you sure you want to delete this course?")) return;

		try {
			const token = getToken();
			const courseId = courses[idx]._id;
			const res = await deleteCourse(token, courseId);

			if (res && !res.error) {
				setCourses(courses.filter((_, i) => i !== idx));
				alert("Course deleted successfully!");
			} else {
				alert("Failed to delete course");
			}
		} catch (error) {
			console.error("Error deleting course:", error);
			alert("Error deleting course");
		}
	};

	const handleAddAdmin = async (adminData) => {
		try {
			setSaving(true);
			const res = await adminRegister(adminData.username, adminData.email, adminData.password);

			if (res && !res.error) {
				const token = getToken();
				const adminsRes = await getAllAdmins(token);
				if (adminsRes && !adminsRes.error) {
					setAdmins(adminsRes.admins || []);
				}
				setAdminModal(false);
				alert("Admin created successfully!");
			} else {
				alert("Failed to create admin");
			}
		} catch (error) {
			console.error("Error creating admin:", error);
			alert("Error creating admin");
		} finally {
			setSaving(false);
		}
	};

	const handleDeleteAdmin = async (idx) => {
		if (!confirm("Are you sure you want to delete this admin?")) return;

		try {
			const token = getToken();
			const adminId = admins[idx]._id;
			const res = await deleteAdmin(token, adminId);

			if (res && !res.error) {
				setAdmins(admins.filter((_, i) => i !== idx));
				alert("Admin deleted successfully!");
			} else {
				alert("Failed to delete admin");
			}
		} catch (error) {
			console.error("Error deleting admin:", error);
			alert("Error deleting admin");
		}
	};

	if (loading) {
		return (
			<Center style={{ minHeight: "100vh" }}>
				<Loader size="lg" />
			</Center>
		);
	}

	return (
		<Container size="xl" py="lg">
			<Title order={2} mb="md">Admin Dashboard</Title>

			{error && (
				<Alert icon={<IconAlertCircle size={16} />} color="red" mb="md" withCloseButton onClose={() => setError("")}>
					{error}
				</Alert>
			)}

			<Group position="apart" mb="xs" mt="lg">
				<Title order={4}>Courses ({courses.length})</Title>
				<Button leftIcon={<IconPlus />} onClick={() => { setEditCourseIdx(null); setCourseModal(true); }}>
					Add Course
				</Button>
			</Group>
			
			<ScrollArea>
				<Table striped highlightOnHover>
					<thead>
						<tr>
							<th>Title</th>
							<th>Subtitle</th>
							<th>Modules</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{courses.length === 0 ? (
							<tr><td colSpan={4} style={{ textAlign: "center" }}>No courses found</td></tr>
						) : (
							courses.map((course, idx) => (
								<tr key={course._id}>
									<td>{course.title}</td>
									<td>{course.subtitle}</td>
									<td>
										<Group spacing="xs">
											{course.modules?.map((mod, mIdx) => (
												<Badge key={mIdx} leftSection={mod.pdfUrl ? <IconFileTypePdf size={12} /> : null}>
													{mod.title}
												</Badge>
											))}
										</Group>
									</td>
									<td>
										<Group spacing={4}>
											<ActionIcon color="blue" onClick={() => { setEditCourseIdx(idx); setCourseModal(true); }}>
												<IconEdit size={18} />
											</ActionIcon>
											<ActionIcon color="red" onClick={() => handleDeleteCourse(idx)}>
												<IconTrash size={18} />
											</ActionIcon>
										</Group>
									</td>
								</tr>
							))
						)}
					</tbody>
				</Table>
			</ScrollArea>

			<Modal opened={courseModal} onClose={() => { setCourseModal(false); setEditCourseIdx(null); }} title={editCourseIdx !== null ? "Edit Course" : "Add Course"} size="xl" padding="xl">
				<CourseForm initial={editCourseIdx !== null ? courses[editCourseIdx] : null} onSubmit={editCourseIdx !== null ? handleEditCourse : handleAddCourse} onCancel={() => { setCourseModal(false); setEditCourseIdx(null); }} saving={saving} />
			</Modal>

			<Divider my="lg" />

			<Title order={4} mb="xs">Registered Students ({students.length})</Title>
			<ScrollArea>
				<Table striped>
					<thead>
						<tr>
							<th>Full Name</th>
							<th>Username</th>
							<th>Email</th>
						</tr>
					</thead>
					<tbody>
						{students.length === 0 ? (
							<tr><td colSpan={3} style={{ textAlign: "center" }}>No students found</td></tr>
						) : (
							students.map((student) => (
								<tr key={student._id}>
									<td>{student.fullname}</td>
									<td>{student.username}</td>
									<td>{student.email}</td>
								</tr>
							))
						)}
					</tbody>
				</Table>
			</ScrollArea>

			<Divider my="lg" />

			<Group position="apart" mb="xs" mt="lg">
				<Title order={4}>Admins ({admins.length})</Title>
				<Button leftIcon={<IconPlus />} onClick={() => setAdminModal(true)}>Add Admin</Button>
			</Group>
			<ScrollArea>
				<Table striped>
					<thead>
						<tr>
							<th>Username</th>
							<th>Email</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{admins.length === 0 ? (
							<tr><td colSpan={3} style={{ textAlign: "center" }}>No admins found</td></tr>
						) : (
							admins.map((admin, idx) => (
								<tr key={admin._id}>
									<td>{admin.username}</td>
									<td>{admin.email}</td>
									<td>
										<ActionIcon color="red" onClick={() => handleDeleteAdmin(idx)}>
											<IconTrash size={18} />
										</ActionIcon>
									</td>
								</tr>
							))
						)}
					</tbody>
				</Table>
			</ScrollArea>
			<Modal opened={adminModal} onClose={() => setAdminModal(false)} title="Add Admin">
				<AdminForm onSubmit={handleAddAdmin} onCancel={() => setAdminModal(false)} saving={saving} />
			</Modal>
		</Container>
	);
}