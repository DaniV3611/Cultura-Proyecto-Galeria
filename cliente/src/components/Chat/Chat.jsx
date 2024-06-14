import React, { useState } from "react";

import { Box, Card, CardContent, Container, Stack, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

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

	const openModal = () => setIsModalOpen(true);
  	const closeModal = () => setIsModalOpen(false);

	const listaSugerencias = ['monichu', 'manco', 'monichu', 'monichu', 'monichu'];

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
				border: "0.1rem solid",
				borderColor: "chartreuse.main",
				borderRadius: "1rem",
				height: "95vh",
			}}
		>
			<Card sx={{ bgcolor: "transparent", boxShadow: 0 }}>
				<CardContent>
					<Stack height={"90vh"} justifyContent={"space-between"} p={1}>
						<Box overflow={"auto"}>
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
									<ul style={{ 
									
									padding: 0,
									position: 'absolute',
									backgroundColor: '#dff959',
									color: "#151424",
									
									borderRadius: '10px',
									marginTop: '5px',
									zIndex: 1,
									boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Añadir una sombra
									}}>
									{listaSugerencias.map((item, index) => (
										<li key={index} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
										{item}
										</li>
									))}
									</ul>
								)}

								<LoadingButton
									size="small"
									startIcon={<ArrowDropUpIcon />}
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
