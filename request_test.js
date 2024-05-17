wx.request({
  url:'',
  method:'GET',
  header:{
    'Content-Type':'application/json' //set request header//
  },
  success:(res)=>{
    if (res.statusCode===200){
      console.log(res.data);
    }
    else{
      console.error('Server error',res);
    }
  },
  fail:(err)=>{
    console.error('Request failed',err);
  }
});
