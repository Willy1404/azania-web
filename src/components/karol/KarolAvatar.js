"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const KAROL_LOTTIE_SRC = "/video/robot.lottie";

const KarolAvatar = ({
	size = 72,
	className = "",
	loop = true,
	autoplay = true,
}) => {
	return (
		<div
			className={`karol-avatar ${className}`.trim()}
			style={{ width: size, height: size }}
			aria-hidden="true"
		>
			<DotLottieReact
				src={KAROL_LOTTIE_SRC}
				loop={loop}
				autoplay={autoplay}
				style={{ width: "100%", height: "100%" }}
			/>
		</div>
	);
};

export default KarolAvatar;
