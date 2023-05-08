import React, { useState } from 'react';

export default function AddPost() {
  const [formValues, setFormValues] = useReducer(
    (curVals, newVals) => ({ ...curVals, ...newVals }),
    {
      title: '',
      category: '',
      content: ''
    }
  )

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ [name]: value })
  }

  const handleSubmit = async event => {
    event.preventDefault();
    try{
      const res = await fetch(`/posts`, {
        method: "POST",
        body: JSON.stringify(formValues),
      });
      const data = await res.json();
      console.log(data)
    }catch(e){
      alert(e);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          required
          minLength={8}
          maxLength={32}
          value={formValues.title}
          onChange={e => handleChange(e)}
        />
        <input
          type="text"
          name="category"
          required
          value={formValues.category}
          onChange={e => handleChange(e)}
        />
        <textarea
          type="text"
          name="content"
          required
          minLength={8}
          value={formValues.content}
          onChange={e => handleChange(e)}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}