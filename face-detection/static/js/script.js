document.getElementById('detectButton').addEventListener('click', () => {
    const input = document.getElementById('imageUpload').files[0];
    if (input) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const image = e.target.result.split(',')[1];

            fetch('/detect', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: image })
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('resultImage').src = `data:image/jpeg;base64,${data.image}`;
            });
        };
        reader.readAsDataURL(input);
    } else {
        alert('Please upload an image first.');
    }
});
