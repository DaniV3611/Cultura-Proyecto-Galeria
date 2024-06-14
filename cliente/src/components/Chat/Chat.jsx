import React, { useState, useRef, useEffect } from "react";
import { Box, Card, CardContent, Container, Stack, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import * as styles from "./ChatStyles";
import ImageModal from '../../ImageModal';

/*const base_url = 'https://danielv.pythonanywhere.com/api'*/
const base_url = 'http://127.0.0.1:8000/api';

function Chat() {
	const [loading, setLoading] = useState(false);
	const [chat, setChat] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [linkActual, setLinkActual] = useState("");
	const [mostrarSugerencias, setMostrarSugerencias] = useState(false);

	const chatContainerRef = useRef(null); // Referencia para acceder al contenedor de chat

	// Efecto para hacer scroll automático hacia abajo cuando cambia el contenido del chat
	useEffect(() => {
		if (chatContainerRef.current) {
		chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
		}
	}, [chat]); // Se ejecuta cada vez que cambia 'chat'

	const openModal = () => setIsModalOpen(true);
  	const closeModal = () => setIsModalOpen(false);

	const listaSugerencias = ['tristeza profunda', 'malpresente', 'dificultad', 'dolor', 'afliccion', 'mal importante', 'melancolia', 'tristeza', 'pesar', 'bien perdido', 'deseo de recuperarlo', 'amor', 'lejano', 'anoraza', 'nostalgia', 'vacilacion', 'escepticismo', 'desconfianza', 'indecision', 'inseguridad', 'duda', 'incertidumbre', 'apatia', 'insensibilidad', 'frialdad', 'desinteres', 'desden', 'indiferencia', 'distanciamiento', 'intranquilidad', 'mal perturbador', 'agitacion', 'zozobra', 'mal inminente', 'anticipacion de dificultades', 'desasosiego', 'inquietud', 'congoja', 'mal grave', 'inevitable', 'tension', 'preocupacion', 'mal futuro', 'amenaza', 'angustia', 'ansiedad', 'mal dificil de evitar', 'deseo de huir', 'protegerse', 'huir', 'perturbacion', 'peligro real o imaginario', 'activacion defensiva', 'temor', 'miedo', 'embate impetuoso', 'contrarrestar', 'rechazar mal violento', 'ira intensa', 'deseo de agredir', 'amenaza inminente', 'ira', 'rabia', 'remordimiento', 'mal causado', 'falta grave', 'pesar', 'arrepentimiento', 'mal realizado', 'desasosiego moral', 'culpa', 'turbacion', 'pesar', 'accion deshonrosa', 'hiere amor propio', 'ultraje', 'rebajamiento de dignidad', 'dolor', 'rechazo', 'verguenza', 'humillacion', 'abandono', 'desamparo', 'falta de proteccion', 'mal sobrepasante', 'soledad', 'carencia de ayuda', 'adversidad', 'frustracion', 'imposibilidad', 'falta de medios o recursos', 'desvalimiento', 'vulnerabilidad', 'carencia de proteccion', 'impotencia', 'indefension', 'distanciamiento', 'ajeno', 'extrano a la realidad', 'desconexion', 'desapego', 'realidad paralela', 'extranamiento', 'disosociacion', 'repulsion', 'alejamiento', 'objeto danino', 'indeseable',  'aversion', 'negacion total', 'malestar profundo', 'rechazo', 'repudio', 'turbacion', 'desconcierto', 'situacion compleja', 'confusion', 'falta de coherencia', 'acontecimientos inesperados', 'perplejidad', 'coexistencia de emociones opuestas', 'ambivalencia emocional', 'impresion', 'desagradable', 'amargo', 'dolor intenso', 'decepcion', 'sinsabor', 'amargura', 'resentimiento', 'pesar profundo', 'perdida significativa', 'adaptacion emocional', 'pesadumbre', 'congoja', 'afliccion', 'perdida', 'privacion', 'carencia de compania', 'vinculos afectivos', 'falta de vinculos afectivos', 'aislamiento', 'soledad', 'perdida de esperanza', 'des esperanza', 'desesperanza',   'resignacion', 'imposibilidad', 'derrota', 'emocion intensa', 'sacude el animo', 'animo', 'algo sobrenatural', 'sobrenatural', 'sacudidad emocional viva', 'repentina', 'estremecimientos fisicos', 'sobrecogimiento', 'estremecimiento', 'deseo vivo e intenso', 'deseo', 'deseo intenso', 'bien apreciado', 'no poseido', 'inquietud', 'desasosiego', 'infortunios previstos', 'anhelo', 'zozobra', 'cansancio', 'desgana', 'falta de interes', 'repeticion constante', 'agotamiento', 'esfuerzo excesivo', 'preocupacion excesiva', 'esfuerzo o preocupacion excesivos', 'desfallecimiento', 'hastio', 'fatiga', 'nada', 'vacio']

	const sugerencias = () => {
		
		if (mostrarSugerencias) {
			console.log("Mostrar Sugerencias");
			setMostrarSugerencias(false);
		}
		else {
			console.log("No mostrar Sugerencias");
			setMostrarSugerencias(true);
		}
	}

	const seleccionarSugerencia = (index) => {
		document.getElementById("chat-input").value = listaSugerencias[index];
		enviarForm(listaSugerencias[index]);
	}

	const enivarPeticion = async (value) => {

		let images = [];
		
		try {
			const response = await axios.post(base_url + '/filter', {'keyword' : value});
			const data = response.data;
			images = data.images;
		} catch (error) {
			console.log(error);
		}

		return images;
		  
	}

	const enviarForm = async (value) => {
		setLoading(true);

		setChat((prevChat) => [...prevChat, {
			'send' : 'user', 
			'text': value,
			'styles' : styles.userInput
			}]);

		const images = await enivarPeticion(value);

		console.log(images);

		if (images.length > 0) {
			setChat((prevChat) => [...prevChat, {
				'send' : 'server', 
				'link': images[0].link,
				'text' : `Titulo: ${images[0].titulo}`,
				'styles': styles.serverInput
			}])
			setChat((prevChat) => [...prevChat, {
				'send' : 'server', 
				'text' : `Descripcion: ${images[0].descripcion}`,
				'styles': styles.serverInput
			}])
		}
		else {
			setChat((prevChat) => [...prevChat, {'send' : 'server', 'text': 'No fue posible cargar imagenes', 'styles': styles.serverInput }])
		}	

		document.getElementById("chat-input").value = "";
		setLoading(false);
	}

	const chatFormHandler = async (e) => {
		e.preventDefault();
		setLoading(true);

		const dataArr = [...new FormData(e.target)];
		const dataObj = Object.fromEntries(dataArr);

		setChat((prevChat) => [...prevChat, {
			'send' : 'user', 
			'text': dataObj.input,
			'styles' : styles.userInput
			}]);

		const images = await enivarPeticion(document.getElementById("chat-input").value);

		console.log(images);

		if (images.length > 0) {
			setChat((prevChat) => [...prevChat, {
				'send' : 'server', 
				'link': images[0].link,
				'text' : `Titulo: ${images[0].titulo}`,
				'styles': styles.serverInput
			}])
			setChat((prevChat) => [...prevChat, {
				'send' : 'server', 
				'text' : `Descripcion: ${images[0].descripcion}`,
				'styles': styles.serverInput
			}])
		}
		else {
			setChat((prevChat) => [...prevChat, {'send' : 'server', 'text': 'No fue posible cargar imagenes', 'styles': styles.serverInput }])
		}	

		document.getElementById("chat-input").value = "";
		setLoading(false);
	};

	return (
		<Container
			maxWidth="md"
			sx={{
				marginTop: '15px',
				border: "0.1rem solid",
				borderColor: "chartreuse.main",
				borderRadius: "1rem",
				height: "85vh",
			}}
		>
			<Card sx={{ bgcolor: "transparent", boxShadow: 0, height: '85vh' }}>
				<CardContent>
					<Stack height={"82vh"} justifyContent={"space-between"} p={1}>
						<Box overflow={"auto"} ref={chatContainerRef}>
							{chat.map((item, index, arr) => (
								<>
								{item.text && <Typography key={index} sx={item.styles}>
									{item.text}
								</Typography>}
								{item.link && <img key={`img${index}`} src={item.link} onClick= {() => {
									setLinkActual(item.link);
									openModal();
								}}style={{ maxWidth: "auto", maxHeight: "38rem", borderRadius: "1rem", marginLeft: "10px" }}></img>}
								</>
							))}
						</Box>
						<Box onSubmit={chatFormHandler} component="form">
							<Stack direction="row" justifyContent={"space-around"} gap={2}>
								<Box flex={1}>
									<TextField
										name="input"
										id="chat-input"
										label="Ingresa el afecto..."
										variant="outlined"
										color="flourescentCyan"
										sx={{
											fieldset: { borderColor: "flourescentCyan.main" },
											input: { color: "flourescentCyan.main" },
											"&:hover": {
												fieldset: {
													borderColor: "flourescentCyan.main !important",
												},
											},
											marginTop: '15px'
										}}
										fullWidth
									/>
								</Box>

								{mostrarSugerencias && (
									<ul key="box_ul"style={{ 
									padding: 0,
									position: 'absolute' ,
									maxHeight: '200px',
									width: '150px',
									top: '53vh',
									left: '58%',
									overflow: 'auto',
									backgroundColor: '#151424',
									color: "#28d7cf",
									border: '2px solid #28d7cf',
									borderRadius: '10px',
									marginTop: '5px',
									zIndex: 1,
									boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Añadir una sombra
									}}>
									{listaSugerencias.map((item, index) => (
										<Box 
										component="li"
										key={index}
										sx={{
											padding: '10px',
											transition: 'background-color 0.3s',
											'&:hover': {
											backgroundColor: 'rgba(127, 255, 0, 0.1)',
											cursor: 'pointer'
											},
										}}
										onClick={() => {
											seleccionarSugerencia(index);
										}}
										>
										{item}
										
										</Box>
									))}
									</ul>
								)}

								<LoadingButton
									size="small"
									startIcon={ mostrarSugerencias ? <ExpandMoreIcon/> : <ExpandLessIcon/> }
									onClick={sugerencias}
									variant="outline"
									sx={{
									color: 'chartreuse.main',
									border: '0.1rem solid',
									borderRadius: '1rem',
									"& > *": {
										color: 'chartreuse.main',
									},
									"&:hover": {
										backgroundColor: 'rgba(127, 255, 0, 0.1)', // Un ligero fondo chartreuse al hacer hover
										borderColor: 'chartreuse.main', // Cambio del color del borde al hacer hover
									},
									marginTop: '15px'
									}}
								>
									<span>Sugerencias</span>
								</LoadingButton>

								<LoadingButton
									size="small"
									type="submit"
									endIcon={<SendIcon />}
									loading={loading}
									loadingPosition="end"
									variant="outline"
									sx={{
										color: "chartreuse.main",
										border: "0.1rem solid",
										borderRadius: "1rem",
										"& > *": {
											color: "chartreuse.main",
										},
										"&:hover": {
											backgroundColor: "rgba(127, 255, 0, 0.1)", // Un ligero fondo chartreuse al hacer hover
											borderColor: "chartreuse.main", // Cambio del color del borde al hacer hover
										},
										marginTop: '15px'
									}}
								>
									<span>Enviar</span>
								</LoadingButton>
							</Stack>
						</Box>
					</Stack>
				</CardContent>
			</Card>
			<ImageModal
				isOpen={isModalOpen}
				onRequestClose={closeModal}
				imgSrc={linkActual}
			/>
		</Container>
	);
}

export default Chat;
