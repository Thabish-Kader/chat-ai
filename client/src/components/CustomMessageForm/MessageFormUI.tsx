import {
	PaperAirplaneIcon,
	PaperClipIcon,
	XMarkIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import Dropzone from "react-dropzone";

type MessageFormUIProps = {
	setAttachment: React.Dispatch<React.SetStateAction<File | undefined>>;
	message: string;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: () => Promise<void>;
};

const MessageFormUI = ({
	setAttachment,
	message,
	handleChange,
	handleSubmit,
}: MessageFormUIProps) => {
	const [preview, setPreview] = useState("");
	return (
		<div className="message-form-container">
			{preview && (
				<div className="message-form-preview">
					<img
						className="message-form-preview-image"
						src={preview}
						alt="mesg-img"
						onLoad={() => URL.revokeObjectURL(preview)}
					/>
					<XMarkIcon
						className="message-form-icon-x"
						onClick={() => {
							setPreview("");
							setAttachment(undefined);
						}}
					/>
				</div>
			)}
			<div className="message-form">
				<div className="message-form-input-container">
					<input
						type="text"
						className="message-form-input"
						value={message}
						onChange={handleChange}
						placeholder="Send a message..."
					/>
				</div>
				<div className="message-form-icons">
					<Dropzone
						multiple={false}
						noClick={true}
						onDrop={(acceptedFiles) => {
							setAttachment(acceptedFiles[0]);
							setPreview(URL.createObjectURL(acceptedFiles[0]));
						}}
					>
						{({ getRootProps, getInputProps, open }) => (
							<div {...getRootProps()}>
								<input {...getInputProps()} />
								<PaperClipIcon
									className="message-form-icon-clip"
									onClick={open}
								/>
							</div>
						)}
					</Dropzone>
					<hr className="vertical-line" />
					<PaperAirplaneIcon
						className="message-form-icon-airplane"
						onClick={() => {
							setPreview("");
							handleSubmit();
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default MessageFormUI;
