function Secure(brand, year, type) {
  this.brand = brand
  this.year = year
  this.type = type
}

Secure.prototype.toQuoteSecure = function () {
  let amount
  const base = 2000

  const GET_AMOUNT = {
    1: base * 1.15,
    2: base * 1.05,
    3: base * 1.35
  }

  amount = GET_AMOUNT[this.brand] ?? base

  const diference = new Date().getFullYear() - this.year

  amount -= (diference * 3 * amount) / 100
  amount *= this.type === 'basic' ? 1.3 : 1.5

  return amount
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

UI.prototype.showResult = function (secure, total) {
  const { brand, year, type } = secure

  const GET_BRAND = {
    1: 'Americano',
    2: 'Asiatico',
    3: 'Europeo'
  }

  const div = document.createElement('div')
  div.classList.add('mt-10')
  div.innerHTML = `
    <p class="header">Your resume</p>
    <p class="font-bold">Brand: <span class="font-normal">${GET_BRAND[brand]}</span></p>
    <p class="font-bold">Year: <span class="font-normal">${year}</span></p>
    <p class="font-bold">Type: <span class="font-normal capitalize">${type}</span></p>
    <p class="font-bold">Total: <span class="font-normal">$ ${total}</span></p>
  `

  const resultDiv = document.querySelector('#resultado')

  const spinner = document.querySelector('#cargando')
  spinner.style.display = 'block'

  setTimeout(() => {
    spinner.style.display = 'none'

    resultDiv.appendChild(div)
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

  const results = document.querySelector('#resultado div')
  if (results != null) {
    results.remove()
  }

  // instance Secure
  const secure = new Secure(brand, year, type)
  const total = secure.toQuoteSecure()

  ui.showResult(secure, total)
}
