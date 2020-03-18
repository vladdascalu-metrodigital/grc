import React, {Component} from 'react';
import './index.scss';
import profileImageFile from '../icons/profile.svg';
import closeModalImageFile from '../icons/modal-close.svg';

export default class Recommendations extends Component {  
  
  toggleModal = () => {
    this.setState(prevState => ({ isModalVisible: !prevState.isModalVisible }));
  };
  
  constructor(props) {
    super(props);
    this.state = {
      isBoxVisible: false
    };
  }
  
  render() {
    
    return (
      <div className='mrc-ui-recommendation-component'>
        <button type='button' className='mrc-primary-button mrc-ui-add-recommendation-button' onClick={this.toggleModal}>Add Recommendation</button>
        <div className='mrc-ui-recommendations'>
          <h3 className='mrc-ui-recommendations-headline'>Recommendations</h3>
          <div className='mrc-ui-recommendation-list'>
            <div className='mrc-ui-recommendation'>
              <div className='mrc-ui-recommendation-metainfo-component'>
                <img className='mrc-ui-recommendation-author-icon' src={profileImageFile} alt="Profileimage"/>
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
                <img className='mrc-ui-recommendation-author-icon' src={profileImageFile} alt="Profileimage"/>
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
        <div className={`mrc-ui-modal-component ${this.state.isModalVisible ? "" : "hidden"}`}>
          <div className="mrc-ui-modal-overlay"></div>
          <div className="mrc-ui-modal">
      
      <button className="mrc-ui-close-button" onClick={this.toggleModal}><img src={closeModalImageFile} alt="Close"/></button>
            <h3 className="mrc-ui-modal-title">Add Recommendation</h3>
            <div className="mrc-ui-modal-content">
      
              <p className="mrc-ui-form-text">Add your personal five star rating and a recommendation text, visible for Customer Consultant, Head of Treasuary and Top Management.</p>

              <div className="mrc-ui-input-star-rating-component mrc-ui-input">
                <label className="mrc-ui-input-label">Star rating</label>
                <div className="mrc-ui-input-star-rating">
                  <input type="radio" id="star1" name="rate" value="1" />
                  <label for="star1" title="text">1 star</label>
                  <input type="radio" id="star2" name="rate" value="2" />
                  <label for="star2" title="text">2 stars</label>
                  <input type="radio" id="star3" name="rate" value="3" />
                  <label for="star3" title="text">3 stars</label>
                  <input type="radio" id="star4" name="rate" value="4" />
                  <label for="star4" title="text">4 stars</label>
                  <input type="radio" id="star5" name="rate" value="5" />
                  <label for="star5" title="text">5 stars</label>
                </div>
              </div>
              <div className="mrc-ui-input">
                <label className="mrc-ui-input-label">Text</label>
                <textarea className="mrc-ui-textarea" />
              </div>


              <div class="mrc-btn-group">
                <button type="button" class="mrc-btn mrc-primary-button mrc-ui-button-small">Speichern</button>
                <button type="button" class="mrc-btn mrc-secondary-button mrc-ui-button-small mrc-ui-button-secondary" onClick={this.toggleModal}>Abbrechen</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}