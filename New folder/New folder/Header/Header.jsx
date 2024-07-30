import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import logo from './logo.png';
import crt from './cart-b.png';
import CustomizedInputBase from './search';
import ModalComponent from './ModalComponent'; // Import ModalComponent for Track Order popup
import PopupComponent from './PopupComponent'; // Import PopupComponent for Login popup
import Card_drop from './card_drop';

const Header = ({ onHamburgerClick }) => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showTrackOrderPopup, setShowTrackOrderPopup] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);

  const handleCartClosePopup = () => setShowCartPopup(false);
  const handleShowCartPopup = () => {
    setShowCartPopup(true);
    setShowTrackOrderPopup(false);
    setShowLoginPopup(false);
  };

  const handleCloseLoginPopup = () => setShowLoginPopup(false);
  const handleShowLoginPopup = () => {
    setShowLoginPopup(true);
    setShowTrackOrderPopup(false);
    setShowCartPopup(false);
  };
  const handleCloseTrackOrderPopup = () => setShowTrackOrderPopup(false);
  const handleShowTrackOrderPopup = () => {
    setShowTrackOrderPopup(true);
    setShowLoginPopup(false);
    setShowCartPopup(false);

  };




  return (
    <header className="header">
      <div className="headerwrapper">
        <div className="First">
          <div className='hamburgerMenu' onClick={onHamburgerClick}>
            <svg id="noun_menu_1119465" width="23px" height="23px" viewBox="0 0 24 19.641">
              <path
                id="Path_50263"
                d="M27.663,33.527H43.246a1.563,1.563,0,0,0,0-3.127H27.663a1.563,1.563,0,0,0,0,3.127Z"
                transform="translate(-26.1 -30.4)"
              />
              <path
                id="Path_50264"
                d="M43.194,63.6H27.663a1.563,1.563,0,0,0,0,3.127H43.246a1.536,1.536,0,0,0,1.563-1.563A1.58,1.58,0,0,0,43.194,63.6Z"
                transform="translate(-26.1 -47.086)"
              />
              <path
                id="Path_50265"
                d="M48.547,47H27.6a1.565,1.565,0,0,0,0,3.127H48.6a1.507,1.507,0,0,0,1.5-1.563A1.548,1.548,0,0,0,48.547,47Z"
                transform="translate(-26.1 -38.743)"
              />
            </svg>
          </div>
          <Link className="logo" to="/">
            <img src={logo} className="logo" alt="logo" />
          </Link>
          <div className="searchBar">
            <CustomizedInputBase />
          </div>
        </div>

        <div className="Second">
            <div onClick={handleShowTrackOrderPopup} style={{ height:'28px', width:'140px', display:'flex', alignItems: 'center', justifyContent:'center', paddingRight:'5px'}}>
                <span className="trackOrder" >Track Order</span>
            </div>
            {showTrackOrderPopup && <ModalComponent show={showTrackOrderPopup} handleClose={handleCloseTrackOrderPopup} />}

            <div onClick={handleShowLoginPopup} style={{ height:'28px', width:'136px', display:'flex', alignItems: 'center', justifyContent:'center', paddingRight:'20px'}}>
                <span id="loginRegister"> Login </span>
            </div>
            {showLoginPopup && <PopupComponent show={showLoginPopup} handleClose={handleCloseLoginPopup} />}
        </div>

        <div className="Third" >
          <div onClick={handleShowCartPopup}  style={{ alignItems: 'center', height: '28px', width: '61px', justifyContent:'center' }}>
            <span className="btn">
              <img src={crt} className="logo" alt="logo" style={{height:'27px', width:'28px', paddingRight:'3px', marginRight:'3px'}} />
              <span>Cart </span>
            </span>
          </div>
          {showCartPopup && <Card_drop show={showCartPopup} handleClose={handleCartClosePopup} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
