import { useState } from "react";

const useVisibilityToggle = (initialState = false) => {

    const [isOpen, setIsOpen] = useState(initialState);   
    
    const toggle = () => {
        setIsOpen(!isOpen);
    };
    return [isOpen, toggle];
} 

export default useVisibilityToggle