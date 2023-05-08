import React, { useReducer } from 'react';

export default function Contact() {
    const [formValues, setFormValues] = useReducer(
        (curVals, newVals) => ({ ...curVals, ...newVals }),
        {
            name: '',
            email: '',
            phone: ''
        }
    )

    const handleChange = e => {
        const { name, value } = e.target;
        setFormValues({ [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        // handle form submission
        console.log(formValues)
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formValues.name}
                    onChange={e => handleChange(e)}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formValues.email}
                    onChange={e => handleChange(e)}
                />
            </div>
            <div>
                <label htmlFor="phone">Phone:</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formValues.phone}
                    onChange={e => handleChange(e)}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}