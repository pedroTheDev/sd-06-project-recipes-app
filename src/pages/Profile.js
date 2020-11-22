import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Footer, Header } from '../components';

class Profile extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    localStorage.clear();
    history.push('/');
  }

  render() {
    const { history, userEmail } = this.props;

    return (
      <div className="profile-container">
        <Header history={ history } />
        <span
          data-testid="profile-email"
        >
          {JSON.parse(localStorage.getItem('user')).email}
          {userEmail}
        </span>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          className=""
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ this.handleClick }
        >
          Sair
        </button>
        <Footer history={ history } />
      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape().isRequired,
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

export default connect(mapStateToProps, null)(Profile);
