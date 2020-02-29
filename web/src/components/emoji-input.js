import React, { useState, useEffect } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Emoji, Picker } from "emoji-mart";
import { Popover } from "@blueprintjs/core";

const DEFAULT_EMOJI = ":money_mouth_face:";

export default function({ onChange, placeholder }) {
  const [emoji, setEmoji] = useState(placeholder || DEFAULT_EMOJI);
  const [isOpen, setOpen] = useState(false);

  function handleSelect(emoji) {
    setEmoji(emoji.colons);
    setOpen(false);
  }

  useEffect(() => {
    onChange(emoji);
  });

  return (
    <div className="mb-4">
      <Popover position="right-top" isOpen={isOpen}>
        <div
          className="bg-gray-300 hover:bg-gray-400 cursor-pointer rounded-lg flex items-center justify-center emoji-input"
          onClick={() => setOpen(true)}>
          <Emoji emoji={emoji} size={36} />
        </div>
        <Picker
          onSelect={handleSelect}
          title="Pick your emoji…"
          emoji="point_up"
          style={{ border: 0 }}
        />
      </Popover>
    </div>
  );
}
