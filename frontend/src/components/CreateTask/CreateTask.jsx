import { useState } from 'react'
import style from './CreateTask.module.css'

function CreateTask( onSubmit, onCancel ) {

  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit({ title: title.trim(), date: date.trim(), description: description.trim() })
    setTitle('')
    setDescription('')
  }

  return (
    <div className={style.container}>
        <h2>Create your task!</h2>
        <form className={style.form} action="submit" onSubmit={handleSubmit}>
          <label htmlFor="">Name</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

          <label htmlFor="">Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

          <label htmlFor="">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
        </form>
        <div className={style.btns}>
          <button type="submit"> Save </button>
          <button onClick={onCancel}> Cancel </button>
        </div>
    </div>
  )
}

export default CreateTask