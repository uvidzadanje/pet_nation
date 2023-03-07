import axios from 'axios'

function checkType(type)
{
  return localStorage.getItem("type") && localStorage.getItem("type") === type;
}

export function isAuth(to, from, next)
{
  if(!localStorage.getItem("toglogovan")) return next({name: "login"});

  return next();
}

export function isNotAuth(to, from, next)
{
  if(localStorage.getItem("toglogovan")) return next({name: "Home"});

  return next();
}

export function isAdmin(to, from, next)
{
  if(!checkType("admin")) return next({name: "Home"});

  return next();
}

export function isPreduzece(to, from, next)
{
  if(!checkType("preduzece")) return next({name: "Home"});

  return next();
}

export function isPotrosac(to, from, next)
{
  if(!checkType("potrosac")) return next({name: "Home"});

  return next();
}

export function isPotrosacOrPreduzece(to, from, next)
{
  if(checkType("admin")) return next({name: "Home"});

  return next();
}

export async function getAuth(to, from, next)
{
  try
  {
    const response = await axios.get("/users/user/auth");
    const auth = response.data.data;
    if(!auth.isAuthentificated) throw new Error("Losa autentifikacija");
    localStorage.setItem("toglogovan", auth.isAuthentificated);
    localStorage.setItem("type", auth.type);
    localStorage.setItem("id", auth.id);
  }
  catch(error)
  {
    localStorage.removeItem("toglogovan");
    localStorage.removeItem("type");
    localStorage.removeItem("id");
  }
  finally
  {
    return next();
  }
}
