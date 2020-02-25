$.card = (options) => {
    options.forEach(card => {
        const $card = _createCard(card)
        document.querySelector('.row').appendChild($card)
    })
    

}

function _createCard(options) {
    const card = document.createElement('div')
    card.classList.add('col')
    card.insertAdjacentHTML('afterbegin', `
        <div class="card">
            <img style='height: 250px'src=${options.imgURL} class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${options.title || 'Fruits'}</h5>
                <a href="" class="btn btn-primary">Check price</a>
                <a href="" class="btn btn-danger">Delete</a>
            </div>
        </div>
    `)
    return card
}

class CardOptions {
    constructor(title, imgURL, price) {
        this.title = title,
        this.imgURL = imgURL,
        this.price = price
    }
}

const AppleCard = new CardOptions('Apples', "https://img.rg.ru/img/content/169/76/37/apple-1589874_1920_d_850.jpg", '$1.49')
const OrangeCard = new CardOptions('Oranges',"https://lh3.googleusercontent.com/proxy/hrqALOlLkVuVEfybqzkuMKpaM1ZwICrVrWz4gjiVyICvk7e8pEtvwyX7ab3GFJVpves73dRJCdfEstKhmSv9rFvvBiRQfde8bFvOijEXY5cw4P_LJZStdI_SdzNwGHT4J-xu5Gqhia-rRCmgQPD36Ar4xga9QPSqfNvFNVhRlI7o9sJXCN5bj1QWxJkj7KD1Gg7q0KWsdysEIYgzfoyhWZgIvulSP9NOPlL_QA" , '$2.99')
const MangoCard = new CardOptions('Mangoes', "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQkB1zEg2uFDVZl3WiUUh4Km20_MpCSY_3r9Z6DyahyHo7128_b",'$4.99')

const FruitCards = [AppleCard, OrangeCard, MangoCard]