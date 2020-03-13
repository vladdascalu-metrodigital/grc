import React, {Component} from 'react';
import './index.scss';
import profileImageFile from '../icons/profile.svg';
import closeModalImageFile from '../icons/close.svg';

const image = {
  src: profileImageFile,
  alt: 'User',
};

const closeButton = {
  src: closeModalImageFile,
  alt: 'Close',
};

export default class Recommendations extends Component {  
  render() {
    return (
      <div className='mrc-ui-recommendation-component'>
        <button type='button' className='mrc-primary-button mrc-ui-add-recommendation-button'>Add Recommendation</button>
        <div className='mrc-ui-recommendations'>
          <h3 className='mrc-ui-recommendations-headline'>Recommendations</h3>
          <div className='mrc-ui-recommendation-list'>
            <div className='mrc-ui-recommendation'>
              <div className='mrc-ui-recommendation-metainfo-component'>
                <img className='mrc-ui-recommendation-author-icon' src={image.src} alt={image.alt}/>
                <div className='mrc-ui-recommendation-author-text'>
                  <div className='mrc-ui-recommendation-author-email'>peter.parker@metronom.com</div>
                  <div className='mrc-ui-recommendation-author-title-time'>Head of Treasuary, 20.04.2020, 15:34 Uhr</div>
                </div>
                <div className='mrc-ui-recommendation-star-rating'>
                  <span className='mrc-ui-filled-star'>★</span>
                  <span className='mrc-ui-filled-star'>★</span>
                  <span className='mrc-ui-filled-star'>★</span>
                  <span className='mrc-ui-star-placeholder'>☆</span>
                  <span className='mrc-ui-star-placeholder'>☆</span>
                </div>
              </div>
              <div className='mrc-ui-recommendation-text'>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
            </div>
            <hr className='mrc-ui-recommendation-divider'/>
            <div className='mrc-ui-recommendation'>
              <div className='mrc-ui-recommendation-metainfo-component'>
                <img className='mrc-ui-recommendation-author-icon' src={image.src} alt={image.alt}/>
                <div className='mrc-ui-recommendation-author-text'>
                  <div className='mrc-ui-recommendation-author-email'>peter.parker@metronom.com</div>
                  <div className='mrc-ui-recommendation-author-title-time'>Head of Treasuary, 20.04.2020, 15:34 Uhr</div>
                </div>
                <div className='mrc-ui-recommendation-star-rating'>
                  <span className='mrc-ui-filled-star'>★</span>
                  <span className='mrc-ui-filled-star'>★</span>
                  <span className='mrc-ui-filled-star'>★</span>
                  <span className='mrc-ui-filled-star'>★</span>
                  <span className='mrc-ui-star-placeholder'>☆</span>
                </div>

              </div>
              <div className='mrc-ui-recommendation-text'>
    At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

    - vero eos et accusam et justo
    - consetetur sadipscing elitr

    Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.   

    Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.
              </div>
            </div>
          </div>
        </div>
        <div className="mrc-ui-modal-component">
          <div className="mrc-ui-modal-overlay"></div>
          <div className="mrc-ui-modal">
            <button class="close-button" id="close-button"><img src={closeButton.src} alt={closeButton.alt}/></button>

              <h3 className="mrc-ui-modal-title">Add Recommendation</h3>

              <div className="mrc-ui-modal-content">
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </div>
        </div>
      </div>
    );
  }
}