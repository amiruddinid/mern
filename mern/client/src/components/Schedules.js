import React, { useState, useEffect } from 'react';

export default function Search() {
    const [schedules, setSchedules] = useState([]);
    const [id, setId] = useState();
    const [formValues, setFormValues] = useReducer(
        (curVals, newVals) => ({ ...curVals, ...newVals }),
        {
          schedule: '',
          description: '',
        }
    )

    const getData = async () => {
        const res = await fetch('http://localhost:8000/schedules')
        const json = res.json()
        return json
    }
    
    useEffect(() => {
        let ignore = false;

        if (!ignore) setSchedules(getData())

        return () => {
            ignore = true;
        };
    }, []);

    const handleSubmit = async event => {
        event.preventDefault();
        try{
          const res = await fetch(`http://localhost:8000/schedules${id && '/' + id}`, {
            method: id ? "PUT" : "POST" ,
            body: JSON.stringify(formValues),
          });
          const data = await res.json();
          console.log(data)
          setSchedules(getData())
        }catch(e){
          alert(e);
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormValues({ [name]: value })
    }

    const handleEdit = (index) => {
        setId(schedules[index]._id)
        setFormValues({
            schedule: schedules[index].schedule,
            description: schedules[index].description,
        })
    }

    const handleDelete = async (index) => {
        try{
            const res = await fetch(`http://localhost:8000/schedules/${schedules[index]._id}` , {
              method: "DELETE",
            });
            const data = await res.json();
            setSchedules(getData())
        }catch(e){
            alert(e);
        }
    }

    const handleDetail = async(index) => {
        try{
            const res = await fetch(`http://localhost:8000/schedules/${schedules[index]._id}`)
            const data = await res.json();
            alert(data)
        }catch(e){
            alert(e);
        }
    }

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
                <button type="submit">Search</button>
            </form>
            <ul>
                {schedules.map((schedule, i) => (
                    <li key={schedule._id}>
                        {schedule.schedule} - {schedule.description}
                        <button type="button" onClick={(e) => handleDetail(i)}>🔎</button>
                        <button type="button" onClick={(e) => handleEdit(i)}>✏️</button> 
                        <button type="button" onClick={(e) => handleDelete(i)}>❌</button>
                    </li>
                ))}
            </ul>
        </>
    );
}