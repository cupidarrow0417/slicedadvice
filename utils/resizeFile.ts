import Resizer from "react-image-file-resizer";


/**
 * It takes a file, resizes it to 500x500, converts it to a base64 string, and returns a promise that
 * resolves to that base64 string
 * @param {any} file - The file to be resized
 */
const resizeFile = (file: any, width: number, height: number) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            width,
            height,
            "JPEG",
            80,
            0,
            (uri) => {
                resolve(uri);
            },
            "base64"
        );
    });

export default resizeFile;
