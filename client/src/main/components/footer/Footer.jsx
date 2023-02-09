import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="secondFooter">
        <ul className="listStudents">
          <li>
            BE:{" "}
            <span>
              Miha
              <a
                className="neutral"
                href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF3g7kL4e-lpAW0IwNSbOuF9Fv8ptoSRFeCg&usqp=CAU"
              >
                i
              </a>
              lo Pantic 604/2019
            </span>
          </li>
          <li>
            FE:{" "}
            <span>
              Jovan{" "}
              <a
                className="neutral"
                href="https://discworld.com/management/wp-content/uploads/2017/07/Great-ATuin.png"
              >
                I
              </a>
              vosevic 617/2019
            </span>
          </li>
          <li>
            INFRA:{" "}
            <span>
              Sonj
              <a
                className="neutral"
                href="https://cdn.discordapp.com/attachments/1064873539632640033/1070405989968388146/bulba.jpg"
              >
                a
              </a>{" "}
              Arsic 629/2019
            </span>
          </li>
          <li>
            <a
              className="neutral"
              href="https://i.kym-cdn.com/photos/images/facebook/001/998/134/a99.jpg"
            >
              QA
            </a>
            : <span>Stevan Popovic 631/2019</span>
          </li>
        </ul>
      </div>
      <div className="thirdFooter">Copyright © 2023 Instabook</div>
    </div>
  );
};

export default Footer;
