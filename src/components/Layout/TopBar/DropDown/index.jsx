import styles from './styles.module.css'

function DropDown() {

  const menuItems = [
    { title: 'profile' },
    { title: 'pages' },
    { title: 'withdraws' },
    { title: 'logout' }
  ]

  return (
    <div>
      <DropItems items={ menuItems } />
    </div>
  );
 };

function DropItems({ items }) {
  return (
    <ul className={styles.dropdown}>
      {items.map((item, index) => (
        <li key={index} className="menu-items">
          {item.title}
        </li>
      ))}
    </ul>
  )
}