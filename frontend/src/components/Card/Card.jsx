import style from './Card.module.css'

function Card({ task }) {
  return (
    <div className={style.card}>
      <h2 className={style.title}>{task.title}</h2>
      {task.date && <p className={style.date}>📅 {task.date}</p>}
      {task.description && <p className={style.desc}>{task.description}</p>}
    </div>
  )
}

export default Card