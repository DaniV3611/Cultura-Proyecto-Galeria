import React, { useState } from "react";

import { Box, Button } from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import classes from "./Carousel.module.css";

import data from "./data";

function Carousel() {
	const [activeSlide, setActiveSlide] = useState(2);

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
				opacity: 1,
				transform: "translateX(-24rem) translateZ(-40rem) rotateY(35deg)",
				zIndex: 9,
			};
		else if (activeSlide + 1 === index)
			return {
				opacity: 1,
				transform: "translateX(24rem) translateZ(-40rem) rotateY(-35deg)",
				zIndex: 9,
			};
		else if (activeSlide - 2 === index)
			return {
				opacity: 1,
				transform: "translateX(-48rem) translateZ(-50rem) rotateY(35deg)",
				zIndex: 8,
			};
		else if (activeSlide + 2 === index)
			return {
				opacity: 1,
				transform: "translateX(48rem) translateZ(-50rem) rotateY(-35deg)",
				zIndex: 8,
			};
		else if (index < activeSlide - 2)
			return {
				opacity: 0,
				transform: "translateX(-48rem) translateZ(-50rem) rotateY(35deg)",
				zIndex: 7,
			};
		else if (index > activeSlide + 2)
			return {
				opacity: 0,
				transform: "translateX(48rem) translateZ(-50rem) rotateY(-35deg)",
				zIndex: 7,
			};
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column" }}>
			{/* carousel */}
			<div className={classes.slideC}>
				{data.map((item, index) => (
					<React.Fragment key={item.id}>
						<div
							className={classes.slide}
							style={{
								background: item.bgColor,
								boxShadow: `0 0.5rem 2rem ${item.bgColor}30`,
								...getStyles(index),
							}}
						>
							<div className={classes.sliderContent}>
								<img src={item.desc} alt="emotion" style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "1rem" }} />
							</div>
						</div>
						<div
							className={classes.reflection}
							style={{
								background: `linear-gradient(to bottom, ${item.bgColor}40, transparent)`,
								...getStyles(index),
							}}
						/>
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
		</Box>
	);
}

export default Carousel;
