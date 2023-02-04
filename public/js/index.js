
const questionCards = document.querySelector('.cards');

const submitButton = document.querySelector('.question__submit');
const loginBtn = document.querySelector('#login');

const logoutBtn = document.querySelector('#logout');

let replyBtns = document.querySelectorAll('.reply');

let questionElements;

const isAuth = () => {
  const token = localStorage.getItem('jwt');
  if (token) {
    return true;
  }
  return false;
}

if(isAuth()) {
  loginBtn.style.display = 'none';
  logoutBtn.style.display = 'block';
}

const addQuestion = async () => {
  const questionText = document.getElementById('quest').value;
  const questionModule = document.getElementById('technology').value;
  const questionEmail = document.getElementById('email').value;

  const data = {
   "data": {
     text: questionText,
     module: questionModule,
     email: questionEmail,
   }
  }

    const response = await fetch('http://localhost:1337/api/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

  const json = await response.json();


  const questData = json.data;

  const questionElement = document.createElement('div');
  questionElement.classList.add('question__element');
  questionElement.innerHTML = `
    <div class="question__text">
      <p>${questData.attributes.module}</p>
            <p>${questData.attributes.text}</p>
            <p>${questData.attributes.email}</p>
              ${isAuth() ? `<button class="reply">Reply</button>` : ''}
    </div>
  `;
  questionElements = document.querySelectorAll('.question__element')
  questionCards.appendChild(questionElement);
}

const getData = () => {
  fetch('http://localhost:1337/api/questions')
    .then(response => response.json())
    .then((data) => {
      data.data.forEach((question) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question__element');
        questionElement.innerHTML = `
          <div class="question__text">
            <p>${question.attributes.module}</p>
            <p>${question.attributes.email}</p>
            <p>${question.attributes.text}</p>
       ${isAuth() ? `<button class="reply">Reply</button>` : ''}
          </div>
        `;
        questionElements = document.querySelectorAll('.question__element')
        questionCards.appendChild(questionElement);
      });
    });
}

getData()

submitButton.addEventListener('click', addQuestion)

const logout = () => {
  localStorage.removeItem('jwt');
  window.location.reload()
  logoutBtn.style.display = 'none';
  loginBtn.style.display = 'block';
}

logoutBtn.addEventListener('click', logout)

questionElements.forEach((question) => {
  question.addEventListener('click', (e) => {
    console.log('clicked')
  })
})
