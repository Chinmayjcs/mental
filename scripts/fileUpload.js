function updateFileName(inputElement, displayElementId) {
    const fileName = inputElement.files.length > 0 ? inputElement.files[0].name : 'No file chosen';
    document.getElementById(displayElementId).textContent = fileName;
}
