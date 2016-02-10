$("#createAccount").validate({
  rules: {
    password: {
      required: true,
      minlength: 6,
      maxlength: 255,
    } ,
    cfmPassword: {
      equalTo: "#password",
      minlength: 6,
      maxlength: 255
    }
  },
  messages:{
    password: {
      required:"the password is required"
    }
  }
});
