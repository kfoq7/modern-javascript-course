function Secure(brand, year, type) {
  this.brand = brand
  this.year = year
  this.type = type
}

function UI() {}

// Fill year options
UI.prototype.fillOptions = function () {
  const max = new Date().getFullYear()
  const min = max - 20

  const selectYear = document.querySelector('#year')

  for (let i = max; i > min; i--) {
    let option = document.createElement('option')
    option.value = i
    option.textContent = i
    selectYear.appendChild(option)
  }
}

// Show waring message on screen
UI.prototype.showMessage = function (message, type) {
  const div = document.createElement('div')

  div.classList.add('mensaje', 'mt-10', type)
  div.textContent = message

  const form = document.querySelector('#cotizar-seguro')
  form.insertBefore(div, document.querySelector('#resultado'))

  setTimeout(() => {
    div.remove()
  }, 3000)
}

const ui = new UI()

document.addEventListener('DOMContentLoaded', () => {
  ui.fillOptions()
})

eventListeners()
function eventListeners() {
  const form = document.querySelector('#cotizar-seguro')
  form.addEventListener('submit', toQuoteSecure)
}

function toQuoteSecure(e) {
  e.preventDefault()

  const brand = document.querySelector('#marca').value
  const year = document.querySelector('#year').value
  const type = document.querySelector('input[name="tipo"]:checked').value

  if (brand === '' || year === '' || type === '') {
    ui.showMessage('Todos los campos son obligatorios', 'error')
    return
  }

  ui.showMessage('Cotizando', 'correcto')

  // instance Secure
}
