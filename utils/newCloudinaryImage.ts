const newCloudinaryImage = (image: string, unsigned_upload_preset: string) => {
    // Note: Sometimes, we want to delete an existing image. 
    // We will be doing that in the controller functions itself, with the Cloudinary
    // SDK so that we don't have to deal with authentication. So just
    // remember to check for whatever existing picture, and delete it!
    // Good example is at updateUserProfile, in the userControllers

    //Upload the image to cloudinary
    return new Promise((resolve, reject) => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", unsigned_upload_preset);
        data.append("cloud_name", "slicedadvice");
        fetch("https://api.cloudinary.com/v1_1/slicedadvice/image/upload", {
            method: "post",
            body: data,
        })
            .then((resp) => resp.json())
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default newCloudinaryImage;
