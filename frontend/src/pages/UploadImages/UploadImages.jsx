import React, { useState } from 'react';
import axios from 'axios';
import * as styled from './styles';

function UploadImages() {
    let token = localStorage.getItem('login-token');
    const [selectedImages, setSelectedImages] = useState(null);

    const handleImageChange = (e) => {
        setSelectedImages(e.target.files);
    }

    localStorage.setItem('uploadState', 0);


    const uploadImages = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Array.from(selectedImages).forEach(image => {
            formData.append('multipartFiles', image);
        });

        try {
            const res = await axios.post('http://43.201.210.173:8080/file/uploadFile', formData, {
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(res.data);
            if(res.data){
                localStorage.setItem('image-url', JSON.stringify(res.data));
                localStorage.setItem('uploadState', 1);
            }
            // console.log(localStorage.getItem('image-url'));
            console.log(JSON.parse(localStorage.getItem("image-url")));


            for(var i=0; i<res.data.length; i++){
                // console.log(i, " : ",res.data[i]);
                // console.log(i, ":", localStorage.getItem('image-url')[i]);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <styled.Form onSubmit={uploadImages}>
            <styled.FileInput type="file" multiple onChange={handleImageChange} />
            <styled.UploadButton type="submit" >Upload</styled.UploadButton>
        </styled.Form>
    );
}

export default UploadImages;
