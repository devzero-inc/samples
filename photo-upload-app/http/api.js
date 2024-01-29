async function getPhoto() {
    try {
        const response = await fetch("/api/image");
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

async function fetchImageData(id) {
    try {
        const response = await fetch(`/api/image?id=${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // const data = await response.json();
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        return imageUrl;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}


async function uploadPhoto(file){
    try {
        const response = await fetch("/api/image", {
            method: "POST",
            body: file,
        });
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

async function deletePhoto(id){
    try {
        const response = await fetch(`/api/image?id=${id}`, {
            method: "DELETE",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export { getPhoto, uploadPhoto, deletePhoto, fetchImageData };