import React, { useState, useEffect } from "react";
import { Card, Image, Text, Group, SimpleGrid, Button, Loader, Center, Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getAllCoursesForStudents } from "../../../util/api/course.api";
import useAuth from "../../../util/api/context/AuthContext";

export default function CoursesPage() {
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	
	const { user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		loadCourses();
	}, []);

	const loadCourses = async () => {
		try {
			setLoading(true);
			setError("");

			// Get token from context or localStorage
			const token = user.token || localStorage.getItem("token");
			
			if (!token) {
				router.push("/student/login");
				return;
			}

			const res = await getAllCoursesForStudents(token);

			if (res && !res.error) {
				setCourses(res.courses || []);
			} else {
				setError("Failed to load courses");
			}
		} catch (error) {
			console.error("Error loading courses:", error);
			setError("Error loading courses");
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div style={{ 
				minHeight: "100vh", 
				background: "linear-gradient(135deg, rgba(113, 149, 167, 1) 0%, rgba(195, 208, 215, 1) 100%)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center"
			}}>
		 
				<Loader size="lg" />
			 </div>
		);
	}

	if (error) {
		return (
			 	<div style={{ 
				minHeight: "100vh", 
				background: "linear-gradient(135deg,rgba(113, 149, 167, 1) 0%, rgba(195, 208, 215, 1) 100%)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "20px"
			}}>
				<Alert icon={<IconAlertCircle size={16} />} color="red" title="Error">
				{error}
				</Alert>
		 </div>
		);
	}

	return (
			<div style={{ 
			minHeight: "100vh",
			background: "linear-gradient(135deg, rgba(113, 149, 167, 1) 0%, rgba(195, 208, 215, 1) 100%)", // Change colors here
			padding: "20px"
		}}>
		<SimpleGrid 
			cols={3}
			p={16}
			spacing="lg"
			breakpoints={[
				{ maxWidth: 980, cols: 2, spacing: "md" },
				{ maxWidth: 755, cols: 1, spacing: "sm" },
			]}>
			{courses.length === 0 ? (
				<Center style={{ gridColumn: "1 / -1", padding: "40px" }}>
					<Text size="lg" color="dimmed">
						No courses available yet.
					</Text>
				</Center>
			) : (
				courses.map((course) => (
					<Card
						key={course._id}
						shadow="sm"
						padding="lg"
						radius="md"
						withBorder>
						<Card.Section>
							<Image
								src={course.thumbnail || "https://placehold.co/400x200?text=" + encodeURIComponent(course.title)}
								height={160}
								alt={course.title}
								
							/>
						</Card.Section>
						<Group position="apart" mt="md" mb="xs">
							<Text weight={500}>{course.title}</Text>
						</Group>
						<Text size="sm" c="dimmed">
							{course.subtitle}
						</Text>
						<Button 
							component={Link} 
							href={`/courses/${encodeURIComponent(course.title)}`}  
							variant="light" 
							mt={8} 
							fullWidth
						>
							Start Learning
						</Button>
					</Card>
				))
			)}
		</SimpleGrid>
		</div>
	
	);
}