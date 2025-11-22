import React, { useState, useEffect } from "react";
import {
	Container,
	Title,
	Text,
	Card,
	Group,
	ThemeIcon,
	List,
	Divider,
	Loader,
	Center,
	Alert,
} from "@mantine/core";
import {
	IconBook,
	IconListNumbers,
	IconCode,
	IconPalette,
	IconDeviceDesktop,
	IconAlertCircle,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import { getCourseByName } from "../../../util/api/course.api";
import useAuth from "../../../util/api/context/AuthContext";

const moduleIcons = [
	<IconBook size={28} key="book" />,
	<IconListNumbers size={28} key="list" />,
	<IconPalette size={28} key="palette" />,
	<IconCode size={28} key="code" />,
];

export default function CoursePage() {
	const [course, setCourse] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const router = useRouter();
	const { coursename } = router.query;
	const { user } = useAuth();

	useEffect(() => {
		if (coursename) {
			console.log("coursename from URL:", coursename);
			loadCourse();
		}
	}, [coursename]);

	const loadCourse = async () => {
		try {
			setLoading(true);
			setError("");

			const token = user.token || localStorage.getItem("token");
			
			if (!token) {
				router.push("/student/login");
				return;
			}

			console.log("Fetching course with name:", coursename);
			const res = await getCourseByName(token, coursename);
			console.log("API Response:", res);

			if (res && !res.error && res.course) {
				setCourse(res.course);
			} else {
				setError(res.msg || "Course not found");
			}
		} catch (error) {
			console.error("Error loading course:", error);
			setError("Error loading course");
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<Center style={{ minHeight: "100vh" }}>
				<Loader size="lg" />
				<Text ml="md">Loading course...</Text>
			</Center>
		);
	}

	if (error || !course) {
		return (
			<Center style={{ minHeight: "100vh", padding: "20px" }}>
				<Alert icon={<IconAlertCircle size={16} />} color="red" title="Error">
					{error || "Course not found"}
				</Alert>
			</Center>
		);
	}

	return (
		<Container size="md" py="xl">
			<Card shadow="md" radius="lg" p="xl" withBorder>
				<Title order={1} mb={8} style={{ fontWeight: 800 }}>
					{course.title}
				</Title>
				<Text
					size="lg"
					c="dimmed"
					mb={12}
					style={{ fontStyle: "italic" }}>
					{course.subtitle}
				</Text>
				<Text size="md" mb="lg" style={{ maxWidth: 700 }}>
					{course.description}
				</Text>
				<Divider my="md" />
				<Title order={2} mb="md" style={{ fontWeight: 700 }}>
					Modules ({course.modules?.length || 0})
				</Title>
				
				{!course.modules || course.modules.length === 0 ? (
					<Text color="dimmed" size="sm">
						No modules available yet.
					</Text>
				) : (
					<List
						spacing="lg"
						size="md"
						center
						icon={
							<ThemeIcon color="blue" size={32} radius="xl">
								<IconDeviceDesktop size={20} />
							</ThemeIcon>
						}>
						{course.modules.map((module, idx) => (
							<List.Item
								key={idx}
								icon={
									<ThemeIcon
										color="indigo"
										size={36}
										radius="xl"
										variant="light">
										{moduleIcons[idx % moduleIcons.length]}
									</ThemeIcon>
								}>
								<Card
									shadow="sm"
									radius="md"
									p="md"
									withBorder
									mb="md">
									<Group align="center" mb={6}>
										<Title
											order={3}
											style={{ fontWeight: 600 }}>
											{module.title}
										</Title>
									</Group>
									<Text
										size="sm"
										c="gray"
										style={{
											textAlign: "justify",
											lineHeight: 1.7,
										}}>
										{module.description}
									</Text>
								</Card>
							</List.Item>
						))}
					</List>
				)}
			</Card>
		</Container>
	);
}