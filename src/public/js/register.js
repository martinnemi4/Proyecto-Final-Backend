const form = document.getElementById('registerForm');

form.addEventListener('submit',async e => {
    e.preventDefault();
    const data = new FormData(form);
    const response = await fetch('/api/sessions/register', {
        method:'POST',
        body:data
    })
    console.log(response)
    try {
        const result = await response.json();
        console.log(result)
        if(result.status==="success") {
            window.location.replace('/');
        }
        return result;
    } catch (error) {
        return error
    }
});