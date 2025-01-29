const loginForm = document.querySelector('form')!
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    try {
        const formData = new FormData(loginForm)
        const data = Object.fromEntries(formData)
        console.log(data)
        const res = await fetchWithToken('https://dbms-dxyg.onrender.com/auth/login','POST', JSON.stringify(data)  )

        if(!res.ok) {
            throw new Error
        }
        const {access_token} = await res.json()
        localStorage.setItem('token', access_token)
    
        if(access_token) {
            window.location.pathname = 'index.html'
        }
       
    } catch (error) {
        console.log(error)
    }
})