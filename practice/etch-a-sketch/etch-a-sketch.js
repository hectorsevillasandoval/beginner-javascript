// Select canvas

const canvas = document.querySelector('#etch-a-sketch'),
      ctx = canvas.getContext('2d'),
      shakeBtn = document.querySelector('.shake'),
      { width, height } = canvas,
      MOVE_AMOUNT = 30;

      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.lineWidth = 20;

      let x, y, hue = 0;
      

      x = Math.floor( Math.random() * width );
      y = Math.floor( Math.random() * height );

      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.beginPath(); // Start the drawing
      ctx.moveTo(x, y);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      function draw( options ){
         let { key } = options;
         hue += 2;
         ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
         ctx.beginPath(); // Start the drawing
         ctx.moveTo(x, y);
         //console.log(key);
         switch ( key ){
             case 'ArrowUp':
                y -= MOVE_AMOUNT;
                ctx.lineTo(x, y);
                break;
            case 'ArrowDown':
                y += MOVE_AMOUNT;
                ctx.lineTo(x, y);
                break;
            case 'ArrowLeft':
                x -= MOVE_AMOUNT;
                ctx.lineTo(x, y);
                break;
            case 'ArrowRight':
                x += MOVE_AMOUNT;
                ctx.lineTo(x, y);
                break;
            default:
                break;
            }
         ctx.stroke();
      }

      // Function to handle the keyword buttons
      function handleKey( e ){

        if( e.key.includes('Arrow') ){
            e.preventDefault();
            draw( { key : e.key } );
        }

      }

      // Clear Canvas

      function clearCanvas(){
          canvas.classList.add('shake');
          ctx.clearRect(0,0, width, height);
          canvas.addEventListener( 'animationend', () => {
              canvas.classList.remove('shake');
              console.log('animation has ended');
          }, { once: true } );
      }

      shakeBtn.addEventListener('click', clearCanvas);

    //   Listening to the keyboard
    window.addEventListener( 'keydown', handleKey );