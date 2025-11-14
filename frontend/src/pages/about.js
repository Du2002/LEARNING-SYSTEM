import {
	Container,
	Title,
	Text,
	Image,
	Grid,
	Paper,
	Group,
} from "@mantine/core";

export default function About() {
    return (
        <>
            <Container size="lg" py="xl" >
                <Title
                    align="center"
                    order={1}
                    mb="md"
                    style={{ fontWeight: 800, letterSpacing: -1 }}>
                    About Us
                </Title>

                <Text align="center" size="lg" c="dimmed" mb="xl">
                    We are passionate creators, building modern web experiences that
                    inspire and engage. Our team combines creativity, technology,
                    and strategy to deliver outstanding results for our clients.
                </Text>

                <Grid gutter="xl" align="center">
                    

                    <Grid.Col md={6}>
                        <Paper shadow="md" p="lg" radius="md" withBorder style={{ background: "linear-gradient(135deg,#ffffff,#f7fbff)" }}>
                            <Title order={3} mb="sm" style={{ color: "#228be6" }}>
                                Our Mission
                            </Title>

                            <Text mb="md">
                                To empower businesses and individuals by crafting beautiful,
                                functional, and accessible digital solutions. We believe in the
                                power of collaboration and innovation to make a positive impact.
                            </Text>
                        </Paper>
                    </Grid.Col>
                </Grid>

                <Paper
                    mt="xl"
                    p="xl"
                    radius="md"
                    shadow="lg"
                    style={{ background: "#f8fafc" }}>
                    <Title order={4} mb="sm">
                        Why Choose Us?
                    </Title>

                    <Text component="div">
                        <ul className="featuresGrid">
                            <li>Experienced & creative team</li>
                            <li>Client-first collaboration</li>
                            <li>Cutting-edge technologies</li>
                            <li>Transparent communication</li>
                            <li>Commitment to quality</li>
                        </ul>
                    </Text>
                </Paper>
            </Container>

             <style>{`
                .featuresGrid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                    gap: 12px;
                    list-style: none;
                    padding: 0;
                    margin: 10px 0 0;
                }
                .featuresGrid li {
                    background: linear-gradient(180deg, #fff, #fbfdff);
                    padding: 12px;
                    border-radius: 8px;
                    box-shadow: 0 6px 18px rgba(16,24,40,0.04);
                    font-weight: 600;
                    color: #17324d;
                }
            `}</style>
        </>
    );
}