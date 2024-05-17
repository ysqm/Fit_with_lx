wx.request({
  url:'fittrack.tengdingkang.fun',
  data:{
    info:'test',
    number:1,
  }
  method:'GET',
  header:{
    'Content-Type':'application/json' //set request header//
  },
  dataType:'json',
  responseType:'text',
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
