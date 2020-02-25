

Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}

function noop() {}

function _createModalFooter(buttons = []) {
    if (buttons.length === 0) {
        return document.createElement('div')
    }

    const wrap = document.createElement('div');
    wrap.classList.add('modal-footer')

    buttons.forEach( btn => {
        const $btn = document.createElement('button');
        $btn.textContent = btn.text
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${btn.type || 'secondary'}`)
        $btn.onclick = btn.handler || noop

        wrap.appendChild($btn)
    })

    return wrap;
}

function _createModal(options) {
    const DEFAULT_WIDTH = '600px'
    const modal = document.createElement('div');
    modal.classList.add('vmodal');
    modal.insertAdjacentHTML('afterbegin', `
        <div class='modal-overlay' data-close='true'>
            <div class='modal-window' style='width: ${options.width || DEFAULT_WIDTH}'>
                <div class="modal-header">
                    <span class='modal-title'>${options.title || 'Window'}</span>
                    ${options.closable ? `<span class='modal-close' data-close='true'>&times;</span>` : ''}
                </div>
                <div class="modal-body">
                    ${options.content || ''}
                </div>
            </div>
        </div>
    `)
    const footer = _createModalFooter(options.footerButtons)
    footer.appendAfter(modal.querySelector('.modal-body'))
    document.body.appendChild(modal)
    return modal;
}

$.modal = function(options) {
    const ANIMATION_SPEED = 200;
    const $modal = _createModal(options);
    let closing = false;
    let destroyed = false;

    const modal = {
        open() {
            if (destroyed) {
                return console.log('modal was destroyed')
            }
            closing === false ? $modal.classList.add('open') : false;
        },
        close() {
            closing = true
            $modal.classList.remove('open');
            $modal.classList.add('hide');
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
            }, ANIMATION_SPEED);
        },
        setContent(html) {
            $modal.querySelector('.modal-body').innerHTML = html
        },
        setTitle(str) {
            $modal.querySelector('.modal-title').innerHTML = str
        }
    }

    const listener = event => {
        if (event.target.dataset.close) {
            modal.close()
        }
    }

    $modal.addEventListener('click', listener)

    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener('click', listener)
            destroyed = true;
        },
    })
}

class ModalOptions {
    constructor(title, closable, content, width, footerButtons) {
        this.title = title,
        this.closable = closable,
        this.content = content,
        this.width = width
        this.footerButtons = footerButtons
    }
}

const DefaultModal = new ModalOptions(
    'Default modal',
     true,
    `
    <p>First Paragraph.</p>
    <p>Second Paragraph.</p>
    <p>Third Paragraph.</p>
    `,
    '400px',
    [
        {text: 'OK', type: 'primary', handler: () => {
            console.log('primaryBtn clicked')
            modal.close()
        }},
        {text: 'Cancel', type: 'danger', handler: () => {
            console.log('cancelBtn clicked')
            modal.close()
        }}
    ]
)

const ApplesModal = new ModalOptions('Apples Price', true, `<p>$1.49</p>`,'',[{text: 'Close', type:'primary', handler: () => modal.close()}])
const OrangesModal = new ModalOptions('Oranges Price', true, `<p>$2.99</p>`,'',[{text: 'Close', type:'primary', handler: () => modal.close()}])
const MangoesModal = new ModalOptions('Mangoes Price', true, `<p>$4.99</p>`,'',[{text: 'Close', type:'primary', handler: () => modal.close()}])
const PearsModal = new ModalOptions('Pears Price', true, `<p>$1.59</p>`,'',[{text: 'Close', type:'primary', handler: () => modal.close()}])

const setHTMLTry = `
    <p>Changed HTML</p>
    <p>Now This is the second paragraph</p>
    <p>New Third Paragraph</p>
    <p>Fourth paragraph!</p>
`