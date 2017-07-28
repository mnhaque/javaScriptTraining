function getMiddle(s)
{
  var middle = s.length/2;
  var modulo = s.length%2;
  if(!(s.length%2){
     return s.substr(middle-1,2);
  } else {
    return s.substr(Math.ceil(middle)-1,1);
  }
}