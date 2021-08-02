import React from "react";

class FrontendHeader extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showMenu: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(e){
    let showMenu = this.state.showMenu;
    showMenu = !showMenu;
    this.setState({
      showMenu: showMenu
    });
  }

  render(){
    return (
      <header className={'siteHeader'}>
        <div className="container container-wide">
          <div className={'siteLogoContainer'}>
            <a to="https://www.canterbury.gov.uk/">
              <span className={'siteLogo'}></span>
            </a>
          </div>
          <div className={'siteHeaderButtonsContainer'}>
            <div className={'accountHeader headerButton'}>
              <a href="https://forms.canterbury.gov.uk/" className={'signInButton'}>
                  <span className={'signInButtonInner siteHeaderIcon'}></span>
                  <span className={'siteHeaderIconText'}>Sign In / Register</span>
              </a>
            </div>
            <div className={'menuButtonWrapper headerButton'}>
              <button className={'menuButton  button'} onClick={this.toggleMenu}>
                <span className="button-inner">
                  <span className={'menuButtonText'}>Menu</span>
                  <span className={'navToggle'}>
                    <span className={'navToggleLine'}></span>
                    <span className={'navToggleLine'}></span>
                    <span className={'navToggleLine'}></span>
                  </span>
                </span>
              </button>
            </div>
          </div>
          {this.state.showMenu ? (
                <section aria-label="Main menu" className={'menuSection isActive'}>
                <h2>Menu</h2>
                <button onClick={e => this.toggleMenu(e)} className={'menuClose'}>
                    <span className={'navToggle'}>
                        <span className={'navToggleLine'}></span>
                        <span className={'navToggleLine'}></span>
                        <span className={'navToggleLine'}></span>
                    </span>
                </button>
                <ul className="menuList">
                  <li className="menuLink">
                    <a className="link" href="https://www.canterbury.gov.uk/benefits-and-support">Benefits and support</a>
                  </li>
                  <li className="menuLink">
                    <a className="link" href="https://www.canterbury.gov.uk/bins-and-waste">Bins and waste</a>
                  </li>
                  <li className="menuLink">
                    <a className="link" href="https://www.canterbury.gov.uk/births-deaths-and-ceremonies">Births, deaths and ceremonies</a>
                  </li>
                  <li className="menuLink">
                    <a className="link" href="https://www.canterbury.gov.uk/budgets-and-transparency">Budgets and transparency</a>
                  </li>
                  <li className="menuLink">
                    <a className="link" href="https://www.canterbury.gov.uk/business-and-investment">Business and investment</a>
                  </li>
                  <li className="menuLink">
                    <a className="link" href="https://www.canterbury.gov.uk/consultations-and-petitions">Consultations and petitions</a>
                  </li>
                  <li className="menuLink">
                    <a className="link" href="https://www.canterbury.gov.uk/council-tax">Council tax</a>
                  </li>
                  <li className="menuLink">
                    <a className="link" href="https://www.canterbury.gov.uk/councillors-and-meetings">Councillors and meetings</a>
                  </li>
                  <li className="menuLink">
                    <a className="link" href="https://www.canterbury.gov.uk/environmental-problems">Environmental problems</a>
                  </li>
                  <li className="menuLink">
                    <a className="link" href="https://www.canterbury.gov.uk/housing">Housing</a>
                  </li>
                  <li className="menuLink">
                    <a className="link" href="https://www.canterbury.gov.uk/leisure-and-community">Leisure and community</a>
                  </li>
                  <li className="menuLink">
                    <a className="link" href="https://www.canterbury.gov.uk/licences-and-permissions">Licences and permissions</a>
                  </li>
                  <li className="menuLink">
                    <a className="link" href="https://www.canterbury.gov.uk/parking-and-roads">Parking and roads</a>
                  </li>
                  <li className="menuLink">
                    <a className="link" href="https://www.canterbury.gov.uk/planning-and-building">Planning and building</a>
                  </li>
                  <li className="menuLink">
                    <a className="link" href="https://www.canterbury.gov.uk/strategies-and-policies">Strategies and policies</a>
                  </li>
                  <li className="menuLink">
                    <a className="link" href="https://www.canterbury.gov.uk/voting-and-elections">Voting and elections</a>
                  </li>
                  <li className="menuLink">
                    <a className="link" href="https://www.canterbury.gov.uk/make-payment">Make a payment</a>
                  </li>
                </ul>
            </section>
          ) : ''}
        </div>
      </header>
    )
  }
}

export default FrontendHeader
