import React, { useState, useEffect } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Emoji, Picker } from "emoji-mart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerThird } from "@fortawesome/pro-duotone-svg-icons";

const DEFAULT_EMOJI = ":money_mouth_face:";

export default function ({ colons, onChange, placeholder, loading }) {
	const [emoji, setEmoji] = useState(placeholder || DEFAULT_EMOJI);
	const [isOpen, setOpen] = useState(false);

	function handleSelect(emojiObject) {
		setEmoji(emojiObject.colons);
		setOpen(false);
	}

	useEffect(() => {
		onChange(emoji);
	}, [onChange, emoji]);

	return (
		<div>
			<div
				className="flex items-center justify-center bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 emoji-input"
				onClick={() => setOpen(true)}>
				{loading ? <FontAwesomeIcon icon={faSpinnerThird} spin /> : <Emoji emoji={colons || emoji} size={36} />}
			</div>
			<Picker onSelect={handleSelect} title="Pick your emoji…" emoji="point_up" style={{ border: 0 }} />
		</div>
	);
}
