

// Estudiar en su totalidad la relación HTML-CSS-JS hasta tener todos los conceptos básicos de una página interactiva incorporados 

// Primer archivo JS que hago conectado a una página web

(function(){
    "use strict";
      
      if(document.getElementById('.nombre')){ // para que no aparezcan 'errores' en la consola

        let regalo = document.getElementById('regalo');

        document.addEventListener('DOMContentLoaded', function(){

        // en 'leafletjs.com' hay más cosas para hacer en 'Docs' y 'Tutorials'
        var map = L.map('mapa').setView([-34.613485, -58.396132], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        L.marker([-34.613485, -58.396132]).addTo(map)
            .bindPopup('Av. Belgrano, Bs. As. <br> - Rincon 342') // averiguar cómo centrar este texto en JS
            .openPopup()
            .bindTooltip('GDLWebCamp 2020')
            .openTooltip();


        /* CAMPOS */

        // Datos Usuario
        let nombre = document.getElementById('nombre');
        let apellido = document.getElementById('apellido');
        let email = document.getElementById('email');

        // Pases
        let pase_dia = document.getElementById('pase_dia');
        let pase_dosdias = document.getElementById('pase_dosdias');
        let pase_completo = document.getElementById('pase_completo');

        // Botones y Divs
        let calcular = document.getElementById('calcular');
        let errorDiv = document.getElementById('error');
        let botonRegistro = document.getElementById('btnRegistro');
        let lista_productos = document.getElementById('lista-productos');
        let suma = document.getElementById('suma-total');

        // Extras
        let etiquetas = document.getElementById('etiquetas');
        let camisas = document.getElementById('camisa_evento');


        calcular.addEventListener('click', calcularMontos);

        pase_dia.addEventListener('blur', mostrarDias);
        pase_dosdias.addEventListener('blur', mostrarDias);
        pase_completo.addEventListener('blur', mostrarDias);

        nombre.addEventListener('blur', validarCampos);
        apellido.addEventListener('blur', validarCampos);
        email.addEventListener('blur', validarCampos);
        email.addEventListener('blur', validarMail);

        function validarCampos(){
            if(this.value == ''){
            // puedes usar JS como CSS de esta forma..
                errorDiv.style.display = 'block'
                errorDiv.innerHTML = 'Este campo es obligatorio';
                this.style.border = '1px solid red';
                errorDiv.style.color = '#868686';
            } else {
                errorDiv.style.display = 'none';
                this.style.border = '1px solid #999999'
            }
        }

        function validarMail(){
            if(this.value.indexOf('@') > -1) { // 'indexOf' verifica si existe el valor. Si no existe responde con '-1'
                errorDiv.style.display = 'none';
                this.style.border = '1px solid #999999'
            } else {
                errorDiv.style.display = 'block'
                errorDiv.innerHTML = 'Inserte un Correo Electrónico válido';
                this.style.border = '1px solid red';
                errorDiv.style.color = '#868686';
            }
        }

        function calcularMontos(event){
            event.preventDefault();
            if(regalo.value === ''){
                alert('Debes elegir un regalo');
                regalo.focus();
            } else {
                let boletosDia = parseInt(pase_dia.value, 10)|| 0, // Asegurar que los datos recibidos son números (ponerlo en las siguientes variables si sucede algún error)
                    boletos2Dias = pase_dosdias.value,
                    boletoCompleto = pase_completo.value,
                    cantCamisas = camisas.value,
                    cantEtiquetas =  etiquetas.value;

                let totalPagar = (boletosDia * 30) + (boletos2Dias * 45) + (boletoCompleto * 50) + ((cantCamisas * 10) * .93) + (cantEtiquetas * 2);
                
                let listadoProductos = [];

                if(boletosDia >= 1){
                    listadoProductos.push(`Pases por día (${boletosDia})`);
                }
                if(boletos2Dias >= 1){
                    listadoProductos.push(`Pases por 2 días (${boletos2Dias})`);
                }
                if(boletoCompleto >= 1){
                    listadoProductos.push(`Pases completos (${boletoCompleto})`);
                }
                if(cantCamisas >= 1){
                    listadoProductos.push(`Camisas (${cantCamisas})`);
                }
                if(cantEtiquetas >= 1){
                    listadoProductos.push(`Etiquetas (${cantEtiquetas})`);
                }
                lista_productos.style.display = 'block'; // el display default es 'none'..
                lista_productos.innerHTML = '';
                for(let i = 0; i < listadoProductos.length; i++){
                    lista_productos.innerHTML += listadoProductos[i] + '<br/>';
                }          
                suma.innerHTML = `$${totalPagar.toFixed(2)}`;      

                

            }
        }

        function mostrarDias(){
            let boletosDia = parseInt(pase_dia.value, 10)|| 0,
                boletos2Dias = pase_dosdias.value,
                boletoCompleto = pase_completo.value;
            
            let diasElegidos = [];

            if(boletosDia > 0){
                diasElegidos.push('viernes');
            }
            if(boletos2Dias > 0){
                diasElegidos.push('viernes', 'sabado');
            }
            if(boletoCompleto > 0){
                diasElegidos.push('viernes', 'sabado', 'domingo');
            }
            
            for(let i = 0; i < diasElegidos.length ; i++){
                document.getElementById(diasElegidos[i]).style.display = 'block';
            }
        }

    

    }); // DOMContentLoaded
  }
})();


$(function(){

    // Menú Fijo 
    let windowheight = $(window).height() // seleccionar altura de página en pixeles
    let barraAltura = $('.barra').innerHeight() // seleccionar altura de barra en pixeles

    $(window).scroll(function(){ // detectar scroll del usuario
        let scroll = $(window).scrollTop() // selecciona scroll del usuario
        if(scroll > windowheight) {
            $('.barra').addClass('fixed')
            $('body').css({'margin-top': barraAltura + 'px'})
        } else {
            $('.barra').removeClass('fixed')
            $('body').css({'margin-top': '0px'})
        }
    }) 


    // Responsive Menu
    $('.menu-movil').on('click', function(){
        $('.navegacion-principal').slideToggle() // (slideUp y luego slideDown)
    })





    // Programa de Conferencias
    $('.programa-evento .info-curso:first').show()
    $('.menu-programa a:first').addClass('activo')

    $('.menu-programa a').on('click', function(){
        $('.menu-programa a').removeClass('activo')
        $(this).addClass('activo')
        $('.ocultar').hide()
        let enlace = $(this).attr('href')
        $(enlace).fadeIn(700)

        return false
    })

    // Lettering
    $('.nombre-sitio').lettering()




    // Animaciones para los Números
    // ':nth-child' selecciona elemento en base a su número
    $('.resumen-evento li:nth-child(1) p').animateNumber({number: 6}, 900) // ({desenlace}, demora) 
    $('.resumen-evento li:nth-child(2) p').animateNumber({number: 15}, 1400) 
    $('.resumen-evento li:nth-child(3) p').animateNumber({number: 3}, 700)  
    $('.resumen-evento li:nth-child(4) p').animateNumber({number: 9}, 1100)  

    // Cuenta Regresiva
    $('.cuenta-regresiva').countdown('2020/12/10 09:00:00', function(event){
        $('#dias').html(event.strftime('%D'))
        $('#horas').html(event.strftime('%H'))
        $('#minutos').html(event.strftime('%M'))
        $('#segundos').html(event.strftime('%S'))
    })










})