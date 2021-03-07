import React from "react";
import { faTimes, faInfoCircle } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Modal({ isOpen, title, children }) {
	return isOpen ? (
		<>
			<Overlay />
			<div className="fixed z-30 flex items-center justify-center w-full">
				<Card title={title}>{children}</Card>
			</div>
		</>
	) : null;
}

function Overlay({ children }) {
	return (
		<div className="absolute top-0 left-0 z-10 flex items-center justify-center w-screen h-screen bg-black opacity-40">
			{children}
		</div>
	);
}

function Card({ children, title }) {
	return (
		<div className="z-30 w-1/2 p-4 bg-white rounded shadow-xl">
			<div className="flex items-center justify-between w-full p-2 pb-4 border-b border-gray-300">
				<FontAwesomeIcon icon={faTimes} className="text-gray-300" />
				<h3>{title}</h3>
				<FontAwesomeIcon icon={faInfoCircle} className="text-gray-200" />
			</div>
			<div className="pt-4">{children}</div>
		</div>
	);
}
