# Frontend Comparison
We made this repository for showing how frontend frameworks handle real-world scenarios. We try to push their limits and see how do they perform. It's not a speed test, but a code smell analysis of the whole ecosystem, NOT just the framework itself.

## Contributing
If you think we did something wrong, or if you want to show us a new framework, send us a pull request.

## Sidenotes during the development

### 1. React

### 1.1. Simple Login
- Selecting UI toolkit: **Bootstrap** looked outdated, and neither **Bootstrap** and **Antd** supported floating labeled input by default, so I chose **MaterialUI**. There were other non-free or incomplete packages.
- Form validation: After doing some research, I found **Formik**, **React Hook Form** and **Redux Form**. I had a bad experience with **Redux Form** in the past, and the code examples of the **React Hook Form** looked better than both **Formik** and **Redux Form**. So I decided to use it.
- Authentication: The `reqres.in`'s API is kind of unique, so I didn't search third party component, and I wanted to show how easy to implement authentication with react hooks instead.
- **THE FIRST PROBLEM:** How do I pass serverside errors to inputs? My implementation of the authentication was a custom useHook, where I could easily get everything I need by doing this: `{ login, logout, loading, error, isLoggedin, token } = useAuth()`. This solution rerenders the component when any of the state values changes. This rerenders isn't necessarily a problem, but in contrast to this, **React Hook Form** isolated the most of the rerenders by being stateful. So it is hard to pass my login error to a form field.
	- Note: It could be easy to show the errors above the form, but that wouldn't be fun.
	- Solution: I had to modify my `async login(email, pass)` function to return the error after it resolves. This way, I can await the errors in the submit handler, and I can add the error by the **React Hook Form**'s setError.
	- Note: **React Hook Form** removes the error when you type into the input, so it is a good thing the have your errors handled by the form-library. Otherwise, you would need to keep on eye of the values and the keyup events of all the inputs, because **React Hook Form** does not expose that for you.
	- Note: Besides this, I recommend this lib.
- Login button icon: **MaterialUI** handled this well, I could easily pass any react components to the button.

### 1.2. To be continued
...