import s from './Footer.module.css';

const Footer = () => {
  return (
      <div className={s.container}>
          <p className={s.text}>© 2024, Ghost_Kato</p>
          <a className={s.link} href="https://www.linkedin.com/in/maksym-osadchenko" target="_blank" rel="noopener noreferrer">Linkedin</a>
      </div>
  )
}

export default Footer