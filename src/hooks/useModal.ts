import {useState} from 'react';


export const useModal = (initialValue: boolean = false) => {
    const [isOpen, setOpen] = useState(initialValue);

    const handleOpen = () => {
        
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

    return {isOpen, handleOpen, handleClose};
}