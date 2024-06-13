import React, { useState } from "react";

import { Box, Card, CardContent, Container, Stack, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

import * as styles from "./ChatStyles";

function Chat() {
	const [loading, setLoading] = useState(false);
	const [chat, setChat] = useState([]);

	const enivarPeticion = async (value) => {
		console.log(value);
	}

	const chatFormHandler = (e) => {
		e.preventDefault();
		setLoading(true);

		const dataArr = [...new FormData(e.target)];
		const dataObj = Object.fromEntries(dataArr);

		setChat((prevChat) => [...prevChat, dataObj.input]);

		enivarPeticion(document.getElementById("chat-input").value);

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
								<Typography key={index} sx={styles.userInput}>
									{item}
								</Typography>
							))}
						</Box>
						<Box onSubmit={chatFormHandler} component="form">
							<Stack direction="row" justifyContent={"space-around"} gap={2}>
								<Box flex={1}>
									<TextField
										name="input"
										id="chat-input"
										label="Ingresa el trauma..."
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
										}}
										fullWidth
									/>
								</Box>

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
									}}
								>
									<span>Send</span>
								</LoadingButton>
							</Stack>
						</Box>
					</Stack>
				</CardContent>
			</Card>
		</Container>
	);
}

export default Chat;
