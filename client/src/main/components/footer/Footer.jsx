import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="secondFooter">
        <ul className="listStudents">
          <li>
            BE: <span>Mihailo Pantic 604/2019</span>
          </li>
          <li>
            FE: <span>Jovan Ivosevic 617/2019</span>
          </li>
          <li>
            INFRA: <span>Sonja Arsic 629/2019</span>
          </li>
          <li>
            QA: <span>Stevan Popovic 631/2019</span>
          </li>
        </ul>
      </div>
      <div className="thirdFooter">Copyright © 2023 Instabook</div>
    </div>
  );
};

export default Footer;
