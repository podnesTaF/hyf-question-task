const login = async (identifier, password) => {
  try {
    const res = await fetch('http://localhost:1337/api/auth/local', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"identifier": identifier, "password": password}),
    })

    const data = await res.json()
    console.log('fete')
    const { jwt } = data;
    localStorage.setItem('jwt', jwt);


    return data.user
  } catch (error) {
    console.log(error);
  }
}

let me;
document.querySelector('#btn').addEventListener('click', async (e) => {
  e.preventDefault()
  const uname = document.querySelector('#uname').value

  const password = document.querySelector('#psw').value

  const data = await login(uname, password)

  me = data.user

  if (data) {
    window.location.href = '/index.html'
  }
})

export default me



