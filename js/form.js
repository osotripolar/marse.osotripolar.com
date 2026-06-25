// form
const btnSendForm = document.getElementById('btnSendForm')
const inputName = document.querySelector('form #name')
const inputContact = document.querySelector('form #contact')
const inputMessage = document.querySelector('form #message')
const formMessage = document.querySelector('.formMessage')

//form---------
document.addEventListener('submit', (e) => {
  e.preventDefault()
})

btnSendForm.addEventListener('click', procesarForm)

inputName.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    e.preventDefault()
    inputContact.focus()
  }
})

inputContact.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    e.preventDefault()
    inputMessage.focus()
  }
})

inputMessage.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key == 'Enter') {
    btnSendForm.click()
  }
})

// ============ FUNCTIONS ============

function procesarForm() {

  try {
    const name = inputName.value
    const contact = inputContact.value
    const message = inputMessage.value

    if (!name || !contact || !message) throw new Error('Debe rellenar todos los campos')

    // await procesar e imprimir respuesta
    showFormMessage('Su solicitud fue enviada con éxito', true)

    inputName.value = ""
    inputContact.value = ""
    inputMessage.value = ""

  } catch (error) {
    showFormMessage(error.message, false)
  }
}

function showFormMessage(message, operation = true) {

  if (!message) return console.log('No se hizo nada')

  formMessage.className = 'formMessage'

  if (operation) {
    formMessage.classList.add('great')
    setTimeout(() => {
      formMessage.className = 'formMessage'
    }, 3000)
  } else {
    formMessage.classList.add('wrong')
  }
  formMessage.textContent = message
}

//form---------

btnSendForm.addEventListener('click', procesarForm)

inputName.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    e.preventDefault()
    inputContact.focus()
  }
})

inputContact.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    e.preventDefault()
    inputMessage.focus()
  }
})

inputMessage.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key == 'Enter') {
    btnSendForm.click()
  }
})

// ============ FUNCTIONS ============

async function procesarForm() {

  try {
    const name = inputName.value
    const contact = inputContact.value
    const message = inputMessage.value

    if (!name || !contact || !message) throw new Error('Debe rellenar todos los campos')

    const res = await postForm(name,contact,message)

    if(!res.ok){

      const data = await res.json()

      return showFormMessage(data.message,false)
    }

    inputName.value = ""
    inputContact.value = ""
    inputMessage.value = ""

    showFormMessage('Su solicitud fue enviada con éxito', true)

  } catch (error) {
    showFormMessage(error.message, false)
  }
}

function showFormMessage(message, operation = true) {

  if (!message) return console.log('No se hizo nada')

  formMessage.className = 'formMessage'

  if (operation) {
    formMessage.classList.add('great')
    setTimeout(() => {
      formMessage.className = 'formMessage'
    }, 3000)
  } else {
    formMessage.classList.add('wrong')
  }
  formMessage.textContent = message
}


// ============ FETCH FUNCTIONS ============

async function postForm(name,contact,message){

  const res = await fetch('https://api.osotripolar.com/marse',{
    method: 'POST',
    headers: {
      'Content-type' : 'application/json'
    },
    body: JSON.stringify(
      {
        name,
        contact,
        message
      }
    )
  })

  return res
}
