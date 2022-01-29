const BasketLogic = (userId, productVersionId, quantity) => {
    const url = 'http://127.0.0.1:8080/card/card'
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            userId: userId,
            productVersionId: productVersionId,
            quantity: quantity || 1,
        }),
    })
        .then(response => response.json())
        .then(data => {
            setCartCount(data);
            console.log(data);
        })
};



function addToBasket(a) {
    userId = localStorage.getItem('userId');
    productVersionId = a.dataset.id;
    console.log(userId, productVersionId)
    BasketLogic(userId, productVersionId);
}