import React, { useState } from "react";
import { Generate, Regenerate, Insert} from '../../assets/index';

interface IUserPrompt {
    role: string;
    content: string;
}

interface Props {
    open: boolean;
    handleClose: () => void;
}

const modalStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
}

const contentStyle: React.CSSProperties = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
}

const inputStyle: React.CSSProperties = {
    fontSize: "16px",
    borderRadius: "6px",
    padding: "12px 126px 12px 12px",
    width: "100%",
    boxSizing: "border-box",
    
}

const buttonStyle: React.CSSProperties = {
    backgroundColor: "#3B82F6",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "600",
    borderRadius: "4px",
    padding: "7px 10px",
    cursor: "pointer",
}

const PromptModal: React.FC<Props> = ({ open, handleClose }) => {
    const [userPrompts, setUserPrompts] = useState<IUserPrompt[]>([]);
    const [inputContent, setInputContent] = useState<string>("");

    const handleGenerate = () => {
        if (inputContent.trim()) {
            const data: IUserPrompt = {
                role: "user",
                content: inputContent
            };
            setUserPrompts(prev => [...prev, data]);
            
            const systemResponse: IUserPrompt = {
                role: "system",
                content: "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
            };
            setUserPrompts(prev => [...prev, systemResponse]);
        }
        setInputContent("");
    };

    const handleInsert = () => {
        const placeHolder = document.querySelector(".msg-form__placeholder");
        placeHolder?.remove();
        const inputField = document.querySelector(".msg-form__contenteditable");
        if (inputField && userPrompts.length > 0) {
            inputField.textContent = userPrompts[userPrompts.length - 1].content;
            
            const range = document.createRange();
            range.selectNodeContents(inputField);
            range.collapse(false);
            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
        setInputContent("");
        setUserPrompts([]);
        handleClose();
    };

    return (
        <div style={{ ...modalStyle, display: open ? 'flex' : 'none' }} onClick={handleClose}>
            <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
                {userPrompts.map((userPrompt, index) => (
                    <div key={index} className={`user-prompt ${userPrompt.role}`}>
                        {userPrompt.content}
                    </div>
                ))}
                {userPrompts.length === 0 && (
                    <input
                        type="text"
                        placeholder="Your content"
                        value={inputContent}
                        onChange={(e) => setInputContent(e.target.value)}
                        style={inputStyle}
                    />
                )}
                <div style={{ display: 'flex', justifyContent: "flex-end", marginTop: "16px" }}>
                    {userPrompts.length === 0 ? (
                        <button onClick={handleGenerate} style={{ ...buttonStyle, marginRight: "8px" }}>
                            <img src={Generate} alt="icon" style={{ width: "18px", height: "18px", marginRight: "6px" }} />
                            Generate
                        </button>
                    ) : (
                        <>
                            <button onClick={handleInsert} style={{ ...buttonStyle, marginRight: "8px" }}>
                                <img src={Insert} alt="icon" style={{ width: "18px", height: "18px", marginRight: "6px" }} />
                                Insert
                            </button>
                            <button disabled style={buttonStyle}>
                                <img src={Regenerate} alt="icon" style={{ width: "18px", height: "18px", marginRight: "6px" }} />
                                Regenerate
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PromptModal;
