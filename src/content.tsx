import { Ai } from "assets";
import cssText from "data-text:~style.css";
import type { PlasmoCSConfig } from "plasmo";
import React, { useEffect, useState } from "react";
import PromptModal from '~features/prompt';

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

const Content = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const inputField = document.querySelector(".msg-form__contenteditable");
      if (inputField) {
        inputField.addEventListener("focus", handleShow);
        inputField.addEventListener("blur", handleRemove);
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId); 
  }, []);

  const handleShow = () => {
    const inputField = document.querySelector(".msg-form__contenteditable");
    const aiIconContainer = document.createElement("div");
    aiIconContainer.className = "linkedinAi";
    aiIconContainer.setAttribute("style", "position:absolute; bottom:0; right:6rem;");
    const img = document.createElement("img");
    img.src = Ai;
    img.alt = "linkedinAi";
    img.setAttribute("style", "width: 28px; height: 28px; cursor:pointer;");
    img.addEventListener("click", () => {
      setShowModal(true);
    });
    aiIconContainer.appendChild(img);
    inputField?.appendChild(aiIconContainer);
  };

  const handleRemove = () => {
    const inputField = document.querySelector(".msg-form__contenteditable");
    const aiIconContainer = inputField?.querySelector(".linkedinAi"); 
    aiIconContainer?.remove();
  };

  return (
    <div>
      <PromptModal open={showModal} handleClose={() => setShowModal(false)} />
    </div>
  );
};

export default Content;
