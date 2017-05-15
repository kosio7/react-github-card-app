class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: {}
    };
  }

  componentDidMount() {
    $.get("https://api.github.com/users/" + this.props.login, (data) => {
      this.setState(data);
      if (this.state.name !== null) {
        toastr.success('Added' + ' ' + this.state.name);
      } else if (this.state.name === null && this.state.type === 'User') {
        toastr.warning('This user has no name record.');
      } else if (this.state.name === null && this.state.type === 'Organization') {
        toastr.warning('This organization has no name record.');
      }
    }).fail(() => {
      toastr.error('User/organization ' + this.props.login + ' not found!');
    });
  }

  render() {
    return (
    <div className="avatar">
      <img src={this.state.avatar_url} width="80" />
      <h3 className="username">{this.state.name = this.state.name || 'UNNAMED USER'}</h3>
      <hr/>
    </div>
    );
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let loginInput = this.refs.login;
    this.props.addCard(loginInput.value);
    loginInput.value = '';
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input placeholder="github login" ref="login" />
        <button>Add</button>
      </form>
    );
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
       logins: []
    };

    this.addCard = this.addCard.bind(this);
  }

  addCard(loginToAdd) {
	  // TODO: Resolve how to prevent non existent user to be added as an empty line.
    if (loginToAdd.length > 0) {
      this.setState({logins: this.state.logins.concat(loginToAdd)});
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 500);
    }
  }

  render() {
    let cards = this.state.logins.map((login) => {
      return (<Card login={login} />)
    });
    return (
      <div>
        <h1 className="header">GITHUB CARDS</h1>
        <Form addCard={this.addCard} />
        {cards}
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));