import styles from './dropdownSection.module.css';

export const DropdownSection = ({ title, widget, children }) => {
  return (
    <section className={styles.section}>
      <h3 className="hidden">{title}</h3>

      <header className={styles.header}>
        <span>{title}</span>
        {widget}
      </header>

      {children}
    </section>
  );
};
