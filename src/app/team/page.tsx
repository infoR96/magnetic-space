import React from "react";
import LogoComponent from "../components/LogoComponent";

interface TeamMember {
  name: string;
  description: string;
  image: string; // Ruta de la imagen del miembro
}

const teamMembers: TeamMember[] = [
  {
    name: "Nilson Rolando Garrido Asenjo",
    description: "Mining Engineering graduate with a focus on data analytics, automation, and process optimization in large-scale mining operations. Passionate about continuous learning and personal growth, I combine my technical expertise with creativity and adaptability. In my free time, I enjoy cycling, drawing, and traveling, constantly seeking inspiration from new experiences.",
    image: "/imagenes/nilson.jpg",
  },
  {
    name: "Luis Aron Goicochea Sánchez",
    description: "Mining Engineer with specialization in Project Management and data analysis in greenfield and brownfield projects. Passionate about science, learning and culture, in my free time I enjoy exploring new places and taking pictures of nature, especially insects and birds. Listening to the sound of nature brings me peace and renewal.",
    image: "/imagenes/luis.jpg",
  },
  {
    name: "Estephano Quiroz Aguirre",
    description: "Mining Engineer specializing in Integrated Management Systems, passionate about geological exploration, data science, and the development of new technologies. I enjoy applying data analysis to improve efficiency in mining projects and exploring innovations that drive the industry forward. My curiosity and dedication keep me in constant learning, always seeking new ways to integrate technology with mining and other industries.",
    image: "/imagenes/favio.jpg",
  },
  {
    name: "Giancarlo Ramón Centurión Camacho",
    description: "I am a mining engineer and self-taught programmer. I really like science and technology, and my curiosity is what has led me to find great satisfaction in innovative solutions. Among my other passions is high-speed skating professionally at the highest level. It motivates my family and the desire to achieve my best version.",
    image: "imagenes/gian.jpg",
  },
  {
    name: "Victor Silverio Salazar Julca",
    description: "Graduated in Geological Engineering, with experience in mining exploration and geotechnics. I have a high commitment to continuous professional development and a desire to support and collaborate with others. Passionate about research and innovation. In my free time I enjoy traveling and capturing unforgettable moments through photography and immersing myself in good music to enrich those experiences.",
    image: "/imagenes/vic.jpg",
  },
];

const TeamSection: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles2.row}>
        <h2 style={styles2.heading}>Meet Our Expert Team</h2>
        <LogoComponent logoSrc={"/imagenes/logo-team.jpg"} />
      </div>
      <div style={styles.teamGrid}>
        {teamMembers.map((member, index) => (
          <div key={index} style={styles.card}>
              <img src={member.image} alt={member.name} style={styles.image} />
            <div style={styles.imageWrapper}>
            </div>
            <div style={styles.info}>
              <h3 style={styles.name}>{member.name}</h3>
              <p style={styles.description}>{member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Estilos en línea para el componente
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "2rem",
    backgroundColor: "#000", // Fondo oscuro
    color: "#fff",
  },
  heading: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "2rem",
  },
  teamGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "2rem",
    justifyContent: "center",
  },
  card: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Transparente
    borderRadius: "10px",
    padding: "1rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s", // Suavidad en la transformación
  },
  imageWrapper: {
    display: "inline-block",
    borderRadius: "50%",
    overflow: "hidden",
    width: "50px",
    height: "50px",
    marginRight: "1rem",
    transition: "transform 0.3s", // Efecto de agrandar
  },
  image: {
    width: "100%",
    height: "100%",
    transition: "transform 0.3s", // Animación suave para el hover
  },
  info: {
    textAlign: "left",
  },
  name: {
    fontSize: "1.2rem",
    margin: "0 0 0.5rem 0",
  },
  description: {
    fontSize: "1rem",
    color: "#ccc",
  },
  cardHover: {
    transform: "scale(1.05)", // Agranda la tarjeta en hover
  },
  imageHover: {
    transform: "scale(1.2)", // Agranda la imagen en hover
  },
};

const styles2: { [key: string]: React.CSSProperties } = {
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "20px",
    boxSizing: "border-box", // Valor específico esperado por TypeScript
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: 0,
  },
};

export default TeamSection;
