<!doctype HTML>
<html>
    <head>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Sistema de Vacunación</title>
        <link rel="shortcut icon" href="images/logo.png">
        
        <link rel="stylesheet" type="text/css" href="styles/index.css">
        <link rel="stylesheet" type="text/css" media="all" href="styles/animate.css">
        
        <script type="text/javascript" src="js/jquery-2.1.1.min.js"></script>
         
        <script type="text/javascript">
        function validarForm(formulario) {
            
          if(formulario.txtUser.value=="") { //se valida el usuario
            formulario.txtUser.focus();    
            animate(".loger", 'shake');
            return false; 
            
          }else if(formulario.txtPassword.value=="") { //se valida la contraseÃ±a
            formulario.txtPassword.focus();
            animate(".loger", 'shake');
            return false; 
              
          }else       
              
            $(".loger").addClass('bounceOut');
            return true;
        }
        function animate(element_ID, animation) {
            $(element_ID).addClass(animation);
            var wait = window.setTimeout( function(){
            $(element_ID).removeClass(animation)}, 6000
            );
        }

        
</script>
    </head>
    <body>
    <div id="filtro">
        
        <section class="loger animated">
            <h1>Control de Vacunación</h1>
            <img id="logo" src="images/logo.png">
            
            <form role="form" id="frmLogin" method="post" action="Controlador" onsubmit="return validarForm(this);">
                <input type="hidden" name="action" value="Login">
                
                <input type="text" class="inputs" id="user" name="txtUser" placeholder="Usuario">
                <img src="images/userIcon.png" class="loginIcons" >
                
                <input class="inputs" type="password" id="password" placeholder="Contraseña" name="txtPassword">
                <img src="images/passIcon.png" class="loginIcons">
                
                <input type="submit" id="entrar" value="Entrar" class="EntrarBtn">
                <input type="image" src="images/loginIcon.png" id="loginIcon" class="EntrarBtn"><br>
                
                 <h2 class="error animated">Usuario o contraseña incorrectos</h2>
            </form> 
                
               <% String res = request.getParameter("oh"); %>
               
          <script type="text/javascript">
                
             var respuesta = '<%= res %>';
                
             if(respuesta == "error"){
                  $(".error").css("display", "table");
                  $(".error").fadeIn(80);
                  animate(".error", 'tada');
             }
        </script>
        </section>  
            
        </div>
                  
    </body>
</html>