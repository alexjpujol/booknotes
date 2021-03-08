import { FunctionComponent } from "react";
import styles from "styles/CatalogueBook.module.css";

interface CatalogueBookProps {
  name: string;
}

const CatalogueBook: FunctionComponent<CatalogueBookProps> = ({ name }) => {
  return <div className={styles.container}></div>;
};

export default CatalogueBook;
