import React, { useState, useEffect } from 'react';
function Login()
{
return(
<>
<div>
<h1>Enter your nickname:</h1>
  <form action="/set-user-info" method="post">
    <label for="nickname" >Nickname:</label>
    <input type="text" id="nickname" name="nickname" required/>
    <br/>
    <label for="avatar">Avatar (0-9):</label>
    <input type="number" id="avatar" name="avatar" min="0" max="9" required/>
    <br/>
    <label for="background">Background (0-9):</label>
    <input type="number" id="background" name="background" min="0" max="9" required/>
    <br/>
    <button type="submit">Submit</button>
  </form>
  </div>
  </>
);
}
export default Login