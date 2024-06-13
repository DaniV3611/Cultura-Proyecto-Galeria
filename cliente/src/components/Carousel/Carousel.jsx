import React, { useState } from "react";
import { useEffect } from "react";
import { Box, Button } from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import classes from "./Carousel.module.css";
import ImageModal from '../../ImageModal';

function Carousel({data}) {

	const keyEvents = (() => {

		window.removeEventListener('keydown', (event) => {
			switch(event.key) {
				case 'ArrowLeft':
					prev();
					break;
				case 'ArrowRight':
					next();
					break;
				default:
					break;
			}
		});

		window.addEventListener('keydown', (event) => {
			switch(event.key) {
				case 'ArrowLeft':
					prev();
					break;
				case 'ArrowRight':
					next();
					break;
				default:
					break;
			}
		});
			
	  });

	const [activeSlide, setActiveSlide] = useState(2);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [linkActual, setLinkActual] = useState("");

	const openModal = () => setIsModalOpen(true);
  	const closeModal = () => setIsModalOpen(false);

	const next = () => (activeSlide < data.length - 1 ? setActiveSlide(activeSlide + 1) : setActiveSlide(0));

	const prev = () => (activeSlide > 0 ? setActiveSlide(activeSlide - 1) : setActiveSlide(data.length - 1));

	// OPTIMIZE
	const getStyles = (index) => {
		if (activeSlide === index)
			return {
				opacity: 1,
				transform: "translateX(0rem) translateZ(0rem) rotateY(0deg)",
				zIndex: 10,
			};
		else if (activeSlide - 1 === index)
			return {
				opacity: 0.1,
				transform: "translateX(-50rem) translateZ(-80rem) rotateY(35deg)",
				zIndex: 9,
			};
		else if (activeSlide + 1 === index)
			return {
				opacity: 0.1,
				transform: "translateX(50rem) translateZ(-80rem) rotateY(-35deg)",
				zIndex: 9,
			};
		else if (activeSlide - 2 === index)
			return {
				opacity: 0,
				transform: "translateX(-50rem) translateZ(-50rem) rotateY(35deg)",
				zIndex: 8,
			};
		else if (activeSlide + 2 === index)
			return {
				display: null,
				opacity: 0,
				transform: "translateX(60rem) translateZ(-50rem) rotateY(-35deg)",
				zIndex: 8,
			};
		else if (index < activeSlide - 2)
			return {
				display: null,
				opacity: 0,
				transform: "translateX(-48rem) translateZ(-50rem) rotateY(35deg)",
				zIndex: 7,
			};
		else if (index > activeSlide + 2)
			return {
				display: null,
				opacity: 0,
				transform: "translateX(48rem) translateZ(-50rem) rotateY(-35deg)",
				zIndex: 7,
			};
	};

	return (
		
		<Box sx={{ display: "flex", flexDirection: "column" }}>
			{/*keyEvents()*/}
			{/* carousel */}
			<div className={classes.slideC}>
				{data.map((item, index) => (
					<React.Fragment key={index}>
						<div
							className={classes.slide}
							style={{
								background: item.bgColor,
								boxShadow: `0 0.5rem 2rem ${item.bgColor}30`,
								...getStyles(index),
							}}
						>
							<div className={classes.sliderContent}>
								<img src={item.link} onClick={() => {
									if (activeSlide == index) {
										setLinkActual(item.link);
										openModal();
									}
								}} alt={item.titulo} style={{ maxWidth: "auto", maxHeight: "42rem", borderRadius: "1rem" }} />
							</div>
						</div>
						
					</React.Fragment>
				))}
			</div>
			{/* carousel */}

			<div className={classes.btns}>
				<Button onClick={prev} variant="outlined" startIcon={<ArrowBackIosIcon />} color="flourescentCyan" sx={{ borderRadius: "1rem" }}>
					Anterior
				</Button>
				<Button onClick={next} variant="outlined" endIcon={<ArrowForwardIosIcon />} color="chartreuse" sx={{ borderRadius: "1rem" }}>
					Siguiente
				</Button>
			</div>
			<ImageModal
				isOpen={isModalOpen}
				onRequestClose={closeModal}
				imgSrc={linkActual}
			/>
		</Box>

	    

	);
}

export default Carousel;
