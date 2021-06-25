import React from "react";
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import auth from "../reducers/auth";

import { profile } from "../actions/auth";

const Auth = (props) => {

  const dispatch = useDispatch();


  const token = getQueryVariable('token')

  console.log(props)
  console.log(token)
  if (token) {
    dispatch(profile(token))
      .then((r) => {
        return <Redirect to="/profile" />;
      })

  }
  else {

    return (
      <div>bla        </div>
    );
  }
  return (<div>       </div>)
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  console.log(query)//"app=article&act=news_content&aid=160990"
  var vars = query.split("&");
  console.log(vars) //[ 'app=article', 'act=news_content', 'aid=160990' ]
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    console.log(pair)//[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ] 
    if (pair[0] == variable) { return pair[1]; }
  }
  return (false);
}


export default Auth;