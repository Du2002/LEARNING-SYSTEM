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
	Button,
	Badge,
	Modal,
} from "@mantine/core";
import {
	IconBook,
	IconListNumbers,
	IconCode,
	IconPalette,
	IconDeviceDesktop,
	IconAlertCircle,
	IconFileTypePdf,
	IconDownload,
	IconEye,
	IconExternalLink,
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
	const [pdfModal, setPdfModal] = useState(false);
	const [selectedPdf, setSelectedPdf] = useState("");

	const router = useRouter();
	const { coursename } = router.query;
	const { user } = useAuth();

	useEffect(() => {
		if (coursename) {
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

			const res = await getCourseByName(token, coursename);

			if (res && !res.error && res.course) {
				console.log("Course loaded:", res.course);
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

	const handleViewPDF = (pdfUrl) => {
		console.log("Viewing PDF:", pdfUrl);
		if (!pdfUrl) {
			alert("PDF URL is missing");
			return;
		}
		
		// Use Google Drive Viewer as fallback for better PDF viewing
		const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
		
		setSelectedPdf(googleViewerUrl);
		setPdfModal(true);
	};

	const handleOpenInNewTab = (pdfUrl) => {
		if (!pdfUrl) {
			alert("PDF URL is missing");
			return;
		}
		window.open(pdfUrl, '_blank');
	};

	const handleDownloadPDF = (downloadUrl, pdfUrl, moduleName) => {
		const url = downloadUrl || pdfUrl;
		console.log("Downloading PDF:", url);
		
		if (!url) {
			alert("PDF URL is missing");
			return;
		}

		// Create a temporary anchor element to trigger download
		const link = document.createElement('a');
		link.href = url;
		link.download = `${moduleName}.pdf`;
		link.target = '_blank';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	if (loading) {
		return (
			<Center style={{ minHeight: "100vh" }}>
				<Loader size="lg" />
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
				<Text size="lg" c="dimmed" mb={12} style={{ fontStyle: "italic" }}>
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
									<ThemeIcon color="indigo" size={36} radius="xl" variant="light">
										{moduleIcons[idx % moduleIcons.length]}
									</ThemeIcon>
								}>
								<Card shadow="sm" radius="md" p="md" withBorder mb="md">
									<Group align="center" mb={6} position="apart">
										<Title order={3} style={{ fontWeight: 600 }}>
											{module.title}
										</Title>
										{module.pdfUrl && (
											<Badge leftSection={<IconFileTypePdf size={14} />} color="red" variant="filled">
												PDF Available
											</Badge>
										)}
									</Group>
									<Text size="sm" c="gray" style={{ textAlign: "justify", lineHeight: 1.7 }} mb="md">
										{module.description}
									</Text>

									{/* PDF Buttons */}
									{module.pdfUrl && (
										<Group spacing="sm" mt="md">
											<Button
												leftIcon={<IconEye size={16} />}
												variant="light"
												color="blue"
												onClick={() => handleViewPDF(module.pdfUrl)}
											>
												View PDF
											</Button>
											<Button
												leftIcon={<IconExternalLink size={16} />}
												variant="light"
												color="violet"
												onClick={() => handleOpenInNewTab(module.pdfUrl)}
											>
												Open in New Tab
											</Button>
											<Button
												leftIcon={<IconDownload size={16} />}
												variant="outline"
												color="green"
												onClick={() => handleDownloadPDF(module.downloadUrl, module.pdfUrl, module.title)}
											>
												Download
											</Button>
										</Group>
									)}
								</Card>
							</List.Item>
						))}
					</List>
				)}
			</Card>

			{/* PDF Viewer Modal with Google Drive Viewer */}
			<Modal
				opened={pdfModal}
				onClose={() => setPdfModal(false)}
				title="View PDF"
				size="xl"
				padding={0}
			>
				<iframe
					src={selectedPdf}
					style={{
						width: "100%",
						height: "80vh",
						border: "none"
					}}
					title="PDF Viewer"
				/>
			</Modal>
		</Container>
	);
}