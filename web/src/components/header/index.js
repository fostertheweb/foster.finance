import React from "react";
import Logo from "components/common/logo";

export default function () {
	return (
		<div className="fixed z-0 w-full px-2 font-medium text-white bg-gray-800 border-b-2 border-gray-900">
			<div className="flex items-center justify-between ff-container ff-h-header">
				<div className="flex items-center">
					<div className="mr-4 hover:no-underline">
						<Logo dark={true} />
					</div>
				</div>
				<div className="flex items-center"></div>
			</div>
		</div>
	);
}
