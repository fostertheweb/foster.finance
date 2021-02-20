import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/pro-duotone-svg-icons";
import { Emoji } from "emoji-mart";
import classNames from "classnames";
import { useCurrentUser, useSignOut } from "hooks/use-amplify-auth";
import { useGetProfile } from "hooks/use-profile";

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

export default function () {
	const [isOpen, setOpen] = useState(false);
	const buttonRef = useRef(null);
	const menuRef = useRef(null);
	const { status: signOutStatus, mutate: signOut } = useSignOut();
	const { data: currentUser } = useCurrentUser();
	const navigate = useNavigate();
	const { data: profile, status: profileStatus } = useGetProfile();

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

	useEffect(() => {
		if (signOutStatus === "success") {
			navigate("/");
		}
		//esline-disable-next-line
	}, [signOutStatus]);

	return (
		<div className="relative">
			<div
				ref={buttonRef}
				className={`${
					isOpen ? "bg-gray-700 text-white border-indigo-500" : "bg-transparent"
				} border border-transparent cursor-pointer py-1 px-2 rounded flex items-center transition duration-150 ease-in-out text-gray-300 hover:text-white hover:bg-gray-700`}
				onClick={() => setOpen(!isOpen)}>
				<span className="mr-2">{profile?.name || currentUser?.attributes?.email}</span>
				<div className="ff-filter-drop-shadow">
					<Emoji emoji={profile?.emoji || "hatching_chick"} size={24} />
				</div>
			</div>
			{isOpen ? (
				<div ref={menuRef} className="absolute right-0 z-50 w-40 py-2 mt-2 text-gray-800 bg-white rounded shadow-md">
					<Link className={classNames(menuItem)} to="/settings" onClick={() => setOpen(false)}>
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
