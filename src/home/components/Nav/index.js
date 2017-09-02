import React from 'react';
import PropTypes from 'prop-types';
import styles from './Nav.css';

const Nav = () => {
  const navList = ['Posts', 'Site', 'Author'];
  return (
    <div>
      <div className={`${styles.container}`}>
        <ul className={styles.ul}>
          {navList.map((item, index) => <NavItem key={index} value={item} />)}
        </ul>
        <div className={styles['text-container']}>
          <h2 className={styles.title}>The Blockchain Blog</h2>
        </div>
      </div>
    </div>
  );
};

const NavItem = (props) => {
  return (
    <li className={styles.li}>
      <a href={'#' + props.value} className={styles.a}>{props.value}</a>
    </li>
  );
};

NavItem.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Nav;
