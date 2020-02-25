$.card = (options) => {
    const cardListener = (event, card) => {
        if (event.target.dataset.openprice) {
            modal.setContent(`${card.modal.content}`)
            modal.setTitle(`${card.modal.title}`)
            modal.open()
        }
    }
    options.forEach(fruitCard => {
        const $card = _createCard(fruitCard)
        document.querySelector('.row').appendChild($card)
        $card.addEventListener('click', function(){cardListener(event, fruitCard)}, false)
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
                <a href="#" class="btn btn-primary" data-openPrice = 'true'>Check price</a>
                <a href="#" class="btn btn-danger">Delete</a>
            </div>
        </div>
    `)
    return card
}


class CardOptions {
    constructor(title, imgURL, price, modal) {
        this.title = title,
        this.imgURL = imgURL,
        this.price = price,
        this.modal = modal
    }
}

const AppleCard = new CardOptions('Apples', "https://img.rg.ru/img/content/169/76/37/apple-1589874_1920_d_850.jpg", '$1.49', ApplesModal)
const OrangeCard = new CardOptions('Oranges',"https://lh3.googleusercontent.com/proxy/hrqALOlLkVuVEfybqzkuMKpaM1ZwICrVrWz4gjiVyICvk7e8pEtvwyX7ab3GFJVpves73dRJCdfEstKhmSv9rFvvBiRQfde8bFvOijEXY5cw4P_LJZStdI_SdzNwGHT4J-xu5Gqhia-rRCmgQPD36Ar4xga9QPSqfNvFNVhRlI7o9sJXCN5bj1QWxJkj7KD1Gg7q0KWsdysEIYgzfoyhWZgIvulSP9NOPlL_QA" , '$2.99', OrangesModal)
const MangoCard = new CardOptions('Mangoes', "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQkB1zEg2uFDVZl3WiUUh4Km20_MpCSY_3r9Z6DyahyHo7128_b",'$4.99', MangoesModal)
const PearCard = new CardOptions('Pears', 'https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/285/285430/two-pears-on-a-table.jpg?w=1155&h=1734','$1.59', PearsModal)

const FruitCards = [AppleCard, OrangeCard, MangoCard, PearCard]
