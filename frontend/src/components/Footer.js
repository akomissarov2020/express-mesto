function Footer() {

  const current_year = new Date().getFullYear();

  return (
    <footer className="footer page__footer">
        <p className="footer__copyright">&copy; {current_year} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
