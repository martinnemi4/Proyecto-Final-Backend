const button = document.getElementById('purchaseButton');

button.addEventListener('click', async evt => {
    evt.preventDefault();
    await fetch('/api/carts/purchase', {
        method: 'POST',
    }).then(result => result.json()).then(json => {
        if (json.status === 'success') {
            console.log(json);
            window.location.replace('/finishedPurchase')
        }
    });
})