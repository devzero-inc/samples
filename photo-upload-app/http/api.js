async function getPhoto() {
    try {
        const response = await fetch("/api/image");
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.log(error);
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

export { getPhoto, uploadPhoto, deletePhoto };