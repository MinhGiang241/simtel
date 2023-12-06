// import { useRef, useEffect } from 'react';
// import Clipboard from 'clipboard';

// const CopyButton = ({ textToCopy }) => {
//     const textRef = useRef(null);

//     useEffect(() => {
//         const clipboard = new Clipboard(textRef.current, {
//             text: () => textToCopy,
//         });

//         clipboard.on('success', () => {
//             console.log('Text copied to clipboard');
//         });

//         clipboard.on('error', () => {
//             console.error('Unable to copy text to clipboard');
//         });

//         // Cleanup the Clipboard instance when component unmounts
//         return () => {
//             clipboard.destroy();
//         };
//     }, [textToCopy]);

//     return (
//         <div>
//             <input
//                 type="text"
//                 value={textToCopy}
//                 readOnly
//                 ref={textRef}
//             />
//             <button>Copy</button>
//         </div>
//     );
// };

// export default CopyButton;
