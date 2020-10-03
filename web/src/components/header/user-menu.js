import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/pro-duotone-svg-icons";
import { Emoji } from "emoji-mart";
import classNames from "classnames";
import { useSignOut } from "hooks/use-amplify-auth";

const menuItem = [
	"block",
	"px-4",
	"py-2",
	"w-full",
	"text-left",
	"hover:bg-gray-200",
	"hover:text-gray-900",
	"hover:no-underline",
	"font-normal",
	"transition",
	"duration-150",
	"ease-in-out",
];

export default function ({ emoji, name, disabled }) {
	const [isOpen, setOpen] = useState(false);
	const buttonRef = useRef(null);
	const menuRef = useRef(null);
	const signOut = useSignOut();

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				buttonRef.current &&
				menuRef.current &&
				!buttonRef.current.contains(event.target) &&
				!menuRef.current.contains(event.target)
			) {
				setOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			setOpen(false);
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [buttonRef, menuRef]);

	return (
		<div className="relative">
			<div
				ref={buttonRef}
				className={`${
					isOpen ? "bg-gray-700 text-white border-indigo-500" : "bg-transparent"
				} border border-transparent cursor-pointer py-1 px-2 rounded flex items-center transition duration-150 ease-in-out text-gray-300 hover:text-white hover:bg-gray-700`}
				onClick={() => setOpen(!isOpen)}>
				<span className="mr-2">{name}</span>
				<div className="ff-filter-drop-shadow">
					<Emoji emoji={emoji} size={24} />
				</div>
			</div>
			{isOpen ? (
				<div ref={menuRef} className={`absolute right-0 w-40 z-50 bg-white rounded py-2 shadow-md text-gray-800 mt-2`}>
					<Link
						className={`${classNames(menuItem)}${disabled ? " pointer-events-none text-gray-500" : ""}`}
						to="/app/settings"
						onClick={() => setOpen(false)}>
						Settings
					</Link>
					<button className={classNames(menuItem)} onClick={() => signOut()}>
						<FontAwesomeIcon icon={faSignOut} />
						<span className="ml-2">Sign out</span>
					</button>
				</div>
			) : null}
		</div>
	);
}
