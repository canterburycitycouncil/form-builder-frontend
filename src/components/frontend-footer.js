import FrontendLayout from "./frontend-layout";
import React from "react";

const FrontendFooter = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <footer className="footer">
      <div className="footerTop">
        <div className="footerContainerWide">
          <a className="footerSignUp" href="https://forms.canterbury.gov.uk/">
            <span className="footerSignUpIcon"></span>
            <span className="footerSignUpText">
              Register for an account to receive updates and track progress 24/7
            </span>
          </a>
          <div className="footerSocialContainer">
            <ul className="socialLinks">
              <li>
                <a
                  rel="noreferrer"
                  href="https://www.facebook.com/CanterburyCityCouncil/"
                >
                  <span
                    className={`socialIcon socialIconFull socialIconFacebookWhite `}
                  ></span>
                  <span className={"socialIconFallback"}>Facebook</span>
                </a>
              </li>
              <li>
                <a rel="noreferrer" href="https://twitter.com/canterburycc">
                  <span
                    className={`socialIcon socialIconFull socialIconTwitterWhite `}
                  ></span>
                  <span className={"socialIconFallback"}>Twitter</span>
                </a>
              </li>
              <li>
                <a
                  rel="noreferrer"
                  href="https://www.youtube.com/user/canterburycc"
                >
                  <span
                    className={`socialIcon socialIconFull socialIconYoutubeWhite `}
                  ></span>
                  <span className={"socialIconFallback"}>You Tube</span>
                </a>
              </li>
              <li>
                <a
                  rel="noreferrer"
                  href="https://uk.linkedin.com/company/canterbury-city-council"
                >
                  <span
                    className={`socialIcon socialIconFull socialIconLinkedinWhite `}
                  ></span>
                  <span className={"socialIconFallback"}>Linkedin</span>
                </a>
              </li>
              <li>
                <a
                  rel="noreferrer"
                  href="https://www.instagram.com/canterburycitycouncil/"
                >
                  <span
                    className={`socialIcon socialIconFull socialIconInstagramWhite `}
                  ></span>
                  <span className={"socialIconFallback"}>Instagram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footerMain">
        <div className="footerContainerWide">
          <div className="footerLinksContainer">
            <nav className="footerLinks" aria-label="Footer Navigation">
              <ul className="footerLinksList">
                <li>
                  <a href="https://www.canterbury.gov.uk/contact-us/">
                    Contact us
                  </a>
                </li>
                {/* <li><a href="/accessibility/settings/">Accessibility settings</a></li> */}
                <li>
                  <a href="https://www.canterbury.gov.uk/about-council/accessibility-statement/">
                    Accessibility statement
                  </a>
                </li>
                <li>
                  <a href="https://news.canterbury.gov.uk/">News</a>
                </li>
                <li>
                  <a href="https://www.canterbury.gov.uk/jobs-volunteering/jobs-volunteering/">
                    Job vacancies
                  </a>
                </li>
                <li>
                  <a href="https://www.canterbury.gov.uk/about-council/terms-conditions/">
                    Terms and conditions
                  </a>
                </li>
                <li>
                  <a href="https://www.canterbury.gov.uk/budgets-transparency/privacy-notice/">
                    Privacy notice
                  </a>
                </li>
                <li>
                  <a className="ot-sdk-show-settings">Cookie preferences</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="footerInfo">
            <div className="footerLogo">
              <a
                href="/"
                className="footerLogoLink"
                aria-label="Logo homepage link"
              >
                <span className="icon"></span>
              </a>
            </div>
            <p className="site-footer__rights">
              &copy; {currentYear} Canterbury City Council
            </p>
          </div>
        </div>
      </div>
      {/* {this.state.showCookiesPane ? <CookiePrefs onCloseManaged={() => this.manageOpen(!this.state.showCookiesPane)} /> : ''} */}
    </footer>
  );
};

export default FrontendFooter;
