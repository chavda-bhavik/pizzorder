import React from "react";
import classnames from "classnames";

const icons: any = {
	plus: {
		viewBox: "-4.5 -4.5 24 24",
		path: (
			<path d="M8.9 6.9v-5a1 1 0 1 0-2 0v5h-5a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5z"></path>
		),
	},
	close: {
		viewBox: "-6 -6 24 24",
		path: (
			<path d="M7.314 5.9l3.535-3.536A1 1 0 1 0 9.435.95L5.899 4.485 2.364.95A1 1 0 1 0 .95 2.364l3.535 3.535L.95 9.435a1 1 0 1 0 1.414 1.414l3.535-3.535 3.536 3.535a1 1 0 1 0 1.414-1.414L7.314 5.899z"></path>
		),
	},
	shoppingCart: {
		viewBox: "-2 -2 24 24",
		path: (
			<path d="M7 16a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM.962 1.923A.962.962 0 0 1 .962 0h1.151c.902 0 1.682.626 1.878 1.506l1.253 5.642c.196.88.976 1.506 1.878 1.506h7.512l1.442-5.77H6.731a.962.962 0 0 1 0-1.922h9.345a1.923 1.923 0 0 1 1.866 2.39L16.5 9.12a1.923 1.923 0 0 1-1.866 1.457H7.122a3.846 3.846 0 0 1-3.755-3.012L2.113 1.923H.962z"></path>
		),
	},
	pizzaSlice: {
		viewBox: "-2 -2 24 24",
		path: (
			<path d="M4.258 6.884L9.97 16.977l5.618-9.83c-1.33-.105-2.712-.453-4.242-.992-.395-.14-.598-.171-.78-.148-.154.02-1.723.569-2.643.802-1.161.294-2.384.317-3.665.075zm-1.41-2.49c1.702.67 3.224.82 4.584.476.738-.187 2.478-.796 2.883-.847.529-.067 1.03.01 1.696.245 1.774.626 3.296.956 4.703.909l.887-1.552A18.559 18.559 0 0 0 9.966 2a18.56 18.56 0 0 0-7.569 1.596l.451.797zM.542 2.268A20.508 20.508 0 0 1 9.966 0c3.362 0 6.606.8 9.496 2.306a1 1 0 0 1 .406 1.383l-9.034 15.807a1 1 0 0 1-1.738-.004L.13 3.65a1 1 0 0 1 .412-1.38zM8 10a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm3 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
		),
	},
	search: {
		viewBox: "-2.5 -2.5 24 24",
		path: (
			<path d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12zm6.32-1.094l3.58 3.58a1 1 0 1 1-1.415 1.413l-3.58-3.58a8 8 0 1 1 1.414-1.414z"></path>
		),
	},
	adjustments: {
		viewBox: "-2 -4 24 24",
		path: (
			<path d="M9 12V1a1 1 0 1 1 2 0v11h1a1 1 0 0 1 0 2h-1v1a1 1 0 0 1-2 0v-1H8a1 1 0 0 1 0-2h1zm7-10V1a1 1 0 0 1 2 0v1h1a1 1 0 0 1 0 2h-1v11a1 1 0 0 1-2 0V4h-1a1 1 0 0 1 0-2h1zM4 5h1a1 1 0 1 1 0 2H4v8a1 1 0 0 1-2 0V7H1a1 1 0 1 1 0-2h1V1a1 1 0 1 1 2 0v4z"></path>
		),
	},
};

const sizes = {
	sm: 24,
	md: 32,
	lg: 40,
};

interface IconProps {
	icon: IconsType;
	size?: IconsSizesType;
	className?: string;
	fill?: string;
}

export const Icon: React.FC<IconProps> = ({
	icon,
	size = "md",
	className = "",
	fill,
}) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox={icons[icon].viewBox}
			width={sizes[size]}
			height={sizes[size]}
			preserveAspectRatio="xMinYMin"
			className={classnames(className, " text-center")}
			fill="currentColor"
			role="img"
		>
			{icons[icon].path}
		</svg>
	);
};
