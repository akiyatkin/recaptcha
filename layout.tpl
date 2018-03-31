<html>
  <head>
    <title>reCAPTCHA demo: Simple page</title>
     <script src="https://www.google.com/recaptcha/api.js"></script>
     <script>
       function onSubmit(token) {
         document.getElementById("demo-form").submit();
       }
     </script>
  </head>
  <body>
    <form id='demo-form' action="/-recaptcha/submit" method="POST">
      <button class="g-recaptcha" data-sitekey="{~conf.recaptcha.sitekey}" data-callback='onSubmit'>Submit</button>
    </form>
  </body>
</html>