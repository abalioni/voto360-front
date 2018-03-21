import React from 'react'
import { Card, CardActions, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import { cookie } from 'cookie_js'

export default class MeusDados extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: ''
    }

  }

  render() {
    const cookieUser = cookie.get('user');
    let user;
    if (cookieUser) {
      user = JSON.parse(cookieUser);
      console.log(user)
    }

    return(<div>
      {user.nome}
    </div>
    )
  }
}
